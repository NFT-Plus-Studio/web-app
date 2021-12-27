<template>
    <v-dialog v-model="syncedShowModal" width="600">
        <v-card light>
            <v-app-bar flat color="rgba(255, 255, 255, 0)">
                <v-toolbar-title class="text-h6 pl-0">
                    Almost there!
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn color="black" icon @click.stop="syncedShowModal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-app-bar>
            <div class="px-5 pb-4">
                <v-alert
                    v-if="isSuccess || isError"
                    :type="isSuccess ? 'success' : 'error'"
                    >{{
                        isSuccess
                            ? 'Awesome! You should receive an email shortly. 🥳'
                            : errorMessage
                    }}</v-alert
                >
                <v-form
                    ref="form"
                    v-model="form.valid"
                    @submit.prevent="onSubmit"
                >
                    <p class="grey--text mb-1 text-subtitle-2">
                        Collection Settings
                    </p>
                    <div class="input-container">
                        <label>Title</label>
                        <v-text-field
                            v-model="syncedCollectionSettings.name"
                            dense
                            type="text"
                            :rules="form.rules.title"
                            outlined
                        ></v-text-field>
                    </div>
                    <div class="input-container">
                        <label>Description</label>
                        <v-textarea
                            v-model="syncedCollectionSettings.description"
                            hide-details
                            outlined
                            rows="2"
                            type="text"
                        ></v-textarea>
                    </div>
                    <p class="mt-3 grey--text mb-1 text-subtitle-2">
                        Generate Settings
                    </p>
                    <div class="input-container">
                        <label>Email</label>
                        <v-text-field
                            v-model="syncedCollectionSettings.emailAddress"
                            type="text"
                            dense
                            :rules="form.rules.email"
                            outlined
                        ></v-text-field>
                    </div>
                    <div class="input-container">
                        <label># of images to generate</label>
                        <v-text-field
                            v-model="syncedCollectionSettings.collectionSize"
                            :rules="form.rules.collectionSize"
                            dense
                            outlined
                            @keyup="processCollectionSizeChange"
                        ></v-text-field>
                    </div>
                    <div class="text-center">
                        <p class="text-h6 font-weight-bold mb-1">Amount Due</p>
                        <p class="text-body-2 font-weight-medium">
                            {{ price }} BNB
                        </p>
                    </div>
                    <div class="d-flex justify-center">
                        <vue-hcaptcha
                            sitekey="3355137f-7fb8-493b-8db5-46bcb103da35"
                            @verify="onHcaptchaVerify"
                            @reset="onHcaptchaReset"
                        ></vue-hcaptcha>
                    </div>
                    <div class="d-flex flex-column justify-center">
                        <v-btn
                            id="create-button"
                            type="submit"
                            :disabled="
                                !form.valid ||
                                priceLoading ||
                                !isHcaptchaVerified
                            "
                            dark
                            :loading="isLoading"
                            class="py-5"
                            >Confirm</v-btn
                        >
                        <p
                            v-if="isWaitingForPayment"
                            class="text-center mt-3 font-italic"
                        >
                            Waiting for payment...
                        </p>
                    </div>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Component, PropSync, Watch, Mixins } from 'vue-property-decorator';
import _ from 'underscore';
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';
import { Collection } from '@/mixins/collection';
import { debounce } from '@/helpers/utils';

// TODO: move to mixin
export interface FormDefinition {
    valid: boolean;
    fields: {
        [key: string]: any;
    };
    rules?: {
        [key: string]: any;
    };
}

// TODO: move to a mixin
function requiredRule(
    message = 'This field must be filled'
): (value: any) => boolean | string {
    return (value) => !!value || value === 0 || message;
}

function minCharacterRule(
    message = 'This field must contain at least 5 characters'
): (value: any) => boolean | string {
    return (value) => value.length >= 5 || message;
}

function isNumber(
    message = 'The value must be a number between 1 - 10,000'
): (value: any) => boolean | string {
    return (value) =>
        (!_.isNaN(value) && parseInt(value) >= 1 && parseInt(value) <= 10000) ||
        message;
}

interface Form extends FormDefinition {
    fields: {
        title: string;
        description: string;
        email: string;
        collectionSize: string;
    };
    rules: {
        title: ((message?: string) => {})[];
        email: ((message?: string) => {})[];
        collectionSize: ((message?: string) => {})[];
    };
}

@Component({
    components: {
        VueHcaptcha,
    },
})
export default class GenerateCollectionModal extends Mixins(Collection) {
    @PropSync('showModal', { type: Boolean }) syncedShowModal!: boolean;
    @PropSync('layerData', { type: Array }) syncedLayers!: any[];
    @PropSync('collectionSettings', { type: Object })
    syncedCollectionSettings!: any;

    selectedTokenIndex = 0;
    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';
    isSuccess: boolean = false;
    hcaptchaToken: string = '';
    isHcaptchaVerified: boolean = false;

    get hCaptchaSiteKey(): string {
        return process.env.NUXT_ENV_HCAPTCHA_SITE_KEY || '';
    }

    onHcaptchaVerify(token: string) {
        this.isHcaptchaVerified = true;
        this.hcaptchaToken = token;
        console.log(this.hcaptchaToken);
    }

    onHcaptchaReset() {
        console.log('onHcaptchaReset');
        this.isHcaptchaVerified = false;
        this.hcaptchaToken = '';
    }

    price: number = 0;
    priceLoading: boolean = false;
    isWaitingForPayment: boolean = false;

    form: Form = {
        valid: false,
        fields: {
            title: '',
            description: '',
            email: '',
            collectionSize: '',
        },
        rules: {
            title: [requiredRule(), minCharacterRule()],
            email: [requiredRule(), minCharacterRule()], // TODO: add validation for email
            collectionSize: [requiredRule(), isNumber()],
        },
    };

    processCollectionSizeChange = debounce(() => this.fetchPrice());

    async fetchPrice() {
        const asset = 'bnb';
        this.priceLoading = true;
        const url = `/pricing?amount=${this.syncedCollectionSettings.collectionSize}&asset=${asset}`;
        try {
            const response = await this.$axios.get(url);
            this.price = response.data.data.price;
            this.priceLoading = false;
        } catch (error) {
            console.log('error', error);
            this.priceLoading = false;
        }
    }

    async onSubmit() {
        // reset
        this.isLoading = true;
        this.isError = false;
        this.isSuccess = false;

        const parsedData = this.parseToApiData(
            this.syncedCollectionSettings,
            this.syncedLayers
        );

        // basic error handling
        if (parsedData.files.length < 4) {
            this.errorMessage = 'You must provide at least 4 files';
            this.isLoading = false;
            this.isError = true;
            return;
        }

        let txHash = null;
        if (this.price > 0) {
            try {
                this.isWaitingForPayment = true;
                txHash = await this.$web3.createDefaultChainPayment(this.price);
                console.log('Transaction Hash: ', txHash);
            } catch (error: any) {
                this.isWaitingForPayment = false;
                this.errorMessage = error.message;
                this.isLoading = false;
                this.isError = true;
                // return;
            }
        }

        // const bodyFormData = new FormData();
        // bodyFormData.append(
        //     'collectionConfig',
        //     JSON.stringify(parsedData.collectionConfig)
        // );

        // bodyFormData.append(
        //     'hcaptchaToken',
        //     this.hcaptchaToken
        // );

        // for (const file of parsedData.files) {
        //     bodyFormData.append('images', file);
        // }

        // try {
        //     await this.$axios({
        //         url: '/upload',
        //         method: 'POST',
        //         data: bodyFormData,
        //         headers: { 'Content-Type': 'multipart/form-data' },
        //     });

        //     this.isLoading = false;
        //     this.isSuccess = true;

        //     this.$gtag.event('collection_generate_confirm_success', {
        //         ...this.syncedCollectionSettings,
        //         num_layers: parsedData.collectionConfig.layersOrder.length,
        //         num_traits: parsedData.files.length,
        //     });
        // } catch (err: any) {
        //     if (err.response) {
        //         this.errorMessage = err.response.data.response.errors.message;
        //     } else {
        //         this.errorMessage = 'Something went wrong 🤔. Try again later.';
        //     }

        //     this.isError = true;
        //     this.isLoading = false;
        //     this.$gtag.event('collection_generate_confirm_success', {
        //         ...this.syncedCollectionSettings,
        //         num_layers: parsedData.collectionConfig.layersOrder.length,
        //         num_traits: parsedData.files.length,
        //         error: err.message || err,
        //     });
        // }
    }

    @Watch('collectionSettings', { immediate: true, deep: true })
    onCollectionSettingsChanged(val: any) {
        if (!val) {
            return;
        }

        if (val.name.length >= 5 && val.description.length >= 5) {
            this.$nuxt.$emit('set-object-name', val?.name);
            this.$storage.collection.update({
                collectionId: val?.id,
                dataToUpdate: val,
            });
        }
    }

    @Watch('showModal')
    onShowModalChanged(val: boolean) {
        if (!val) {
            return;
        }

        // reset stuff here
        this.isError = false;
        this.isSuccess = false;

        this.fetchPrice();
    }
}
</script>

<style lang="scss" scoped>
#create-button {
    background: linear-gradient(
        180deg,
        #ff00a1 0%,
        rgba(255, 17, 79, 0.87) 100%
    );
    border-radius: 6.27055px;
    transform: rotate(-0.42deg);
    font-size: 16px;
}

.input-container {
    margin-bottom: 0.8em 0;
    label {
        color: black;
        margin-bottom: 0.3em;
        display: block;
    }
}
</style>

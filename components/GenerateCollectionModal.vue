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
                    <p class="grey--text">Collection Settings</p>
                    <v-text-field
                        v-model="syncedCollectionSettings.name"
                        label="Title"
                        :rules="form.rules.title"
                        outlined
                    ></v-text-field>
                    <v-textarea
                        v-model="syncedCollectionSettings.description"
                        hide-details
                        outlined
                        rows="2"
                        label="Description"
                    ></v-textarea>
                    <p class="mt-3 grey--text">Generate Settings</p>
                    <v-text-field
                        v-model="syncedCollectionSettings.emailAddress"
                        label="Email"
                        :rules="form.rules.email"
                        outlined
                    ></v-text-field>
                    <v-text-field
                        v-model="syncedCollectionSettings.collectionSize"
                        label="# of images to generate"
                        :rules="form.rules.collectionSize"
                        outlined
                    ></v-text-field>

                    <!-- <v-menu class="mb-5" offset-y light>
                        <template #activator="{ on, attrs }">
                            <v-btn
                                block
                                outlined
                                class="py-6 mb-6"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <img
                                    :src="selectedToken.iconPath"
                                    width="16"
                                    contain
                                />
                                {{ selectedToken.name }}
                                <v-spacer></v-spacer>
                                <v-icon right color="black">
                                    mdi-menu-down
                                </v-icon>
                            </v-btn>
                        </template>
                        <v-card class="mx-auto" width="300" tile>
                            <v-list class="px-20">
                                <v-list-item-group v-model="selectedTokenIndex">
                                    <v-list-item
                                        v-for="(
                                            token, index
                                        ) in supportedTokens"
                                        :key="index"
                                    >
                                        <v-list-item-icon> </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>{{
                                                token.name
                                            }}</v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-list-item-group>
                            </v-list>
                        </v-card>
                    </v-menu> -->

                    <div class="d-flex justify-center">
                        <v-btn
                            id="create-button"
                            type="submit"
                            :disabled="!form.valid"
                            dark
                            :loading="isLoading"
                            class="py-5"
                            >Confirm</v-btn
                        >
                    </div>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, PropSync, Watch, Mixins } from 'vue-property-decorator';
import _ from 'underscore';
import { Collection } from '@/mixins/collection';

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

@Component
export default class GenerateCollectionModal extends Mixins(Collection) {
    @PropSync('showModal', { type: Boolean }) syncedShowModal!: boolean;
    @PropSync('layerData', { type: Array }) syncedLayers!: any[];
    @PropSync('collectionSettings', { type: Object })
    syncedCollectionSettings!: any;

    supportedTokens = [
        {
            ticker: 'eth',
            name: 'Ethereum',
            network: 'ethereum',
            iconPath: '~/assets/images/icons/eth-icon.svg',
        },
    ];

    selectedTokenIndex = 0;
    isLoading: boolean = false;
    isError: boolean = false;
    errorMessage: string = '';
    isSuccess: boolean = false;

    get selectedToken() {
        return this.supportedTokens[this.selectedTokenIndex];
    }

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
            this.isError = true;
            return;
        }

        const bodyFormData = new FormData();
        bodyFormData.append(
            'collectionConfig',
            JSON.stringify(parsedData.collectionConfig)
        );

        for (const file of parsedData.files) {
            bodyFormData.append('images', file);
        }

        try {
            await this.$axios({
                url: '/upload',
                method: 'POST',
                data: bodyFormData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            this.isLoading = false;
            this.isSuccess = true;

            this.$gtag.event('collection_generate_confirm_success', {
                ...this.syncedCollectionSettings,
                num_layers: parsedData.collectionConfig.layersOrder.length,
                num_traits: parsedData.files.length,
            });
        } catch (err: any) {
            console.log('Error requesting to generate collection: ', err);
            this.errorMessage = 'Something went wrong 🤔. Try again later.';
            this.isError = true;
            this.isLoading = false;
            this.$gtag.event('collection_generate_confirm_success', {
                ...this.syncedCollectionSettings,
                num_layers: parsedData.collectionConfig.layersOrder.length,
                num_traits: parsedData.files.length,
                error: err.message || err,
            });
        }
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
        this.form.valid = false;
    }
}
</script>

<style lang="scss">
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
</style>

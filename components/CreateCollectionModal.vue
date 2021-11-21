<template>
    <v-dialog v-model="syncedShowModal" width="568">
        <v-card light>
            <v-app-bar flat color="rgba(255, 255, 255, 0)">
                <v-toolbar-title class="text-h6 pl-0">
                    Create Collection
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn color="black" icon @click.stop="syncedShowModal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-app-bar>
            <div class="px-5 pt-2 pb-4">
                <v-form
                    ref="form"
                    v-model="form.valid"
                    @submit.prevent="onSubmit"
                >
                    <v-text-field
                        v-model="form.fields.title"
                        label="Title"
                        :rules="form.rules.title"
                        outlined
                    ></v-text-field>
                    <v-textarea
                        v-model="form.fields.description"
                        :rules="form.rules.description"
                        outlined
                        label="Description"
                    ></v-textarea>
                    <div class="d-flex justify-center">
                        <v-btn
                            id="create-button"
                            type="submit"
                            :disabled="!form.valid"
                            dark
                            class="py-5"
                            >Create</v-btn
                        >
                    </div>
                </v-form>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, PropSync, Watch } from 'vue-property-decorator';

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

interface Form extends FormDefinition {
    fields: {
        title: string;
        description: string;
    };
    rules: {
        title: ((message?: string) => {})[];
        description: ((message?: string) => {})[];
    };
}

@Component
export default class CreateCollectionModal extends Vue {
    @PropSync('showModal', { type: Boolean }) syncedShowModal!: boolean;

    form: Form = {
        valid: false,
        fields: {
            title: '',
            description: '',
        },
        rules: {
            title: [requiredRule(), minCharacterRule()],
            description: [requiredRule(), minCharacterRule()],
        },
    };

    onSubmit() {
        // TODO: implement this method
        console.log('Submits :) ');
    }

    @Watch('showModal')
    onShowModalChanged(val: boolean) {
        if (!val) {
            return;
        }

        // reset stuff here
        this.form.fields.title = '';
        this.form.fields.description = '';
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

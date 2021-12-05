<template>
    <v-dialog v-model="showModal" max-width="290" persistent light>
        <v-card>
            <v-card-title class="text-h6"> {{ title }} </v-card-title>
            <v-card-text>
                {{ message }}
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn text @click="onCancel">Cancel</v-btn>
                <v-btn text color="red" @click="onConfirm">{{
                    confirmationButtonTitle
                }}</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import _ from 'underscore';

interface ModalProps {
    title: string;
    message: string;
    confirmationButtonTitle: string;
    callback: Function;
}

@Component
export default class ConfirmationModal extends Vue {
    title: string = '';
    message: string = '';
    confirmationButtonTitle: string = '';
    callback: Function = () => {};
    showModal: boolean = false;

    created() {
        this.$root.$on('open-confirmation-modal', this.openModal);
    }

    openModal({
        title,
        message,
        confirmationButtonTitle,
        callback,
    }: ModalProps) {
        this.title = title;
        this.message = message;
        this.callback = callback;
        this.confirmationButtonTitle = confirmationButtonTitle;
        this.showModal = true;
    }

    onConfirm() {
        this.callback();
        this.showModal = false;
    }

    onCancel() {
        this.showModal = false;
    }
}
</script>

<style lang="scss" scoped>
.preview-container {
    height: 500px;
}
</style>

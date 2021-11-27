<template>
    <v-dialog v-model="showModal" max-width="290" persistent light>
        <v-card>
            <v-card-title class="text-h5"> Delete </v-card-title>
            <v-card-text>
                Are you sure you want to delete layer "{{ layerName }}"?
            </v-card-text>
            <v-card-actions class="justify-end">
                <v-btn text @click="deleteCancel">Cancel</v-btn>
                <v-btn text color="red" @click="deleteLayer">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit, PropSync } from 'vue-property-decorator';
import _ from 'underscore';

@Component
export default class DeleteLayerModal extends Vue {
    @PropSync('showModal', { type: Boolean }) syncedShowModal!: boolean;
    @PropSync('layerName', { type: String }) syncedLayerName!: string;

    @Emit()
    deleteLayer() {}

    @Emit()
    deleteCancel() {}
}
</script>

<style lang="scss" scoped>
.preview-container {
    height: 500px;
}
</style>

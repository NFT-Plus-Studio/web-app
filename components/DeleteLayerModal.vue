<template>
    <v-dialog
        v-model="showModal"
        transition="dialog-top-transition"
        max-width="600"
      >
          <v-card>
            <v-toolbar
              color="red"
              dark
            >Delete</v-toolbar>
            <v-card-text>
              <div class="text-h4 pa-12">Are you sure you want to delete layer "{{layerName}}"?</div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="deleteCancel"
              >Cancel</v-btn>
              <v-btn
                text
                color="red"
                @click="deleteLayer"
              >Delete</v-btn>
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

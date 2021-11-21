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
                <v-text-field label="Title" outlined></v-text-field>
                <v-textarea
                    outlined
                    name="input-7-4"
                    label="Description"
                ></v-textarea>
                <div class="d-flex justify-center">
                    <v-btn dark id="create-button" class="py-5">Create</v-btn>
                </div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, PropSync, Watch } from 'vue-property-decorator';

@Component
export default class CreateCollectionModal extends Vue {
    @PropSync('showModal', { type: Boolean }) syncedShowModal!: boolean;

    @Watch('showModal')
    onShowModalChanged(val: boolean) {
        if (!val) {
            return;
        }

        // reset stuff here
        console.log('Modal changed');
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

<template>
    <v-dialog v-model="showModal" width="568">
        <v-card light>
            <v-app-bar flat color="rgba(255, 255, 255, 0)">
                <v-toolbar-title class="text-h6 pl-0">
                    Preview
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn color="black" icon @click.stop="showModal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-app-bar>

            <v-alert v-if="errorFound" type="error">
                I'm an error alert.
            </v-alert>
            <div v-if="!errorFound" class="preview-container px-5 py-2">
                <v-row
                    v-if="isLoading"
                    class="fill-height"
                    align-content="center"
                    align="center"
                    justify="center"
                >
                    <v-col cols="12" class="text-center">
                        <!-- <v-progress-circular
                            indeterminate
                            color="green"
                        ></v-progress-circular> -->
                    </v-col>
                </v-row>
                <div v-else>Loaded</div>
            </div>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import _ from 'underscore';

@Component
export default class NFTCollectionPreviewModal extends Vue {
    showModal: boolean = false;
    rawLayers!: any[];
    isLoading: boolean = true;
    errorFound: boolean = false;

    created() {
        this.$root.$on('open-nft-collection-preview-modal', this.openModal);
    }

    openModal(layers: any[]) {
        this.showModal = true;
        this.rawLayers = layers;
        this.getPreview();
    }

    getPreview() {
        let selectedData: any = this.selectRandomDataForPreview();
        selectedData = this.parseLayersToApiData(selectedData);
        console.log(selectedData);
    }

    selectRandomDataForPreview(): any[] {
        return this.rawLayers.map((layer: any) => {
            const traitSample = _.sample(layer.traits, 2);
            const newLayer = JSON.parse(JSON.stringify(layer));
            newLayer.traits = traitSample;
            return newLayer;
        });
    }

    // TODO: move to mixin
    parseLayersToApiData(layers: any[]): { data: {}; files: File[] } {
        const data = {
            collectionConfig: {
                collectionSize: 4,
                layersOrder: _.pluck(layers, 'title'),
                shuffleLayerConfigurations: false,
                description: 'Preview',
                userEmailAddress: 'preview@sample.com',
            },
        };

        const files: File[] = [];
        // rename the files
        for (const layer of layers) {
            for (const trait of layer.traits) {
                const fileType = trait.fileInfo.type.split('/')[1];
                const modifiedFileName = `${layer.title}_${trait.name}#${trait.rarity}.${fileType}`;
                const newFile = new File([trait.file], modifiedFileName);
                files.push(newFile);
            }
        }

        return {
            data,
            files,
        };
    }
}
</script>

<style lang="scss" scoped>
.preview-container {
    height: 500px;
}
</style>

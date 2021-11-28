<template>
    <v-dialog v-model="showModal" width="568">
        <v-card light>
            <v-app-bar flat color="rgba(255, 255, 255, 0)">
                <v-toolbar-name class="text-h6 pl-0"> Preview </v-toolbar-name>

                <v-spacer></v-spacer>

                <v-btn color="black" icon @click.stop="showModal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-app-bar>

            <v-alert v-if="errorFound" type="error">
                {{ errorMessage }}
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
                        <v-progress-circular
                            indeterminate
                            color="green"
                        ></v-progress-circular>
                    </v-col>
                </v-row>

                <div
                    v-else
                    class="d-flex text-center justify-center align-center"
                >
                    <v-img :src="previewImage" contain max-width="380" />
                </div>
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
    errorMessage: string = '';
    previewImage: string = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA';
    collectionId!: string;

    created() {
        this.$root.$on('open-nft-collection-preview-modal', this.openModal);
    }

    openModal(collectionId: string, layers: any[]) {
        this.reset();
        this.rawLayers = layers;
        this.collectionId = collectionId;
        this.getPreview();
        this.showModal = true;
    }

    reset() {
        this.isLoading = true;
        this.errorFound = false;
        this.errorMessage = '';
    }

    async getPreview() {
        this.reset();
        try {
            let selectedData: any = this.selectRandomDataForPreview();
            selectedData = this.parseLayersToApiData(selectedData);
            if (selectedData.files.length < 4) {
                throw new Error(
                    'You must have provide at least two (2) layers with at least two(2) traits each.'
                );
            }

            console.log('Selcted Data: ', selectedData);

            const bodyFormData = new FormData();
            bodyFormData.append(
                'collectionConfig',
                JSON.stringify(selectedData.collectionConfig)
            );

            for (const file of selectedData.files) {
                bodyFormData.append('images', file);
            }

            try {
                const response = await this.$axios({
                    url: '/preview',
                    method: 'POST',
                    data: bodyFormData,
                    headers: { 'Content-Type': 'multipart/form-data' },
                });

                this.isLoading = false;
                this.previewImage = response.data.data;

                // auto-save collection preview image
                this.$storage.collection.update({
                    collectionId: this.collectionId,
                    dataToUpdate: {
                        animatedPreviewBase64: this.previewImage,
                    },
                });
            } catch (err: any) {
                console.log('Error from api: ', err);
                throw new Error('Something went wrong.');
            }
        } catch (err: any) {
            console.log('Error: ', err);
            this.errorFound = true;
            this.isLoading = false;
            this.errorMessage = err.message;
        }
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
    parseLayersToApiData(layers: any[]): {
        collectionConfig: {};
        files: File[];
    } {
        const collectionConfig = {
            collectionSize: 4,
            layersOrder: _.map(layers, (layer) => layer.name.replace('_', ' ')),
            shuffleLayerConfigurations: false,
            description: 'Preview',
            userEmailAddress: 'preview@sample.com',
        };

        const files: File[] = [];
        // rename the files
        for (const layer of layers) {
            for (const trait of layer.traits) {
                const fileType = trait.fileInfo.type.split('/')[1];
                const modifiedFileName = `${layer.name.replace('_', ' ')}_${
                    trait.name
                }#${trait.rarity}.${fileType}`;
                const newFile = new File([trait.file], modifiedFileName);
                files.push(newFile);
            }
        }

        return {
            collectionConfig,
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

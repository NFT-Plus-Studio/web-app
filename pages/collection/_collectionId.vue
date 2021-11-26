<template>
    <v-row class="nft-generator-parent">
        <v-col cols="3">
            <div class="side-panel py-5 px-5">
                <h3 class="text-h6 mb-3">Layers</h3>
                <v-list class="layer-list" flat color="transparent">
                    <v-list-item-group @change="onLayerSelected">
                        <Container v-if="layers.length > 0" @drop="onDrop">
                            <Draggable
                                v-for="(layer, index) in layers"
                                :key="index"
                                class="layers-container"
                            >
                                <v-list-item
                                    :class="{
                                        'pink-item-border': layer.selected,
                                    }"
                                >
                                    <v-row align-content="center">
                                        <v-col cols="10" class="pa-0">
                                            <span class="layer-name">{{
                                                layer.name
                                            }}</span>
                                        </v-col>
                                        <v-col cols="2">
                                            <div class="layer-stats">
                                                <!-- <span>50%</span> -->
                                                <span>{{
                                                    layer.elements.length
                                                }}</span>
                                            </div>
                                        </v-col>
                                    </v-row>
                                    <v-btn
                                        class="
                                            layer-close-btn
                                            item-close-btn
                                            ma-2
                                        "
                                        text
                                        x-small
                                        icon
                                        color="red lighten-2"
                                        @click="deleteLayer(index)"
                                    >
                                        <v-icon x-small>mdi-close</v-icon>
                                    </v-btn>
                                </v-list-item>
                            </Draggable>
                        </Container>
                    </v-list-item-group>
                    <v-list-item-group class="layers-container">
                        <v-list-item>
                            <v-text-field
                                v-model="newLayerName"
                                outlined
                                hide-details
                                dense
                                class="new-layer-input-container"
                                type="text"
                                background-color="rgba(255, 254, 254, 0.08)"
                            >
                                <template #append-outer>
                                    <v-btn
                                        elevation="0"
                                        color="rgba(255,255,255,0.08)"
                                        class="px-0"
                                        depressed
                                        @click="addNewLayer"
                                    >
                                        <v-icon color="white">mdi-plus</v-icon>
                                    </v-btn>
                                </template>
                            </v-text-field>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <v-divider class="my-3" />
                <div class="d-flex justify-space-between mt-8 layers-container">
                    <v-btn
                        id="preview-btn"
                        outlined
                        @click.stop="openPreviewModal"
                        >Preview</v-btn
                    >
                    <v-btn
                        id="generate-btn"
                        @click.stop="showGenerateCollectionModalFlag = true"
                        >Generate</v-btn
                    >
                </div>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="d-flex flex-wrap">
                <DropFilesZone class="mb-3" @files-selected="onFilesSelected" />
                <template v-if="selectedLayer">
                    <div
                        v-for="(trait, index) in selectedLayer.elements"
                        :key="index"
                        :class="{
                            'pink-item-border': trait.selected,
                        }"
                        class="layer-thumbnail-container pa-2 mt-3 mx-2"
                        @click="selectTrait(index)"
                    >
                        <v-btn
                            v-if="trait.selected"
                            class="close-btn item-close-btn ma-2"
                            text
                            x-small
                            icon
                            color="red lighten-2"
                            @click="deleteTrait(index)"
                        >
                            <v-icon x-small>mdi-close</v-icon>
                        </v-btn>
                        <v-img
                            class="mb-1"
                            width="76"
                            height="72"
                            contain
                            :src="trait.base64Image"
                        ></v-img>
                        <p>{{ trait.name }}</p>
                    </div>
                </template>
            </div>
        </v-col>
        <v-col cols="3">
            <div class="side-panel py-5 px-5">
                <div v-if="selectedLayer">
                    <h3 class="text-h6">Layer Settings</h3>
                    <div>
                        <div class="input-container">
                            <label>Name</label>
                            <v-text-field
                                v-model="selectedLayer.name"
                                value="selectedLayer.name"
                                outlined
                                hide-details
                                dense
                                type="text"
                                background-color="#1C163D"
                            >
                            </v-text-field>
                        </div>
                        <!-- <div class="input-container">
                        <label>Rarity</label>
                        <v-slider
                            hide-details
                            max="100"
                            step="10"
                            thumb-color="#FF00A1"
                            track-fill-color="#FF76FF"
                        ></v-slider>
                        <p class="slider-value">50%</p>
                    </div> -->
                    </div>
                </div>
                <div v-if="selectedTrait">
                    <v-divider class="my-3" />
                    <h3 class="text-h6">Trait Settings</h3>
                    <div>
                        <div class="input-container">
                            <label>Name</label>
                            <v-text-field
                                v-model="selectedTrait.name"
                                value="selectedTrait.name"
                                outlined
                                hide-details
                                dense
                                type="text"
                                background-color="#1C163D"
                            >
                            </v-text-field>
                        </div>
                        <div class="input-container">
                            <label>Rarity</label>
                            <v-radio-group
                                v-model="selectedTrait.rarity"
                                row
                                dense
                                hide-details
                            >
                                <v-radio label="Common" value="100"></v-radio>
                                <v-radio label="Moderate" value="75"></v-radio>
                                <v-radio label="Rare" value="35"></v-radio>
                                <v-radio label="Legendary" value="1"></v-radio>
                            </v-radio-group>
                        </div>
                    </div>
                    <v-divider class="my-3" />
                    <h3 class="text-h6">File Information</h3>
                    <div>
                        <div class="file-info-container my-2">
                            <p>File Name</p>
                            <span>{{ selectedTrait.fileInfo.name }}</span>
                        </div>
                        <div class="file-info-container my-2">
                            <p>File Type</p>
                            <span>{{ selectedTrait.fileInfo.type }}</span>
                        </div>
                        <div class="file-info-container my-2">
                            <p>File Size</p>
                            <span>{{ selectedTrait.fileInfo.size }}</span>
                        </div>
                        <div class="file-info-container my-2">
                            <p>File Dimensions</p>
                            <span>400x400</span>
                        </div>
                    </div>
                </div>
            </div>
        </v-col>
        <NFTCollectionPreviewModal />
        <GenerateCollectionModal
            :show-modal.sync="showGenerateCollectionModalFlag"
            :layer-data.sync="layers"
            :name.sync="collectionSettings.name"
            :description.sync="collectionSettings.description"
        />
    </v-row>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { Container, Draggable } from 'vue-smooth-dnd';
import _ from 'underscore';

// TODO: move to mixin
interface FileInfo {
    name: string;
    type: string;
    size: string;
}

// TODO: move to mixin
interface ElementProps {
    name: string;
    rarity: string | number;
    file: File | null;
    fileInfo: FileInfo | null;
    base64Image: string;
    image: HTMLImageElement;
    selected: boolean;
}

// TODO: move to mixin
interface LayerProps {
    name: string;
    elements: Array<ElementProps>;
    selected: boolean;
}

const elementTemplate: ElementProps = {
    name: '',
    rarity: '100',
    file: null,
    fileInfo: null,
    selected: false,
    base64Image: '',
    image: new Image(),
};

const layerTemplate: LayerProps = {
    name: '',
    elements: [],
    selected: false,
};

@Component({
    layout: 'editor',
    components: {
        Container,
        Draggable,
    },
    asyncData({ params }) {
        const collectionId = params.collectionId;
        return { collectionId };
    },
})
export default class NFTGeneratorEditor extends Vue {
    newLayerName: string = '';
    showGenerateCollectionModalFlag: boolean = false;

    layers: LayerProps[] = [];
    collectionId!: string;

    // collection setting properties
    collectionSettings = {
        name: '',
        description: '',
        emailAddress: '',
        collectionSize: 100,
    };

    async mounted() {
        const service: any = _.find(
            this.$store.state.projects[this.$store.state.selectedProjectIndex]
                .services,
            { id: this.collectionId }
        );

        this.collectionSettings.name = service.name;
        this.collectionSettings.description = service.description;
        this.collectionSettings.collectionSize = service.collectionSize;
        this.collectionSettings.emailAddress = service.emailAddress;

        for (const [layerIndex, layer] of service.metadata.layers.entries()) {
            const newLayer: LayerProps = {
                name: layer.name,
                selected: layerIndex === 0,
                elements: [],
            };

            for (const [elementIndex, element] of layer.elements.entries()) {
                const newElement: ElementProps = {
                    name: element.name,
                    rarity: String(element.rarity),
                    fileInfo: element.fileInfo,
                    selected: layerIndex === 0 && elementIndex === 0,
                    file: this.dataURLtoFile(
                        element.fileBase64,
                        element.fileInfo.name
                    ),
                    base64Image: element.fileBase64,
                    image: await this.getBase64AsImage(element.fileBase64),
                };

                newLayer.elements.push(newElement);
            }

            this.layers.push(newLayer);
        }
    }

    // TODO: move to mixin
    dataURLtoFile(dataUrl: any, fileName: any) {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], fileName, { type: mime });
    }

    get selectedLayer(): any {
        const currentIndex = _.findIndex(this.layers, (t: any) => t.selected);
        return this.layers[this.indexFound(currentIndex) || 0];
    }

    applyDrag(arr: any, dragResult: any) {
        const { removedIndex, addedIndex, payload } = dragResult;
        if (removedIndex === null && addedIndex === null) return arr;

        const result = [...arr];
        let itemToAdd = payload;

        if (removedIndex !== null) {
            itemToAdd = result.splice(removedIndex, 1)[0];
        }

        if (addedIndex !== null) {
            result.splice(addedIndex, 0, itemToAdd);
        }

        this.$store.commit('REORDER_LAYER', {
            collectionId: this.collectionId,
            moveFromIndex: removedIndex,
            moveToIndex: addedIndex,
        });

        return result;
    }

    onDrop(dropResult: any) {
        this.layers = this.applyDrag(this.layers, dropResult);
    }

    openPreviewModal() {
        this.$root.$emit(
            'open-nft-collection-preview-modal',
            this.collectionId,
            this.layers
        );
    }

    addNewLayer() {
        if (!this.newLayerName || this.newLayerName.trim() === '') {
            // TODO: add alert message
            return;
        }

        const newLayer: LayerProps = JSON.parse(JSON.stringify(layerTemplate));
        newLayer.name = this.newLayerName.trim();
        if (this.layers.length === 0) {
            newLayer.selected = true;
        }
        this.layers.push(newLayer);

        this.$store.commit('ADD_LAYER', {
            collectionId: this.collectionId,
            layer: newLayer,
        });

        this.newLayerName = '';
        this.onLayerSelected(this.layers.length - 1);
    }

    deleteLayer(index: number) {
        this.layers.splice(index, 1);
        this.onLayerSelected(this.layers.length - 1);
    }

    async addNewTrait(file: File | null): Promise<void> {
        if (!file) {
            return;
        }

        const newTrait: ElementProps = JSON.parse(
            JSON.stringify(elementTemplate)
        );
        newTrait.name = file.name.split('.')[0];
        newTrait.file = file;
        newTrait.fileInfo = {
            name: file.name,
            type: file.type,
            size: this.formatBytes(file.size),
        };
        try {
            newTrait.base64Image = await this.getBase64(file);
            newTrait.image = await this.getBase64AsImage(newTrait.base64Image);
        } catch (err) {
            // TODO: add toast error message here
            console.log('Error adding new trait: ', err);
        }
        if (this.selectedLayer.elements.length === 0) {
            newTrait.selected = true;
        }
        this.selectedLayer.elements.push(newTrait);
        const currentLayerIndex = _.findIndex(
            this.layers,
            (t: any) => t.selected
        );
        this.$store.commit('ADD_ELEMENT', {
            collectionId: this.collectionId,
            layerIndex: currentLayerIndex,
            element: newTrait,
        });
        this.selectTrait(this.selectedLayer.elements.length - 1);
    }

    deleteTrait(index: number) {
        this.selectedLayer.elements.splice(index, 1);
        this.selectTrait(this.selectedLayer.elements.length - 1);
        const currentLayerIndex = _.findIndex(
            this.layers,
            (t: any) => t.selected
        );
        this.$store.commit('DELETE_TRAIT', {
            collectionId: this.collectionId,
            layerIndex: currentLayerIndex,
            elementIndex: index,
        });
    }

    // TODO: move to mixin
    getBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                if (reader.result) {
                    resolve(reader.result.toString());
                }
                reject(new Error('Unable to read file'));
            };
            reader.onerror = (error) => reject(error);
        });
    }

    getBase64AsImage(base64: string): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = function () {
                resolve(image);
            };
            image.onerror = (error) => reject(error);
            image.src = base64;
        });
    }

    onFilesSelected(fileList: FileList) {
        // don't add anything if no layer is selected
        if (!this.selectedLayer) {
            return;
        }

        for (let i = 0; i < fileList.length; i++) {
            this.addNewTrait(fileList.item(i));
        }
    }

    onLayerSelected(i: number) {
        const currentIndex = _.findIndex(this.layers, (t: any) => t.selected);
        if (currentIndex > -1) {
            this.layers[this.indexFound(currentIndex) || 0].selected = false;
        }
        if (this.layers[i || 0]) {
            this.layers[i || 0].selected = true;
        }
        this.selectTrait(0);
    }

    get selectedTrait() {
        if (this.selectedLayer?.elements.length === 0) {
            return null;
        }
        const currentIndex = _.findIndex(
            this.selectedLayer?.elements,
            (t: any) => t.selected
        );
        return this.selectedLayer?.elements[this.indexFound(currentIndex) || 0];
    }

    selectTrait(newSelectedIndex: number) {
        const currentIndex = _.findIndex(
            this.selectedLayer.elements,
            (t: any) => t.selected
        );

        if (this.selectedLayer.elements[newSelectedIndex]) {
            this.selectedLayer.elements[
                this.indexFound(currentIndex) || 0
            ].selected = false;
            this.selectedLayer.elements[newSelectedIndex].selected = true;
        }
    }

    // TODO: move to mixin
    indexFound(index: number): number | undefined {
        return index !== -1 ? index : undefined;
    }

    // TODO: move to mixin
    formatBytes(bytes: number, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
        );
    }
}
</script>

<style lang="scss" scoped>
.nft-generator-parent {
    width: 100%;
    height: calc(100vh - 15vh);

    $closeButtonPositionTop: -1.7em;
    $closeButtonPositionRight: -1.6em;

    $hotPinkColor: #ff00a1;

    .pink-item-border {
        border: 1px solid $hotPinkColor !important;
    }

    .side-panel {
        background: rgba(122, 5, 235, 0.24);
        border: 1px solid rgba(64, 19, 244, 0.6);
        box-sizing: border-box;
        border-radius: 6px;
        height: calc(100%);
        display: fixed;
        overflow-y: auto;

        #preview-btn {
            // background: linear-gradient(
            //     95.85deg,
            //     rgba(46, 254, 225, 0.58) 3.59%,
            //     rgba(255, 17, 79, 0.87) 99.3%
            // );
            border-radius: 5.3435px;
            transform: rotate(-0.42deg);
        }

        #generate-btn {
            background: linear-gradient(
                275.76deg,
                rgba(46, 254, 225, 0.58) 1.44%,
                rgba(255, 17, 79, 0.87) 98.56%
            );
            border-radius: 5.3435px;
            transform: rotate(-0.42deg);
        }

        .input-container {
            margin: 0.8em 0;

            label {
                color: rgba(255, 255, 255, 0.67);
                margin-bottom: 0.3em;
                display: block;
            }

            .slider-value {
                color: rgba(255, 255, 255, 0.53);
                font-size: 12px;
                text-align: right;
            }
        }

        .file-info-container {
            p {
                font-size: 14px;
                margin-bottom: 0px !important;
                color: rgba(255, 255, 255, 0.8);
            }

            span {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.53);
            }
        }
    }

    .layer-list {
        .v-list-item {
            margin-bottom: 0.8em;
            background: #09022d;
            border: 1px solid transparent;
            border-radius: 6px;
            display: flex;
            padding-left: 0.6em;
            padding-right: 0.6em;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            span.layer-name {
                display: flex;
                padding: 1em 0.8em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .layer-stats {
                // width: 100%;
                display: flex;
                justify-content: flex-end;

                span {
                    padding: 0.5em 0.8em;
                    font-size: 0.8em;
                }

                span:first-child {
                    color: rgba(255, 255, 255, 0.6);
                    font-size: 0.8em;
                }

                span:last-child {
                    background: rgba(255, 252, 252, 0.38);
                    border-radius: 5px;
                }
            }
        }

        .v-list-item > span {
            font-size: 0.9em;
        }

        .new-layer-input-container {
            display: flex;
            align-items: center;
        }

        .layer-close-btn {
            position: absolute;
            right: $closeButtonPositionTop;
            top: $closeButtonPositionTop;
        }
    }

    .layer-thumbnail-container:hover {
        border: 1px solid $hotPinkColor;
    }

    .layer-thumbnail-container {
        background: #2b047b;
        border: 1px solid transparent;
        box-sizing: border-box;
        border-radius: 6.71429px;
        width: 94px;
        height: 112px;
        position: relative;
        cursor: pointer;

        p {
            font-size: 12px;
            padding: 0px !important;
            margin: 0px !important;
            text-align: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            // resize: horizontal;
            color: #ffffff;
        }

        .close-btn {
            position: absolute;
            z-index: 2;
            right: $closeButtonPositionTop;
            top: $closeButtonPositionTop;
        }
    }

    .layers-container {
        padding: 8px 8px 0 0;
    }

    .item-close-btn {
        background: #09022d;
        border: 1px solid #ff00a1;
        box-sizing: border-box;
    }
}
</style>

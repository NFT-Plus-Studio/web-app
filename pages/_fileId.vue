<template>
    <v-row class="nft-generator-parent">
        <v-col cols="3">
            <div class="side-panel py-5 px-5">
                <h3 class="text-h6 mb-3">Layers</h3>
                <v-list class="layer-list" flat color="transparent">
                    <v-list-item-group v-model="selectedLayer">
                        <v-list-item
                            v-for="(layer, index) in layers"
                            :key="index"
                            :class="{
                                'pink-item-border': selectedLayer == index,
                            }"
                        >
                            <span>{{ layer.title }}</span>
                            <div class="layer-stats">
                                <span>50%</span>
                                <span>1</span>
                            </div>
                        </v-list-item>
                    </v-list-item-group>
                    <v-list-item>
                        <v-text-field
                            v-model="message"
                            outlined
                            hide-details
                            dense
                            class="new-layer-input-container"
                            type="text"
                            background-color="rgba(255, 254, 254, 0.08)"
                        >
                            <template v-slot:append-outer>
                                <v-btn
                                    elevation="0"
                                    color="rgba(255,255,255,0.08)"
                                    class="px-0"
                                    depressed
                                >
                                    <v-icon color="white">mdi-plus</v-icon>
                                </v-btn>
                            </template>
                        </v-text-field>
                    </v-list-item>
                </v-list>
                <v-divider class="my-3" />
                <div class="d-flex justify-space-between mt-8">
                    <v-btn id="preview-btn">Preview</v-btn>
                    <v-btn id="generate-btn">Generate</v-btn>
                </div>
            </div>
        </v-col>
        <v-col cols="6">
            <div class="d-flex flex-wrap">
                <DropFilesZone v-on:files-selected="onFilesDropped" />
                <div
                    v-for="(number, index) in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                    :key="index"
                    class="layer-thumbnail-container pa-2 mt-2 mx-2"
                >
                    <v-img
                        class="mb-1"
                        width="76"
                        height="72"
                        gradient="90deg, rgba(255, 0, 161, 1) 6.63%, rgba(255, 0, 161, 1) 49.84%, rgba(255, 0, 161, 1) 98.82%"
                    ></v-img>
                    <p>pink cherry</p>
                </div>
            </div>
        </v-col>
        <v-col cols="3">
            <div class="side-panel py-5 px-5">
                <h3 class="text-h6">Layer Settings</h3>
                <div>
                    <div class="input-container">
                        <label>Name</label>
                        <v-text-field
                            v-model="message"
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
                <v-divider class="my-3" />
                <h3 class="text-h6">Trait Settings</h3>
                <div>
                    <div class="input-container">
                        <label>Name</label>
                        <v-text-field
                            v-model="message"
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
                        <v-radio-group v-model="row" row dense hide-details>
                            <v-radio label="Common" value="radio-1"></v-radio>
                            <v-radio
                                label="Modernate"
                                value="radio-2"
                            ></v-radio>
                            <v-radio label="Rate" value="radio-3"></v-radio>
                            <v-radio
                                label="Legendary"
                                value="radio-4"
                            ></v-radio>
                        </v-radio-group>
                    </div>
                </div>
                <v-divider class="my-3" />
                <h3 class="text-h6">File Information</h3>
                <div>
                    <div class="file-info-container my-2">
                        <p>File Name</p>
                        <span>pink-cherry-bg.png</span>
                    </div>
                    <div class="file-info-container my-2">
                        <p>File Type</p>
                        <span>image/png</span>
                    </div>
                    <div class="file-info-container my-2">
                        <p>File Size</p>
                        <span>200kb</span>
                    </div>
                    <div class="file-info-container my-2">
                        <p>File Dimensions</p>
                        <span>400x400</span>
                    </div>
                </div>
            </div>
        </v-col>
    </v-row>
</template>

<script lang="ts">
export default {
    asyncData({ params }) {
        const slug = params.fileId;
        return { slug };
    },
    data: () => {
        return {
            selectedLayer: 0,
            layers: [{ title: 'Background' }, { title: 'Body' }],
        };
    },
    methods: {
        onFilesDropped(fileList: FileList) {
            console.log('Filelist: ', fileList);
        },
    },
};
</script>

<style lang="scss" scoped>
.nft-generator-parent {
    width: 100%;
    height: calc(100vh - 15vh);

    .side-panel {
        background: rgba(122, 5, 235, 0.24);
        border: 1px solid rgba(64, 19, 244, 0.6);
        box-sizing: border-box;
        border-radius: 6px;
        height: calc(100%);
        display: fixed;
        overflow-y: auto;

        #preview-btn {
            background: linear-gradient(
                95.85deg,
                rgba(46, 254, 225, 0.58) 3.59%,
                rgba(255, 17, 79, 0.87) 99.3%
            );
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
            margin-bottom: 0.5em;
            background: #09022d;
            border: 1px solid transparent;
            border-radius: 6px;
            display: flex;
            padding-left: 0.6em;
            padding-right: 0.6em;
            justify-content: space-between;
            align-items: center;

            .layer-stats {
                width: 100%;
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

        .pink-item-border {
            border: 1px solid #ff00a1 !important;
        }
    }

    .layer-thumbnail-container {
        background: #2b047b;
        border: 1px solid #ff00a1;
        box-sizing: border-box;
        border-radius: 6.71429px;
        width: 94px;
        height: 112px;

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
    }
}
</style>

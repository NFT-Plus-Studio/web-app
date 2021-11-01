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
                <div class="d-flex"></div>
            </div>
        </v-col>
        <v-col cols="6"> Again </v-col>
        <v-col cols="3">
            <div class="side-panel py-5 px-5">
                <h3 class="text-h6">Layer Settings</h3>
            </div>
        </v-col>
    </v-row>
</template>

<script>
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
}
</style>

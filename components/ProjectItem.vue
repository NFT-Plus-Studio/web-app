<template>
    <div
        :style="
            previewImage
                ? {
                      background:
                          'url(' + previewImage + ') no-repeat center center',
                      backgroundSize: 'cover',
                  }
                : {
                      background: `url(${require('~/assets/images/icons/image-collection-icon.svg')}) no-repeat center center`,
                  }
        "
        class="project-item px-5 py-5"
        @click="navigate"
    >
        <!-- <v-row
            :style="
                previewImage
                    ? { background: 'transparent' }
                    : { background: '#ff00a1' }
            "
            class="image-container mt-4"
        >
            <div>
                <img
                    v-if="!previewImage"
                    class="type-icon mr-2"
                    width="38"
                    src="~/assets/images/icons/image-collection-icon.svg"
                />
                <div v-if="previewImage">
                    <v-img
                        contain
                        class="rounded"
                        width="100%"
                        :src="previewImage"
                    />
                </div>
            </div>
        </v-row> -->

        <div id="overlay"></div>
        <v-row align="center" id="header">
            <v-col cols="2"></v-col>
            <v-col cols="8">
                <v-row justify="center" align="center">
                    <v-col class="project-type" cols="12">
                        <div class="text-center px-6 py-2">
                            <img
                                class="type-icon mr-2"
                                width="16"
                                src="~/assets/images/icons/collection-icon.svg"
                            />
                            <span class="font-weight-bold">Collection</span>
                        </div>
                    </v-col>
                </v-row>
            </v-col>
            <v-col cols="2">
                <div class="project-status text-center">
                    <img
                        class="mr-2"
                        width="24"
                        src="~/assets/images/icons/collection-status-icon.svg"
                    />
                </div>
            </v-col>
        </v-row>
        <p
            id="title-text"
            class="text-subtitle-1 text-center mt-7 font-weight-bold"
        >
            {{ name }}
        </p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ProjectItem extends Vue {
    @Prop(String) id: string | undefined;
    @Prop(String) name: string | undefined;
    @Prop(String) previewImage: string | undefined;
    @Prop(String) type: string | undefined;
    @Prop(Boolean) hasGenerated: boolean | undefined;

    get thumbnail() {
        if (!this.previewImage) {
            return require('../assets/images/icons/image-collection-icon.svg');
        }

        return this.previewImage;
    }

    navigate() {
        this.$router.push({
            path: `/${this.type}/${this.id}`,
        });
    }
}
</script>

<style lang="scss">
.project-item {
    position: relative;
    width: 303.17px;
    height: 279px;
    border: 2.23744px solid rgba(255, 255, 255, 0.33);
    box-sizing: border-box;
    border-radius: 6.71233px;
    text-decoration: none;
    color: white;

    #title-text {
        position: absolute;
        bottom: 5%;
        width: 100%;
        left: 0;
    }

    #overlay {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.3);
    }

    #header {
        position: absolute;
        z-index: 2;
        width: 95%;
        .project-type {
            justify-content: center;
            display: flex;

            div {
                display: inline-flex;
                background: rgba(239, 237, 248, 0.58);
                border-radius: 1.53448px;
                font-size: 11px;
            }
        }

        .project-status {
            display: flex;
            flex: 1;
        }
    }

    .image-container {
        display: flex;
        justify-content: center;

        div {
            // background: #ff00a1;
            border-radius: 5.67901px;
            width: 158px;
            height: 137px;

            display: flex;
            justify-content: center;
        }

        .preview-image {
            border-radius: 6px;
            object-fit: contain;
        }
    }
}

.project-item:hover {
    opacity: 0.8;
    cursor: pointer;
}
</style>

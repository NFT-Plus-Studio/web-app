<template>
    <div class="project-item px-5 py-5" @click="navigate">
        <v-row align="center">
            <v-col cols="2"></v-col>
            <v-col cols="8">
                <v-row justify="center" align="center">
                    <v-col class="project-type" cols="12">
                        <div class="text-center px-6 py-2">
                            <img
                                class="mr-2"
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
        <v-row
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
                    class="mr-2"
                    width="38"
                    src="~/assets/images/icons/image-collection-icon.svg"
                />
                <img
                    v-if="previewImage"
                    contain
                    class="preview-image"
                    width="100%"
                    :src="previewImage"
                />
            </div>
        </v-row>
        <p class="text-subtitle-1 text-center mt-7 font-weight-bold">
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

    navigate() {
        this.$router.push({
            path: `/${this.type}/${this.id}`,
        });
    }
}
</script>

<style lang="scss">
.project-item {
    width: 303.17px;
    height: 245px;
    border: 2.23744px solid rgba(255, 255, 255, 0.33);
    box-sizing: border-box;
    border-radius: 6.71233px;
    text-decoration: none;
    color: white;

    .project-type {
        display: flex;
        justify-content: center;

        div {
            display: inline-flex;
            background: rgba(239, 237, 248, 0.58);
            border-radius: 1.53448px;
            font-size: 11px;
        }
    }

    .image-container {
        display: flex;
        justify-content: center;

        div {
            border-radius: 5.67901px;
            width: 115px;
            height: 100px;
            display: flex;
            justify-content: center;
        }

        .preview-image {
            border-radius: 12px;
            object-fit: contain;
        }
    }

    .project-status {
        display: flex;
        flex: 1;
    }
}

.project-item:hover {
    opacity: 0.8;
    cursor: pointer;
}
</style>

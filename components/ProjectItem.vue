<template>
    <div class="project-item px-5 py-5">
        <v-row align="center">
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
        <v-row class="image-container mt-4">
            <div>
                <img
                    class="type-icon mr-2"
                    width="38"
                    src="~/assets/images/icons/image-collection-icon.svg"
                />
            </div>
        </v-row>
        <p class="text-subtitle-1 text-center mt-7 font-weight-bold">
            Tasty Bobas
        </p>
    </div>
</template>

<script>
export default {
    data: () => ({
        selectedItem: 0,
        items: [{ title: 'Default' }],
    }),
};
</script>

<style lang="scss">
.project-item {
    width: 303.17px;
    height: 245px;
    border: 2.23744px solid rgba(255, 255, 255, 0.33);
    box-sizing: border-box;
    border-radius: 6.71233px;

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
            background: #ff00a1;
            border-radius: 5.67901px;
            width: 115px;
            height: 99.38px;
            display: flex;
            justify-content: center;
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

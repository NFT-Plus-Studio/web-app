<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    elevation="0"
                    color="transparent"
                    class="px-0"
                    depressed
                    v-on="on"
                >
                    <img src="~/assets/images/logo.png" width="159.77" />
                    <v-icon class="ml-1" small color="white">
                        mdi-menu-down
                    </v-icon>
                </v-btn>
            </template>
            <v-list class="px-20">
                <v-list-item-group v-model="selectedItem">
                    <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-content>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-menu>
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

<style lang="scss" scoped>
.theme--dark.v-btn:hover::before {
    opacity: 0 !important;
}
</style>

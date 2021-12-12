<template>
    <v-app dark>
        <v-app-bar :clipped-left="clipped" fixed app height="75px">
            <template v-slot:img="{ props }">
                <v-img
                    v-bind="props"
                    gradient="90deg, rgba(18, 4, 88, 0.64) 6.63%, rgba(122, 5, 235, 0.67) 49.84%, rgba(163, 35, 205, 0.82) 98.82%"
                ></v-img>
            </template>
            <ProjectSelector />
            <v-spacer></v-spacer>
            <WalletConnectionButton />
        </v-app-bar>
        <v-main>
            <v-container fluid class="my-5 px-6">
                <Nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>
<script>
export default {
    data() {
        return {
            clipped: false,
            drawer: true,
            fixed: false,
            items: [
                {
                    icon: 'mdi-apps',
                    title: 'Welcome',
                    to: '/',
                },
                {
                    icon: 'mdi-chart-bubble',
                    title: 'Inspire',
                    to: '/inspire',
                },
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js',
        };
    },
};
</script>

<style lang="scss">
.v-sheet.v-app-bar.v-toolbar:not(.v-sheet--outlined) {
    box-shadow: 0px 5px 4px rgba(0, 0, 0, 0.1);
}
</style>

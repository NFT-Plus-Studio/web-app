<template>
    <div>
        <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
                <v-btn id="create-button" class="py-6" v-bind="attrs" v-on="on">
                    Create
                    <v-icon right small color="white"> mdi-menu-down </v-icon>
                </v-btn>
            </template>
            <v-list class="px-20">
                <v-list-item-group v-model="selectedItem">
                    <v-list-item v-for="(item, index) in items" :key="index">
                        <v-list-item-conten>
                            <v-list-item-title>{{
                                item.title
                            }}</v-list-item-title>
                        </v-list-item-conten>
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
        items: [{ title: 'Collection' }],
    }),
};
</script>

<style lang="scss" scoped>
#create-button {
    background: linear-gradient(
        180deg,
        #ff00a1 0%,
        rgba(255, 17, 79, 0.87) 100%
    );
    border-radius: 6.27055px;
    transform: rotate(-0.42deg);
    font-size: 16px;
}
</style>

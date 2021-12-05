<template>
    <div class="item-setting-selector d-flex align-center">
        <img src="~/assets/images/icons/logo-icon.png" width="45.82" />
        <div class="breadcumb-container ml-5">
            <NuxtLink to="/">Dashboard</NuxtLink>
            <span class="mx-1">/</span>
        </div>
        <v-menu offset-y light>
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    elevation="0"
                    color="transparent"
                    class="px-0"
                    depressed
                    v-on="on"
                >
                    <span>{{ name }}</span>
                    <v-icon class="ml-1" small color="white">
                        mdi-menu-down
                    </v-icon>
                </v-btn>
            </template>
            <v-card class="mx-auto" width="300" tile>
                <v-list>
                    <v-list-item-group v-model="selectedItem">
                        <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            @click.stop="item.action"
                        >
                            <v-list-item-icon>
                                <v-icon v-text="item.icon" small></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title
                                    v-text="item.title"
                                ></v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-menu>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class ItemSettingsSelector extends Vue {
    selectedItem: number = 0;

    deleteCollection() {
        this.$nuxt.$emit('delete-collection');
    }

    items: any = [
        // { title: 'Collection Settings', icon: 'mdi-hammer-wrench' },
        {
            title: 'Delete Collection',
            icon: 'mdi-delete',
            action: this.deleteCollection,
        },
    ];

    name: string = '';

    created() {
        this.$nuxt.$on('set-object-name', (objectName: string) => {
            this.name = objectName;
        });
    }
}
</script>

<style lang="scss" scoped>
.item-setting-selector {
    width: 100%;
    display: inline;
    .breadcumb-container {
        display: inline;
        a {
            text-decoration: none;
            color: #ff00a1;
            font-size: 1em;
        }

        a:hover {
            text-decoration: underline;
        }
    }
}

.theme--dark.v-btn:hover::before {
    opacity: 0 !important;
}
</style>

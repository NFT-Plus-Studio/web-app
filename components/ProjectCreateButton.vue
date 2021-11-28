<template>
    <div>
        <v-menu offset-y light>
            <template #activator="{ on, attrs }">
                <v-btn id="create-button" class="py-5" v-bind="attrs" v-on="on">
                    Create
                    <v-icon right small color="white"> mdi-menu-down </v-icon>
                </v-btn>
            </template>
            <v-card class="mx-auto" width="300" tile>
                <v-list class="px-20">
                    <v-list-item-group v-model="selectedItem">
                        <v-list-item
                            v-for="(item, index) in items"
                            :key="index"
                            @click="item.action"
                        >
                            <v-list-item-icon>
                                <v-icon small v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>{{
                                    item.title
                                }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-menu>
        <CreateCollectionModal
            :show-modal.sync="showCreateCollectionModalFlag"
            @collection-created="onCollectionCreated"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Emit } from 'vue-property-decorator';

@Component
export default class ProjectCreateButton extends Vue {
    selectedItem = 0;
    showCreateCollectionModalFlag: boolean = false;

    showCreateCollectionModal() {
        this.showCreateCollectionModalFlag = true;
    }

    items = [
        {
            title: 'Collection',
            icon: 'mdi-image-multiple',
            action: this.showCreateCollectionModal,
        },
    ];

    onCollectionCreated(collection: any) {
        this.collectionCreated(collection);
    }

    @Emit()
    collectionCreated(_collection: any) {}
}
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

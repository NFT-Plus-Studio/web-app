<template>
    <div>
        <div id="dashboard-header-container" class="mb-5">
            <h1 class="text-h5">Dashboard</h1>
            <ProjectCreateButton
                @collection-created="handleCollectionCreated"
            />
        </div>
        <div v-if="items.length > 0" class="d-flex flex-wrap">
            <ProjectItem
                v-for="(service, index) in items"
                :id="service.id"
                :key="index"
                :name="service.name"
                :preview-image="service.animatedPreviewBase64"
                :type="service.type"
                :has-generated="service.hasGenerated"
                class="mb-3 mr-3"
            />
        </div>
        <v-img
            v-if="items.length == 0"
            id="empty-convo-placeholder"
            max-height="479"
            contain
            :src="require('../assets/images/empty-convo-placeholder.svg')"
        ></v-img>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
// import axios from '~/plugins/axios';

@Component
export default class DashboardPage extends Vue {
    items: any[] = [];

    mounted() {
        this.items = this.services;
    }

    get services() {
        const selectedProject = this.$storage.project.selectedProject;
        if (selectedProject.index === -1) {
            return [];
        }
        return selectedProject.data.services || [];
    }

    handleCollectionCreated(collection: any) {
        this.items.push(collection);
    }
}
</script>

<style lang="scss" scoped>
#dashboard-header-container {
    display: flex;
    justify-content: space-between;
}

#empty-convo-placeholder {
    position: absolute;
    bottom: 0;
    left: 40%;
}
</style>

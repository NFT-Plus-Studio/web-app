<template>
    <div>
        <div id="dashboard-header-container" class="mb-5">
            <h1 class="text-h5">Dashboard</h1>
            <ProjectCreateButton />
        </div>
        <div v-if="services.length > 0" class="d-flex flex-wrap">
            <ProjectItem
                v-for="(service, index) in services"
                :id="service.id"
                :key="index"
                :name="service.name"
                :preview-image="service.animatedPreviewBase64"
                :type="service.type"
                :has-generated="service.hasGenerated"
                class="mr-3"
            />
        </div>
        <v-img
            v-if="services.length == 0"
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
import _ from 'underscore';

@Component
export default class DashboardPage extends Vue {
    get services() {
        const selectedProject = this.$storage.project.selectedProject;
        if (selectedProject.index === -1) {
            return [];
        }
        return selectedProject.data.services || [];
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

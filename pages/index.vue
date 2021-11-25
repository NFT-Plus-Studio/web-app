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
import axios from '~/plugins/axios';
import _ from 'underscore';

@Component
export default class DashboardPage extends Vue {
    async created() {
        this.$store.commit('loadFromLocalStorage');

        if (this.$store.state.projects.length === 0) {
            try {
                const response = await axios.get('/uuid');
                const uuid = response.data.data;
                // TODO: create a definition some where
                const defaultProject = {
                    id: uuid,
                    name: 'Default',
                    services: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                this.$store.commit('addProject', defaultProject);
            } catch (err) {
                // TODO: show toast message or something
                console.log('Error creating default project', err);
            }
        }
    }

    get services() {
        const selectedProjectIndex = _.findIndex(
            this.$store.state.projects,
            (project) => project.id === this.$store.state.selectedProjectId
        );
        console.log(
            'Services',
            this.$store.state.projects[selectedProjectIndex].services
        );
        return this.$store.state.projects[selectedProjectIndex].services || [];
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

<template>
    <v-dialog v-model="showModal" width="568">
        <v-card light>
            <v-app-bar flat color="rgba(255, 255, 255, 0)">
                <v-toolbar-title class="text-h6 pl-0"> Create </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn color="black" icon @click.stop="showModal = false">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-app-bar>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

type ProjectType = 'collection' | 'smart_contract';

@Component
export default class CreateProjectModal extends Vue {
    showModal: boolean = false;
    projectType: ProjectType = 'collection';

    created() {
        this.$root.$on('open-create-project-modal', this.openModal);
    }

    openModal(type: ProjectType) {
        this.projectType = type;
        this.reset();
    }

    reset() {
        this.showModal = true;
    }
}
</script>

<style></style>

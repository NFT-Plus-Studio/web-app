import _ from 'underscore';
import { Plugin } from '@nuxt/types';

const localStoragePrefix = process.env.NUXT_ENV_STORAGE_PREFIX;

const LocalStorageKeys = {
    PROJECTS: `${localStoragePrefix}_projects`,
    SELECTED_PROJECT_ID: `${localStoragePrefix}_selected-project-id`,
    SELECT_PROJECT_INDEX: `${localStoragePrefix}_selected-project-index`,
};

const projectOperations = {
    get allProjects(): any[] {
        const localStorageData = localStorage.getItem(
            LocalStorageKeys.PROJECTS
        );
        if (localStorageData) {
            const projects: any[] = JSON.parse(localStorageData) as any[];
            return projects;
        }

        return [];
    },
    get selectedProject() {
        const selectedProjectId = localStorage.getItem(
            LocalStorageKeys.SELECTED_PROJECT_ID
        );

        const index = _.findIndex(
            this.allProjects,
            (project) => project.id === selectedProjectId
        );

        return {
            index,
            data: index !== -1 ? this.allProjects[index] : null,
        };
    },
    add(project: any) {
        const projects = this.allProjects;
        projects.push(project);
        this.saveEverything(projects);
        this.selectProject(project.id);
    },
    selectProject(projectId: string) {
        localStorage.setItem(LocalStorageKeys.SELECTED_PROJECT_ID, projectId);
    },
    addService(service: any) {
        const allProjects = this.allProjects;
        const selectedProject = this.selectedProject;
        allProjects[selectedProject.index].services.push(service);
        this.saveEverything(allProjects);
    },
    saveEverything(allProjects: any[]) {
        localStorage.setItem(
            LocalStorageKeys.PROJECTS,
            JSON.stringify(allProjects)
        );
    },
};

const collectionOperations = {
    getCollection(collectionId: string) {
        const selectedProject = projectOperations.selectedProject;
        const index = _.findIndex(
            selectedProject.data.services,
            (service) => service.id === collectionId
        );

        return {
            index,
            data: index !== -1 ? selectedProject.data.services[index] : null,
        };
    },
    addLayer(collectionId: string, layer: any) {
        const collection = this.getCollection(collectionId);
        if (collection.index === -1) {
            return;
        }

        const newLayer = JSON.parse(JSON.stringify(layer));
        delete newLayer.selected;

        const allProjects = projectOperations.allProjects;
        const selectedProject = projectOperations.selectedProject;
        allProjects[selectedProject.index].services[
            collection.index
        ].metadata.layers.push(newLayer);
        projectOperations.saveEverything(allProjects);
    },

    addElement({ collectionId, layerIndex, element }: any) {
        const collection = this.getCollection(collectionId);
        if (collection.index === -1) {
            return;
        }

        const newElement = JSON.parse(JSON.stringify(element));

        // delete fields we don't need
        delete newElement.selected;
        delete newElement.image;
        delete newElement.file;
        delete newElement.selected;

        newElement.fileBase64 = newElement.base64Image;

        // delete base64Image field
        delete newElement.base64Image;

        const allProjects = projectOperations.allProjects;
        const selectedProject = projectOperations.selectedProject;
        allProjects[selectedProject.index].services[
            collection.index
        ].metadata.layers[layerIndex].elements.push(newElement);
        projectOperations.saveEverything(allProjects);
    },

    reorderElement({ collectionId, moveFromIndex, moveToIndex }: any) {
        const collection = this.getCollection(collectionId);
        if (collection.index === -1) {
            return;
        }

        const allProjects = projectOperations.allProjects;
        const selectedProject = projectOperations.selectedProject;
        const itemToAdd = allProjects[selectedProject.index].services[
            collection.index
        ].metadata.layers.splice(moveFromIndex, 1)[0];

        allProjects[selectedProject.index].services[
            collection.index
        ].metadata.layers.splice(moveToIndex, 0, itemToAdd);

        projectOperations.saveEverything(allProjects);
    },
    deleteLayer({ collectionId, layerIndex }: any) {
        const collection = this.getCollection(collectionId);
        if (collection.index === -1) {
            return;
        }

        const allProjects = projectOperations.allProjects;
        const selectedProject = projectOperations.selectedProject;

        // remove layer
        allProjects[selectedProject.index].services[
            collection.index
        ].metadata.layers.splice(layerIndex, 1);

        // save everything
        projectOperations.saveEverything(allProjects);
    },
    deleteElement({ collectionId, layerIndex, elementIndex }: any) {
        const collection = this.getCollection(collectionId);
        if (collection.index === -1) {
            return;
        }

        const allProjects = projectOperations.allProjects;
        const selectedProject = projectOperations.selectedProject;

        // remove element
        allProjects[selectedProject.index].services[
            collection.index
        ].metadata.layers[layerIndex].elements.splice(elementIndex, 1);

        projectOperations.saveEverything(allProjects);
    },
    update({ collectionId, dataToUpdate }: any) {
        const collection = this.getCollection(collectionId);
        console.log('Upadte Collection: ', collection);
        if (collection.index === -1) {
            return;
        }

        const allProjects = projectOperations.allProjects;
        const selectedProject = projectOperations.selectedProject;

        for (const key of Object.keys(dataToUpdate)) {
            const hasKey = _.has(
                allProjects[selectedProject.index].services[collection.index],
                key
            );

            if (hasKey) {
                allProjects[selectedProject.index].services[collection.index][
                    key
                ] = dataToUpdate[key];
            }
        }

        // save to local storage
        projectOperations.saveEverything(allProjects);
    },
};

interface Storage {
    project: any;
    collection: any;
}

declare module 'vue/types/vue' {
    interface Vue {
        $storage: Storage;
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$storage inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $storage: Storage;
    }
    // nuxtContext.$storage
    interface Context {
        $storage: Storage;
    }
}

const storagePlugin: Plugin = (_context, inject) => {
    inject('storage', {
        project: projectOperations,
        collection: collectionOperations,
    });
};

export default storagePlugin;

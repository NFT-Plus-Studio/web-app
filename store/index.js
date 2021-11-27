import _ from 'underscore';
const localStoragePrefix = process.env.NUXT_ENV_STORAGE_PREFIX;

const LocalStorageKeys = {
    PROJECTS: `${localStoragePrefix}_projects`,
    SELECTED_PROJECT_ID: `${localStoragePrefix}_selected-project-id`,
    SELECT_PROJECT_INDEX: `${localStoragePrefix}_selected-project-index`,
};

export const state = () => ({
    projects: [],
    selectedProjectId: null,
    selectedProjectIndex: 0,
});

const saveProjectState = (projects) => {
    localStorage.setItem(LocalStorageKeys.PROJECTS, JSON.stringify(projects));
};

const findSelectedProjectIndex = (id, projects) => {
    return _.findIndex(projects, (project) => project.id === id);
};

const findServiceIndex = (id, services) => {
    return _.findIndex(services, (service) => service.id === id);
};

const saveSelectedProject = (projectId, index) => {
    localStorage.setItem(LocalStorageKeys.SELECTED_PROJECT_ID, projectId);
    localStorage.setItem(LocalStorageKeys.SELECTED_PROJECT_INDEX, index);
};

export const mutations = {
    LOAD_FROM_LOCAL_STORAGE(state) {
        let localStorageData = localStorage.getItem(LocalStorageKeys.PROJECTS);
        const selectedProjectId = localStorage.getItem(
            LocalStorageKeys.SELECTED_PROJECT_ID
        );

        if (localStorageData) {
            localStorageData = JSON.parse(localStorageData);
            state.projects = localStorageData;
        }

        state.selectedProjectId = selectedProjectId;
        const selectedProjectIndex = findSelectedProjectIndex(
            selectedProjectId,
            state.projects
        );
        state.selectedProjectIndex = selectedProjectIndex;
    },

    addProject(state, project) {
        state.projects.push(project);
        state.selectedProjectId = project.id;

        saveProjectState(state.projects);
        saveSelectedProject(project.id, state.projects.length - 1);
    },

    selectProject(state, projectId) {
        state.selectedProjectId = projectId;
        state.selectedProjectIndex = findSelectedProjectIndex(
            projectId,
            state.projects
        );
    },
    createService(state, service) {
        state.projects[state.selectedProjectIndex].services.push(service);
        saveProjectState(state.projects);
    },

    ADD_LAYER(state, { collectionId, layer }) {
        const serviceIndex = findServiceIndex(
            collectionId,
            state.projects[state.selectedProjectIndex].services
        );

        if (serviceIndex === -1) {
            return;
        }

        const newLayer = JSON.parse(JSON.stringify(layer));
        delete newLayer.selected;
        state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].metadata.layers.push(newLayer);

        saveProjectState(state.projects);
    },

    ADD_ELEMENT(state, { collectionId, layerIndex, element }) {
        const serviceIndex = findServiceIndex(
            collectionId,
            state.projects[state.selectedProjectIndex].services
        );

        if (serviceIndex === -1) {
            return;
        }

        const newElement = JSON.parse(JSON.stringify(element));

        // delete fields we don't need
        delete element.selected;
        delete element.image;
        delete element.file;
        delete element.selected;

        newElement.fileBase64 = newElement.base64Image;

        // delete base64Image field
        delete newElement.base64Image;

        state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].metadata.layers[layerIndex].elements.push(newElement);

        // save the project state to local storage.
        saveProjectState(state.projects);
    },

    DELETE_LAYER(state, { collectionId, layerIndex }) {
        const serviceIndex = findServiceIndex(
            collectionId,
            state.projects[state.selectedProjectIndex].services
        );

        state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].metadata.layers.splice(layerIndex, 1);

        // save the project state to local storage.
        saveProjectState(state.projects);
    },

    DELETE_TRAIT(state, { collectionId, layerIndex, elementIndex }) {
        const serviceIndex = findServiceIndex(
            collectionId,
            state.projects[state.selectedProjectIndex].services
        );

        if (serviceIndex === -1) {
            return;
        }

        state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].metadata.layers[layerIndex].elements.splice(elementIndex, 1);

        // save the project state to local storage.
        saveProjectState(state.projects);
    },

    REORDER_LAYER(state, { collectionId, moveFromIndex, moveToIndex }) {
        const serviceIndex = findServiceIndex(
            collectionId,
            state.projects[state.selectedProjectIndex].services
        );

        if (serviceIndex === -1) {
            return;
        }

        const itemToAdd = state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].metadata.layers.splice(moveFromIndex, 1)[0];

        state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].metadata.layers.splice(moveToIndex, 0, itemToAdd);

        // save the project state to local storage.
        saveProjectState(state.projects);
    },

    SET_COLLECTION_ANIMATED_PREVIEW(
        state,
        { collectionId, animatedPreviewBase64 }
    ) {
        const serviceIndex = findServiceIndex(
            collectionId,
            state.projects[state.selectedProjectIndex].services
        );

        if (serviceIndex === -1) {
            return;
        }

        state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].animatedPreviewBase64 = animatedPreviewBase64;

        state.projects[state.selectedProjectIndex].services[
            serviceIndex
        ].updatedAt = Date.now();

        // save the project state to local storage.
        saveProjectState(state.projects);
    },
};

export const actions = {};

import _ from 'underscore';
const localStoragePrefix = process.env.NUXT_ENV_STORAGE_PREFIX;

const LocalStorageKeys = {
    PROJECTS: `${localStoragePrefix}_projects`,
    SELECTED_PROJECT_ID: `${localStoragePrefix}_selected-project-id`,
};

export const state = () => ({
    projects: [],
    selectedProjectId: null,
});

const saveProjectState = (projects) => {
    localStorage.setItem(LocalStorageKeys.PROJECTS, JSON.stringify(projects));
};

const saveSelectedProjectId = (projectId) => {
    localStorage.setItem(LocalStorageKeys.SELECTED_PROJECT_ID, projectId);
};

export const mutations = {
    loadFromLocalStorage(state) {
        let localStorageData = localStorage.getItem(LocalStorageKeys.PROJECTS);
        const selectedProjectId = localStorage.getItem(
            LocalStorageKeys.SELECTED_PROJECT_ID
        );

        if (localStorageData) {
            localStorageData = JSON.parse(localStorageData);
            state.projects = localStorageData;
        }

        state.selectedProjectId = selectedProjectId;
    },
    addProject(state, project) {
        state.projects.push(project);
        state.selectedProjectId = project.id;

        saveProjectState(state.projects);
        saveSelectedProjectId(project.id);
    },

    selectProject(state, projectId) {
        state.selectedProjectId = projectId;
    },

    createService(state, service) {
        console.log('Selected project id: ', state.selectedProjectId);
        console.log('Projects: ', state.projects);
        const selectedProjectIndex = _.findIndex(
            state.projects,
            (project) => project.id === state.selectedProjectId
        );
        console.log('Selected Project Index: ', selectedProjectIndex);
        console.log('Project Selected: ', state.projects[selectedProjectIndex]);
        state.projects[selectedProjectIndex].services.push(service);
        saveProjectState(state.projects);
    },
};

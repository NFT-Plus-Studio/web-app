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
        const selectedProjectIndex = _.findIndex(
            state.projects,
            (project) => project.id === state.selectedProjectId
        );
        state.projects[selectedProjectIndex].services.push(service);
        saveProjectState(state.projects);
    },
};

export const actions = {};

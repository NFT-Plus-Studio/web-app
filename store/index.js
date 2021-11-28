import _ from 'underscore';

export const state = () => ({
    project: {
        id: null,
        name: '',
    },
    objects: [],
});

export const mutations = {
    // SET_COLLECTION_ANIMATED_PREVIEW(
    //     state,
    //     { collectionId, animatedPreviewBase64 }
    // ) {
    //     const serviceIndex = findServiceIndex(
    //         collectionId,
    //         state.projects[state.selectedProjectIndex].services
    //     );
    //     if (serviceIndex === -1) {
    //         return;
    //     }
    //     state.projects[state.selectedProjectIndex].services[
    //         serviceIndex
    //     ].animatedPreviewBase64 = animatedPreviewBase64;
    //     state.projects[state.selectedProjectIndex].services[
    //         serviceIndex
    //     ].updatedAt = Date.now();
    //     // save the project state to local storage.
    //     saveProjectState(state.projects);
    // },
};

export const actions = {};

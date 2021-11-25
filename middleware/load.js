import axios from '~/plugins/axios';

export default function ({ store }) {
    store.commit('loadFromLocalStorage');
    if (store.state.projects.length === 0) {
        axios
            .get('/uuid')
            .then((response) => {
                const uuid = response.data.data;
                // TODO: create a definition some where
                const defaultProject = {
                    id: uuid,
                    name: 'Default',
                    services: [],
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                };
                store.commit('addProject', defaultProject);
            })
            .catch((err) => {
                console.log('Error getting uuid: ', err);
            });
    }
}

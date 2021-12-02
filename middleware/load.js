import axios from '~/plugins/axios';

export default function ({ $storage, $gtag }) {
    const projects = $storage.project.allProjects;
    if (projects.length === 0) {
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
                $storage.project.add(defaultProject);
                $gtag.event('new_user');
            })
            .catch((err) => {
                $gtag.event('creating_default_project_error', {
                    error: err.message || err,
                });
                console.log('Error getting uuid: ', err);
            });
    }
}

module.exports = {
    apps: [
        {
            name: 'web-app',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'PORT=8000 start',
        },
    ],
};

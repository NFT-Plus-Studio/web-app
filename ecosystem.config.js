module.exports = {
    apps: [
        {
            name: 'web-app',
            exec_mode: 'cluster',
            instances: 1, // Or a number of instances
            script: './node_modules/nuxt/bin/nuxt.js',
            args: 'start',
            env: {
                PORT: 8080,
            },
        },
    ],
};

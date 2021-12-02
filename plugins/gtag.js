import Vue from 'vue';
import VueGtag from 'vue-gtag';

export default (context, inject) => {
    Vue.use(
        VueGtag,
        {
            config: { id: process.env.NUXT_ENV_GOOGLE_ANALYTICS_TRACKING_ID },
            appName: 'NFT+ Studio App',
            pageTrackerScreenviewEnabled: true,
        },
        context.app.router
    );

    context.$gtag = Vue.$gtag;
    inject('gtag', Vue.$gtag);
};

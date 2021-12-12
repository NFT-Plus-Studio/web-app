import { Plugin } from '@nuxt/types';
const Web3 = require('web3');

interface NFTStudioWeb3Props {
    connect(store: any): Promise<boolean>;
    disconnect(store: any): void;
}

declare module 'vue/types/vue' {
    interface Vue {
        $web3: NFTStudioWeb3Props;
    }
}

declare module '@nuxt/types' {
    // nuxtContext.app.$storage inside asyncData, fetch, plugins, middleware, nuxtServerInit
    interface NuxtAppOptions {
        $web3: NFTStudioWeb3Props;
    }
    // nuxtContext.$storage
    interface Context {
        $web3: NFTStudioWeb3Props;
    }
}

const NFTStudioWeb3: NFTStudioWeb3Props = {
    connect: async (store: any): Promise<boolean> => {
        const ethereum = (<any>window).ethereum;
        if (ethereum) {
            console.log('Is connected: ', ethereum.isConnected());
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });
                console.log('ACCOUNTS:  ', accounts);
                store.commit('wallet/setAddress', accounts[0]);
            } catch (error: any) {
                if (error.code === 4001) {
                    // User rejected request
                    console.log('User rejected request');
                    return false;
                }
            }

            (<any>window).web3 = new Web3(ethereum);
            return true;
        }

        alert('You do not have MetaMask installed.');
        return false;
    },
    disconnect(store: any) {
        store.commit('wallet/setAddress', null);
    },
};

const web3Plugin: Plugin = (_context, inject) => {
    NFTStudioWeb3.connect(_context.store);
    inject('web3', NFTStudioWeb3);
};

export default web3Plugin;

import { Plugin } from '@nuxt/types';
import { DEFAULT_CHAIN_ID, VAULT_WALLET_ADDRESS } from '@/constants/blockchain';
import { switchToPaymentNetwork } from '@/helpers/switchNetwork';
const Web3 = require('web3');

interface NFTStudioWeb3Props {
    connect(showAlertIfError: boolean): Promise<boolean>;
    disconnect(): void;
    checkWrongPaymentNetwork(): Promise<boolean>;
    createDefaultChainPayment(amount: number): Promise<string>;
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

class NFTStudioWeb3 implements NFTStudioWeb3Props {
    _store: any;
    constructor(store: any) {
        this._store = store;
    }

    subscribeListeners() {
        const handleChainChanged = (chainId: string) => {
            this._store.commit('wallet/setProviderChainId', Number(chainId));
        };

        const handleAccountsChanged = (accounts: Array<string>) => {
            if (accounts.length > 0) {
                this._store.commit('wallet/setAddress', accounts[0]);
            }
        };
        (<any>window).ethereum.on('chainChanged', handleChainChanged);

        (<any>window).ethereum.on('accountsChanged', handleAccountsChanged);

        (<any>window).addEventListener('unload', () => {
            (<any>window).ethereum.removeListener(
                'accountsChanged',
                handleAccountsChanged
            );
            (<any>window).ethereum.removeListener(
                'chainChanged',
                handleChainChanged
            );
        });
    }

    async connect(showAlertIfError = true): Promise<boolean> {
        const ethereum = (<any>window).ethereum;
        if (ethereum) {
            const connectedProvider = new Web3(ethereum);
            this.subscribeListeners();
            try {
                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                });

                const chainId = await connectedProvider.eth.getChainId();

                this._store.commit('wallet/setAddress', accounts[0]);
                this._store.commit('wallet/setProviderChainId', chainId);
                this._store.commit('wallet/setConnected', true);
                (<any>window).web3 = connectedProvider;
            } catch (error: any) {
                if (error.code === 4001) {
                    // User rejected request
                    return false;
                }
            }

            return true;
        }

        // if no window.ethereum then MetaMask is not installed
        if (showAlertIfError) {
            alert(
                'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
            );
        }
        return false;
    }

    disconnect(): void {
        this._store.commit('wallet/setAddress', null);
    }

    async checkWrongPaymentNetwork(): Promise<boolean> {
        if (this._store.state.wallet.providerChainId !== DEFAULT_CHAIN_ID) {
            const shouldSwitch = (<any>window).confirm(
                'Switch to Binance Smart Chain network?'
            );
            if (shouldSwitch) {
                const result = await switchToPaymentNetwork();
                return !result;
            }

            return true;
        }
        return false;
    }

    async createDefaultChainPayment(amount: number): Promise<string> {
        const wrongNetwork = await this.checkWrongPaymentNetwork();
        if (wrongNetwork) {
            throw new Error(
                'Wrong network! Please switch to the Binance Smart Chain network'
            );
        }

        try {
            const txReceipt = await (<any>window).web3.eth.sendTransaction({
                from: this._store.state.wallet.address,
                to: VAULT_WALLET_ADDRESS,
                value: (<any>window).web3.utils.toWei(
                    amount.toString(),
                    'ether'
                ),
            });
            return txReceipt.transactionHash;
        } catch (error) {
            console.log('Error sending tx: ', error);
            throw new Error(
                'Something went wrong. Unable to complete transaction'
            );
        }
    }
}

const web3Plugin: Plugin = (_context, inject) => {
    const web3 = new NFTStudioWeb3(_context.store);
    web3.connect(false);

    inject('web3', web3);
};

export default web3Plugin;

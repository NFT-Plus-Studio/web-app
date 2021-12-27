export const state = () => ({
    connected: false,
    address: null,
    providerChainId: null,
});

export const mutations = {
    setAddress(state, address) {
        state.address = address;
    },
    setProviderChainId(state, chainId) {
        state.providerChainId = chainId;
    },
    setConnected(state, connected) {
        state.connected = connected;
    },
};

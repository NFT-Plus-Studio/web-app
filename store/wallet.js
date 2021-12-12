export const state = () => ({
    address: null,
});

export const mutations = {
    setAddress(state, address) {
        state.address = address;
    },
};

<template>
    <div class="d-flex">
        <v-btn
            v-if="!walletAddress"
            id="connect-wallet-btn"
            class="py-5"
            @click.stop="connectWallet"
            >Connect Wallet
        </v-btn>
        <div v-else>
            <span id="wallet-address" class="mr-4">{{ truncatedAddress }}</span>
            <v-btn
                id="disconnect-wallet-btn"
                class="py-5"
                @click.stop="disconnectWallet"
                >Disconnect</v-btn
            >
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component
export default class WalletConnectionButton extends Vue {
    get truncatedAddress() {
        return `${this.walletAddress.substr(
            0,
            6
        )}...${this.walletAddress.substr(this.walletAddress.length - 6, 6)}`;
    }

    get walletAddress() {
        return this.$store.state.wallet.address;
    }

    connectWallet() {
        this.$web3.connect(this.$store);
    }

    disconnectWallet() {
        this.$web3.disconnect(this.$store);
    }
}
</script>

<style lang="scss" scoped>
#wallet-address {
    line-height: 183.4%;
    letter-spacing: 0.05em;
}
#connect-wallet-btn {
    background: linear-gradient(
        105.14deg,
        #00bcdd 10.39%,
        rgba(255, 0, 255, 0.88) 98.63%
    );
    box-shadow: -3.7254px 4.40275px 1.35469px #21a4e2;
}
#disconnect-wallet-btn {
    // filter: drop-shadow(-3.7254px 4.40275px 1.35469px #21a4e2);
    box-shadow: -3.7254px 4.40275px 1.35469px #21a4e2;
    background: transparent !important;
    border: 1px solid #00bcdd;
}
</style>

interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
}

type Networks = 'testnet' | 'mainnet';
type SupportedChains = 'binance';

type WalletNetworkProviders = {
    [key in Networks]: {
        [key in SupportedChains]: AddEthereumChainParameter;
    };
};

export const DEFAULT_CHAIN_NAME: SupportedChains = 'binance';
export const DEFAULT_NETWORK: Networks =
    <any>process.env.NUXT_ENV_WALLET_PROVIDER_NETWORK || 'testnet';

export const DEFAULT_CHAIN_ID = DEFAULT_NETWORK === 'mainnet' ? 56 : 97;

export const VAULT_WALLET_ADDRESS = process.env.NUXT_ENV_VAULT_WALLET_ADDRESS;

export const walletNetworkProviders: WalletNetworkProviders = {
    mainnet: {
        binance: {
            chainId: '0x38', // A 0x-prefixed hexadecimal string
            chainName: 'Smart Chain',
            nativeCurrency: {
                name: 'Binance',
                symbol: 'BNB', // 2-6 characters long
                decimals: 18,
            },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com'],
        },
    },
    testnet: {
        binance: {
            chainId: '0x61', // A 0x-prefixed hexadecimal string
            chainName: 'Smart Chain - Testnet',
            nativeCurrency: {
                name: 'Binance',
                symbol: 'BNB', // 2-6 characters long
                decimals: 18,
            },
            rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
            blockExplorerUrls: ['https://testnet.bscscan.com'],
        },
    },
};

export const DEFAULT_CHAIN_PARAMS =
    walletNetworkProviders[DEFAULT_NETWORK][DEFAULT_CHAIN_NAME];

import { DEFAULT_CHAIN_PARAMS } from '@/constants/blockchain';

const switchRequest = () => {
    return (<any>window).ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: DEFAULT_CHAIN_PARAMS.chainId }],
    });
};

const addChainRequest = () => {
    return (<any>window).ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [DEFAULT_CHAIN_PARAMS],
    });
};

export const switchToPaymentNetwork = async (): Promise<boolean> => {
    if ((<any>window).ethereum) {
        try {
            await switchRequest();
            return true;
        } catch (error: any) {
            console.log('Error switching network: ', error);
            if (error.code === 4902) {
                try {
                    await addChainRequest();
                    await switchRequest();
                    return true;
                } catch (addError) {
                    console.log(addError);
                }
                console.log(error);
            }
        }
    } else {
        // if no window.ethereum then MetaMask is not installed
        alert(
            'MetaMask is not installed. Please consider installing it: https://metamask.io/download.html'
        );
    }

    return false;
};

import { useCallback } from 'react'
import { useWeb3React, UnsupportedChainIdError } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { connectorLocalStorageKey, ConnectorNames } from '@pancakeswap-libs/uikit'
import useToast from 'hooks/useToast'
import { connectorsByName } from 'connectors'

const useAuth = () => {
  const { activate, deactivate } = useWeb3React()
  const { toastError } = useToast()

  const login = useCallback((connectorID: ConnectorNames) => {
    const connector = connectorsByName[connectorID]
    if (connector) {
      activate(connector, async (error: Error) => {
        window.localStorage.removeItem(connectorLocalStorageKey)
        if (error instanceof UnsupportedChainIdError) {
          // toastError('Unsupported Chain Id', 'Unsupported Chain Id Error. Check your chain Id.')
          const chainId = await (window.ethereum as any).request({ method: 'eth_chainId' })
          const binanceTestChainId = '0x61'
          if (chainId === binanceTestChainId) {
            console.log('123')
          } else {
            try {
              await (window.ethereum as any).request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: binanceTestChainId }],
              })
              console.log('You have succefully switched to Rinkeby Test network')
            } catch (switchError: any) {
              if (switchError.code === 4902) {
                try {
                  await (window.ethereum as any).request({
                    method: 'wallet_addEthereumChain',
                    params: [
                      {
                        chainId: '0x4',
                        chainName: 'Rinkeby - Testnet',
                        nativeCurrency: {
                          name: 'Rinkeby',
                          symbol: 'RIN',
                          decimals: 18,
                        },
                        blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
                        rpcUrls: ['https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4/'],
                      },
                    ],
                  })
                } catch (addError) {
                  console.error(addError)
                }
              }
              console.log('Failed to switch to the network')
            }
          }
        } else if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
          toastError('Provider Error', 'No provider was found')
        } else if (
          error instanceof UserRejectedRequestErrorInjected ||
          error instanceof UserRejectedRequestErrorWalletConnect
        ) {
          if (connector instanceof WalletConnectConnector) {
            const walletConnector = connector as WalletConnectConnector
            walletConnector.walletConnectProvider = null
          }
          toastError('Authorization Error', 'Please authorize to access your account')
        } else {
          toastError(error.name, error.message)
        }
      })
    } else {
      toastError("Can't find connector", 'The connector config is wrong')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { login, logout: deactivate }
}

export default useAuth

import { useCallback } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { NoBscProviderError } from '@binance-chain/bsc-connector'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'
import { ConnectorNames, ConnectorLocalStorageKey } from 'config'
import { createConnecter } from 'utils/web3React'
import { setupNetwork } from 'utils/wallet'
import useToast from 'hooks/useToast'
import { useAppDispatch } from 'state'
import { clearUserStates } from 'utils/clearUserStates'

const useAuth = () => {
  const dispatch = useAppDispatch()
  const { chainId, activate, deactivate } = useWeb3React()
  const { toastError } = useToast()

  const login = useCallback(
    (network: string, connectorID: ConnectorNames) => {
      const connector = createConnecter(network, connectorID)
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork(network)
            if (hasSetup) {
              activate(connector)
            }
          } else {
            window.localStorage.removeItem(ConnectorLocalStorageKey)
            if (error instanceof NoEthereumProviderError || error instanceof NoBscProviderError) {
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
          }
        })
      } else {
        toastError('Unable to find connector', 'The connector config is wrong')
      }
    },
    [activate],
  )

  const logout = useCallback(() => {
    deactivate()
    clearUserStates(dispatch, chainId)
  }, [deactivate, dispatch, chainId])

  return { login, logout }
}

export default useAuth

import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { ConnectorNames } from 'config'
import { ethers } from 'ethers'
import { getChainId, getNodeUrl } from './wallet'

export const createConnecter = (network: string, connectorName: string) => {
  const rpcUrl = getNodeUrl(network)
  const chainId = getChainId(network)

  switch (connectorName) {
    case ConnectorNames.Injected:
      return new InjectedConnector({ supportedChainIds: [chainId] })

    case ConnectorNames.WalletConnect:
      return new WalletConnectConnector({
        rpc: { [chainId]: rpcUrl },
        qrcode: true,
      })

    case ConnectorNames.BSC:
      return new BscConnector({ supportedChainIds: [chainId] })
  }
}

const POLLING_INTERVAL = 12000

export const getLibrary = (provider): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider)
  library.pollingInterval = POLLING_INTERVAL
  return library
}

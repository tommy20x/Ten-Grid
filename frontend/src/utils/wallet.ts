import sample from 'lodash/sample'
import { BASE_URL } from 'config'

if (process.env.NODE_ENV !== 'production') {
  if (!process.env.REACT_APP_BSC_NODE_1 || !process.env.REACT_APP_BSC_NODE_2 || !process.env.REACT_APP_BSC_NODE_3) {
    throw Error('One base RPC URL for BSC is undefined')
  }
  if (
    !process.env.REACT_APP_POLYGON_NODE_1 || 
    !process.env.REACT_APP_POLYGON_NODE_2 ||
    !process.env.REACT_APP_POLYGON_NODE_3
  ) {
    throw Error('One base RPC URL for Polygon is undefined')
  }
}

// Array of available nodes to connect to
const bsc_nodes = [
  process.env.REACT_APP_BSC_NODE_1,
  process.env.REACT_APP_BSC_NODE_2,
  process.env.REACT_APP_BSC_NODE_3
]

const polygon_nodes = [
  process.env.REACT_APP_POLYGON_NODE_1,
  process.env.REACT_APP_POLYGON_NODE_2,
  process.env.REACT_APP_POLYGON_NODE_3,
]

export const getNodes = (network: string) => {
  return network === 'polygon' ? polygon_nodes : bsc_nodes
}

export const getNodeUrl = (network: string) => {
  return sample(getNodes(network))
}

export const getChainId = (network: string) => {
  if (network === 'bsc') {
    return parseInt(process.env.REACT_APP_BSC_CHAIN_ID, 10)
  }
  else if (network === 'polygon') {
    return parseInt(process.env.REACT_APP_POLYGON_CHAIN_ID, 10)
  }
}

export const getNetworkParam = (network: string) => {
  const chainId = getChainId(network)
  const nodes = getNodes(network)

  if (network === 'bsc') {
    const scanUrl = process.env.REACT_APP_BSC_SCAN_URL
    return {
      chainName: 'Binance Smart Chain Mainnet',
      chainId: `0x${chainId.toString(16)}`,
      nativeCurrency: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
      },
      rpcUrls: nodes,
      blockExplorerUrls: [`${scanUrl}/`],
    }
  }
  else if (network === 'polygon') {
    const scanUrl = process.env.REACT_APP_POLYGON_SCAN_URL
    return {
      chainName: 'Polygon Mainnet',
      chainId: `0x${chainId.toString(16)}`,
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: nodes,
      blockExplorerUrls: [`${scanUrl}/`],
    }
  }

  return null;
}

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (network: string) => {
  const provider = window.ethereum
  if (provider) {
    const param = getNetworkParam(network)
    try {
      await provider.request({
        method: 'wallet_addEthereumChain',
        params: [ param ]
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error)
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @returns {boolean} true if the token has been added, false otherwise
 */
export const registerToken = async (tokenAddress: string, tokenSymbol: string, tokenDecimals: number) => {
  const tokenAdded = await window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address: tokenAddress,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        image: `${BASE_URL}/images/tokens/${tokenAddress}.png`,
      },
    },
  })

  return tokenAdded
}

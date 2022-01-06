import { useState, useEffect, useCallback } from 'react'
import Navbar from './components/Navbar'
import detectEthereumProvider from '@metamask/detect-provider'
import { ethers } from 'ethers'
import { ExternalProvider } from '@ethersproject/providers'
import StorageAbi from './truffle/abis/Storage.json'

const App = () => {
  const [account, setAccount] = useState([])
  const [contract, setContract] = useState<ethers.Contract>()

  const getProvider = async () => {
    try {
      const provider = await detectEthereumProvider() as ExternalProvider
      if (provider !== window.ethereum) console.error('Do you have multiple wallets installed?')
      return new ethers.providers.Web3Provider(provider)
    } catch (error) {
      alert('Please install MetaMask in order to use the dApp.')
      return null
    }
  }

  const getAccount = async () => {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    return accounts[0]
  }

  const getContract = useCallback(async (newProvider: ethers.providers.Web3Provider) => {
    const networkID: keyof typeof StorageAbi.networks = 
      await window.ethereum.request({ method: 'net_version' })
    const networkData = StorageAbi.networks[networkID]
    const signer = newProvider.getSigner()

    if(networkData) {
      const abi = StorageAbi.abi
      const address = networkData.address
      const contract = new ethers.Contract(address, abi, signer)
      return contract
    } else {
      alert('Contract not deployed to detected network')
    }
  }, [])

  useEffect(() => {
    const loadEthereum = async () => {
      const provider = await getProvider()
      if (provider) {
        const account = await getAccount()
        const contract = await getContract(provider)
        setAccount(account)
        setContract(contract)
      }
    }
    loadEthereum()
  }, [])

  return (
    <div>
      <h1>{account}</h1>
      <Navbar />
    </div>
  )
}

export default App
import { useState, useContext, useEffect } from 'react'
import Navbar from './components/Navbar'
import { ethers } from 'ethers'
import { Ethereum } from './context/EthereumContext'

const App = () => {
  const [inputNumber, setInputNumber] = useState(0)
  const [contractNumber, setContractNumber] = useState(0)
  const { contract } = useContext(Ethereum)
  
  const store = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const res = await contract.store(inputNumber)
    const receipt = await res.wait()
    if (receipt) {
      alert('Number updated!')
      setContractNumber(inputNumber)
    }
  }

  useEffect(() => {
    const loadNumber = async () => {
      const number = await contract?.retrieve()
      if(number) setContractNumber(number)
    }
    loadNumber()
  }, [contract])

  return (
    <div>
      <Navbar />
      <form 
        className='container mt-5'
        onSubmit={store}
      >
        <div className='form-group mb-3'>
          <label htmlFor='number-input'>Number</label>
          <input 
            type='number' 
            className='form-control' 
            placeholder='Enter a number'
            id='number-input'
            value={inputNumber}
            onChange={(e) => setInputNumber(parseInt(e.target.value))}
          />
        </div>
        <button 
          type='submit' 
          className='btn btn-primary mb-3'
        >
          Set Number
        </button>
      </form>
      <div className='container mt-5'>
        <h1>{ethers.utils.formatUnits(contractNumber, 0)}</h1>
      </div>
    </div>
  )
}

export default App
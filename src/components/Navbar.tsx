import { useContext } from 'react'
import { Ethereum } from '../context/EthereumContext'

const Navbar = () => {
  const { account } = useContext(Ethereum)
  return (
    <nav className='navbar navbar-dark bg-primary'>
      <div className='container-fluid'>
        <span className='navbar-brand mb-0 h1'>Simple dApp</span>
        <span className='navbar-brand mb-0 h1'>{account}</span>
      </div>
    </nav>
  )
}

export default Navbar
import { useState, useEffect } from 'react';
import { NFTStorage, File } from 'nft.storage'
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import axios from 'axios';

// Components
import Spinner from 'react-bootstrap/Spinner';
import Navigation from './components/Navigation';

// ABIs
import NFT from './abis/NFT.json'

// Config
import config from './config.json';

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log("Submitting... " + name + " " + description)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className='form'>
        <form onSubmit={submitHandler}>
          <input id='nameInput' type="text" placeholder='what do you create?' onChange={(event) => setName(event.target.value)}></input>
          <input id='descriptionInput' type ="text" placeholder='describe features!' onChange={(event) => setDescription(event.target.value)}></input>
          <input id='submitBotton' type = "submit" value="Generate & Mint!"></input>
        </form>
        <div className='image'>
          <img src='' alt='AI generated img' />
        </div>
      </div>
      <p>View&nbsp;<a href='' target='_blank' rel='noreferrer'>MetaData</a></p>
      
    </div>
  );
}

export default App;

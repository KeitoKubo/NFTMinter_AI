import { useState, useEffect } from "react";
import { NFTStorage, File } from "nft.storage"
import { Buffer } from "buffer";
import { ethers } from "ethers";
import axios from "axios"; // promise-based HTTP library to make requests to third-party server to fetch data.

// Components
import Spinner from "react-bootstrap/Spinner";
import Navigation from "./components/Navigation";

// ABIs
import NFT from "./abis/NFT.json"

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null)
  const [account, setAccount] = useState(null)

  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [image, setImage] = useState(null)

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    setProvider(provider)
  }

  const submitHandler = async (event) => {
    event.preventDefault()
    console.log("Submitting... " + name + " " + description)
    const generated_imgdata = createImage()
  }

  const createImage = async () => {
    console.log("Creating Image...")

    const API_URL = `https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2-1`
    // axios request config: https://axios-http.com/docs/req_config
    const response = await axios({
      url: API_URL,
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_HUGGING_FACE_API_KEY}`,
        Accept: "application/json",
        "Content-type": "application/json",
      },
      data: JSON.stringify({
        inputs: description, options: {wait_for_model: true},
      }),
      responseType: "arraybuffer",
    })

    const type = response.headers["Content-Type"]
    const data = response.data

    const encoded_data = Buffer.from(data).toString("base64")
    const img = `data:${type};base64,` + encoded_data
    setImage(img)

    return data
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <div className="form">
        <form onSubmit={submitHandler}>
          <input id="nameInput" type="text" placeholder="what do you create?" onChange={(event) => setName(event.target.value)}></input>
          <input id="descriptionInput" type ="text" placeholder="describe features!" onChange={(event) => setDescription(event.target.value)}></input>
          <input id="submitBotton" type = "submit" value="Generate & Mint!"></input>
        </form>
        <div className="image">
          <img src={image} alt="AI generated img" />
        </div>
      </div>
      <p>View&nbsp;<a href="" target="_blank" rel="noreferrer">MetaData</a></p>
      
    </div>
  );
}

export default App;

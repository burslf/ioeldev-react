import './App.scss';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useMoralis } from 'react-moralis';
import { useMoralisWeb3Api } from "react-moralis";
import { TransitionGroup } from 'react-transition-group';
import { CSSTransition } from 'react-transition-group';
// Contract
import SingleABI from './assets/contract/SingleABI.json';
import contractAddress from './assets/contract/contractAddress';
// Services
import { address, authService, chain } from './services/auth';
import { songsService } from './services/songs';
import { showPlayer } from './services/player';
import { getUserBalance } from './services/moralis';
import { contractsService, singleContract } from './services/contracts';
import { getGatewayUrl } from './utils/utils';
// Components
import Header from './components/Header/Header';
import Sidebar from "./components/Sidebar/Sidebar"
import Home from './pages/Home/Home';
import Songs from './pages/Songs/Songs';
import UploadSong from './pages/UploadSong/UploadSong';
import Swap from './pages/Swap/Swap';
import AudioPlayer from './components/AudioPlayer/AudioPlayer';
import Upload from './pages/Upload/Upload';

function App() {
  const location = useLocation();
  const Web3Api = useMoralisWeb3Api();
  const { authenticate, provider, Moralis, isAuthenticated, user, logout, enableWeb3, isWeb3Enabled } = useMoralis();
  const [chainId, setChainId] = useState(null);
  const [playerShowed, setPlayerShowed] = useState(null)
  const [sglContract, setSglContract] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      enableWeb3()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isWeb3Enabled) {
      getNetwork()
    }
  }, [isWeb3Enabled])

  useEffect(() => {
    document.documentElement.setAttribute("theme", "dark");
    chain.subscribe(c => {
      setChainId(c)
    })
    singleContract.subscribe(r => setSglContract(r))
  }, [])

  useEffect(() => {
    if (user) {
      authService.setAuth({
        authenticate,
        user,
        logout
      })
      const userAddress = user.attributes["ethAddress"]
      authService.setAddress(userAddress.toString())
    }
  }, [user]);

  useEffect(() => { //Set Single Contract
    if(chainId){
      setSingleContract()
    }
  }, [chainId])

  useEffect(() => {   // Set singles
    if (isWeb3Enabled && isAuthenticated && sglContract) {
        getSingles(SingleABI, contractAddress)
      }
  }, [isWeb3Enabled, isAuthenticated, sglContract]);

  useEffect(() => {    // Set user balance
    if (user && chainId) {
      if (isWeb3Enabled) {
        getBalance(Web3Api, address.getValue(), chainId)
      }
    }
  }, [user, chainId, isWeb3Enabled]);

  useEffect(() => {
    showPlayer.subscribe(r => {
      setPlayerShowed(r)
    })
  }, [])

  async function setSingleContract() {
    const ethers = Moralis.web3Library
    const mProvider = new ethers.providers.Web3Provider(provider)
    
    const signer = mProvider.getSigner(address.getValue())
    const SingleContract = new ethers.Contract(contractAddress, SingleABI, signer)
    contractsService.setSingleContract(SingleContract)
  }

  async function getBalance(Web3Api, add, chain) {
    try {
      const bal = await getUserBalance(Web3Api, add, chain)
      authService.setBalance(bal.toFixed(9))
    } catch (e) {
      console.log(e)
    }
  }


  async function getSingles() {
    let result = [];
    const localSingles = localStorage.getItem("singles")
    const SingleContract = singleContract.getValue()
    try {
      var startTime = performance.now()
      const name = await SingleContract["name"]()
      var endTime = performance.now()
      console.log(`EXECUTION TOOK ${endTime - startTime} MILLISECONDS`)
      console.log("NAME: " + name)
      var startTime = performance.now()
      const tf = await SingleContract.queryFilter("TokenURI", 0, "latest")
      var endTime = performance.now()
      console.log(`EXECUTION TOOK ${endTime - startTime} MILLISECONDS`)
      console.log(tf) 
      
      if (localSingles) {
        const singles = JSON.parse(localSingles)
        if (singles.length === tf.length) {
          result = singles
        } else {
          result = [...singles]
          for (let i = singles.length; i < tf.length; i++) {
            let singleURI = tf[i].args.tokenURI
            console.log(singleURI)

            let toUrl = getGatewayUrl(singleURI)
            let single = {
              id: singleURI
            }
            let fetchRes = await fetch(toUrl)
            let jsonRes = await fetchRes.json()
            single = { ...single, ...jsonRes }
            result.push(single)
          }

        }
      } else {
        for (let i = 0; i < tf.length; i++) {
          let res = tf[i].args.tokenURI
          let toUrl = getGatewayUrl(res)
          let single = {
            id: res
          }
          let fetchRes = await fetch(toUrl)
          let jsonRes = await fetchRes.json()
          single = { ...single, ...jsonRes }
          console.log(jsonRes)
          result.push(single)

        }
      }
      songsService.setSingles(result)
      localStorage.setItem("singles", JSON.stringify(result))
      // console.log(result)
    } catch (e) {
      console.log(e)
      songsService.setSingles(null)
      return e
    }
  }

  const login = async () => {
    await authenticate()
  }

  const logoutUser = async () => {
    await logout();
    authService.logout();
  }

  const getNetwork = async () => {
    const cId = Moralis.getChainId()
    authService.setChain(cId)
    Moralis.onChainChanged((chain) => {
      authService.setChain(chain)
      if (window.location.pathname.includes('swap')) {
        window.location.reload()
      }
    })

  }



  return (
    <>
      <Header logout={logoutUser} login={login} />
      <Sidebar logout={logoutUser} login={login} />
      <TransitionGroup className={'layout'}>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          {/* <div className='layout' id='layout'> */}
            <Routes location={location}>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/swap' element={<Swap Moralis={Moralis} />} />
              <Route exact path='/upload' element={<Upload Moralis={Moralis} />} />
              <Route exact path='/upload-song' element={<UploadSong Moralis={Moralis} />} />
              <Route exact path='/songs' element={<Songs Moralis={Moralis} />} />

            </Routes>
          {/* </div> */}
        </CSSTransition>
      </TransitionGroup>
      {playerShowed && <AudioPlayer />}
    </>

  );
}

export default App;

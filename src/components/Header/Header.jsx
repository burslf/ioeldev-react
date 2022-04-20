import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { logoPath } from '../../services/theme';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import { sidenavService } from '../../services/sidenav';
import { address, auth, authService } from '../../services/auth';
import { concatenatedAdd } from '../../utils/utils';
import { useMoralis } from 'react-moralis';
import Modal from 'react-modal/lib/components/Modal';
import { menuList } from '../../assets/content/menu';

const Header = (props) => {
    const [logo, setLogo] = useState('');
    const isMobile = false;
    const { Moralis } = useMoralis();
    const [moralis, setMoralis] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userAddress, setAddress] = useState(null);
    const navigate = useNavigate()

    Modal.defaultStyles.overlay.backgroundColor = 'rgb(0,0,0, 0.8)'

    useEffect(() => {
        logoPath.subscribe(r => { setLogo(r) })
        auth.subscribe(r => setMoralis(r))
        address.subscribe(r => { setAddress(r) })
    }, []);

    const openSidenav = () => {
        sidenavService.open()
    }
    const openModal = () => {
        setModalIsOpen(true)
    }

    const closeModal = () => {
        setModalIsOpen(false)
    }

    const selectNetwork = async (network) => {
        await Moralis.switchNetwork(network)
        // await Moralis.addNetwork(network, "Polygon Mainnet", "MATIC", "MATIC", "https://rpc-mainnet.matic.network", "https://polygonscan.com")
        closeModal()
    }

    return (
        <>
            <div className="header relative">
                <div className="left">
                    <Link to={'/'}>
                        <img src={`${logo}`} alt="" srcSet="" />
                    </Link>
                </div>
                <div className="center">
                    <ul>
                        {
                            menuList.map((m, i) => {
                                return (
                                    <div  key={i} className='group inline-block relative z-100'>
                                        <Link to={m.route}>
                                            <button className='li py-2 hover:rounded-lg'>{m.name}</button>
                                        </Link>

                                        <div className='absolute hidden text-gray-700 pt-1 group-hover:block z-100'>
                                            {
                                                m.sub && m.sub.map((s,i) => {
                                                    return (
                                                        <Link to={s.route} key={i}>
                                                            <button className={`${s.isFirst && `rounded-t-lg`} ${s.isLast && `rounded-b-lg`} gradient sub-li py-2 gradient-hover rounded-t-lg whitespace-no-wrap z-100 hover:z-100`}>
                                                                {s.name}
                                                            </button>
                                                        </Link>


                                                    )
                                                })
                                            }
                                        </div>
                                    </div>

                                )
                            })
                        }
                    </ul>


                </div>
                <div className="right">
                    {!moralis
                        ?
                        <button onClick={async () => await props.login()} className="gradient py-2 rounded-lg">Login</button>
                        :
                        <div className="group inline-block relative z-100">
                            <button className="gradient py-2 rounded-lg">{concatenatedAdd(userAddress)}</button>
                            <div className="absolute hidden text-gray-700 pt-1 group-hover:block z-100">
                                <button onClick={() => openModal()} className='gradient rounded-t-lg py-2 gradient-hover whitespace-no-wrap z-100 hover:z-100'>Switch Network</button>
                                <button onClick={() => props.logout()} className='gradient rounded-b-lg py-2 gradient-hover block whitespace-no-wrap z-100 hover:z-100'>Logout</button>

                            </div>
                        </div>
                    }
                    <ThemeToggle />
                    <span onClick={() => openSidenav()} className="material-icons">menu</span>
                </div>
            </div>


            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Network Modal"
                className="network-modal"
            >
                <div className="network-list">

                    <div className="network-field" onClick={async () => await selectNetwork('0x1')}>
                        <img loading='lazy' src={'/assets/images/eth-logo.png'} alt="" />
                        <span className=''>Ethereum</span>
                    </div>
                    <div className="network-field" onClick={async () => await selectNetwork('0x89')}>
                        <img loading='lazy' src={'/assets/images/polygon-logo.png'} alt="" />
                        <span className=''>Polygon</span>
                    </div>
                    <div className="network-field" onClick={async () => await selectNetwork('0x38')}>
                        <img loading='lazy' src={'/assets/images/bsc-logo.png'} alt="" />
                        <span className=''>BSC</span>
                    </div>

                </div>
            </Modal>
        </>
    )
}

export default Header;
import { useState, useEffect } from 'react';
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { address, auth } from '../../services/auth';
import { sidenavService, isSidenavOpened } from '../../services/sidenav';
import { concatenatedAdd } from '../../utils/utils';
import BalanceCard from '../BalanceCard/BalanceCard';
import { Link } from 'react-router-dom';
import './sidebar.scss';
import { menuListSidebar } from '../../assets/content/menu';

const Sidebar = (props) => {
    const [isOpened, setIsOpened] = useState(null);
    const [moralis, setMoralis] = useState(null);
    const [userAddress, setAddress] = useState(null);

    useEffect(() => {
        isSidenavOpened.subscribe(r => {
            if (r) {
                console.log("OPENED")
                // document.getElementById("layout").classList.add("hidden")
            } else {
                // document.getElementById("layout").classList.remove("hidden")
            }
            setIsOpened(r)
        })
        auth.subscribe(r => { setMoralis(r) })
        address.subscribe(r => { setAddress(r) })
    }, []);

    const closeSidebar = () => {
        sidenavService.close()
    }

    return (
        <ProSidebar width={'100%'} collapsedWidth={'0px'} collapsed={!isOpened} onToggle={() => closeSidebar()}>
            <div className="side-header">
                {!moralis
                    ?
                    <button onClick={async () => await props.login()} className="gradient py-2 rounded-lg">
                        Login
                    </button>
                    :
                    <button className="gradient py-2 rounded-lg">
                        {concatenatedAdd(userAddress)}
                    </button>
                }
                <BalanceCard />
                <span onClick={() => closeSidebar()} className="material-icons close">close</span>
            </div>
            <div className="side-content">
                <ul>

                    {menuListSidebar.map((m,i) => {
                        return (
                            <Link key={i} to={m.route} onClick={() => { sidenavService.close() }}>
                                <li>{m.name}</li>
                            </Link>
                        )
                    })}
                </ul>
                {moralis && <button onClick={async () => await props.logout()} className="gradient py-2 px-8 rounded-lg">
                    Logout
                </button>}
            </div>
        </ProSidebar>
    )
}

export default Sidebar
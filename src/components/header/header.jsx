import './header.css'
import logo from '../../assets/images/logo1.png'
import telegram from '../../assets/images/telegram.svg'
import { useHistory } from 'react-router-dom'
import { useAuthContext } from "../../providers/AuthProvider";

const Header = ({ wallet }) => {
    const history = useHistory()
    const { address, loading, connect, disconnect } = useAuthContext();

    return (
        <div className="box">
            <div className="wrapper full">
                <div className='header'>
                    <img
                        className="logo-header"
                        src={logo}
                        alt=""
                        onClick={() => history.push('/')} />
                    <div>
                        <p className='social-links'>
                            <a href="https://t.me/iok3ytg" target='_blank'><img src={telegram} alt="" /></a>
                            <a href="https://t.me/CryptoVisionTV" target='_blank'><img src={telegram} alt="" /></a>
                        </p>
                        {wallet && 
                            <button
                                disabled={loading}
                                onClick={() => (address ? disconnect() : connect())}> 
                                {address ? "Disconnect Wallet" : "Connect Wallet"}
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
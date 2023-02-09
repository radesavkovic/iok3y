import './footer.css'
import logo from '../../assets/images/logo2.png'

const Footer = ({ link }) => {
    return (
        <div className='box footer' style={{ paddingTop: 0 }}>
            <div className="wrapper full">
                <div className="footer-logo">
                    <img src={logo} alt="" />
                </div>
                {/* {link && <p>External Link</p>} */}
            </div>
        </div>
    )
}

export default Footer
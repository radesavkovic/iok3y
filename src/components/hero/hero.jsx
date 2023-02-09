import './hero.css'
import iom3y from '../../assets/images/iom3y.png'
import blueCircle from '../../assets/images/blue-circle.png'

const Hero = () => {
    return (
        <div className="box">
            <div className="hero_section">
                <div className="wrapper full" style={{ height: '100%' }}>
                    <div className="hero-cont">
                        <div className="hero-text">
                            <h2 className="sub-title"
                                style={{ marginBottom: '10px' }}
                            >GIVING EVERYONE A CHANCE TO WIN!</h2>
                            <h2 className="sub-title sub-title2">Sustainable projects Realistic roi</h2>
                        </div>
                        <div className="hero-image">
                            <div className='hero-logo'>
                                <img src={iom3y} alt="" />
                                <img src={blueCircle} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
import './livemega.css'
import megaImage from '../../assets/images/mega.png'

const LiveMega = () => {
    return (
        <div className='box'>
            <div className="liveMega">
                <div className="wrapper full">
                    <div className="mega-image">
                        <img src={megaImage} alt="" />
                        <p>(MEGAMINE BUSD V1)</p>
                    </div>
                    <div className="live-box">
                        <h2>WE'RE LIVE!</h2>
                        <div className="live-box-content">
                            <p className='center'>Join early and make great gains <br /> Simple mechanics <br /> No fineprint!</p>
                            <div className="separator"></div>
                            <p>Our contracts are built for longevity with sustainable ROIs</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LiveMega
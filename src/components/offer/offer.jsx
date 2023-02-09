import './offer.css'

const Offer = () => {
    return (
        <div className="box">
            <div className="offer-section">
                <div className="wrapper full" style={{ height: '100%' }}>
                    <div className="offer-cont">
                        <div className="offer-content">
                            <h1 className='title_secondary'>what we offer</h1>
                            <p className="offer-text">A chance for everyone to make realistic, <strong>sustainable ROI </strong></p>
                            <p className="offer-text">Clean, understandable smart contracts with <strong>no bs</strong></p>
                            <p className="offer-text">Instant support for all queries related to the projects</p>
                            <p className="offer-text">Projects the will be here for a good time, not a long time.</p>
                        </div>
                        <div className="offer-content">
                            <h1 className='title_secondary'>how we're different</h1>
                            <p className="offer-text">We take the best features from all existing projects and put them in one simple contract </p>
                            <p className="offer-text">Equal opportunity for every to get in early and make killer gains </p>
                            <p className="offer-text">Mechanics that just make sense!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Offer
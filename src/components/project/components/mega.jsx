import mega from '../../../assets/images/mega.png'

const Mega = () => {
    return (
        <div className="childCard12">
            <p className={'center card1LogoP'}>
                <img src={mega} className={'card1Logo'} alt="" />
            </p>
            <div className="innerCardWrapper">
                <div className="innerCard1">
                    <p className={'center cardText'}>Longevity based mechanics
                        <br />2.5% daily ROI
                        <br />4x max payouts
                        <br />10% referrals
                        <br />No unstake</p>
                </div>
            </div>
            <p className="center developetext">Development Progress</p>
            <p className="center">
                <input value={100} type="range" className="customRanger" />
            </p>
            <p className="center developetext">Release date:</p>
            <p className="center releaseDate1">NOVEMBER</p>
            <p className="cardButton_">
                <a
                    href='/megamine'
                    className="cardButton"
                >Enter</a>
            </p>
        </div>
    )
}

export default Mega
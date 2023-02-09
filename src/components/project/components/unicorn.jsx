import unicorn from '../../../assets/images/unicorn.png'

const Unicorn = () => {
    return (
        <div className="childCard12">
            <p className={'center card1LogoP'} style={{ marginBottom: '22px' }}>
                <img src={unicorn} className={'card1Logo'} alt="" />
            </p>
            <div className="innerCardWrapper">
                <div className="innerCard1">
                    <p className={'center cardText'}>Earn upto 12% per day
                        <br /> Withdraw whenever you want <br />
                        Starts with at low as BUSD 5 <br />
                        Upto 13% referral commission</p>
                </div>
            </div>
            <p className="center developetext" style={{marginTop:'10%'}}>Development Progress</p>
            <p className="center">
                <input value={100} type="range" className="customRanger" />
            </p>
            <p className="center developetext">Release date:</p>
            <p className="center releaseDate1">NOVEMBER</p>
            <p className="cardButton_">
                <a
                    href='/unicorn'
                    className="cardButton"
                >Enter</a>
            </p>
        </div>
    )
}

export default Unicorn
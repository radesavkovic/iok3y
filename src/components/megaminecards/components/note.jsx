const Note = () => {
    return (
        <div className="card">
            <h2>IMPORTANT NOTES:</h2>
            <div className='notice-text'>
                <p className='detail-card-text'>Defi is inherently risky. Our contract is designed to offer everyone an equal opportunity to make gains until the contract balance runs dry (and it will at dome point)</p>
                <p className='detail-card-text'> Invest only what you can afford to lose. </p>
                <p className='detail-card-text'>The withdrawal tax goes back to the contract, it has only been placed to reduce contract drain.</p>
                <p className='detail-card-text'>Max payout is locked at 4x. Antiwhale.</p>
                <p className='detail-card-text'>The ROI may not be the highest in the space but we offer realistic gains that a smart contract can sustain for a long time.</p>
            </div>
        </div>
    )
}

export default Note
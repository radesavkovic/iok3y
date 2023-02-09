import './megaminecard.css'
import Deposit from './components/deposit'
import Claim from './components/claim'
import Refer from './components/refer'
import Calculator from './components/calculator'
import Note from './components/note'
import Tax from './components/tax'

const MegaMineCards = () => {
    return (
        <>
            <div className='box'>
                <div className="wrapper full">
                    <div className="card-cont">
                        <Deposit />
                        <Claim />
                        <Refer />
                    </div>
                </div>
            </div>
            <div className='box'>
                <div className="wrapper full">
                    <div className="card-cont">
                        <Tax />
                        <Calculator />
                        <Note />
                    </div>
                </div>
            </div>
        </>
    )
}

export default MegaMineCards
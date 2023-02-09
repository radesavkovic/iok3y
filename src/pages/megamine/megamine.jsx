import Header from '../../components/header/header'
import Request from '../../components/request/request'
import Footer from '../../components/footer/footer'
import LiveMega from '../../components/livemega/livemega'
import AmountDetail from '../../components/amountdetail/amountdetail'
import MegaMineCards from '../../components/megaminecards/megaminecards'

const MegaMine = () => {
    return (
        <>
            <Header wallet={true}/>
            <LiveMega />
            <AmountDetail />
            <MegaMineCards />
            <Request />
            <Footer link={false} />
        </>
    )
}

export default MegaMine
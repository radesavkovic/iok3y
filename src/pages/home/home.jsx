import Header from '../../components/header/header'
import About from '../../components/about/about'
import Request from '../../components/request/request'
import Footer from '../../components/footer/footer'
import Project from '../../components/project/project'
import Hero from '../../components/hero/hero'
import Offer from '../../components/offer/offer'
import abstract from '../../assets/video/abstract.mp4'

const Home = () => {

    return (
        <>
            <div className="video-abstract-wrapper">
                <video className='abstract-video' src={abstract} autoPlay muted loop></video>
            </div>
            <Header wallet={false}/>
            <Hero />
            <Project />
            <Offer />
            <About />
            <Request />
            <Footer link={true} />
        </>
    )
}

export default Home
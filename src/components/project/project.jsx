import './project.css'
import Mega from './components/mega'
import Unicorn from './components/unicorn'
import Question from './components/question'
import Idea from './components/idea'

const Project = () => {
    return (
        <div className='box our-project'>
            <div className="wrapper full">
                <h2 className="sub-title">ALL THE BEST FEATURES FROM ALL THE BEST PROJECT IN ONE PLACE</h2>
                <h1 className="title_primary">OUR PROJECTS</h1>
                <div className="cardWrapper">
                    <div className="parentCard1">
                        <div className="childCard11"></div>
                        <Mega />
                        <div className="childCard13"></div>
                        <Unicorn />
                        <div className="childCard15"></div>
                    </div>
                </div>
                <div className="cardWrapper">
                    <div className="parentCard1">
                        <div className="childCard11"></div>
                        <Question />
                        <div className="childCard13"></div>
                        <Idea />
                        <div className="childCard15"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Project
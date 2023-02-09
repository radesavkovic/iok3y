import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/home/home';
import MegaMine from './pages/megamine/megamine';
import UniCorn from './pages/unicorn/unicorn';

function App() {
  return (
    <Router>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/megamine'} component={MegaMine} />
      <Route exact path={'/unicorn'} component={UniCorn} />
    </Router>
  );
}

export default App;

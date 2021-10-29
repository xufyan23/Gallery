import './App.css';
import Home from './Home';
import ImagePreview from './ImagePreview';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home}>
          </Route>
          <Route path="/image/:id" component={ImagePreview}></Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App;

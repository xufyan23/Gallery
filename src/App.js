import './App.css';
import Home from './Home';
import ImagePreview from './ImagePreview';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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

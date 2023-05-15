import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Header from './components/header';
function App() {
  return (
    <div className="App">
   <Router>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/home' element={<Home />}>
    <Route path="" element={<Header />} />
    </Route>
    </Routes>
   </Router>
    </div>
  );
}

export default App;

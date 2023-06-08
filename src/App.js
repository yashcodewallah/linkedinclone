import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/login';
import Home from './components/home';
import Header from './components/header';
import { connect } from 'react-redux';
import { getUserAuth } from './store/actions/actions';
import { useEffect } from 'react';
import RequireAuth from './components/RequireAuth';
function App(props) { 

useEffect(()=>{
props.getUserAuth() ;
},[])


  return (
    <div className="App">
   <Router>
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/home' element={props.user ? <Home />: <Login /> }>
    <Route path="" element={<Header />} />
    </Route>
    </Routes>
   </Router>
    </div>
  );
}

const mapStateToProps = (state)=>{
  return{
    user:state.userState.user,
}};
const mapDispatchToProps=(dispatch)=>({
  getUserAuth: ()=>dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

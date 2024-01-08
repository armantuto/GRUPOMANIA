import './App.css';
import { Switch, Route,Redirect   } from 'react-router-dom';
import Login from './pages/login.js';
import Dashboard from './pages/Dashboard.js';
import NavBar from './components/navbar.js';
import Profilo from './pages/profilo.js';
import Edit from './pages/editPerfile.js';
import EditPost from './pages/EditPost.js';

function MainComponent() {
  return (
    <div>
      <NavBar />
      <Route exact path='/dashboard' component={Dashboard} />
      <Route exact path='/perfile/:id' component={Profilo} />
      <Route exact path='/post/:id' component={EditPost} />
      <Route exact path='/edit' component={Edit} />
      <Redirect to='/dashboard' />
    </div>)
}
function App() {
  return (
    <>
      <Switch>
        <Route exact path='/' component={Login} />
       <Route component={MainComponent} />  
         </Switch>
    </>
  );
}

export default App;

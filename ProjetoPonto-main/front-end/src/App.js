import React from 'react';
import './App.css';
import Navigation from './components/Navbar/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
//import { Router, Switch, Route } from 'react-router-dom';
import Home from './components/pages';
import About from './components/pages/About';
import Membro from './components/pages/Membro'
import Ponto from './components/pages/Ponto'
import Relatorio from './components/pages/Relatorio'
import Cadastro from './components/pages/Cadastro'
import 'bootstrap/dist/css/bootstrap.min.css';
  
function App() {
  return (
    <div className="App">
    <Router>
      <Navigation />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/cadastro' component={Membro} />
        <Route path='/ponto' component={Ponto} />
        <Route path='/relatorio' component={Relatorio} />
        <Route path='/senhas' component={Cadastro} />
      </Switch>
    </Router>
    </div>
  );
}
  
export default App;
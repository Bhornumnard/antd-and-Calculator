import React from 'react';
import logo from './logo.svg';
import './App.css';
import { blue } from '@ant-design/colors';
import './antd.css'
import { Route, Switch, Link } from "react-router-dom"
import Calculator from './Calculator'

console.log(blue); // ['#E6F7FF', '#BAE7FF', '#91D5FF', ''#69C0FF', '#40A9FF', '#1890FF', '#096DD9', '#0050B3', '#003A8C', '#002766']
console.log(blue.primary); // '#1890FF'

const Component = (props) => {
  return <h2> <Link to="/"> Hello world</Link></h2>
}

function App() {
  return (

    <Switch>
      <Route path="/home"> <Component /> </Route>
      <Route exact path="/">
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code className="blue">src/App.js</code> and save to reload.
        </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"

            >
              Learn React
        </a>
          </header>
        </div>
      </Route>
      <Route path="/cal"> <Calculator /></Route>

    </Switch>


  );
}

export default App;

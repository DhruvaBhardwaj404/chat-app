import '@babel/polyfill';
import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './redux/store'
import Head from './components/Head.jsx';
import Foot from './components/Foot.jsx';
import Main from './components/Main.jsx' ;



class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
     <Router>   
       <div className='container-fluid p-3 bg dark h-100'>
        <Head/>
          <Main />
          <Foot/>
          </div>
     </Router>
     </Provider>
    );
  }
}

export default App;
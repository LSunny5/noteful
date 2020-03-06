import React from 'react';
import Header from './Header/Header';
import Main from './Main/Main';
import './App.css';
import Folder from './Folder/Folder';
//import { Route } from 'react-router-dom';

class App extends React.Component {
  render() {
    return (
      <div className='App'>
        <Header />
        <main>
            <Folder />
            <Main />
        </main>
      </div>
    );
  }
}

export default App;

//<Switch></Switch>
//<Route exact path='/' component={Main} />
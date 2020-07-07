import React, {useState} from 'react';
import Routes from './routes/index'
import { BrowserRouter } from 'react-router-dom';
import Globals from './styles/global'

function App() {
  return (
    <div className="App">
      <>
      <BrowserRouter>
        <Routes></Routes>
      </BrowserRouter>
      <Globals></Globals>
    </>
    </div>
  );
}

export default App;

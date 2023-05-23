import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Editor from './Pages/Editor';

import { Toaster } from 'react-hot-toast';
import Studio from './Pages/Studio';
import { useState } from 'react';
import NotFound from './Pages/NotFound';
import AIInterface from './Pages/AIInterface';

function App() {
 const [previd, setprevid]= useState()



  return (
    <div className="App wrapper">
    
      <Routes>
        <Route path={'/editor'} element={<Editor previd={previd} setprevid={setprevid} />} />
        <Route path={'/*'} element={<NotFound  />} />
        <Route path={'/AI-Interface'} element={<AIInterface />} />

        <Route path="/" element={<Editor previd={previd} setprevid={setprevid} />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;

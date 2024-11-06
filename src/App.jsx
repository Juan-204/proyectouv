import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Registro from './Components/registro';
import CheckList from './Components/checkList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registro />} />
        <Route path="/checklist" element={<CheckList />} />
      </Routes>
    </Router>
  );
}

export default App;


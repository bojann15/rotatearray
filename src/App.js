import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Elements from './components/elements/Elements';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Elements />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

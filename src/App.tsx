import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import WorkflowGenie from './components/WorkflowGenie';
import TopBar from './components/TopBar';
import Plugs from './components/Plugs';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-section">
          <TopBar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/plugs" element={<Plugs />} />
              <Route path="*" element={<MainContent />} />
            </Routes>
          </div>
        </div>
        <WorkflowGenie />
      </div>
    </Router>
  );
}

export default App; 
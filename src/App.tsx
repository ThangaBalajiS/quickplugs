import React from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import WorkflowGenie from './components/WorkflowGenie';
import TopBar from './components/TopBar';
import './styles/App.css';

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="main-section">
        <TopBar />
        <div className="content-wrapper">
          <MainContent />
        </div>
      </div>
      <WorkflowGenie />
    </div>
  );
}

export default App; 
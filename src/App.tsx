import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import WorkflowGenie from './components/WorkflowGenie';
import TopBar from './components/TopBar';
import Plugs from './components/Plugs';
import PlugDetail from './components/PlugDetail';
import { fetchConnectors } from './store/actions/connectorsActions';
import { AppDispatch } from './store';
import './styles/App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Fetch connectors when the app loads
    dispatch(fetchConnectors());
  }, [dispatch]);

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="main-section">
          <TopBar />
          <div className="content-wrapper">
            <Routes>
              <Route path="/plugs" element={<Plugs />} />
              <Route path="/plugs/:id" element={<PlugDetail />} />
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
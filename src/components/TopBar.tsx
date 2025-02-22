import React from 'react';
import '../styles/TopBar.css';

const TopBar = () => {
  return (
    <div className="top-bar">
      <div className="top-bar-content">
        <h1>Sales pipeline automation</h1>
        <div className="top-bar-actions">
          <button className="tasks-btn">Tasks</button>
          <button className="share-btn">Share</button>
          <button className="more-btn">⋮</button>
        </div>
      </div>
    </div>
  );
};

export default TopBar; 
import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { Divider } from "antd";
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname.substring(1) || "chat");
  
  const handleNavigation = (path: string) => {
    setActiveItem(path);
    navigate(`/${path}`);
  };

  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.svg" alt="Logo" />
      </div>
      <Divider style={{ borderColor: "#E8E8E8", minWidth: "52px", width: "52px", marginLeft: 5 }} />
      <div className="sidebar-items">
        <div className="nav-items">
          <div className="nav-item search-item">
            <div className="icon">
              <img src="/assets/search.svg" alt="Search" />
            </div>
            <span className="label">⌘+K</span>
          </div>

          <Divider style={{ borderColor: "#E8E8E8", minWidth: "52px", width: "52px", marginLeft: 5 }} />
          
          <div 
            className={`nav-item ${activeItem === "chat" ? "active" : ""}`}
            onClick={() => handleNavigation("chat")}
          >
            <div className="icon">
              <img src="/assets/chat.svg" alt="Chat" />
            </div>
            <span className="label">Chat</span>
          </div>
          
          <div 
            className={`nav-item ${activeItem === "plugs" ? "active" : ""}`}
            onClick={() => handleNavigation("plugs")}
          >
            <div className="icon">
              <img src="/assets/plugs.svg" alt="Plugs" />
            </div>
            <span className="label">Plugs</span>
          </div>
          
          <div 
            className={`nav-item ${activeItem === "tasks" ? "active" : ""}`}
            onClick={() => handleNavigation("tasks")}
          >
            <div className="icon">
              <img src="/assets/clock.svg" alt="Tasks" />
            </div>
            <span className="label">Tasks</span>
          </div>
          
          <div 
            className={`nav-item ${activeItem === "store" ? "active" : ""}`}
            onClick={() => handleNavigation("store")}
          >
            <div className="icon">
              <img src="/assets/store.svg" alt="Store" />
            </div>
            <span className="label">Store</span>
          </div>
        </div>
      </div>
      
      <div className="user-profile">
        <img src="/avatar.png" alt="User" className="avatar" />
      </div>
    </div>
  );
}

export default Sidebar; 
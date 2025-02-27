import React, { useState } from 'react';
import '../styles/Sidebar.css';
import { Divider } from "antd";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("chat");
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
          
          <div className="nav-item active">
            <div className="icon">
              <img src="/assets/chat.svg" alt="Chat" />
            </div>
            <span className="label">Chat</span>
          </div>
          
          <div className="nav-item">
            <div className="icon">
              <img src="/assets/auth.svg" alt="Auth" />
            </div>
            <span className="label">Auth</span>
          </div>
          
          <div className="nav-item">
            <div className="icon">
              <img src="/assets/clock.svg" alt="Tasks" />
            </div>
            <span className="label">Tasks</span>
          </div>
          
          <div className="nav-item">
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
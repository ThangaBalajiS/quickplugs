import React from 'react';
import '../styles/WorkflowGenie.css';
import { Input } from 'antd';

const { TextArea } = Input;

const WorkflowGenie = () => {
  const templates = [
    { id: 1, title: 'Integration name goes here' },
    { id: 2, title: 'Integration name goes here' },
    { id: 3, title: 'Integration name goes here' },
    { id: 4, title: 'Integration name goes here' }
  ];

  return (
    <div className="workflow-genie">
      <div className="genie-header">
        <h2>✨ Workflow Genie</h2>
        <button className="collapse-btn">→</button>
      </div>

      <div className="templates-section">
        <h3>Popular templates</h3>
        <div className="templates-list">
          {templates.map(template => (
            <div key={template.id} className="template-card">
              <div className="template-icons">
                <span className="icon">M</span>
                <span className="arrow">→</span>
                <span className="icon">M</span>
              </div>
              <p>{template.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="chat-input">
      <TextArea placeholder="Type here.." rows={10} />
      </div>
    </div>
  );
}

export default WorkflowGenie; 
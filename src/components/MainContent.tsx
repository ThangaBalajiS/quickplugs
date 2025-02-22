import React from 'react';
import '../styles/MainContent.css';

const MainContent = () => {
  const steps = [
    { id: 1, label: 'FLOW CREATION', status: 'active' },
    { id: 2, label: 'AUTHENTICATION', status: 'pending' },
    { id: 3, label: 'DATA MAPPING', status: 'pending' },
    { id: 4, label: 'PUBLISH', status: 'pending' }
  ];

  return (
    <div className="main-content">
      <div className="workflow-steps">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className={`step ${step.status}`}>
              <div className="step-circle"></div>
              <div className="step-label">{step.label}</div>
            </div>
            {index < steps.length - 1 && <div className="step-line"></div>}
          </React.Fragment>
        ))}
      </div>

      <div className="workflow-canvas">
        <div className="empty-state">
          <div className="icon">✨</div>
          <p>Type your prompt and generate your workflow<br />using out AI chat box</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent; 
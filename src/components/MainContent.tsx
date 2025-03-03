import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useNavigate } from 'react-router-dom';
import '../styles/MainContent.css';

const MainContent = () => {
  const steps = [
    { id: 1, label: 'FLOW CREATION', status: 'active' },
    { id: 2, label: 'AUTHENTICATION', status: 'pending' },
    { id: 3, label: 'DATA MAPPING', status: 'pending' },
    { id: 4, label: 'PUBLISH', status: 'pending' }
  ];

  const { items: plugs } = useSelector((state: RootState) => state.plugs);
  const navigate = useNavigate();

  const handlePlugClick = (plugId: string) => {
    navigate(`/plugs/${plugId}`);
  };

  return (
    <div className="main-content">
      <div className="workflow-steps">
        {steps.map((step) => (
          <React.Fragment key={step.id}>
            <div className={`step ${step.status}`}>
              <div className="step-circle"></div>
              <div className="step-label">{step.label}</div>
            </div>
          </React.Fragment>
        ))}
      </div>

      <div className="workflow-canvas">
        {plugs.length > 0 ? (
          <div className="plugs-grid">
            <h2>Your Integrations</h2>
            <div className="plugs-list">
              {plugs.map(plug => (
                <div 
                  key={plug.id} 
                  className="plug-card"
                  onClick={() => handlePlugClick(plug.id)}
                >
                  <div className="plug-icon">
                    <img src={plug.icon} alt={plug.name} />
                  </div>
                  <div className="plug-details">
                    <h3>{plug.name}</h3>
                    <p>{plug.description}</p>
                    {plug.connectors && plug.connectors.length > 0 && (
                      <div className="connector-preview">
                        {plug.connectors.map((connector, idx) => (
                          <div key={idx} className="connector-icon-small">
                            <img 
                              src={connector.icon || '/assets/default-connector.svg'} 
                              alt={connector.name} 
                              title={connector.name}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="empty-state">
            <div className="icon">✨</div>
            <p>Type your prompt and generate your workflow<br />using our AI chat box</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainContent; 
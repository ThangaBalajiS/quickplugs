import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import '../styles/PlugDetail.css';

const PlugDetail = () => {
  const selectedPlug = useSelector((state: RootState) => state.plug.currentPlug);
  
  if (!selectedPlug) {
    return <div className="plug-detail-container">No plug selected</div>;
  }

  return (
    <div className="plug-detail-container">
      <div className="plug-header">
        <h1>{selectedPlug.name}</h1>
        <p>{selectedPlug.description}</p>
      </div>
      
      <div className="plug-workflow">
        <h2>Workflow</h2>
        
        {selectedPlug.connectors && selectedPlug.connectors.length > 0 ? (
          <div className="connector-flow">
            {selectedPlug.connectors.map((connector, index) => (
              <React.Fragment key={connector.id}>
                <div className="connector-card">
                  <div className="connector-icon">
                    <img src={connector.icon || '/assets/default-connector.svg'} alt={connector.name} />
                  </div>
                  <div className="connector-details">
                    <h3>{connector.name}</h3>
                    <p>{connector.description}</p>
                    <span className="connector-type">{connector.type}</span>
                  </div>
                </div>
                
                {index < (selectedPlug.connectors?.length || 0) - 1 && (
                  <div className="connector-arrow">→</div>
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <p>No connectors configured for this plug</p>
        )}
      </div>
      
      <div className="plug-config">
        <h2>Configuration</h2>
        <pre>{JSON.stringify(selectedPlug.workflow, null, 2)}</pre>
      </div>
      
      {selectedPlug.metadata && (
        <div className="plug-metadata">
          <h2>Metadata</h2>
          <pre>{JSON.stringify(selectedPlug.metadata, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default PlugDetail; 
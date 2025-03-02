import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { fetchPlugs } from '../store/actions/plugsActions';
import '../styles/Plugs.css';

const Plugs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: plugs, loading, error } = useSelector((state: RootState) => state.plugs);

  useEffect(() => {
    dispatch(fetchPlugs());
  }, [dispatch]);

  if (loading) {
    return <div className="plugs-container">Loading plugs...</div>;
  }

  if (error) {
    return <div className="plugs-container">Error: {error}</div>;
  }

  return (
    <div className="plugs-container">
      <h1>Available Plugs</h1>
      <div className="plugs-grid">
        {plugs.map(plug => (
          <div key={plug.id} className="plug-card">
            <div className="plug-icon">
              <img src={plug.icon} alt={plug.name} />
            </div>
            <div className="plug-details">
              <h3>{plug.name}</h3>
              <p>{plug.description}</p>
              <span className="plug-type">{plug.type}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plugs; 
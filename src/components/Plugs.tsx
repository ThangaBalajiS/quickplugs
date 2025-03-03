import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState, AppDispatch } from '../store';
import { fetchPlugs } from '../store/actions/plugsActions';
import { selectPlugSuccess } from '../store/reducers/plugReducer';
import '../styles/Plugs.css';
import { Plug } from '../types/index';

const Plugs = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { items: plugs, loading, error } = useSelector((state: RootState) => state.plugs);

  useEffect(() => {
    dispatch(fetchPlugs());
  }, [dispatch]);

  const handlePlugClick = (plug: Plug) => {
    dispatch(selectPlugSuccess(plug));
    navigate(`/plugs/${plug.id}`);
  };

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
          <div 
            key={plug.id} 
            className="plug-card"
            onClick={() => handlePlugClick(plug)}
          >
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
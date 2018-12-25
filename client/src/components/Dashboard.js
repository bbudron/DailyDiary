import React from 'react';
import { Link } from 'react-router-dom';
import DayList from './days/DayList';

const Dashboard = () => {
  return (
    <div>
      <DayList />
      <div className="fixed-action-btn">
        <Link to="/days/new" className="btn-floating btn-large red">
          <i className="material-icons">add</i>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;

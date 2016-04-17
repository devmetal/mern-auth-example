import React, { PropTypes, Component } from 'react';
import DashboardItem from '../components/Admin/Dashboard/DashboardItem';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
  }
  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-items">
          <DashboardItem header="Articles" link="/articles" />
        </div>
      </div>
    );
  }
}

export default Dashboard;

import React, { PropTypes } from 'react';
import { Link } from 'react-router';

function DashboardItem(props) {
  return (
    <div className="dashboard-item">
      <div className="dashboard-item-header">
        {props.header}
      </div>
      <div className="dashboard-item-link">
        <Link to={props.link}>{props.header}</Link>
      </div>
    </div>
  );
}

DashboardItem.propTypes = {
  header: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default DashboardItem;

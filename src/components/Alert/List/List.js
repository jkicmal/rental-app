import React from 'react';

import Alert from '../Alert';

const AlertList = (props) => {
  const { alerts } = props;

  const alertsToRender = alerts.map((alert) => (
    <Alert severity={alert.severity} message={alert.message} onClose={alert.onClose} />
  ));

  return alertsToRender;
};

export default AlertList;

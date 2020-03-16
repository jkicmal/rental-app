import React, { Component } from 'react';

import MaterialAlert from '@material-ui/lab/Alert';

import classes from './Alert.module.scss';

class Alert extends Component {
  state = {
    closed: false
  };

  onClose = () => {
    this.setState({ closed: true });
    if (this.props.onClose) this.props.onClose();
  };

  render() {
    const { severity, status, message } = this.props;

    if (this.state.closed) return null;

    return (
      <MaterialAlert
        className={classes.alert}
        severity={severity}
        onClose={this.onClose}
      >
        {`[${status}] ${message}`}
      </MaterialAlert>
    );
  }
}

export default Alert;

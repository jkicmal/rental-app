import React from 'react';

import classes from './mui-modal.module.scss';

import Modal from '@material-ui/core/Modal';

const MuiModal = ({ children, horizontalCenter, verticalCenter, onClose, open }) => {
  const classNames = [classes.modal];
  if (horizontalCenter) classNames.push(classes.horizontalCenter);
  if (verticalCenter) classNames.push(classes.verticalCenter);
  return (
    <Modal className={classNames.join(' ')} onClose={onClose} open={open}>
      {/* NOTE: Modal content has to be wrapped around something */}
      <>{children}</>
    </Modal>
  );
};

export default MuiModal;

import React from 'react';

import { Screen } from '../../components/common';
import { EmployeeAccountContainer } from '../../components/employee';

const ScreensEmployeeAccount = (props) => {
  const accountId = props.match.params.accountId;

  return (
    <Screen>
      <EmployeeAccountContainer accountId={accountId} />
    </Screen>
  );
};

export default ScreensEmployeeAccount;

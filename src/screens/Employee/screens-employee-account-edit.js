import React from 'react';

import { Screen } from '../../components/common';
import { EmployeeAccountEditContainer } from '../../components/employee';

const ScreensEmployeeAccountEdit = (props) => {
  const accountId = props.match.params.accountId;

  return (
    <Screen horizontalCenter verticalCenter>
      <EmployeeAccountEditContainer accountId={accountId} />
    </Screen>
  );
};

export default ScreensEmployeeAccountEdit;

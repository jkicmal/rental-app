import React from 'react';

import { Screen, ButtonLink, Divider } from '../../components/common';
import { EmployeeAccountContainer } from '../../components/employee';
import Typography from '@material-ui/core/Typography';

const ScreensEmployeeAccount = (props) => {
  const accountId = props.match.params.accountId;

  return (
    <Screen>
      <ButtonLink to={`/employee/accounts/${accountId}/edit`}>Edit</ButtonLink>
      <Divider />
      <Typography variant="h4">Account #{accountId}</Typography>
      <EmployeeAccountContainer accountId={accountId} />
    </Screen>
  );
};

export default ScreensEmployeeAccount;

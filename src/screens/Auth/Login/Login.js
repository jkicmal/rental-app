import React from 'react';

import Screen from '../../../components/Screen/Screen';
import LoginFrom from '../../../components/Login/Form';
import { Redirect } from 'react-router-dom';

const ScreensAuthLogin = props =>
  props.isAuthenticated ? (
    <Redirect to="/" />
  ) : (
    <Screen horizontalCenter verticalCenter>
      <LoginFrom />
    </Screen>
  );

export default ScreensAuthLogin;

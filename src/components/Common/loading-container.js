import React from 'react';

import FlexContainer from './flex-container';
import CircularProgress from '@material-ui/core/CircularProgress';

const LoadingContainer = ({ loading, render }) =>
  loading ? (
    <FlexContainer horizontalCenter>
      <CircularProgress />
    </FlexContainer>
  ) : (
    render()
  );
export default LoadingContainer;

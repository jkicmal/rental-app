import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchProduct } from '../../actions/product/actions';
import { apiAccessTypes } from '../../config/api';
import { formatPrice, formatYesNo } from '../../helpers/formatters';

import { FlexContainer, InfoElement, LoadingContainer } from '../common';
import Typography from '@material-ui/core/Typography';

class EmployeeProductContainer extends Component {
  componentDidMount() {
    const { productActions, loginState, productId } = this.props;
    productActions.fetchProduct(
      productId,
      { relations: ['category'] },
      apiAccessTypes.EMPLOYEE,
      loginState.token
    );
  }

  render() {
    const { product, loading } = this.props.productState;
    return (
      <LoadingContainer
        loading={!product || loading}
        render={() => (
          <>
            <Typography variant="h4">
              {product.name} #{product.id}
            </Typography>
            <FlexContainer wrap>
              <InfoElement label="Description" value={product.description} extend />
              <InfoElement label="Price / Day" value={formatPrice(product.price)} />
              <InfoElement label="Deposit" value={formatPrice(product.deposit)} />
              <InfoElement label="Displayed In Store" value={formatYesNo(product.showInStore)} />
              <InfoElement
                label="Category"
                value={product.category ? product.category.name : 'None'}
              />
            </FlexContainer>
          </>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  productState: {
    product: state.productReducer.product,
    loading: state.productReducer.loading,
  },
  loginState: {
    token: state.loginReducer.token,
  },
});

const mapDispatchToProps = (dispatch) => ({
  productActions: {
    fetchProduct: (id, resourceQueryParams, apiAccessType, token) =>
      dispatch(fetchProduct(id, resourceQueryParams, apiAccessType, token)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeProductContainer);

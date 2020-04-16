import React, { Component } from 'react';
import { connect } from 'react-redux';

import cameraStockImage from '../../assets/images/stock-camera.jpg';

import { fetchProduct } from '../../actions/product/actions';
import { apiAccessTypes } from '../../config/api';
import { formatPrice } from '../../helpers/formatters';

import { Divider, FlexContainer, InfoElement, LoadingContainer } from '../common';
import Typography from '@material-ui/core/Typography';
import {
  removeProductFromShoppingCart,
  addProductToShoppingCart,
} from '../../actions/shopping-cart/actions';
import { accountTypes } from '../../helpers/constants';
import { ProductShoppingCartButton } from '.';

class ProductContainer extends Component {
  componentDidMount() {
    const { productActions, productId } = this.props;
    productActions.fetchProduct(productId, { relations: ['category'] }, apiAccessTypes.STORE);
  }

  render() {
    const { product, loading } = this.props.productState;
    const { loginState, shoppingCartState, shoppingCartActions } = this.props;

    return (
      <LoadingContainer
        loading={!product || loading}
        render={() => (
          <>
            <Divider />
            <Typography variant="h4">
              {product.name} #{product.id}
            </Typography>
            <Divider />
            <ProductShoppingCartButton
              productAvailableItemsCount={Number(product.availableItemsCount)}
              isCustomer={loginState.token && loginState.accountType === accountTypes.CUSTOMER}
              productInShoppingCart={
                shoppingCartState.products.findIndex(
                  (shoppingCartProduct) => shoppingCartProduct.id === product.id
                ) !== -1
              }
              onAdd={() => shoppingCartActions.addProductToShoppingCart(product)}
              onRemove={() => shoppingCartActions.removeProductFromShoppingCart(product)}
            />
            <Divider />
            <FlexContainer wrap>
              <InfoElement
                label="Image"
                value={<img src={cameraStockImage} alt="Product" style={{ width: '100%' }} />}
                extend
              />
              <InfoElement label="Description" value={product.description} extend />
              <InfoElement label="Price / Day" value={formatPrice(product.price)} />
              <InfoElement label="Deposit" value={formatPrice(product.deposit)} />
              <InfoElement
                label="Category"
                value={product.category ? product.category.name : 'None'}
              />
              <InfoElement
                label="Available Items"
                value={`${product.availableItemsCount} out of ${product.totalItemsCount}`}
              />
            </FlexContainer>
          </>
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  loginState: {
    token: state.loginReducer.token,
    accountType: state.loginReducer.accountType,
  },
  productState: {
    product: state.productReducer.product,
    loading: state.productReducer.loading,
  },
  shoppingCartState: {
    products: state.shoppingCartReducer.products,
  },
});

const mapDispatchToProps = (dispatch) => ({
  productActions: {
    fetchProduct: (id, resourceQueryParams, apiAccessType) =>
      dispatch(fetchProduct(id, resourceQueryParams, apiAccessType)),
  },
  shoppingCartActions: {
    removeProductFromShoppingCart: (product) => dispatch(removeProductFromShoppingCart(product)),
    addProductToShoppingCart: (product) => dispatch(addProductToShoppingCart(product)),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductContainer);

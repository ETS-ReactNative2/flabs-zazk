/**
* Product component called from TabsView
* sends productList as props to ProductTitleList component for the ListView datasource
*/

// import react/redux dependencies
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components & apis
import View from 'View';
import Text from 'Text';
import StyleSheet from 'StyleSheet';
import TouchableOpacity from 'TouchableOpacity';
import ScrollView from 'ScrollView';
import TextInput from 'TextInput';

// import custom components
import Base from '../../../global/components/BaseComponent';
import YTHeader from '../../../global/components/YTHeader';
import YTButton from '../../../global/components/YTButton';
import ActionButton from '../../../global/components/ActionButton';
import YTCard from '../../../global/components/YTCard';
import ScrollContainer from '../../../global/components/ScrollContainer';
import YTColors from '../../../global/styles/YTColors';
import EmptyMessage from '../../../global/components/EmptyMessage';
import ProductTitleList from './ProductTitleList';

// import actions
import * as productActions from '../productActions'

// import styles
import productStyles from '../productStyles';


class Product extends Base {
  constructor(props) {
    super(props);
    this._bind(
     '_openProfile'
     , '_openNew'
     , '_sendDelete'
    );
  }

  componentDidMount() {
    // this.props.dispatch(productActions.fetchListIfNeeded());  
  }

  _openProfile() {
    this.props.navigator.push({profile: true});
  }

  _openNew() {
    this.props.navigator.push({newProduct: true});
  }

  _sendDelete(id) {
    this.props.dispatch(productActions.sendDelete(id)).then((res) => {
      this.props.dispatch(productActions.removeProductFromList(id));
    })
  }

  render() {

    const {  products, navigator, user } = this.props;

    if(!products.lists.all || products.lists.all.isFetching) {
      return (
        <EmptyMessage
          message="Loading Products..."
        />
      )
    }
    let productList = products.lists.all ? products.lists.all.items : null;

    const profileImg = user.info && user.info.profilePicUrl ? {uri: user.info.profilePicUrl} : require('../../../global/img/wile.png');

    const rightItem = {
      onPress: () => this._openNew()
      , icon: require('../../../global/img/plus.png')
      , layout: 'image'
    }

    const leftItem = {
      onPress: () => this._openProfile(),
      image: profileImg,
      layout: "image",
    };

    return (
      <View style={{flex: 1}}>
        <YTHeader
          title="Yote"
          leftItem={leftItem}
          rightItem={rightItem}
        >
        </YTHeader>
        
        <View style={{flex: 1}}>
          <ProductTitleList 
            products={productList}
            navigator={navigator}
          />
        </View>
        
      </View>
    )
  }
}

Product.propTypes = {
  dispatch: PropTypes.func
}

const mapStoreToProps = (store) => {

  return {
    user: store.user
    , products: store.product

  }
}

export default connect(
  mapStoreToProps
)(Product);

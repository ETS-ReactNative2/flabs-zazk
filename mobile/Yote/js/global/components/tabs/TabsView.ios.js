/** 
* Global tabs bar for iOS that is called from MainNavigator
*/

// import react libraries
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// import react-native components
import Navigator from 'Navigator';
import StatusBar from 'StatusBar';
import StyleSheet from 'StyleSheet';
import TabBarIOS from 'TabBarIOS';
import Text from 'Text';
import View from 'View';

// import global components
import Base from '../BaseComponent';
import Home from './Home';

// import module components
import Product from '../../../modules/product/components/Product';
import Profile from '../../../modules/user/components/Profile';

// import actions


// import styles
import YTColors from '../../styles/YTColors';

let styles = StyleSheet.create({
  container: {
    flex: 1
    , flexDirection: 'column'
    , alignSelf: 'stretch'
    , justifyContent: 'center'
    , backgroundColor: '#ffffff'
  }
  , instructions: {
      textAlign: 'center'
      , color: '#333333'
      , marginBottom: 5
    }
  , newText: {
      color: 'green'
    }
  , welcome: {
      fontSize: 20
      , textAlign: 'center'
      , color: '#333333'
      , margin: 10
    }
});

class TabsView extends Base {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'home'
    }
    this._bind('_openNew');
  }

  componentDidMount() {
    StatusBar && StatusBar.setBarStyle('dark-content');
  }

  _openNew() {
    //this.props.navigator.push({newShowing: true});
  }

  _onTabSelect(tab: Tab) {
    console.log("tab selected");
    this.setState({selectedTab: tab});
  }

  render() {
    // console.log("TabsView rendering ");
    // console.log(this.props);
    return (
      <TabBarIOS
        tintColor={YTColors.darkText}
      >

        <TabBarIOS.Item
          title="Home"
          selected={this.state.selectedTab === 'home'}
          onPress={this._onTabSelect.bind(this, 'home')}
          icon={require('./img/house.png')}
          selectedIcon={require('./img/house_filled.png')}
        >
          <Home
            navigator={this.props.navigator}
          />

        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Products"
          selected={this.state.selectedTab === 'products'}
          onPress={this._onTabSelect.bind(this, 'products')}
          icon={require('./img/shoppingBag.png')}
          selectedIcon={require('./img/shoppingBag_filled.png')}
        >
          <Product
            navigator={this.props.navigator}
          />
        </TabBarIOS.Item>


      </TabBarIOS>
    )
  }

}

TabsView.propTypes = {
  dispatch: PropTypes.func
  // tab: PropTypes.string
}

const mapStoreToProps = (store) => {
  return {

  }
}

export default connect(
  mapStoreToProps
)(TabsView);

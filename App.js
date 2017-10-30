import {BarCodeScanner, CAMERA, Permissions} from 'expo';
import React, {Component} from 'react';
import { Alert, NavigatorIOS, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import HomeScreen from './HomeScreen';

export default class App extends Component {

  _handleNavigationRequest() {
    this.refs.nav.push({
      component: MyView,
      title: 'Bar Code Scanner',
      passProps: { qrCode : null },
    });
  }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute =
        {
          {
            component: HomeScreen, title: 'Home',
                passProps: {myProp: 'foo'}, rightButtonTitle: 'Read',
                onRightButtonPress: () => this._handleNavigationRequest(),
          }
        } style =
        {
          { flex: 1 }
        } />
    );
  }
}

class MyView extends Component {

  constructor(props) { 
    super(props);
    this.state = { hasCameraPermission: null, qrCode: null };
  }

  // state = { hasCameraPermission: null, qrCode: null };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({hasCameraPermission: status === 'granted'});
  }

  _handleBarCodeRead = ({ type, data }) => {
    this.setState({ qrCode: data });
    this.props.qrCode = data;
    console.log(this.state.qrCode);
    this.props.navigator.pop();
  };

  // _handleBackPress() {
  //   this.props.navigator.pop();
  // }

  // _handleNextPress(nextRoute) {
  //   this.props.navigator.push(nextRoute);
  // }

  render() {
    const { hasCameraPermission } = this.state;
    // const { qrCode } = this.state;


    // const nextRoute = {
    //   component: MyView,
    //   title: 'Bar That',
    //   passProps: { qrCode: qrCode }
    // };

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text >
            ;
    }
  
    else if (hasCameraPermission === false) {
    return <Text>No access to camera</Text>;
    }
    else {
      return (
        <View style={styles.container}>
          <BarCodeScanner  
            onBarCodeRead={this._handleBarCodeRead}
            style={StyleSheet.absoluteFill}
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
          /></View>
      );
    }
  }
}        

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

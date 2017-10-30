import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textoInicial}>Bem ao APP teste de QrCode</Text>
        <Text style={styles.textoInicial}>{this.props.qrCode}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoInicial: {
    margin: 20,
    fontFamily: 'Cochin',
    fontSize: 12,
    fontWeight: 'bold',
  }
})
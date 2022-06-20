import React, {useState} from 'react';
import {StyleSheet, View, StatusBar, Text} from 'react-native';
import Home from './src/components/Home';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <View>
      <StatusBar />
      <Home />
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({});

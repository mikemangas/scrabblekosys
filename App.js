import React, {useState} from 'react';
import {StatusBar, ScrollView} from 'react-native';
import Home from './src/components/Home';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ScrollView>
      <StatusBar />
      <Home />
      <Toast />
    </ScrollView>
  );
}

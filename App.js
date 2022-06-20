import React from 'react';
import {StatusBar, StyleSheet, ScrollView} from 'react-native';
import Home from './src/components/Home';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <ScrollView style={styles.content}>
      <StatusBar />
      <Home />
      <Toast />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 10,
  },
});

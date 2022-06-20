import React from 'react';
import {StyleSheet, Text} from 'react-native';

export default function CustomText({content, style}) {
  return <Text style={[styles.text, style && style]}>{content}</Text>;
}

const styles = StyleSheet.create({
  text: {
    paddingBottom: 10,
    color: 'black',
    fontSize: 18,
    margin: 10,
  },
});

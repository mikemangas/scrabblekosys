import React, {useState} from 'react';
import {StyleSheet, Button, View, Text, TextInput} from 'react-native';
import Toast from 'react-native-toast-message';
import {scrabbleArray} from './data/scrabbleArray';
const lettersOnlyRegex = /^[a-zA-Z]*$/;

export default function Home() {
  const [word, setWord] = useState('');
  const wordArray = word ? word.split('') : [];
  const numberArray = [];
  const [list, setList] = useState([]);
  let cumulatedScore = 0;
  let listScore = 0;

  wordArray.length > 0 &&
    wordArray.forEach(singleLetter => {
      scrabbleArray.forEach(object => {
        if (object.letter === singleLetter.toUpperCase()) {
          numberArray.push(object.number);
        }
      });
    });

  numberArray.length > 0 &&
    numberArray.forEach(el => {
      cumulatedScore += el;
    });

  list.length > 0 &&
    list.forEach(el => {
      listScore += el.number;
    });

  function createWord(value) {
    if (lettersOnlyRegex.test(value)) {
      setWord(value);
    } else {
      Toast.show({
        visibilityTime: 800,
        type: 'info',
        text1: 'Only letters allowed :-)',
      });
    }
  }

  function addToList(val) {
    setList(el => [
      ...el,
      {word: val.nativeEvent.text, number: cumulatedScore},
    ]);
    setWord('');
  }

  function clearList() {
    setList([]);
  }

  return (
    <View>
      <Text>Hi Kosys</Text>
      <TextInput
        style={styles.input}
        onChangeText={value => createWord(value)}
        value={word}
        onSubmitEditing={val => addToList(val)}
      />
      <Text>Accumulated Score: {cumulatedScore} </Text>
      {list && list.length > 0 && (
        <View>
          <View style={styles.list}>
            <Text style={styles.title}>My List</Text>
            {list.map((el, index) => {
              return (
                <View key={index}>
                  <Text>
                    Wort: {el.word} | Score: {el.number}
                  </Text>
                </View>
              );
            })}
          </View>
          <Text>Total Score: {cumulatedScore + listScore}</Text>
          <Button
            onPress={clearList}
            title="Clear List"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 3,
    margin: 10,
  },
  list: {
    borderColor: 'black',
    borderWidth: 3,
    margin: 10,
  },
  title: {
    fontSize: 30,
    color: 'blue',
  },
});

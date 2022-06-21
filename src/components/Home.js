import React, {useState} from 'react';
import {StyleSheet, Text, Button, View, TextInput, Alert} from 'react-native';
import Toast from 'react-native-toast-message';
import {scrabbleArray} from '../data/scrabbleArray';
import CustomText from './CustomText';

export default function Home() {
  const [word, setWord] = useState('');
  const [list, setList] = useState([]);
  const lettersOnlyRegex = /^[a-zA-Z]*$/;
  const splitWord = word ? word.split('') : [];

  function accumulateScore(arr, isList, scrabbleMap) {
    if (scrabbleMap) {
      const numArray = [];
      arr.length > 0 &&
        arr.forEach(singleLetter => {
          scrabbleMap.forEach(object => {
            if (object.letter === singleLetter.toUpperCase()) {
              numArray.push(object.number);
            }
          });
        });
      return numArray;
    } else {
      let value = 0;
      arr.length > 0 &&
        arr.forEach(el => {
          value += isList ? el.number : el;
        });
      return value;
    }
  }

  const numbers = accumulateScore(splitWord, false, scrabbleArray);
  const cumulatedScore = accumulateScore(numbers, false, false);
  const listScore = accumulateScore(list, true, false);

  function createWord(value) {
    if (lettersOnlyRegex.test(value)) {
      setWord(value);
    } else {
      Toast.show({
        visibilityTime: 1500,
        type: 'info',
        text1: 'Only letters allowed',
      });
    }
  }

  function addToList(val) {
    if (val?.nativeEvent?.text) {
      setList(el => [
        ...el,
        {word: val.nativeEvent.text, number: cumulatedScore},
      ]);
      setWord('');
    }
  }

  function clearList() {
    setList([]);
  }

  function showAlertClearList() {
    return Alert.alert(
      'Hey :-)',
      'Are you sure, you want to delete your history?',
      [
        {text: 'No', onPress: () => console.log('NO')},
        {text: 'Yes', onPress: () => clearList()},
      ],
    );
  }

  return (
    <View style={styles.content}>
      <CustomText
        style={[styles.center, styles.title]}
        content="Scrabble App for Kosys"
      />
      <Text>Type a Scrabble Word</Text>
      <TextInput
        style={[styles.border, styles.textInput]}
        onChangeText={value => createWord(value)}
        placeholder={'e.g. Snake'}
        value={word}
        onSubmitEditing={val => addToList(val)}
      />
      <CustomText
        style={styles.title}
        content={`Accumulated Score: ${cumulatedScore}`}
      />
      {list && list.length > 0 && (
        <View>
          <View style={styles.border}>
            <View style={[styles.lineWrapper, styles.listTitleWrapper]}>
              <CustomText content="Word" style={styles.title} />
              <CustomText content="Score" style={styles.title} />
            </View>
            {list.map((el, index) => {
              return (
                <View style={styles.lineWrapper} key={index}>
                  <CustomText content={el.word} />
                  <CustomText content={el.number} />
                </View>
              );
            })}
          </View>
          <CustomText
            content={`Total Score: ${cumulatedScore + listScore}`}
            style={styles.title}
          />
          <Button
            onPress={showAlertClearList}
            title="Clear List"
            color="#EB5D49"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginBottom: 40,
  },
  title: {
    fontWeight: '600',
  },
  center: {
    alignSelf: 'center',
  },
  border: {
    borderColor: '#EB5D49',
    borderWidth: 3,
  },
  textInput: {
    padding: 10,
    color: 'black',
    fontSize: 16,
  },
  lineWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#EB5D49',
    borderBottomWidth: 1,
  },
  listTitleWrapper: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    paddingBottom: 10,
    paddingTop: 10,
  },
});

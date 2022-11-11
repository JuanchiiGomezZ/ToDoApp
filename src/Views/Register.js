import React from 'react';
import {
  Image,
  View,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
} from 'react-native';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
import SecondaryText from '../Components/Titles/SecondaryTitle';
import HighlightedText from '../Components/Texts/HighlightedText';
import MainText from '../Components/Texts/MainText';
import Input from '../Components/Input/Input';

const styles = require('../Styles/Styles');

const Register = () => {
  return (
    <View style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={require('../Assets/elipse.png')} />
      <View
        style={{
          ...styles.mainOnboarding,
          paddingBottom: 60,
          justifyContent: 'space-between',
        }}>
        <View style={styles.inputGroup}>
          <MainTitle label={'Welcome Onboard!'} />
          <MainText label={'Lets help you meet up your tasks.'} />
        </View>
        <View style={styles.inputGroup}>
          <Input input={'Enter your full name'} />
          <Input input={'Enter your e-mail'} />
          <Input input={'Enter your password'} />
          <Input input={'Confirm password'} />
        </View>
        <View style={styles.inputGroup}>
          <Button label={'Register'} />
          <HighlightedText
            label={'Already have an account?'}
            props={' Sign Up'}
          />
        </View>
      </View>
    </View>
  );
};

export default Register;
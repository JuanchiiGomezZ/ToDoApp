import {
  Image,
  View,
  StatusBar,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
import HighlightedText from '../Components/Texts/HighlightedText';
import MainText from '../Components/Texts/MainText';
import Input from '../Components/Input/Input';
import reactotron from 'reactotron-react-native';
import React, {useEffect} from 'react';
import {showMessage, hideMessage} from 'react-native-flash-message';
import texts from '../Local/en';
const styles = require('../Styles/Styles');
import showMessages from '../Services/ShowMessages';
import {userRegister} from '../Services/Api';
import {useNavigation} from '@react-navigation/native';

const Register = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [validEmail, setValidEmail] = React.useState(false);
  const [validName, setValidName] = React.useState(false);
  const [validPassword, setValidPassword] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState('');
  const navigate = useNavigation();
  //seteamos los estados de los inputs luego de realizar la comprobacion
  const handleConfirmPassword = text => {
    setConfirmPassword(text);
  };

  const checkValidEmail = text => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    setEmail(text);
    if (emailRegex.test(text) && email !== '') {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  };
  const checkValidName = text => {
    const nameRegex = /^[a-zA-Z_ ]*$/;
    setName(text);
    if (nameRegex.test(text) && name !== '') {
      setValidName(true);
    } else {
      setValidName(false);
    }
  };
  const checkValidPassword = text => {
    setPassword(text);
    if (password.length >= 7 && password !== '') {
      setValidPassword(true);
    } else {
      setValidPassword(false);
    }
  };

  const submit = async () => {
    setErrorMsg('');

    if (password.length === 0) {
      showMessage(texts.message.invalid, 'red');
      return;
    } else if (password.length < 7) {
      showMessage(texts.message.invalid, 'red');
      return;
    } else if (password !== confirmPassword) {
      showMessage(texts.message.invalid, 'red');
      return;
    }

    const data = {
      name: name,
      email: email,
      password: password,
    };

    try {
      const response = await userRegister(data);
      reactotron.log('response: ', response);
      navigate.navigate('Login');
    } catch (e) {
      setErrorMsg(e.response.data);
      showMessage(e.response.data, 'red');
      reactotron.log('error: ', e);
    }
  };

  return (
    <SafeAreaView style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={require('../Assets/elipse.png')} />
      <View
        style={{
          ...styles.mainOnboarding,
          justifyContent: 'space-between',
        }}>
        <View style={styles.inputGroup}>
          <MainTitle label={texts.register.mainTitle} />
          <MainText label={texts.register.mainText} />
        </View>
        <View style={styles.inputGroup}>
          <Input
            function={checkValidName}
            input={texts.register.placeHolderName}
            onFocus={() => {
              showMessages(texts.message.name, '#31bfb5');
            }}
          />
          <Input
            function={checkValidEmail}
            input={texts.login.placeHolderEmail}
            keyboard={'email-address'}
            onFocus={() => {
              showMessages(texts.message.email, '#31bfb5');
            }}
          />
          <Input
            function={checkValidPassword}
            security={true}
            input={texts.login.placeHolderPassword}
            onFocus={() => {
              showMessages(texts.message.password, '#31bfb5');
            }}
          />
          <Input
            function={handleConfirmPassword}
            security={true}
            input={texts.register.placeHolderConfirmPassword}
            onFocus={() => {
              showMessages(texts.message.confirmPassword, '#31bfb5');
            }}
          />
          <Button
            label={texts.register.registerBtn}
            onPress={submit}
            screenName={'Register'}
            style={styles.button}
          />
          <HighlightedText
            label={texts.register.highlightedText}
            props={texts.login.logIn}
            screenName={'Login'}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Register;

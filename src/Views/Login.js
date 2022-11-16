import React from 'react';
import {Image, View, StatusBar, KeyboardAvoidingView} from 'react-native';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
import SecondaryTitle from '../Components/Titles/SecondaryTitle';
import HighlightedText from '../Components/Texts/HighlightedText';
import Input from '../Components/Input/Input';
import reactotron from 'reactotron-react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';

const styles = require('../Styles/Styles');

const Login = () => {
  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const navigation = useNavigation();

  // seteamos los estados de los inputs
  const handleName = text => {
    setName(text);
  };
  const handlePassword = text => {
    setPassword(text);
  };

  //mostrar mensaje
  const showMessages = prop => {
    showMessage({
      message: prop,
      type: 'info',
      autoHide: true,
      duration: 3000,
      icon: 'info',
      backgroundColor: '#31bfb5',
      statusBarHeight: 30,
    });
  };

  //local storage
  //guardamos el token en el storage
  const storeData = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
      reactotron.log('storedata' + value);
    } catch (e) {
      // saving error
    }
  };

  //funcion para loguear. Si el usuario existe, se guarda el token en el storage
  //Deberia redireccionar a la pantalla de tareas
  //Deberia mostrar un mensaje de error si el usuario no existe
  const login = () => {
    axios
      .post(
        `${baseUrl}/user/login`,
        {
          email: name,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        reactotron.log(response.data.token);
        storeData(response.data.token);
        showMessages('Login successful');
        navigation.navigate('UserHome');
      })
      .catch(error => {
        console.log(error.response);
      });
    console.log('enviado');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerEnd}>
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
          <MainTitle label={'Welcome Back!'} />
          <Image
            style={styles.imgTitle}
            source={require('../Assets/login.png')}
          />
          <Input input={'Enter your e-mail'} function={handleName} />
          <Input
            input={'Confirm password'}
            security={true}
            function={handlePassword}
          />
        </View>
        <SecondaryTitle
          label={'Forgot password'}
          message={
            'Hemos enviado por email las instrucciones para reestablecer su contrasea'
          }
        />
        <View style={styles.inputGroup}>
          <Button label={'Log in'} onPress={login} />
          <HighlightedText
            label={'Don’t have an account?'}
            props={' Sign Up'}
            screenName={'Register'}
          />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

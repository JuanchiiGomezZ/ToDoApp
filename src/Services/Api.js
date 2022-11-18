import React, {useState} from 'react';
import axios from 'axios';
import showMessages from './ShowMessages';
import reactotron from 'reactotron-react-native';

export function setTokenAuthentication(value) {
  const tokenAuthentication = value;
  return tokenAuthentication;
}

//Estas son las funciones de las apis que son llamadas desde las distintas views

export async function userLogin(data) {
  const email = data.email;
  const password = data.password;
  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';
  const response = await axios
    .post(
      `${baseUrl}/user/login`,
      {
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(response => {
      showMessages('Bienvenido', '#31bfb5');
      return response;
    })
    .catch(error => {
      console.log('ups' + error.response);
    });
  return response;
}

//revisar que no lo escribi yo
export async function userRegister(data) {
  const name = data.name;
  const email = data.email;
  const password = data.password;
  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';
  const response = await axios
    .post(
      `${baseUrl}/user/register`,
      {
        name: name,
        email: email,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    .then(response => {
      showMessages('Datos enviados');
      return response;
    })
    .catch(error => {
      console.log(error.response);
      reactotron.log('error');
    });
  return response;
}

export async function userLogout(data) {
  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';
  const response = await axios
    .post(
      `${baseUrl}/user/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      },
    )
    .then(response => {
      console.log(response);
      return response;
    })
    .catch(error => {
      console.log(error);
    });
  return response;
}

/*
export async function createTask(data) {
  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';
  const response = await axios
    .post(
      `${baseUrl}/task`,
      {
        description: data,
      },
      {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      },
    )
    .then(response => {
      showMessages('Tarea agregadaa', '#31bfb5');
      return response;
    })
    .catch(error => {
      console.log(error.response);
    });
  return response;
}
*/

export async function getTasks(data) {
  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';
  const response = await axios
    .get(`${baseUrl}/task`, {
      headers: {
        Authorization: `Bearer ${data}`,
      },
    })
    .then(response => {
      //reactotron.log('response', response);
      return response;
    })
    .catch(error => {
      console.log(error.response);
    });
  return response;
}
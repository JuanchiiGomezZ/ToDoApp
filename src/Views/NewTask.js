import {
  View,
  Text,
  KeyboardAvoidingView,
  StatusBar,
  Image,
  FlatList,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
const styles = require('../Styles/Styles');
import elipse from '../Assets/elipse.png';
import Input from '../Components/Input/Input.js';
import texts from '../Local/en';
import axios from 'axios';
import {dataAsync} from '../Services/LocalStorage';
import {useNavigation} from '@react-navigation/native';
import {getTasks} from '../Services/Api';
import Button from '../Components/Button/Button';
import MainTitle from '../Components/Titles/MainTitle';
import reactotron from 'reactotron-react-native';
import showMessages from '../Services/ShowMessages';

const NewTask = () => {
  const [task, setTask] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleTask = text => {
    setNewTask(text);
  };

  const [loading, setLoading] = useState(false);

  const baseUrl = 'https://api-nodejs-todolist.herokuapp.com';

  const navigation = useNavigation();

  const where = () => {
    navigation.navigate('UserHome');
  };
  //funciona pero hay que dividirla en modulos
  const createTask = async () => {
    if (newTask == '') {
      reactotron.log(newTask);
      showMessages('Please fill the field', 'red');
    } else {
      const token = await dataAsync();
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios
        .post(
          `${baseUrl}/task`,
          {
            description: setNewTask,
          },
          config,
        )
        .then(response => {
          navigation.navigate('UserHome');
          return response;
        })
        .catch(error => {
          console.log(error.response);
        });
      return response;
    }
  };

  const getAllTasks = async () => {
    setLoading(true);
    const token = await dataAsync();
    const response = await getTasks(token);
    setTask(response.data.data);
    setLoading(false);
    return response.data.data;
  };

  const renderItem = ({item}) => {
    return (
      <View style={{...styles.inputGroup, marginBottom: 20}}>
        <Button label={item.description} />
      </View>
    );
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.containerEnd}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Image style={styles.elipse} source={elipse} />
      <View
        style={{
          ...styles.mainOnboarding,
          marginBottom: 20,
        }}>
        {task ? (
          <FlatList
            data={task}
            style={{height: '50%', width: '100%'}}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getAllTasks} />
            }
          />
        ) : (
          <View style={{...styles.inputGroup, height: '67.9%', width: '100%'}}>
            <MainTitle label="No hay tareas creadas" />
          </View>
        )}
        <Input input={texts.tasks.createName} function={handleTask} />
        <View style={{...styles.inputGroup, marginBottom: 10}}>
          <Button label={texts.tasks.createBtn} onPress={createTask} />
        </View>
        <View style={styles.inputGroup}>
          <Button label={'Return'} onPress={where} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default NewTask;

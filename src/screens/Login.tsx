import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';
const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailMsg, setEmailMsg] = useState('Please Enter Email');
  const handleLogin = async () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    navigation.navigate('Home');
    if (userName === '') {
      setNameError(true);
    } else if (email === '') {
      setNameError(false);
      setEmailError(true);
    } else if (reg.test(email) === false) {
      setNameError(false);
      setEmailError(true);
      setEmailMsg('Please Enter Valid Email');
    } else if (password === '') {
      setNameError(false);
      setEmailError(false);
      setPasswordError(true);
    } else {
      setNameError(false);
      setEmailError(false);
      setPasswordError(false);
      try {
        const response = await axios.post(
          'https://to-do-backend-e479vpwcf-astitva877.vercel.app/api/auth/login',
          {
            username: userName,
            email: email,
            password: password,
          },
        );

        // Handle the response from the API
        console.log(response.data);
      } catch (error) {
        Alert.alert(
          'Something went wrong, please try again with right credentials',
        );
      }
    }
  };
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          'https://to-do-backend-e479vpwcf-astitva877.vercel.app/api/task',
        );
        console.log(response.data);
        // setLoading(false);
      } catch (error) {
        console.log('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: '#ffffff'}}
      behavior="height"
      enabled={false}>
      <View style={{flex: 0.2, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 22, fontWeight: 'bold', color: '#000000'}}>
          Login
        </Text>
      </View>
      <View
        style={{
          flex: 0.4,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}>
        <TextInput
          style={styles.input}
          onChangeText={setUserName}
          value={userName}
          placeholder="User Name"
        />
        {nameError ? (
          <Text style={{color: 'red', fontSize: 11}}>
            Please Enter User Name
          </Text>
        ) : null}
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
        />
        {emailError ? (
          <Text style={{color: 'red', fontSize: 11}}>{emailMsg}</Text>
        ) : null}
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
        />
        {passwordError ? (
          <Text style={{color: 'red', fontSize: 11}}>
            Please Enter Password
          </Text>
        ) : null}
        <TouchableOpacity
          style={{
            backgroundColor: '#64FE2E',
            height: '20%',
            width: '50%',
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => handleLogin()}>
          <Text>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={{flex: 0.4}} />
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  input: {
    height: '22%',
    width: '90%',
    backgroundColor: '#D8D8D8',
    borderRadius: 10,
  },
});

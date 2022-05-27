import React, {useState} from 'react';
import {StyleSheet, View, Alert, TextInput} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import Colors from '../../helpers/Colors';
import {moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import {myDatabase} from '../../helpers/database';

export default function Login({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onHandleLogin = async () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Fill in all the fields!');
      return false;
    }
    try {
      const result = await auth().signInWithEmailAndPassword(email, password);
      console.log(result);
      await myDatabase
        .ref('users/')
        .orderByChild('email')
        .equalTo(email)
        .once('value')
        .then(snapshot => {
          let userData = Object.values(snapshot.val())[0];
          console.log('User data: ', userData);
          navigation.navigate('Home Screen', {userData: userData});
        })
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chapter 7</Text>
      <Surface style={styles.box}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            autoFocus={true}
            value={email}
            onChangeText={value => setEmail(value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            value={password}
            onChangeText={value => setPassword(value)}
            secureTextEntry={true}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onHandleLogin}>
          <Text style={[styles.regularText, {color: Colors.white}]}>LOGIN</Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: moderateScale(8),
          }}>
          <Text style={styles.regularSubText}>Not have Account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register Screen')}>
            <Text style={styles.regularSubText}>Register here!</Text>
          </TouchableOpacity>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: moderateScale(28),
    backgroundColor: Colors.teal,
  },
  box: {
    borderRadius: moderateScale(16),
    elevation: moderateScale(16),
    padding: moderateScale(20),
    height: moderateScale(250),
  },
  title: {
    fontSize: moderateScale(40),
    textAlign: 'center',
    color: Colors.orange,
    marginBottom: moderateScale(20),
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: Colors.white,
    height: moderateScale(50),
    marginBottom: moderateScale(10),
    fontSize: moderateScale(16),
    borderRadius: moderateScale(25),
    padding: moderateScale(12),
    borderColor: Colors.lightGray,
    borderWidth: moderateScale(2),
  },
  button: {
    backgroundColor: Colors.red,
    height: moderateScale(50),
    borderRadius: moderateScale(25),
    padding: moderateScale(12),
    justifyContent: 'center',
    alignItems: 'center',
  },
  regularText: {
    fontWeight: '600',
    fontSize: moderateScale(16),
    color: '#000000',
  },
  regularSubText: {
    fontWeight: '400',
    fontSize: moderateScale(14),
    color: '#000000',
  },
});

import React, {useState} from 'react';
import {StyleSheet, View, Alert, TextInput, Button} from 'react-native';
import {Surface, Text} from 'react-native-paper';
import Colors from '../../helpers/Colors';
import {moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import {myDatabase} from '../../helpers/database';

export default function Register({navigation}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [about, setAbout] = useState('');

  const onHandleRegister = async () => {
    if (name === '' || email === '' || password === '' || about === '') {
      Alert.alert('Error', 'Fill in all the fields!');
      return false;
    }
    try {
      const result = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      let data = {
        name: name,
        email: result.user.email,
        phoneNumber: result.user.phoneNumber,
        photoURL: result.user.photoURL,
        contact: [],
        roomChat: [],
        id: result.user.uid,
        about: about,
      };
      await myDatabase
        .ref('/users/' + data.id)
        .set(data)
        .then(() => {
          Alert.alert('Success', 'Register Successfully!');
          navigation.navigate('Login Screen');
        });
      console.log(result);
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
            placeholder="Enter name"
            autoCapitalize="none"
            autoFocus={true}
            value={name}
            onChangeText={value => setName(value)}
          />
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
          <TextInput
            style={styles.input}
            placeholder="Enter about you"
            autoCapitalize="none"
            autoFocus={true}
            value={about}
            onChangeText={value => setAbout(value)}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={onHandleRegister}>
          <Text style={[styles.regularText, {color: Colors.white}]}>
            REGISTER
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            paddingVertical: moderateScale(8),
          }}>
          <Text style={styles.regularSubText}>Already have Account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login Screen')}>
            <Text style={styles.regularSubText}>Login here!</Text>
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
    height: moderateScale(350),
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

// const createUserByEmail = async () => {
//   try {
//     const result = await auth().createUserWithEmailAndPassword(
//       email,
//       password,
//     );
//     console.log(result);
//     if ('email' in result.user && result.user.email) {
//       await auth().currentUser.updateProfile({
//         displayName: name,
//       });
//       if (name === '' || email === '' || password === '') {
//         Alert.alert('Error', 'Make sure all fields are filled!');
//         return false;
//       }
//       const token = await messaging().getToken();
//       if (token) {
//         let userData = {
//           displayName: name,
//           email: result.user.email,
//           phoneNumber: result.user.phoneNumber,
//           photoURL: result.user.photoURL,
//           contact: [],
//           roomChat: [],
//           _id: result.user.uid,
//           notifToken: token,
//         };
//         await myDatabase
//           .ref(`users/${result.user.uid}`)
//           .set(userData)
//           .then(() => {
//             Alert.alert('Success', 'Register Successfully!');
//             setEmail('');
//             setPassword('');
//             navigation.navigate('Login Screen');
//           });
//       }
//
//     }
//   } catch (error) {
//     if (error.code === 'auth/email-already-in-use') {
//       Alert.alert('That email address is already in use!');
//     }

//     if (error.code === 'auth/invalid-email') {
//       Alert.alert('That email address is invalid!');
//     }
//   }
// };

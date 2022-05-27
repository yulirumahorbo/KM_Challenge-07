import {View, Text, StyleSheet, Image, FlatList} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Colors from '../../helpers/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';
import {myDatabase} from '../../helpers/database';
import uuid from 'react-native-uuid';
import {Avatar} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {moderateScale} from 'react-native-size-matters';

export default function Home(props) {
  const [allUser, setAllUser] = useState([]);

  const {params} = props.route;
  const navigation = props.navigation;
  const userData = params.userData;

  const getAllUser = useCallback(async () => {
    try {
      await myDatabase
        .ref('users/')
        .once('value')
        .then(snapshot => {
          let allUserData = Object.values(snapshot.val());
          console.log('All User data: ', allUserData);
          setAllUser(
            Object.values(snapshot.val()).filter(val => val.id !== userData.id),
          );
        });
    } catch (error) {
      console.log(error);
    }
  }, [userData.id]);

  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const createChatList = data => {
    myDatabase
      .ref('/chatlist/' + userData.id + '/' + data.id)
      .once('value')
      .then(snapshot => {
        console.log('User data: ', snapshot.val());

        if (snapshot.val() == null) {
          let roomId = uuid.v4();
          let myData = {
            roomId,
            id: userData.id,
            name: userData.name,
            email: userData.email,
            lastMsg: '',
          };
          myDatabase
            .ref('/chatlist/' + data.id + '/' + userData.id)
            .update(myData)
            .then(() => console.log('Data updated.'));

          data.lastMsg = '';
          data.roomId = roomId;
          myDatabase
            .ref('/chatlist/' + userData.id + '/' + data.id)
            .update(data)
            .then(() => console.log('Data updated.'));

          navigation.navigate('Chat Screen', {
            receiverData: data,
            userData: userData,
          });
        } else {
          navigation.navigate('Chat Screen', {
            receiverData: snapshot.val(),
            userData: userData,
          });
        }
      });
  };

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => createChatList(item)}>
        <View style={styles.card}>
          <Text style={styles.nameCard}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <View style={styles.header}>
        <Text style={[styles.regularText, {color: Colors.orange}]}>
          {userData.name.toUpperCase()}
        </Text>
        <Text style={[styles.regularSubText, {color: Colors.white}]}>
          {userData.about}
        </Text>
      </View>
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          data={allUser}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    alignSelf: 'center',
    width: '90%',
    marginLeft: 5,
    backgroundColor: Colors.white,
    borderColor: Colors.green,
    borderRadius: 10,
    justifyContent: 'center',
    height: 50,
    borderWidth: 2,
    marginTop: 10,
  },
  nameCard: {
    fontSize: 14,
    color: Colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  header: {
    padding: moderateScale(16),
    backgroundColor: Colors.teal,
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

// const getAllUserData = useCallback(async () => {
//   try {
//     const result = await myDatabase.ref('users/').once('value');
//     const userList = Object.values(result.val()).filter(
//       val => val.email !== userData.email,
//     );
//     setAllUserData(userList);
//   } catch (error) {
//     console.log(error);
//   }
// }, [userData.email]);

// useEffect(() => {
//   getAllUserData();
// }, [getAllUserData]);

// const CardComponent = props => {
//   const {name, email, photo} = props;
//   return (
//     <TouchableOpacity
//       activeOpacity={0.7}
//       style={styles.container}>
//       <View style={styles.avatarContainer}>
//         <View>
//           <Avatar
//             size={56}
//             rounded
//             source={{
//               uri: photo ?? 'https://randomuser.me/api/portraits/men/36.jpg',
//             }}
//           />
//         </View>
//         <View style={styles.desc}>
//           <Text style={styles.regularSubText}>{name}</Text>
//           <Text style={styles.regularSubText}>{email}</Text>
//         </View>
//       </View>
//       <View>
//         <EvilIcons
//           name="envelope"
//           size={moderateScale(32)}
//           color={Colors.turquoise}
//         />
//       </View>
//     </TouchableOpacity>
//   );
// };

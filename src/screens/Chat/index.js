import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  ImageBackground,
  TextInput,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {myDatabase} from '../../helpers/database';
import moment from 'moment';
import {TouchableOpacity} from 'react-native-gesture-handler';
import ChatHeader from '../../components/ChatHeader';
import MsgComponent from '../../components/MsgComponent';
import Colors from '../../helpers/Colors';
import Feather from 'react-native-vector-icons/Feather';
import {moderateScale} from 'react-native-size-matters';

export default function Chat(props) {
  const {params} = props.route;
  const receiverData = params.receiverData;
  const userData = params.userData;
  console.log('receiverData', receiverData);

  const [msg, setMsg] = useState('');
  const [disabled, setdisabled] = useState(false);
  const [allChat, setallChat] = useState([]);

  const onChildAdd = useCallback(() => {
    try {
      myDatabase
        .ref('/messages/' + receiverData.roomId)
        .on('child_added', snapshot => {
          setallChat(state => [snapshot.val(), ...state]);
        });
      return () =>
        myDatabase
          .ref('/messages' + receiverData.roomId)
          .off('child_added', onChildAdd);
    } catch (error) {}
  }, [receiverData.roomId]);

  useEffect(() => {
    onChildAdd();
  }, [onChildAdd]);

  const msgvalid = txt => txt && txt.replace(/\s/g, '').length;
  const sendMsg = () => {
    if (msg === '' || msgvalid(msg) === 0) {
      Alert.alert('Enter something....');
      return false;
    }
    setdisabled(true);
    let msgData = {
      roomId: receiverData.roomId,
      message: msg,
      from: userData?.id,
      to: receiverData.id,
      sendTime: moment().format(''),
      msgType: 'text',
    };

    const newReference = myDatabase
      .ref('/messages/' + receiverData.roomId)
      .push();
    msgData.id = newReference.key;
    newReference.set(msgData).then(() => {
      let chatListupdate = {
        lastMsg: msg,
        sendTime: msgData.sendTime,
      };
      myDatabase
        .ref('/chatlist/' + receiverData?.id + '/' + userData?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));
      console.log("'/chatlist/' + userData?.id + '/' + data?.id", receiverData);
      myDatabase
        .ref('/chatlist/' + userData?.id + '/' + receiverData?.id)
        .update(chatListupdate)
        .then(() => console.log('Data updated.'));

      setMsg('');
      setdisabled(false);
    });
  };
  return (
    <View style={styles.container}>
      <ChatHeader data={receiverData} />
      <ImageBackground
        source={require('../../Assets/background2.jpeg')}
        style={{flex: 1}}>
        <FlatList
          style={{flex: 1}}
          data={allChat}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          inverted
          renderItem={({item}) => {
            return (
              <MsgComponent sender={item.from === userData.id} item={item} />
            );
          }}
        />
      </ImageBackground>
      <View
        style={{
          backgroundColor: Colors.teal,
          elevation: 5,
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: moderateScale(8),
          justifyContent: 'space-evenly',
        }}>
        <TextInput
          style={{
            backgroundColor: Colors.white,
            width: '80%',
            borderRadius: moderateScale(25),
            borderWidth: 0.5,
            borderColor: Colors.white,
            paddingHorizontal: moderateScale(15),
            color: Colors.black,
            fontSize: moderateScale(14),
          }}
          placeholder="type a message"
          placeholderTextColor={Colors.black}
          multiline={true}
          value={msg}
          onChangeText={val => setMsg(val)}
        />

        <TouchableOpacity disabled={disabled} onPress={() => sendMsg()}>
          <Feather name="send" size={30} color={Colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

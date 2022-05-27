import React from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import Colors from '../helpers/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {moderateScale} from 'react-native-size-matters';
import {TouchableOpacity} from 'react-native-gesture-handler';

const ChatHeader = (props, navigation) => {
  const {data} = props;
  console.log(props);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.teal}
        translucent={false}
      />
      <View
        style={{
          flex: 1,
          marginLeft: moderateScale(10),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          // onPress={() => {
          //   navigation.goBack();
          // }}
          >
          <Ionicons name="arrow-back" size={30} color={Colors.white} />
        </TouchableOpacity>
        <Text
          numberOfLines={1}
          style={{
            color: Colors.orange,
            fontSize: moderateScale(18),
            textTransform: 'capitalize',
            paddingLeft: moderateScale(5),
          }}>
          {data.name}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: Colors.teal,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChatHeader;

import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Colors from '../helpers/Colors';
import TimeDelivery from './TImeDelivery';
import {moderateScale} from 'react-native-size-matters';

const MsgComponent = props => {
  const {sender, item} = props;

  // console.log("item",item)
  return (
    <Pressable style={{marginVertical: 0}}>
      <View
        style={[styles.TriangleShapeCSS, sender ? styles.right : [styles.left]]}
      />
      <View
        style={[
          styles.masBox,
          {
            alignSelf: sender ? 'flex-end' : 'flex-start',
            backgroundColor: sender ? Colors.teal : Colors.white,
          },
        ]}>
        <Text
          style={{
            paddingLeft: 5,
            color: sender ? Colors.white : Colors.black,
            fontSize: moderateScale(14),
          }}>
          {item.message}
        </Text>

        <TimeDelivery sender={sender} item={item} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  masBox: {
    alignSelf: 'flex-end',
    marginHorizontal: moderateScale(10),
    minWidth: moderateScale(80),
    maxWidth: '80%',
    paddingHorizontal: moderateScale(10),
    marginVertical: moderateScale(5),
    paddingTop: moderateScale(5),
    borderRadius: moderateScale(10),
  },
  timeText: {
    fontFamily: 'AveriaSerifLibre-Light',
    fontSize: 10,
  },
  dayview: {
    alignSelf: 'center',
    height: moderateScale(30),
    width: moderateScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(30),
    marginTop: moderateScale(10),
  },
  iconView: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: moderateScale(21),
    alignItems: 'center',
    justifyContent: 'center',
  },
  TriangleShapeCSS: {
    position: 'absolute',
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: moderateScale(15),
    borderRightWidth: moderateScale(5),
    borderBottomWidth: moderateScale(20),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  left: {
    borderBottomColor: Colors.white,
    left: 2,
    bottom: 10,
    transform: [{rotate: '0deg'}],
  },
  right: {
    borderBottomColor: Colors.teal,
    right: 2,
    bottom: 5,
    transform: [{rotate: '103deg'}],
  },
});

export default MsgComponent;

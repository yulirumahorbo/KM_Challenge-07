import {Icon} from 'native-base';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../helpers/Colors';

const TimeDelivery = props => {
  const {sender, item} = props;
  return (
    <View
      style={[
        styles.mainView,
        {
          justifyContent: 'flex-end',
        },
      ]}>
      <Text
        style={{
          fontFamily: 'Poppins-Regular',
          fontSize: 7,
          color: sender ? Colors.white : Colors.black,
        }}
      />
      <Icon
        name={'checkmark-done'}
        type="Ionicons"
        style={{
          color: item.seen ? Colors.black : Colors.white,
          fontSize: 15,
          marginLeft: 5,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
});

export default TimeDelivery;

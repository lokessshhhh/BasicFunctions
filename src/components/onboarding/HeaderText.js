//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {myColors} from '../../theme/colors';
import {Img} from '../../theme/Img';
import {HindGuntur} from '../../theme/layout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

// create a component
const HeaderText = ({headerView,showButton,headerText,onPress}) => {
  return (
    <View
      style={[
        headerView,
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: hp(1.5),
          marginLeft: wp(5),
        },
      ]}
    >
      {showButton ? (
        <TouchableOpacity 
        onPress={onPress}
        style={{marginRight: wp(5), marginBottom: hp(1.5)}}
        >
          <Image
            resizeMode="contain"
            style={{height: hp(4), width: hp(4)}}
            source={Img.leftwhitearr}
          />
        </TouchableOpacity>
      ) : null}
      <Text
        style={{
          fontFamily: HindGuntur.Semibold,
          color: myColors.white,
          fontSize: hp(3.2),
        }}
      >
        {headerText}
      </Text>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

//make this component available to the app
export default HeaderText;

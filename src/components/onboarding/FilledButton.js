import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { myColors } from '../../theme/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    HindGuntur,
  } from '../../theme/layout';

const FilledButton = ({ title, onPress ,ButtonStyle,TextStyle}) => {
  return (
    <TouchableOpacity 
    onPress={onPress} style={[styles.button,ButtonStyle]}>
      <Text 
      style={[styles.buttonText,TextStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: myColors.buttonBG,
    height:hp(6),
    borderRadius: 10,
    width:wp(90),
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical:hp(1.5),
    flexWrap:'wrap'
  },
  buttonText: {
    width:'100%',
    fontFamily:HindGuntur.Semibold,
    color:myColors.white,
    fontSize: hp(2.5),
    textAlign: 'center',
  },
});

export default FilledButton;
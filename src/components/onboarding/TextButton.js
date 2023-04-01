import React from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import {myColors} from '../../theme/colors';
import {HindGuntur} from '../../theme/layout';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const TextWithButton = ({
  text,
  buttonText,
  onButtonPress,
  textStyle,
  buttonStyle,
  mainStyle
}) => {
  return (
    <View style={[styles.container,mainStyle]}>
      <Text style={[styles.text, textStyle]}>{text}</Text>
      <TouchableOpacity onPress={onButtonPress}>
        <Text style={[styles.button, buttonStyle]}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp(90),
    justifyContent: 'center',
  },
  text: {
    fontSize: hp(2.7),
    fontFamily: HindGuntur.Regular,
    color: myColors.black,
  },
  button: {
    fontSize: hp(2.7),
    fontFamily: HindGuntur.Semibold,
    color: myColors.buttonBG,
  },
});

export default TextWithButton;

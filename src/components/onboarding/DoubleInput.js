import React, {useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';
import {myColors} from '../../theme/colors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';

const DoubleInput = ({
  placeholder,
  Icon,
  value,
  onChangeText,
  pressable,
  onPress,
  secureTextEntry,
  onBlur,
  maxLength,
  showLength,
  phoneLength,
  InputViewStyle
}) => {

  return (
    <View style={[styles.inputContainer]}>
      <TextInput
        maxLength={maxLength}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={myColors.black}
        style={[styles.input,InputViewStyle]}
        placeholder={placeholder}
      />
      <TouchableOpacity 
      style={{flexDirection:'row',alignItems:'center'}}
      onPress={onPress} disabled={pressable ? false : true}>
        {showLength ? (
          <Text
            style={{
              alignSelf: 'flex-end',
              marginRight: wp(5),
              fontSize: 12,
              margin: 3,
              color:myColors.greytext
            }}
          >
            {phoneLength}/10
          </Text>
        ) : null}
        <Image resizeMode="contain" source={Icon} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: hp(1),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: myColors.textinputBG,
    borderRadius: 10,
    width: wp(90),
    height: hp(6),
    paddingHorizontal: 15,
  },
  input: {
    width: '90%',
    height: '100%',
    color: myColors.black,
  },
  icon: {
    width: hp(3),
    height: hp(3),
    tintColor: myColors.greytext,
  },
});

export default DoubleInput;

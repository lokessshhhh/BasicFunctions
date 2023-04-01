//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { myColors } from '../../theme/colors';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
    HindGuntur,
  } from '../../theme/layout';

// create a component
const TitleText = ({titleText,titleTextStyle}) => {
    return (
            <Text
            style={[titleTextStyle,{fontSize:hp(2.7),fontFamily:HindGuntur.Semibold,color:myColors.black}]}
            >{titleText}</Text>
    );
};

export default TitleText;

//import liraries
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import {Img} from '../../theme/Img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  HindGuntur,
} from '../../theme/layout';
import {lang} from '../../locales/lang';
import {onboardingStyles} from './onboardingStyles';
import {myColors} from '../../theme/colors';

class SplashScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    this.changeLanguage();
    this.timer = setTimeout(() => {
      this.props.navigation.replace('LoginOption');
    }, 4000);

    return () => clearTimeout(this.timer);
  }

  changeLanguage = language => {
    lang.setLanguage('en');
  };

  handleButtonPress = () => {
    clearTimeout(this.timer);
    this.props.navigation.replace('LoginOption');
  };

  render() {
    return (
      <SafeAreaView
        style={[
          onboardingStyles.mainFlex,
          {backgroundColor: myColors.buttonBG, alignItems: 'center'},
        ]}
      >
        <View style={{alignItems: 'center', marginTop: '20%'}}>
          <Image
            resizeMode="contain"
            style={{height: hp(12.5), width: hp(12.5)}}
            source={Img.appLogo}
          />
          <Text style={onboardingStyles.headerText}>{lang.splashheader}</Text>
          <Text style={[onboardingStyles.headerText, {marginTop: hp(-2.5)}]}>
            Taxival
          </Text>
        </View>

        <Image
          resizeMode="contain"
          style={{height: hp(30), width: hp(30), marginTop: '15%'}}
          source={Img.splashLogo}
        />

        <TouchableOpacity
          onPress={() => {
            this.handleButtonPress();
          }}
          style={{position: 'absolute', bottom: hp(0), alignSelf: 'center'}}
        >
          <Image
            resizeMode="cover"
            style={{height: hp(13.5), width: wp(48)}}
            source={Img.opalArrow}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default SplashScreen;

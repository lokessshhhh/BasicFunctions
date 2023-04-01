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
import FilledButton from '../../components/onboarding/FilledButton';

// const [locale, setLocale] = useState(localization.getInterfaceLanguage());

class LoginOption extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  handleButtonPress = () => {
    this.props.navigation.navigate('LoginScreen', {screen: 'withPhone'});
  };


  render() {
    return (
      <SafeAreaView
        style={[
          onboardingStyles.mainFlex,
          {backgroundColor: myColors.buttonBG, alignItems: 'center'},
        ]}
      >
        <View
          style={{alignItems: 'center', marginTop: '45%', marginBottom: '10%'}}
        >
          <Image
            resizeMode="contain"
            style={{height: hp(12.5), width: hp(12.5)}}
            source={Img.appLogo}
          />
          <Text style={onboardingStyles.headerText}>{lang.letsstart}</Text>
        </View>

        <FilledButton
          onPress={() => {
            this.props.navigation.navigate('LoginScreen', {
              screen: 'withPhone',
            });
          }}
          ButtonStyle={{borderColor: myColors.white, borderWidth: 2,padding: 7,}}
          title={lang.loginwithNum}
        />
        <FilledButton
          onPress={() => {
            this.props.navigation.navigate('LoginScreen', {
              screen: 'withEmail',
            });
          }}
          TextStyle={{color: myColors.lightgreyText}}
          ButtonStyle={{backgroundColor: myColors.white}}
          title={lang.loginwithEmail}
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

export default LoginOption;

//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
} from 'react-native';
import {onboardingStyles} from './onboardingStyles';
import {Img} from '../../theme/Img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  HindGuntur,
} from '../../theme/layout';
import HeaderText from '../../components/onboarding/HeaderText';
import {lang} from '../../locales/lang';
import TitleText from '../../components/onboarding/TitleText';
import CountryInput from '../../components/onboarding/CountryInput';
import FilledButton from '../../components/onboarding/FilledButton';
import TextWithButton from '../../components/onboarding/TextButton';
import {myColors} from '../../theme/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OTPTextView from 'react-native-otp-textinput';

class VerificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: '',
      seconds: 60,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      if (this.state.seconds > 0) {
        this.setState({seconds: this.state.seconds - 1});
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <SafeAreaView style={onboardingStyles.mainFlex}>
        <KeyboardAwareScrollView
          contentContainerStyle={{flex: Platform.OS === 'ios' ? 1 : null}}
        >
          <ImageBackground
            resizeMode="stretch"
            style={onboardingStyles.loginBG}
            source={Img.verifyBG}
          >
            <HeaderText
              onPress={() => {
                this.props.navigation.goBack();
              }}
              showButton
              headerText={lang.verification}
            />

            <View style={{marginTop: '30%', alignItems: 'center'}}>
              <Image
                resizeMode="contain"
                style={{height: hp(25), width: hp(25), marginBottom: hp(2.5)}}
                source={Img.verifyBGLogo}
              />
              <TitleText titleText={lang.verifyCode} />
              <Text
                style={{
                  fontSize: hp(2),
                  marginBottom: hp(1),
                  fontFamily: HindGuntur.Regular,
                  color: myColors.greytext,
                }}
              >
                {lang.sentto}
                {'+132 29473943'}
              </Text>

              <OTPTextView
                handleTextChange={e => {
                  this.setState({
                    otp: e,
                  });
                }}
                inputCount={4}
                inputCellLength={1}
                containerStyle={{
                  alignSelf: 'center',
                }}
                textInputStyle={{
                  height: hp(5),
                  width: hp(5),
                  borderBottomColor: myColors.black,
                  borderWidth: 1,
                  borderBottomWidth: 1,
                  borderColor: myColors.textinputBG,
                  borderRadius: 10,
                  backgroundColor: myColors.textinputBG,
                }}
              />
              <Text
                style={{
                  fontSize: hp(1.8),
                  marginVertical: hp(0.5),
                  fontFamily: HindGuntur.Regular,
                  color:
                    this.state.seconds === 0 ? myColors.red : myColors.greytext,
                }}
              >
                00:
                {this.state.seconds < 10
                  ? `0${this.state.seconds}`
                  : this.state.seconds}'s
              </Text>
              {this.state.seconds === 0 ? (
                <Text
                  style={{
                    fontSize: hp(2),
                    marginVertical: -10,
                    fontFamily: HindGuntur.Regular,
                    color: myColors.red,
                  }}
                >
                  otp Expired please request new otp
                </Text>
              ) : null}

              <FilledButton title={lang.verify} />
              <TextWithButton
                textStyle={{fontSize: hp(2.2)}}
                buttonStyle={{
                  fontSize: hp(2.2),
                }}
                text={lang.notrecieved}
                buttonText={` ${lang.resend}`}
              />
            </View>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default VerificationScreen;

import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from '../../theme/layout';
import {HindGuntur} from '../../theme/layout';
import {myColors} from '../../theme/colors';
import {Platform} from 'react-native';

export const onboardingStyles = StyleSheet.create({
  mainFlex: {
    flex: 1,
    backgroundColor:myColors.white
  },

  // Splash Screen Styles

  splashBG: {
    height: hp(100),
    width: wp(100),
  },
  headerText: {
    fontSize: hp(4),
    color: 'white',
    fontFamily: HindGuntur.Bold,
    marginTop:hp(1.8)
  },

  // Login Screen Styles

  loginBG: {
    height: Platform.OS === 'android' ? hp(100) : '100%',
    width: '100%',
    // flex:1
  },

  // forget Password screen

  forgotPassbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginRight: wp(5),
    marginBottom:-7,
    marginTop: hp(1),
  },
  forgetPassText: {
    fontFamily: HindGuntur.Regular,
    fontSize: hp(1.7),
    marginLeft: wp(3),
    color: myColors.black,
  },
  titleText:{
    textAlign: 'center',
    fontSize: hp(1.8),
    marginBottom: hp(1),
    width: wp(90),
    marginTop: hp(1),
    fontFamily: HindGuntur.Regular,
    color: myColors.greytext,
  }
});

//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  Platform,
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
import FilledButton from '../../components/onboarding/FilledButton';
import TextWithButton from '../../components/onboarding/TextButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DoubleInput from '../../components/onboarding/DoubleInput';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {myColors} from '../../theme/colors';

class ForgetPass extends Component {
  constructor(props) {
    super(props);
  }

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please Enter Valid Email')
      .required('Email is required'),
  });

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
              headerText={lang.forgetPass}
            />
            <Formik
              initialValues={{email: ''}}
              onSubmit={values => {}}
              validationSchema={this.validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isValid,
              }) => (
                <View style={{marginTop: hp(15), alignItems: 'center'}}>
                  <Image
                    resizeMode="contain"
                    style={{height: hp(25), width: hp(25), marginBottom: hp(5)}}
                    source={Img.forgetpassBG}
                  />
                  <TitleText titleText={lang.forgetPass} />
                  <Text style={onboardingStyles.titleText}>
                    {lang.sendverifyCode}
                  </Text>
                  <DoubleInput
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    placeholder={lang.email}
                    Icon={Img.emailIcon}
                  />

                  {errors.email && touched.email && (
                    <Text
                      style={{
                        color: myColors.red,
                        marginLeft: wp(5.3),
                        fontSize: 12.5,
                        alignSelf: 'flex-start',
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}
                  <FilledButton
                    onPress={() => {
                      handleSubmit();
                      this.props.navigation.navigate('ForgotVerifyScreen');
                    }}
                    title={lang.sendPass}
                  />
                  <TextWithButton
                    onButtonPress={() => {
                      this.props.navigation.navigate('LoginScreen');
                    }}
                    textStyle={{fontSize: hp(2.2)}}
                    buttonStyle={{
                      fontSize: hp(2.2),
                    }}
                    text={lang.alreadyacc}
                    buttonText={` ${lang.login}`}
                  />
                </View>
              )}
            </Formik>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default ForgetPass;

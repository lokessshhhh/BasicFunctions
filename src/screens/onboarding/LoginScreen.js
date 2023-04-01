//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  Platform,
  ScrollView,
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
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DoubleInput from '../../components/onboarding/DoubleInput';
import {Formik} from 'formik';
import * as Yup from 'yup';

class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isScreen: '',
      showPass: false,
    };
  }

  validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Please Enter Valid Email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    mobile: Yup.string()
      .required('Mobile number is required')
      .test('is-number', 'Input must be a number', (value) => {
        return /^[0-9]+$/.test(value);
      })
      .min(4,'Number must be minimum 4 digits'),
  });

  componentDidMount() {
    const route = this.props;
    this.setState({
      isScreen: route.route.params.screen,
    });
  }

  render() {
    return (
      <SafeAreaView style={onboardingStyles.mainFlex}>
        <KeyboardAwareScrollView
          scrollEnabled={true}
          contentContainerStyle={{flex: Platform.OS === 'ios' ? 1 : null}}
        >
          <ImageBackground
            resizeMode="stretch"
            style={onboardingStyles.loginBG}
            source={Img.loginBG}
          >
            <HeaderText headerText={lang.login} />
            <ScrollView showsVerticalScrollIndicator={false}>
              <Formik
                initialValues={{mobile: '', email: '', password: ''}}
                onSubmit={values => console.log(values)}
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
                  <View
                    style={{
                      marginTop: Platform.OS === 'ios' ? '85%' : '100%',
                      alignItems: 'center',
                    }}
                  >
                    <TitleText
                      titleText={
                        this.state.isScreen === 'withEmail'
                          ? lang.withemail
                          : lang.withmobnum
                      }
                    />
                    {this.state.isScreen === 'withPhone' ? (
                      <View>
                        <CountryInput
                          phoneLength={values.mobile.length}
                          onChangeText={handleChange('mobile')}
                          onBlur={handleBlur('mobile')}
                          value={values.mobile}
                        />
                        {errors.mobile && touched.mobile && (
                          <Text
                            style={{
                              color: myColors.red,
                              marginLeft: 5,
                              fontSize: 12.5,
                            }}
                          >
                            {errors.mobile}
                          </Text>
                        )}
                        <FilledButton
                          onPress={() => {
                            handleSubmit('mobile');
                            this.props.navigation.navigate('VerificationScreen');
                          }}
                          title={lang.continue}
                        />
                      </View>
                    ) : (
                      <View>
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
                              marginLeft: 5,
                              fontSize: 12.5,
                            }}
                          >
                            {errors.email}
                          </Text>
                        )}
                        <DoubleInput
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                          value={values.password}
                          secureTextEntry={
                            this.state.showPass === false ? true : false
                          }
                          onPress={() => {
                            this.setState({
                              showPass: !this.state.showPass,
                            });
                          }}
                          pressable
                          Icon={
                            this.state.showPass === false
                              ? Img.eyecloseIcon
                              : Img.eyeopenIcon
                          }
                          placeholder={lang.password}
                        />
                        {errors.password && touched.password && (
                          <Text
                            style={{
                              color: myColors.red,
                              marginLeft: 5,
                              fontSize: 12.5,
                            }}
                          >
                            {errors.password}
                          </Text>
                        )}
                        <TouchableOpacity
                          onPress={() => {
                            this.props.navigation.navigate('ForgetPass');
                          }}
                          style={onboardingStyles.forgotPassbutton}
                        >
                          <Image
                            resizeMode="contain"
                            style={{
                              height: hp(2.2),
                              width: hp(2.2),
                              marginBottom: hp(0.7),
                            }}
                            source={Img.checkbox}
                          />
                          <Text style={onboardingStyles.forgetPassText}>
                            {lang.forgetPass}
                          </Text>
                        </TouchableOpacity>

                        <FilledButton
                          onPress={() => {
                            handleSubmit('email', 'password');
                            this.props.navigation.navigate(
                              'VerificationScreen',
                            );
                          }}
                          title={lang.continue}
                        />
                      </View>
                    )}
                    <TextWithButton
                      textStyle={{fontSize: hp(2.4)}}
                      buttonStyle={{
                        fontSize: hp(2.4),
                      }}
                      mainStyle={{marginTop: -10}}
                      onButtonPress={() => {
                        this.props.navigation.navigate('SignUpScreen');
                      }}
                      text={lang.noacc}
                      buttonText={` ${lang.register}`}
                    />
                    <TextWithButton
                      textStyle={{color: myColors.greytext, fontSize: hp(2)}}
                      buttonStyle={{
                        fontSize: hp(2),
                        fontFamily: HindGuntur.Regular,
                        textDecorationLine: 'underline',
                      }}
                      text={lang.initialpolicy}
                      buttonText={` ${lang.privacyPolicy}`}
                    />
                    <TextWithButton
                      mainStyle={{marginTop: -10}}
                      textStyle={{color: myColors.greytext, fontSize: hp(2)}}
                      buttonStyle={{
                        fontSize: hp(2),
                        fontFamily: HindGuntur.Regular,
                        textDecorationLine: 'underline',
                      }}
                      text={lang.initialTerms}
                      buttonText={` ${lang.terms}`}
                    />
                  </View>
                )}
              </Formik>
            </ScrollView>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default LoginScreen;

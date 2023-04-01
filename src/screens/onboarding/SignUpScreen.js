//import liraries
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView
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
import {myColors} from '../../theme/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DoubleInput from '../../components/onboarding/DoubleInput';
import * as Yup from 'yup';
import {Formik} from 'formik';

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: false,
      showconfPass: false,
    };
  }

  validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    phoneNumber: Yup.string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

  render() {
    return (
      <SafeAreaView style={onboardingStyles.mainFlex}>
        <KeyboardAwareScrollView
          // scrollEnabled={false}
          // nestedScrollEnabled={false}
          contentContainerStyle={{flex: Platform.OS === 'ios' ? 1 : null}}
        >
          <ImageBackground
            resizeMode="stretch"
            style={onboardingStyles.loginBG}
            source={Img.registrationBG}
          >
            <HeaderText headerText={lang.registration} />
            <Formik
              initialValues={{
                username: '',
                phoneNumber: '',
                email: '',
                password: '',
                confirmPassword: '',
              }}
              validationSchema={this.validationSchema}
              onSubmit={values => console.log(values)}
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
                <ScrollView 
                showsVerticalScrollIndicator={false}
                style={{marginTop: '60%',marginLeft:wp(5)}}>
                  <TitleText titleText={lang.createacc} />
                  <DoubleInput
                    placeholder={lang.username}
                    Icon={Img.userIcon}
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                  />
                  {touched.username && errors.username && (
                    <Text 
                    style={{
                      color: myColors.red,
                      marginLeft: 5,
                      fontSize: 12.5,
                    }}>{errors.username}</Text>
                  )}

                  <DoubleInput
                    phoneLength={values.phoneNumber.length}
                    InputViewStyle={{width:"70%"}}
                    showLength
                    maxLength={10}
                    placeholder={lang.phoneNum}
                    Icon={Img.phoneIcon}
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={{
                      color: myColors.red,
                      marginLeft: 5,
                      fontSize: 12.5,
                    }}>{errors.phoneNumber}</Text>
                  )}

                  <DoubleInput
                    placeholder={lang.email}
                    Icon={Img.emailIcon}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {touched.email && errors.email && <Text style={{
                            color: myColors.red,
                            marginLeft: 5,
                            fontSize: 12.5,
                          }}>{errors.email}</Text>}

                  <DoubleInput
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
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={{
                      color: myColors.red,
                      marginLeft: 5,
                      fontSize: 12.5,
                    }}>{errors.password}</Text>
                  )}

                  <DoubleInput
                    secureTextEntry={
                      this.state.showconfPass === false ? true : false
                    }
                    onPress={() => {
                      this.setState({
                        showconfPass: !this.state.showconfPass,
                      });
                    }}
                    pressable
                    Icon={
                      this.state.showconfPass === false
                        ? Img.eyecloseIcon
                        : Img.eyeopenIcon
                    }
                    placeholder={lang.confpassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={{
                      color: myColors.red,
                      marginLeft: 5,
                      fontSize: 12.5,
                    }}>{errors.confirmPassword}</Text>
                  )}

                  <FilledButton
                    onPress={() => {
                      handleSubmit();
                      // this.props.navigation.navigate('LoginScreen');
                    }}
                    title={lang.registration}
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
                </ScrollView>
              )}
            </Formik>
          </ImageBackground>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    );
  }
}

export default SignUpScreen;

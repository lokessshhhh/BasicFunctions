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
import FilledButton from '../../components/onboarding/FilledButton';
import TextWithButton from '../../components/onboarding/TextButton';
import {myColors} from '../../theme/colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DoubleInput from '../../components/onboarding/DoubleInput';
import * as Yup from 'yup';
import {Formik} from 'formik';

class ResetPass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPass: false,
      showconfPass: false,
    };
  }

  validationSchema = Yup.object().shape({
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
              headerText={lang.resetpass}
            />

            <Formik
              initialValues={{
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
                <View style={{marginTop: '35%', alignItems: 'center'}}>
                  <Image
                    resizeMode="contain"
                    style={{
                      height: hp(22.5),
                      width: hp(22.5),
                      marginBottom: hp(5),
                    }}
                    source={Img.forgetpassBG}
                  />
                  <TitleText titleText={lang.resetpass} />

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
                    placeholder={lang.newPass}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={{
                      color: myColors.red,
                      marginLeft: wp(5.3),
                      fontSize: 12.5,
                      alignSelf:'flex-start'
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
                    placeholder={lang.confnewPass}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                     {touched.confirmPassword && errors.confirmPassword && (
                    <Text style={{
                      color: myColors.red,
                      marginLeft: wp(5.3),
                      fontSize: 12.5,
                      alignSelf:'flex-start'
                    }}>{errors.confirmPassword}</Text>
                  )}

                  <FilledButton
                    onPress={() => {
                      handleSubmit('password','confirmPassword');
                      // this.props.navigation.navigate('LoginScreen');
                    }}
                    title={lang.resetpass}
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

export default ResetPass;

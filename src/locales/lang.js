import LocalizedStrings from 'react-native-localization';

const translations = {
    en: require('./en.json'),
    sp: require('./sp.json'),
  };
  
  export const lang = new LocalizedStrings(translations);
import { Dimensions, Platform } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

// responsive
const responsiveHeight = (h) => {
  return deviceHeight * (h / 100);
};
const responsiveWidth = (w) => {
  return deviceWidth * (w / 100);
};

const NAV_HEIGHT = responsiveHeight(6.6);
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 24;

// button size
const btnWidth = {
  normal: responsiveWidth(74.4),
  large: responsiveWidth(91.47),
};
let btnHeight = 48;
export const tabHeight = responsiveHeight(8);
export const drawerWidth = responsiveWidth(80);
let smallbtnHeight = 30;

let scrollableTabHeight = 50;

// input box height
let inputHeight = 43;

// margin or padding horizontal
const   marginHorizontal = {
  large: responsiveWidth(12.8), // margin = 48
  normal: responsiveWidth(8.5), // margin = 32
  semiSmall: responsiveWidth(6.4), // margin = 24
  small: responsiveWidth(4.27), // margin = 16,
  extraSmall: responsiveWidth(2),
  xsmall:responsiveWidth(3),
  XXS: responsiveWidth(1),
  XLARGE: responsiveWidth(24),
  XXL: responsiveWidth(28),
  Big:responsiveWidth(36),
  ExtraBig:responsiveWidth(42),
  toosmall:responsiveWidth(3),
  flatlistmargin:responsiveWidth(2),
  smallest:responsiveWidth(1)
};

// margin or padding vertical
const  spaceVertical = {
  XXlarge: responsiveHeight(20),
  extraLarge:responsiveHeight(12),
  large: responsiveHeight(7.19), // space = 48
  normal: responsiveHeight(4.8), // space = 32
  semiSmall: responsiveHeight(3.6), // space = 24
  small: responsiveHeight(2.4), // space = 16
  extraSmall: responsiveHeight(1.5),
  tiny:responsiveHeight(1),
  tiny1:responsiveHeight(0.5),
};

let reptativeColors = {
  black: '#121314',
  white: '#fff',
  blue: 'rgb(59,89,152)',
};

//component colors are decalred in capital
//light theme
const colors = {
  bacgray:"#101010",
  bluebtn:'#41A7E2',
  linecolor:'#191919',
  halfwhite:'#FFFFFF50',
  semipurple:'#EBE5FD',
  lightpurple:'#F8F6FF',
  purple:'#7654D3',
  mintgreen:"#45B08C",
  green2:'#E1F7DE',
  shadowpink:'#FFE8E8',
  shadowgreen:'#D5F7EA',
  darkgray:'#505153',
  lightblue:'#EEF6FA',
  grayline:'#E4E4E4',
  graytext:' #959393',
  projectgreen:'#1AAA74',
  skyblue:'#ECF6FD',
  lightgreen:'#EEFAF1',
  lightestgreen:'#edf2ef',
  yellow:'#FFC554',
  formField: '#000000',
  footerIcon: '#FFFFFF',
  otpcolor:'#D9D9D9',
  nocolor:'#000000',
  bordercolor:'#E7EFE7',
  locationtext:'#1B1D21',
  headerbgColor:'#EDEDED', 
  promocode:"#0152CC",
  promocodeBg:"#CCDCF5",
  dictionaer:'rgba(248,115,33,0.39)',
  toggleButton:'#219A0B',
  tabBackground: '#EAECEF',
  listingBg:'#EEEEEE',
  buttonShadow:'#FFB849',
  backGroundColor:'#FFFEF7',
  primary: '#4FBF67',
  darkSecondary:"#42A7E2",
  dotsActive : '#62EFAD',
  label: '#1B1D21',
  topBorder:'rgba(216,216,216,0.5)',
  green: '#35B729',
  red: '#cb0026',
  irisBlue: '#4ecdc4',
  blue: reptativeColors.blue,
  white: reptativeColors.white,
  black: reptativeColors.black,
  separator : '#47A6EE',
  darkGray: 'rgb(74,74,74)',
  gray: 'rgba(255, 255, 255, 0.1)',
  orange:'#ff4f00',
  lightGray: 'rgb(216,216,216)',
  gray10: '#bbbbbb',
  detailtext:'#808080',
  placeholder: '#818589',
  secondary: '#03181C',
  lightpink: '#FDE4E4',
  background: '#F9F9FB',
  textDark: '#1B1D21',
  price: '#E4723C',
  textLight: '#CDCDCD',
  TEXT: reptativeColors.black,
  darkPrimary: '#18AA74',
  BACKGROUND_COLOR: '#fff',
  input: '#fff',
  inputBg:'#F5F5F5',
  DROPDOWN: '#fff',
  DROPDOWN_BORDER: '#000',
  TEXT_MUTED: '#808080',
  CATEGORY: '#fff',
  inputBorder: '#c9c9c9',
  GRAPH_BACKGROUND: '#fff',
  muted: 'rgb(74,74,74)',
  HARD_WHITE: '#fff',
  HARD_BLACK: '#000',
  REDEEM_DISABLED:'#0F0F0F',
  REDEEM_ENABLED:'#F1565B',
  tabBg:'#EAECEF',
  text:'#404B63',
  lighttext:'#B8C0C9',
  btnShadow:'#FFB849',
  toggleBtn:'#219A0B',
  bgColor:'#FFFEF7',
  headerbg: 'rgba(0,0,0,0.5)',
  headerbg2: 'rgba(0,0,0,0)',
};

//dark theme
export const darkColors = {
  green: '#35B729',
  red: '#cb0026',
  irisBlue: '#00ADAE',
  blue: reptativeColors.blue,
  white: '#2e353d',
  black: reptativeColors.white,
  darkGray: 'rgb(74,74,74)',
  gray: '#070226',
  lightGray: 'rgb(216,216,216)',
  primary: '#F1565B',
  secondary: '#070226',
  lightpink: '#FDE4E4',
  background: '#F9F9FB',
  textDark: '#313234',
  price: '#E4723C',
  textLight: '#CDCDCD',
  TEXT: reptativeColors.white,
  BUTTON: reptativeColors.blue,
  BACKGROUND_COLOR: '#000',
  input: '#fff',

  DROPDOWN: '#070226',
  DROPDOWN_BORDER: '#fff',
  TEXT_MUTED: '#b5b5b5',
  CATEGORY: '#070226',
  inputBorder: '#c9c9c9',
  GRAPH_BACKGROUND: '#2e353d',
  muted: 'rgb(216,216,216)',
  HARD_WHITE: '#fff',
  HARD_BLACK: '#000',
  REDEEM_DISABLED:'#0F0F0F',
  REDEEM_ENABLED: reptativeColors.blue
};

// font family
const fontFamily = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semiBold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
};

const LARGE_DEVICE_SCALE = 1.3;

let fontSize = {
  extraSmall: 12,
  small: 14,
  normal: 16,
  medium: 18,
  semiLarge: 22,
  large: 24,
  extraLarge0:26,
  extraLarge:30,
  fourty:40,
  sizeGuideTxt: 23,
  sizeTxt: 64,
  starIc: 18,
  tileHeader: 12,
  addIc: 22,
  Xlarge:32,
  XXLarge:50,
  XXsmall:10,
  toosmall:8,
};

let lineHeight = {
  normal: 24,
  small: 16,
};

let borderRadius = {
  normal: 4,
  medium:12,
  large:16,
  backNextBtn: 100,
  semiLarge: 10,
  boxRadius: 20,
  XLarge:50,
  L150: 150,
  circle: 1000,
  otpradius:8,
  bigboxradius:40
};


if (deviceWidth >= 768) {
  fontSize = {
    extraSmall: 12 * LARGE_DEVICE_SCALE,
    small: 14 * LARGE_DEVICE_SCALE,
    normal: 16 * LARGE_DEVICE_SCALE,
    medium: 18 * LARGE_DEVICE_SCALE,
    semiLarge: 20 * LARGE_DEVICE_SCALE,
    large: 24 * LARGE_DEVICE_SCALE,
    sizeGuideTxt: 64 * LARGE_DEVICE_SCALE,
    starIc: 18 * LARGE_DEVICE_SCALE,
    tileHeader: 19 * LARGE_DEVICE_SCALE,
    addIc: 22 * LARGE_DEVICE_SCALE,
  };
  lineHeight = {
    normal: 24 * LARGE_DEVICE_SCALE,
    small: 16 * LARGE_DEVICE_SCALE,
  };
  borderRadius = {
    normal: 4 * LARGE_DEVICE_SCALE,
    medium:2*LARGE_DEVICE_SCALE,
    backNextBtn: 100 * LARGE_DEVICE_SCALE,
    semiLarge: 10 * LARGE_DEVICE_SCALE,
    XLarge:50 * LARGE_DEVICE_SCALE,
    boxRadius: 20 * LARGE_DEVICE_SCALE,
    L150: 150 * LARGE_DEVICE_SCALE,
    circle : 1000  * LARGE_DEVICE_SCALE,
    otpradius:8*LARGE_DEVICE_SCALE,
    bigboxradius:40*LARGE_DEVICE_SCALE
  };
  btnHeight = 48 * LARGE_DEVICE_SCALE;
  smallbtnHeight = 24 * LARGE_DEVICE_SCALE;
  inputHeight = 43 * LARGE_DEVICE_SCALE;
  scrollableTabHeight = 40 * LARGE_DEVICE_SCALE;
}

export {
  responsiveHeight,
  responsiveWidth,
  btnWidth,
  btnHeight,
  smallbtnHeight,
  inputHeight,
  marginHorizontal,
  spaceVertical,
  scrollableTabHeight,
  NAV_HEIGHT,
  STATUSBAR_HEIGHT,
  deviceHeight,
  deviceWidth,
  colors,
  fontSize,
  fontFamily,
  lineHeight,
  borderRadius,
};

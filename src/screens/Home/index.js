import React, { useState, useEffect, useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { images, COLORS, FONTS, SIZES } from '../../constants';
import AfrocinemaComponent from '../../components/AfrocinemaComponent';
import AfrostreamComponent from '../../components/AfrostreamComponent';
import axiosInstance from '../../helpers/axiosInterceptor';
import { GlobalContext } from '../../context/Provider';
import {
  GET_AFROCINEMA_DATA,
  GET_AFROSTREAM_DATA,
} from '../../constants/actionTypes';

const Home = () => {
  // State variable for the dashboard tabs
  const [activeTab, setActiveTab] = useState({
    afrocinema: true,
    afrostream: false,
  });

  // State variable for filtered search data
  const [filteredData, setFilteredData] = useState({});

  // Global state for Afrocinema and Afrostream
  const { getAfrocinemaDispatch, getAfrostreamDispatch } =
    useContext(GlobalContext);

  // Get afrocinema's data from server and store in Global state
  const getAfrocinemaData = async () => {
    await axiosInstance
      .get('videos')
      .then(res => {
        // console.log(JSON.stringify(res.data.data.videos, null, 2));
        getAfrocinemaDispatch({
          type: GET_AFROCINEMA_DATA,
          payload: res.data.data.videos,
        });
        setFilteredData(res.data.data.videos);
      })
      .catch(err => console.log(err.response));
  };

  // Get afrostream's data from server and store in Global state
  const getAfrostreamData = async () => {
    await axiosInstance
      .get('retailer/subscription-plans')
      .then(res => {
        // console.log(JSON.stringify(res.data.data.subscription_plans, null, 2));
        getAfrostreamDispatch({
          type: GET_AFROSTREAM_DATA,
          payload: res.data.data.subscription_plans,
        });
      })
      .catch(err => console.log(err.response));
  };

  // Call both functions on component mount
  useEffect(() => {
    getAfrocinemaData();
    getAfrostreamData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground source={images.mainBg} style={styles.bgImage}> */}
      <ImageBackground
        source={images.splashScreenBg}
        style={styles.headerImgBg}>
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.headerText}>Welcome,</Text>
            <Text style={styles.headerUsername}>Charles</Text>
          </View>
          <View>
            <Icon name="user-circle" style={styles.userIcon} />
          </View>
        </View>
      </ImageBackground>
      <View style={styles.subcriptionTab}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setActiveTab({ afrocinema: true, afrostream: false })}>
          <View
            style={[
              styles.Tab,
              activeTab.afrocinema === true ? styles.activeTab : '',
            ]}>
            <Text style={styles.tabText}>Afrocinema</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setActiveTab({ afrocinema: false, afrostream: true })}>
          <View
            style={[
              styles.Tab,
              activeTab.afrostream === true ? styles.activeTab : '',
            ]}>
            <Text style={styles.tabText}>Afrostream</Text>
          </View>
        </TouchableOpacity>
      </View>
      {activeTab.afrocinema && (
        <AfrocinemaComponent
          filteredData={filteredData}
          setFilteredData={setFilteredData}
        />
      )}
      {activeTab.afrostream && <AfrostreamComponent />}
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  // bgImage: {
  //   flex: 1,
  //   resizeMode: 'cover',
  // },

  headerImgBg: {
    height: hp('15%'),
  },

  headerBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.backDrop,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('5%'),
  },

  headerText: {
    color: COLORS.white,
    ...FONTS.h4,
  },

  headerUsername: {
    color: COLORS.white,
    marginTop: SIZES.base,
    ...FONTS.h1,
  },

  userIcon: {
    fontSize: hp('8%'),
    color: COLORS.white,
  },

  subcriptionTab: {
    height: hp('7.5%'),
    flexDirection: 'row',
  },

  Tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    backgroundColor: COLORS.lightGray2,
    // borderBottomRightRadius: SIZES.base,
  },

  activeTab: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  tabText: {
    ...FONTS.h4,
    letterSpacing: 1,
  },
});

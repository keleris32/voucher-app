import React, { useState, useEffect, useContext } from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components, Functions and Hooks
import { images, COLORS, FONTS, SIZES } from '../../constants';
import AfrocinemaComponent from '../../components/AfrocinemaComponent';
import AfrostreamComponent from '../../components/AfrostreamComponent';
import axiosInstance from '../../helpers/axiosInterceptor';
import { GlobalContext } from '../../context/Provider';
import {
  GET_AFROCINEMA_DATA,
  GET_AFROSTREAM_DATA,
} from '../../constants/actionTypes';
import EnvironmentVariables from '../../config/env';

const Home = () => {
  const [fetchError, setFetchError] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const refreshComp = () => setRefresh(!refresh);

  // State variable for the dashboard tabs
  const [activeTab, setActiveTab] = useState({
    afrocinema: false,
    afrostream: true,
  });

  // Global state variable for the retailer's data
  const {
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // State variable for filtered search data
  const [filteredData, setFilteredData] = useState({});

  // Global state for Afrocinema and Afrostream
  const {
    getAfrocinemaDispatch,
    getAfrostreamDispatch,
    getAfrostreamState: { loading },
  } = useContext(GlobalContext);

  // Get afrocinema's data from server and store in Global state
  const getAfrocinemaData = async () => {
    setFetchError(false);
    await axiosInstance
      .get('retailer/videos')
      .then(res => {
        getAfrocinemaDispatch({
          type: GET_AFROCINEMA_DATA,
          payload: res.data.data.videos,
        });
        setFilteredData(res.data.data.videos);
      })
      .catch(err => {
        setFetchError(true);
      });
  };

  // Get afrostream's data from server and store in Global state
  const getAfrostreamData = async () => {
    setFetchError(false);
    await axiosInstance
      .get('retailer/subscription-plans')
      .then(res => {
        console.log(JSON.stringify(res.data.data.subscription_plans, null, 2));
        getAfrostreamDispatch({
          type: GET_AFROSTREAM_DATA,
          payload: res.data.data.subscription_plans,
        });
      })
      .catch(err => {
        setFetchError(true);
      });
  };

  // Call both functions on component mount
  useEffect(() => {
    getAfrocinemaData();
    getAfrostreamData();
  }, [refresh]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.homeDashboard} style={styles.headerImgBg}>
        <View style={styles.headerBar}>
          <View>
            <Text style={styles.headerText}>Welcome,</Text>
            <Text style={styles.headerUsername}>
              {retailerData?.first_name}
            </Text>
          </View>
          <View>
            <Image
              source={{
                uri: retailerData?.profile_picture,
                headers: {
                  Referer: EnvironmentVariables.IMAGES_REFERER_HEADER_URL,
                },
              }}
              style={styles.userIcon}
            />
          </View>
        </View>
      </ImageBackground>
      <View style={styles.subcriptionTab}>
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => setActiveTab({ afrocinema: false, afrostream: true })}>
          <View
            style={[
              styles.Tab,
              activeTab.afrostream === true ? styles.activeTab : '',
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab.afrostream === true ? styles.activeText : '',
              ]}>
              Afrostream
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled={loading}
          style={{ flex: 1 }}
          onPress={() => setActiveTab({ afrocinema: true, afrostream: false })}>
          <View
            style={[
              styles.Tab,
              activeTab.afrocinema === true ? styles.activeTab : '',
            ]}>
            <Text
              style={[
                styles.tabText,
                activeTab.afrocinema === true ? styles.activeText : '',
              ]}>
              Afrocinema
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {activeTab.afrocinema && (
        <AfrocinemaComponent
          filteredData={filteredData}
          setFilteredData={setFilteredData}
          refreshComp={refreshComp}
          fetchError={fetchError}
        />
      )}
      {activeTab.afrostream && (
        <AfrostreamComponent
          refreshComp={refreshComp}
          fetchError={fetchError}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.offWhite,
  },

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
    // paddingVertical: 10,
    color: COLORS.white,
    marginTop: SIZES.base,
    ...FONTS.h1,
  },

  userIcon: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('10%'),
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
  },

  activeTab: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },

  tabText: {
    ...FONTS.h4,
    letterSpacing: 1,
    color: COLORS.black,
  },

  activeText: {
    color: COLORS.acomartBlue2,
  },
});

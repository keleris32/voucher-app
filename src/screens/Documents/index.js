import React, { useContext, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';

import { images, COLORS, SIZES, FONTS } from '../../constants';
import { CustomButton } from '../../components';
import axiosInstance from '../../helpers/axiosInterceptor';
import EnvironmentVariables from '../../config/env';
import { PENDING_VERIFICATION } from '../../constants/routeNames';
import { GlobalContext } from '../../context/Provider';
import { GET_RETAILER } from '../../constants/actionTypes';

const Documents = ({ navigation }) => {
  const [uploading, setUploading] = useState(false);
  const [initializing, setInitializing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [hasUploaded, setHasUploaded] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const [clicked, setClicked] = useState(false);

  const refreshPage = () => {
    setRefreshState(!refreshState);
    setClicked(true);
  };

  // Retailer global state
  const {
    getRetailerDispatch,
    getRetailerState: { retailerData },
  } = useContext(GlobalContext);

  // Initiate Verification process
  const initiateVerification = async () => {
    setInitializing(true);
    // If a file has been uploaded, then proceed else don't
    if (hasUploaded) {
      // FormData to send callback url with request.
      const data = new FormData();
      data.append(
        'callbackUrl',
        EnvironmentVariables.VERIFICATION_CALLBACK_URL,
      );

      // Send request to initiate verification
      await axiosInstance
        .post('retailer/initiate-verification', data)
        .then(res => {
          // Navigate to the Pending verifcation screen on successful request
          navigation.replace(PENDING_VERIFICATION);
          setInitializing(false);
          setHasUploaded(false);
        })

        .catch(err => {
          Alert.alert(
            'Error',
            'Please check your internet connection and try again!',
            [
              {
                text: 'Ok',
                onPress: () => {
                  setInitializing(false);
                },
              },
            ],
          );
        });
    } else {
      Alert.alert(
        '',
        'Please upload a means of identification before proceeding!',
        [
          {
            text: 'Ok',
            onPress: () => {
              setInitializing(false);
            },
          },
        ],
      );
    }
  };

  // Resend email verification
  const resendEmailVerification = () => {
    axiosInstance
      .get('retailer/auth/email/resend-verification', {
        params: {
          callbackUrl: EnvironmentVariables.EMAIL_CALLBACK_URL,
        },
      })
      .then(res =>
        Alert.alert('', 'Email verification was sent successfully!', [
          {
            text: 'Ok',
            onPress: () => {
              setUploading(false);
            },
          },
        ]),
      )
      .catch(err =>
        Alert.alert(
          'Error',
          'Please check your internet connection and try again!',
          [
            {
              text: 'Ok',
              onPress: () => {
                setUploading(false);
              },
            },
          ],
        ),
      );
  };

  // Upload selected file to server
  const uploadFile = async () => {
    if (retailerData?.email_verified_at) {
      // Check if any file has been selected
      if (selectedFile !== null) {
        setUploading(true);
        // If a file has been selected, then create FormData
        const fileToUpload = selectedFile;
        const data = new FormData();

        fileToUpload.forEach(file => {
          data.append('documents', file, selectedFile.name);
        });

        // Upload file to server
        await axiosInstance
          .post('retailer/documents/', data, {
            headers: {
              'Content-Type': 'multipart/form-data; ',
            },
          })
          .then(res => {
            Alert.alert('Success', 'Your file was successfully uploaded!', [
              {
                text: 'Ok',
                onPress: () => {
                  setUploading(false);
                },
              },
            ]);

            // set hasUploaded state to true
            setHasUploaded(true);

            // reset state
            setSelectedFile(null);
          })
          .catch(err => {
            Alert.alert(
              'Error',
              'Please check your internet connection and try again!',
              [
                {
                  text: 'Ok',
                  onPress: () => {
                    setUploading(false);
                  },
                },
              ],
            );
          });
      } else {
        Alert.alert('', 'Please select a file before proceeding', [
          {
            text: 'Ok',
            onPress: () => {},
          },
        ]);
      }
    } else {
      // Alert pop-up with email verification link
      Alert.alert(
        'Verify your email',
        'Please verify your email before proceeding! Refresh if you have already verified',
        [
          {
            text: 'Resend verification',
            onPress: () => {
              resendEmailVerification();
            },
          },
          {
            text: 'Refresh',
            onPress: () => {
              refreshPage();
            },
          },
        ],
      );
    }
  };

  // function to select a file from device
  const selectDocument = async () => {
    try {
      // Document Picker to select a file
      const file = await DocumentPicker.pickMultiple({
        // The type of file eligible for selection
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.images,
          DocumentPicker.types.plainText,
          DocumentPicker.types.docx,
        ],
      });

      // set the result to state
      setSelectedFile(file);
    } catch (err) {
      setSelectedFile(null);

      if (DocumentPicker.isCancel(err)) {
        return;
      } else {
        Alert.alert(
          'Error.',
          'Something went wrong. Please check your internet connection and try again!',
        );
      }
    }
  };

  const getRefreshData = async () => {
    await axiosInstance
      .get('retailer/')
      .then(res => {
        getRetailerDispatch({
          type: GET_RETAILER,
          payload: res.data.data.user,
        });
      })
      .catch(err => {
        Alert.alert(
          'Error.',
          'Something went wrong. Please check your internet connection and try again later.',
        );
      });
  };

  // Only try to fetch Data when refresh button has been clicked (clicked =true)
  useEffect(() => {
    clicked && getRefreshData();
  }, [refreshState]);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={images.mainBg} style={styles.bgImage}>
        <View style={styles.screenWrapper}>
          <View>
            <Text style={styles.title}>
              Kindly upload a means of identification and initiate the
              verification process.
            </Text>
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.formText}>
              Indicate your means of identification and select a file.
            </Text>
            <View style={styles.inputWrapper}>
              <Text style={{ flex: 1, ...FONTS.italic4, color: COLORS.gray }}>
                Driver's License, International Passport, Social Security
                Number, Voter's card, National Identification Number etc.
              </Text>

              <View>
                {selectedFile && (
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginVertical: wp('1.5%'),
                    }}>
                    <View
                      style={{
                        width: wp('2%'),
                        height: wp('2%'),
                        borderRadius: wp('50%'),
                        backgroundColor: COLORS.red,
                        marginHorizontal: wp('1%'),
                      }}
                    />
                  </View>
                )}
                <TouchableOpacity
                  style={[
                    styles.pickerBtn,
                    {
                      borderWidth: selectedFile ? 4 : 0,
                      borderColor: selectedFile ? COLORS.acomartBlue2 : '',
                    },
                  ]}
                  onPress={selectDocument}>
                  <Icons name="file-upload" style={styles.icon} />
                </TouchableOpacity>
              </View>
            </View>

            <CustomButton
              buttonText={uploading ? 'Uploading' : 'Upload'}
              disabled={uploading}
              onPress={uploadFile}
            />
          </View>
          <CustomButton
            buttonText={initializing ? 'Initializing' : 'Initiate Verification'}
            disabled={initializing}
            onPress={initiateVerification}
          />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Documents;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  bgImage: {
    flex: 1,
    resizeMode: 'cover',
    alignItems: 'center',
  },

  screenWrapper: {
    flex: 1,
    width: wp('85%'),
    paddingVertical: hp('7.5%'),
    justifyContent: 'space-between',
  },

  title: {
    ...FONTS.h3,
  },

  formContainer: {
    marginTop: -SIZES.largeTitle * 3,
  },

  formText: {
    ...FONTS.body4,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.padding,
  },

  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: SIZES.base,
    paddingHorizontal: SIZES.base,
    ...FONTS.body4,
  },

  errors: {
    color: COLORS.red,
    ...FONTS.body4,
  },

  pickerBtn: {
    height: hp('7.5%'),
    width: wp('12.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: SIZES.base * 2,
    borderRadius: SIZES.base,
    backgroundColor: COLORS.acomartBlue,
  },

  icon: {
    fontSize: wp('5%'),
    color: COLORS.white,
  },
});

import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icons from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import { Formik } from 'formik';

import { images, COLORS, SIZES, FONTS } from '../../constants';
import { CustomButton } from '../../components';
import { validationSchema } from './validationSchema';
import axiosInstance from '../../helpers/axiosInterceptor';
import EnvironmentVariables from '../../config/env';

const Documents = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  // Initiate Verification process
  const initiateVerification = async () => {
    // FormData to send callback url with request.
    const data = new FormData();
    data.append('callbackUrl', EnvironmentVariables.VERIFICATION_CALLBACK_URL);

    // Send request to initiate verification
    await axiosInstance
      .post('retailer/initiate-verification', data)
      .then(res => console.log(JSON.stringify(res.data, null, 2)))
      .catch(err => console.log(err));
  };

  // Upload selected file to server
  const uploadFile = async (documentData, resetForm) => {
    // Check if any file has been selected
    if (selectedFile !== null) {
      // If a file has been selected, then create FormData
      const fileToUpload = selectedFile;
      const data = new FormData();
      data.append('documents', fileToUpload, documentData.documentName);

      // Upload file to server
      await axiosInstance
        .post('http://10.0.2.2:8000/api/retailer/documents', data, {
          headers: {
            'Content-Type': 'multipart/form-data; ',
          },
        })
        .then(res => {
          //   console.log(JSON.stringify(res.data, null, 2));
          Alert.alert('Success', 'Your file was successfully uploaded!');

          // reset state and form
          setSelectedFile(null);
          resetForm();
        })
        .catch(err => {
          Alert.alert(
            'Error.',
            'Please check your internet connection and try again!',
          );
        });
    }
  };

  // function to select a file from device
  const selectDocument = async () => {
    try {
      // Document Picker to select a file
      const file = await DocumentPicker.pick({
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

  return (
    <Formik
      initialValues={{
        documentName: '',
      }}
      validateOnMount={true}
      onSubmit={(values, { resetForm }) => uploadFile(values, resetForm)}
      validationSchema={validationSchema}>
      {props => (
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
                  <TextInput
                    style={styles.input}
                    onChangeText={props.handleChange('documentName')}
                    value={props.values.documentName}
                    onBlur={props.handleBlur('documentName')}
                    errors={props.errors.documentName}
                    touched={props.touched.documentName}
                    placeholder="Driver's License etc.."
                  />
                  <TouchableOpacity
                    style={[
                      styles.pickerBtn,
                      {
                        borderWidth: selectedFile ? 4 : 0,
                        borderColor: selectedFile ? COLORS.red : '',
                      },
                    ]}
                    onPress={selectDocument}>
                    <Icons name="file-upload" style={styles.icon} />
                  </TouchableOpacity>
                </View>

                {/* If this field contains an error and it has been touched, then display the error message */}
                {props.errors.documentName && props.touched.documentName && (
                  <Text style={styles.errors}>{props.errors.documentName}</Text>
                )}

                <CustomButton
                  buttonText="Upload"
                  onPress={props.handleSubmit}
                />
              </View>
              <CustomButton
                buttonText="Initiate Verification"
                onPress={initiateVerification}
              />
            </View>
          </ImageBackground>
        </SafeAreaView>
      )}
    </Formik>
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
    width: wp('10%'),
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

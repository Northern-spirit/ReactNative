import React from "react";
import { CustomInput } from "./ui/CustomInput";
import { CustomButton } from "./ui/CustomButton"
import { Image, View, StyleSheet, Text, Modal, ActivityIndicator } from 'react-native';
import { useLoader } from '../hooks/useLoader';

export function LogInForm() {
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");
  const { isLoading, withLoading } = useLoader();

  const sendForm = async () => {
    await withLoading(async () => {
      console.log(valueEmail, valuePassword);
      // Здесь будет логика авторизации
      await new Promise(resolve => setTimeout(resolve, 2000)); // Имитация запроса
    });
  }

  return (
    <View style={styles.wrapper}>
      <Modal
        transparent={true}
        visible={isLoading}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" color="#F26924" />
          </View>
        </View>
      </Modal>

      <Image
        source={require('../assets/images/DomusoShort.png')}
        style={styles.logo}
      />

      <View style={styles.wrapperTitle}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.text}>Log In to your account</Text>
      </View>
      
      <CustomInput
        type='text'
        value={valueEmail}
        onChangeText={setValueEmail}
        placeholder="Email"
      />
      <CustomInput
        type='password'
        value={valuePassword}
        onChangeText={setValuePassword}
        placeholder="Password"
      />

      <CustomButton 
        value="Continue" 
        onPress={sendForm}
        isLoading={isLoading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 10
  },
  wrapperTitle: {
    gap: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
    fontWeight: '500',
    color: '#141414',
    textAlign: 'center'
  },
  text: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center'
  },
  logo: {
    alignSelf: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
});

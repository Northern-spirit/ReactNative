import React from "react";
import { CustomInput } from "./ui/CustomInput";
import { CustomButton } from "./ui/CustomButton"
import { Image, View, StyleSheet, Text } from 'react-native';

export function LogInForm() {
  const [valueEmail, setValueEmail] = React.useState("");
  const [valuePassword, setValuePassword] = React.useState("");

  const sendForm = () => {
    console.log(valueEmail,valuePassword)
  }

  return (
    <View style={styles.wrapper}>
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

      <CustomButton value="Continue" onPress={sendForm}/>
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
  }
});

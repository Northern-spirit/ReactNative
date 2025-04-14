import React, { useState } from 'react';
import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TextInputProps,
  Platform,
  Keyboard,
  KeyboardEvent
} from 'react-native';

type InputProps = {
  placeholder?: string;
  type?: 'text' | 'password';
  value: string;
  icon?: React.ReactNode;
  onChangeText: (text: string) => void;
} & TextInputProps;

export function CustomInput({
  placeholder,
  type = 'text',
  value,
  icon,
  onChangeText,
  ...props
}: InputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const inputRef = React.useRef<TextInput>(null);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(prev => !prev);
    inputRef.current?.focus(); // Возвращаем фокус после переключения
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.input}
        secureTextEntry={type === 'password' && !isPasswordVisible}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType={type === 'text' ? 'email-address' : 'default'}
        autoComplete={type === 'password' ? 'password' : 'email'}
        textContentType={type === 'password' ? 'password' : 'emailAddress'}
        importantForAutofill="yes"
        returnKeyType="done"
        editable
        contextMenuHidden={false}
        onFocus={() => {
          if (Platform.OS === 'android') {
            const event = {
              duration: 250,
              easing: 'keyboard'
            } as KeyboardEvent;
            Keyboard.scheduleLayoutAnimation(event);
          }
        }} // Для Android
        {...props}
      />

      {type === 'password' && (
        <TouchableOpacity
          onPress={togglePasswordVisibility}
          style={styles.iconButton}
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
        >
          <View style={styles.iconContainer}>
            {isPasswordVisible ? (
              <Text>👁️</Text>
            ) : (
              <Text>👁️‍🗨️</Text>
            )}
          </View>
        </TouchableOpacity>
      )}

      {icon && type !== 'password' && (
        <View style={styles.iconContainer}>
          {icon}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 16,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    marginVertical: 8
  },
  input: {
    flex: 1,
    minHeight: 40, // Изменено с height
    color: '#333',
    paddingVertical: Platform.select({ ios: 8, android: 4 }),
    includeFontPadding: false,
    textAlignVertical: 'center' // Для Android
  },
  iconButton: {
    marginLeft: 8,
  },
  iconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import { NavBar } from '../components/NavBar';
import { useUser } from '../store/user';
import { useNotifications } from '../hooks/useNotifications';

export default function Profile(): React.JSX.Element {
  const { firstName, lastName, email, updateUser } = useUser();
  const { notifySuccess } = useNotifications();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName,
    lastName,
    email,
  });

  const handleSave = () => {
    updateUser(formData);
    setIsEditing(false);
    notifySuccess('Профиль обновлен');
  };

  return (
    <View style={styles.root}>
      <Image
        source={require("../assets/images/background.jpeg")}
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      />
      <SafeAreaView style={styles.safe}>
        <View style={styles.container}>
          <Text style={styles.title}>Личный кабинет</Text>
          <View style={styles.profileInfo}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {formData.firstName[0]}{formData.lastName[0]}
              </Text>
            </View>
            
            {isEditing ? (
              <>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, firstName: text }))}
                  placeholder="Имя"
                />
                <TextInput
                  style={styles.input}
                  value={formData.lastName}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, lastName: text }))}
                  placeholder="Фамилия"
                />
                <TextInput
                  style={styles.input}
                  value={formData.email}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
                  placeholder="Email"
                  keyboardType="email-address"
                />
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                  <Text style={styles.buttonText}>Сохранить</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.name}>{firstName} {lastName}</Text>
                <Text style={styles.email}>{email}</Text>
                <TouchableOpacity 
                  style={styles.button} 
                  onPress={() => setIsEditing(true)}
                >
                  <Text style={styles.buttonText}>Редактировать</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
        <NavBar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  safe: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginVertical: 16,
  },
  profileInfo: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    marginTop: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6B3B1A',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 36,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6B3B1A',
    marginBottom: 8,
  },
  email: {
    fontSize: 16,
    color: '#4A4A4A',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#6B3B1A',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: '#6B3B1A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 
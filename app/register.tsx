import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { useLoader } from '../hooks/useLoader';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '../store/user'

export default function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const { isLoading, withLoading } = useLoader();
    const navigation = useNavigation();

    const { setAll } = useUser();

    const handleRegister = async () => {
        if (firstName && lastName && userEmail && userPassword) {
            
            await withLoading(async () => {
                setAll({
                    firstName: firstName,
                    lastName: lastName,
                    email: userEmail,
                    password: userPassword
                });
                
                await new Promise(resolve => setTimeout(resolve, 2000));
                navigation.navigate('Home' as never);
            });
        } else {
            alert('Add all field')
        }
    };

    const adminNavigate = () => {
        navigation.navigate('AdminPage' as never);
    }

    return (
        <View style={styles.container}>
            <Modal
                transparent={true}
                visible={isLoading}
                animationType="fade"
            >
                <View style={styles.modalContainer}>
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#007AFF" />
                    </View>
                </View>
            </Modal>

            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="User name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                secureTextEntry
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Add email"
                value={userEmail}
                onChangeText={setUserEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Create Password"
                secureTextEntry
                value={userPassword}
                onChangeText={setUserPassword}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={handleRegister}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
           <Text onPress={()=>adminNavigate()} style={styles.textLink}>I ADMIN!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    wrapperText: {
        marginTop: 20
    },
    textLink: {
        position: 'absolute',
        bottom: 0,
        left: '50%',
        color: 'blue',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
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
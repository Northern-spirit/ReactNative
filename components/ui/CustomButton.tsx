import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

type ButtonProps = {
    value: string
    onPress: () => void;
}

export function CustomButton({
    value,
    onPress
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.customButton}
            onPress={onPress}
        >
            <Text style={styles.buttonText}>{value}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    customButton: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        height: 50,
        width: '100%',
        backgroundColor: '#F26924'
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    }
});

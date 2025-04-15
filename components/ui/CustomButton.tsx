import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

type ButtonProps = {
    value: string
    onPress: () => void;
    isLoading?: boolean;
}

export function CustomButton({
    value,
    onPress,
    isLoading = false
}: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.customButton}
            onPress={onPress}
            disabled={isLoading}
        >
            {isLoading ? (
                <ActivityIndicator color="white" />
            ) : (
                <Text style={styles.buttonText}>{value}</Text>
            )}
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

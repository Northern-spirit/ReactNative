import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useCraftCoffee } from '../store/craftCoffee';
import { ConfirmationModal } from '../components/ConfirmationModal';
import { products } from '../constants/MockData';
import { CraftCoffeeOptions } from '../types/types';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store';

const BASES = [
  { id: 'water', name: 'Вода' },
  { id: 'milk', name: 'Молоко' },
  { id: 'coconut_milk', name: 'Кокосовое молоко' },
];

const SYRUPS = [
  'Карамельный',
  'Ванильный',
  'Малиновый',
  'Шоколадный',
  'Лавандовый',
];

const SIZES = [250, 400, 690];

export default function CraftCoffee() {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const { options, setBase, setCoffeeType, toggleSyrup, toggleAddition, setSize, resetOptions } = useCraftCoffee();
  const setIsBrewing = useStore((state) => state.setIsBrewing);

  const coffeeTypes = products.filter(p => p.type === 'coffee');

  const handleStart = () => {
    if (!options.coffeeType) {
      alert('Выберите тип кофе');
      return;
    }
    setModalVisible(true);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    setIsBrewing(true);
    navigation.navigate('Home' as never);
    resetOptions();
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.sectionTitle}>Основа</Text>
        <View style={styles.optionsContainer}>
          {BASES.map((base) => (
            <TouchableOpacity
              key={base.id}
              style={[
                styles.option,
                options.base === base.id && styles.selectedOption,
              ]}
              onPress={() => setBase(base.id as CraftCoffeeOptions['base'])}
            >
              <Text style={[styles.optionText, options.base === base.id && styles.selectedText]}>{base.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Тип кофе</Text>
        <View style={styles.optionsContainer}>
          {coffeeTypes.map((coffee) => (
            <TouchableOpacity
              key={coffee.id}
              style={[
                styles.option,
                options.coffeeType === coffee.name && styles.selectedOption,
              ]}
              onPress={() => setCoffeeType(coffee.name)}
            >
              <Text style={[styles.optionText, options.coffeeType === coffee.name && styles.selectedText]}>{coffee.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Сиропы</Text>
        <View style={styles.optionsContainer}>
          {SYRUPS.map((syrup) => (
            <TouchableOpacity
              key={syrup}
              style={[
                styles.option,
                options.syrups.includes(syrup) && styles.selectedOption,
              ]}
              onPress={() => toggleSyrup(syrup)}
            >
              <Text style={[styles.optionText, options.syrups.includes(syrup) && styles.selectedText]}>{syrup}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Добавки</Text>
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.option,
              options.additions.cinnamon && styles.selectedOption,
            ]}
            onPress={() => toggleAddition('cinnamon')}
          >
            <Text style={[styles.optionText, options.additions.cinnamon && styles.selectedText]}>Корица</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.option,
              options.additions.sugar && styles.selectedOption,
            ]}
            onPress={() => toggleAddition('sugar')}
          >
            <Text style={[styles.optionText, options.additions.sugar && styles.selectedText]}>Сахар</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Размер</Text>
        <View style={styles.optionsContainer}>
          {SIZES.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.option,
                options.size === size && styles.selectedOption,
              ]}
              onPress={() => setSize(size as CraftCoffeeOptions['size'])}
            >
              <Text style={[styles.optionText, options.size === size && styles.selectedText]}>{size} мл</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>Приготовить</Text>
        </TouchableOpacity>
      </ScrollView>

      <ConfirmationModal
        visible={modalVisible}
        onConfirm={handleConfirm}
        onCancel={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#6B3B1A',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },
  option: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#6B3B1A',
  },
  selectedOption: {
    backgroundColor: '#6B3B1A',
  },
  selectedText: {
    color: 'white'
  },
  optionText: {
    color: '#6B3B1A',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#6B3B1A',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 20,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 
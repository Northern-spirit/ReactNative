import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert, Image } from 'react-native';
import { useStore } from '../store';
import { styles } from './adminStyles';
import { Product } from '../types/types';

export const ProductsTab: React.FC = () => {
  const products = useStore((state) => state.products);
  const addProduct = useStore((state) => state.addProduct);
  const updateProduct = useStore((state) => state.updateProduct);
  const removeProduct = useStore((state) => state.removeProduct);

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [form, setForm] = useState<Product>({
    id: 1,
    name: '',
    type: '',
    price: 0,
    description: '',
    image: [''],
    rating: 0,
    reviews: []
  });

  const startEdit = (product: Product) => {
    setEditingProductId(product.id);
    setForm({
      id: product.id,
      reviews: product.reviews,
      rating: product.rating,
      name: product.name,
      type: product.type,
      price: product.price,
      description: product.description,
      image: Array.isArray(product.image) ? product.image : [''],
    });
  };

  const saveEdit = () => {
    if (!form.name || !form.type || !form.price) {
      Alert.alert('Ошибка', 'Введите имя, тип и цену');
      return;
    }
    if (editingProductId !== null) {
      updateProduct(editingProductId, {
        name: form.name,
        type: form.type,
        price: Number(form.price),
        description: form.description,
        image: [form.image[0]],
      });
      setEditingProductId(null);
      setForm({
        id: 0,
        reviews: [],
        rating: 0,
        name: '',
        type: '',
        price: 0,
        description: '',
        image: ['']
      });
    }
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setForm({ id: 0, reviews: [], rating: 0, name: '', type: '', price: 0, description: '', image: [''] });
  };

  const addNewProduct = () => {
    if (!form.name || !form.type || !form.price) {
      Alert.alert('Ошибка', 'Введите имя, тип и цену');
      return;
    }
    addProduct({
      id: Date.now(),
      reviews: form.reviews,
      rating: form.rating,
      name: form.name,
      type: form.type,
      price: Number(form.price),
      description: form.description,
      image: [form.image[0]]
    });
    setForm({
      id: 0,
      reviews: [],
      rating: 0,
      name: '',
      type: '',
      price: 0,
      description: '',
      image: ['']
    });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.sectionTitle}>Меню</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {editingProductId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Название"
                  value={form.name}
                  onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Тип"
                  value={form.type}
                  onChangeText={(text) => setForm((f) => ({ ...f, type: text }))}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Цена"
                  value={form.price.toString()}
                  onChangeText={(text) =>
                    setForm(f => ({
                      ...f,
                      price: Number(text.replace(/[^0-9]/g, ''))
                    }))
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Описание"
                  value={form.description}
                  onChangeText={(text) => setForm((f) => ({ ...f, description: text }))}
                />
                <TextInput
                  style={styles.input}
                  placeholder="URL изображения"
                  value={form.image[0]}
                  onChangeText={(text) => setForm((f) => ({ ...f, image: [text] }))}
                />
                <View style={styles.row}>
                  <TouchableOpacity style={styles.saveButton} onPress={saveEdit}>
                    <Text style={styles.buttonText}>Сохранить</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cancelButton} onPress={cancelEdit}>
                    <Text style={styles.buttonText}>Отмена</Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text>{item.name} ({item.type}) - {item.price} ₽</Text>
                {item.image[0] && (
                  <Image
                    style={styles.imagePreview}
                    source={{ uri: item.image[0] }}
                  />
                )}
                <Text numberOfLines={1}>{item.description}</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item)}>
                    <Text style={styles.buttonText}>Редактировать</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removeProduct(item.id)}>
                    <Text style={styles.buttonText}>Удалить</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />

      {editingProductId === null && (
        <>
          <Text style={styles.sectionTitle}>Добавить новый продукт</Text>
          <TextInput
            style={styles.input}
            placeholder="Название"
            value={form.name}
            onChangeText={(text) => setForm((f) => ({ ...f, name: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Тип"
            value={form.type}
            onChangeText={(text) => setForm((f) => ({ ...f, type: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Цена"
            value={form.price.toString()}
            onChangeText={(text) =>
              setForm(f => ({
                ...f,
                price: Number(text.replace(/[^0-9]/g, ''))
              }))
            }
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Описание"
            value={form.description}
            onChangeText={(text) => setForm((f) => ({ ...f, description: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="URL изображения"
            value={form.image[0] || ''}
            onChangeText={(text) => setForm((f) => ({ ...f, image: [text] }))}
          />
          <TouchableOpacity style={styles.addButton} onPress={addNewProduct}>
            <Text style={styles.buttonText}>Добавить продукт</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}; 


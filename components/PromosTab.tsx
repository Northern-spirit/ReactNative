import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { usePromoCard } from '../store/promoCard';
import { styles } from './adminStyles';
import { PromoCardItemProps } from '../types/types';

interface PromoForm {
  title: string;
  description: string;
  image: string;
}

export const PromosTab: React.FC = () => {
  const promoCards = usePromoCard((state) => state.promoCard);
  const addPromoCard = usePromoCard((state) => state.addPromoCard);
  const removePromoCard = usePromoCard((state) => state.removePromoCard);
  const updatePromoCard = usePromoCard((state) => state.updatePromoCard);

  const [editingPromoId, setEditingPromoId] = useState<number | null>(null);
  const [form, setForm] = useState<PromoForm>({ title: '', description: '', image: '' });

  const startEdit = (promo: PromoCardItemProps) => {
    setEditingPromoId(promo.id);
    setForm({
      title: promo.title,
      description: promo.description || '',
      image: promo.img,
    });
  };

  const saveEdit = () => {
    if (!form.title) {
      Alert.alert('Ошибка', 'Введите заголовок');
      return;
    }
    if (editingPromoId !== null) {
      updatePromoCard(editingPromoId, form);
      setEditingPromoId(null);
      setForm({ title: '', description: '', image: '' });
    }
  };

  const cancelEdit = () => {
    setEditingPromoId(null);
    setForm({ title: '', description: '', image: '' });
  };

  const addNewPromo = () => {
    if (!form.title) {
      Alert.alert('Ошибка', 'Введите заголовок');
      return;
    }
    addPromoCard({
      title: form.title,
      text: form.description,
      description: form.description,
      img: form.image,
      time: 24,
      price: 0,
    });
    setForm({ title: '', description: '', image: '' });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.sectionTitle}>Промо акции</Text>

      <FlatList
        data={promoCards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {editingPromoId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Заголовок"
                  value={form.title}
                  onChangeText={(text) => setForm((f) => ({ ...f, title: text }))}
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
                  value={form.image}
                  onChangeText={(text) => setForm((f) => ({ ...f, image: text }))}
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
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDescription} numberOfLines={2}>{item.description}</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item)}>
                    <Text style={styles.buttonText}>Редактировать</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removePromoCard(item.id)}>
                    <Text style={styles.buttonText}>Удалить</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />

      {editingPromoId === null && (
        <>
          <Text style={styles.sectionTitle}>Добавить новую акцию</Text>
          <TextInput
            style={styles.input}
            placeholder="Заголовок"
            value={form.title}
            onChangeText={(text) => setForm((f) => ({ ...f, title: text }))}
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
            value={form.image}
            onChangeText={(text) => setForm((f) => ({ ...f, image: text }))}
          />
          <TouchableOpacity style={styles.addButton} onPress={addNewPromo}>
            <Text style={styles.buttonText}>Добавить акцию</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}; 
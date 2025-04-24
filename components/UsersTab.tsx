import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useUser } from '../store/user';
import { styles } from './adminStyles';

export const UsersTab: React.FC = () => {
  const users = useUser((state) => state.users);
  const updateUser = useUser((state) => state.updateUser);
  const removeUser = useUser((state) => state.removeUser);
  const addUser = useUser((state) => state.addUser);

  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });

  const startEdit = (user: typeof form & { id: number }) => {
    setEditingUserId(user.id);
    setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, password: user.password });
  };

  const saveEdit = () => {
    if (!form.firstName || !form.email) {
      Alert.alert('Ошибка', 'Имя и email обязательны');
      return;
    }
    if (editingUserId !== null) {
      updateUser(editingUserId, form);
      setEditingUserId(null);
      setForm({ firstName: '', lastName: '', email: '', password: '' });
    }
  };

  const cancelEdit = () => {
    setEditingUserId(null);
    setForm({ firstName: '', lastName: '', email: '', password: '' });
  };

  const addNewUser = () => {
    if (!form.firstName || !form.email) {
      Alert.alert('Ошибка', 'Имя и email обязательны');
      return;
    }
    addUser({ id: Date.now(), ...form });
    setForm({ firstName: '', lastName: '', email: '', password: '' });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.sectionTitle}>Список пользователей</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            {editingUserId === item.id ? (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Имя"
                  value={form.firstName}
                  onChangeText={(text) => setForm((f) => ({ ...f, firstName: text }))}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Фамилия"
                  value={form.lastName}
                  onChangeText={(text) => setForm((f) => ({ ...f, lastName: text }))}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  value={form.email}
                  onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.input}
                  placeholder="Пароль"
                  value={form.password}
                  onChangeText={(text) => setForm((f) => ({ ...f, password: text }))}
                  secureTextEntry
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
                <Text>{item.firstName} {item.lastName}</Text>
                <Text>{item.email}</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item)}>
                    <Text style={styles.buttonText}>Редактировать</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.deleteButton} onPress={() => removeUser(item.id)}>
                    <Text style={styles.buttonText}>Удалить</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        )}
      />

      {editingUserId === null && (
        <>
          <Text style={styles.sectionTitle}>Добавить нового пользователя</Text>
          <TextInput
            style={styles.input}
            placeholder="Имя"
            value={form.firstName}
            onChangeText={(text) => setForm((f) => ({ ...f, firstName: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Фамилия"
            value={form.lastName}
            onChangeText={(text) => setForm((f) => ({ ...f, lastName: text }))}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={form.email}
            onChangeText={(text) => setForm((f) => ({ ...f, email: text }))}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            value={form.password}
            onChangeText={(text) => setForm((f) => ({ ...f, password: text }))}
            secureTextEntry
          />
          <TouchableOpacity style={styles.addButton} onPress={addNewUser}>
            <Text style={styles.buttonText}>Добавить пользователя</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}; 
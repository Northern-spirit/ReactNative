import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useUser } from '../store/user';
import { useStore } from '../store/index';
// import { usePromoStore } from '../store/promoStore';

type Tab = 'users' | 'products' | 'promos';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('users');

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.tabs}>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'users' && styles.activeTab]} onPress={() => setActiveTab('users')}>
          <Text style={styles.tabText}>Пользователи</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'products' && styles.activeTab]} onPress={() => setActiveTab('products')}>
          <Text style={styles.tabText}>Меню</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabButton, activeTab === 'promos' && styles.activeTab]} onPress={() => setActiveTab('promos')}>
          <Text style={styles.tabText}>Акции</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'products' && <ProductsTab />}
      {activeTab === 'promos' && <PromosTab />}
    </View>
  );
}

function UsersTab() {
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
}

function ProductsTab() {
  const products = useStore((state) => state.products);
  // const addProduct = useStore((state) => state.addToCart);
  // const updateProduct = useStore((state) => state.updateProduct);
  // const removeProduct = useStore((state) => state.removeProduct);

  const [editingProductId, setEditingProductId] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: '',
    type: '',
    price: '',
    description: '',
    image: '',
  });

  const startEdit = (product: typeof form & { id: number }) => {
    setEditingProductId(product.id);
    setForm({
      name: product.name,
      type: product.type,
      price: product.price.toString(),
      description: product.description,
      image: product.image[0] || '',
    });
  };

  const saveEdit = () => {
    if (!form.name || !form.type || !form.price) {
      Alert.alert('Ошибка', 'Введите имя, тип и цену');
      return;
    }
    if (editingProductId !== null) {
      // updateProduct(editingProductId, {
      //   name: form.name,
      //   type: form.type,
      //   price: Number(form.price),
      //   description: form.description,
      //   image: [form.image],
      // });
      setEditingProductId(null);
      setForm({ name: '', type: '', price: '', description: '', image: '' });
    }
  };

  const cancelEdit = () => {
    setEditingProductId(null);
    setForm({ name: '', type: '', price: '', description: '', image: '' });
  };

  const addNewProduct = () => {
    if (!form.name || !form.type || !form.price) {
      Alert.alert('Ошибка', 'Введите имя, тип и цену');
      return;
    }
    // addProduct({
    //   id: Date.now(),
    //   name: form.name,
    //   type: form.type,
    //   price: Number(form.price),
    //   description: form.description,
    //   image: [form.image],
    //   rating: 0,
    // });
    setForm({ name: '', type: '', price: '', description: '', image: '' });
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
                  value={form.price}
                  onChangeText={(text) => setForm((f) => ({ ...f, price: text }))}
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
                <Text>{item.name} ({item.type}) - {item.price} ₽</Text>
                <Text numberOfLines={1}>{item.description}</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item)}>
                    <Text style={styles.buttonText}>Редактировать</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.deleteButton} onPress={() => removeProduct(item.id)}>
                    <Text style={styles.buttonText}>Удалить</Text>
                  </TouchableOpacity> */}
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
            value={form.price}
            onChangeText={(text) => setForm((f) => ({ ...f, price: text }))}
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
            value={form.image}
            onChangeText={(text) => setForm((f) => ({ ...f, image: text }))}
          />
          <TouchableOpacity style={styles.addButton} onPress={addNewProduct}>
            <Text style={styles.buttonText}>Добавить продукт</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

function PromosTab() {
  // const promoCards = usePromoStore((state) => state.promoCards);
  // const addPromoCard = usePromoStore((state) => state.addPromoCard);
  // const removePromoCard = usePromoStore((state) => state.removePromoCard);
  // const updatePromoCard = usePromoStore((state) => state.updatePromoCard);

  const [editingPromoId, setEditingPromoId] = useState<number | null>(null);
  const [form, setForm] = useState({ title: '', description: '', image: '' });

  const startEdit = (promo: typeof form & { id: number }) => {
    setEditingPromoId(promo.id);
    setForm({ title: promo.title, description: promo.description, image: promo.image });
  };

  const saveEdit = () => {
    if (!form.title) {
      Alert.alert('Ошибка', 'Введите заголовок');
      return;
    }
    if (editingPromoId !== null) {
      // updatePromoCard(editingPromoId, form);
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
    // addPromoCard({ id: Date.now(), ...form });
    setForm({ title: '', description: '', image: '' });
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={styles.sectionTitle}>Промо акции</Text>

      <FlatList
        // data={promoCards}
        data={[{id: 1, title: 'asd', description: 'qwe'}]}
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
                <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                <Text numberOfLines={1}>{item.description}</Text>
                <View style={styles.row}>
                  <TouchableOpacity style={styles.editButton} onPress={() => startEdit(item)}>
                    <Text style={styles.buttonText}>Редактировать</Text>
                  </TouchableOpacity>
                  {/* <TouchableOpacity style={styles.deleteButton} onPress={() => removePromoCard(item.id)}>
                    <Text style={styles.buttonText}>Удалить</Text>
                  </TouchableOpacity> */}
                </View>
              </>
            )}
          </View>
        )}
      />

      {editingPromoId === null && (
        <>
          <Text style={styles.sectionTitle}>Добавить новую промо акцию</Text>
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
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  listItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginVertical: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#34C759',
    padding: 8,
    borderRadius: 5,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#8E8E93',
    padding: 8,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});

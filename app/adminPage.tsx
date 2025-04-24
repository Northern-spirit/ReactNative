import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { UsersTab } from '../components/UsersTab';
import { ProductsTab } from '../components/ProductsTab';
import { PromosTab } from '../components/PromosTab';

type Tab = 'users' | 'products' | 'promos';

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('users');

  return (
    <View style={{ flex: 1, paddingTop: 40 }}>
      <View style={styles.tabs}>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'users' && styles.activeTab]} 
          onPress={() => setActiveTab('users')}
        >
          <Text style={styles.tabText}>Пользователи</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'products' && styles.activeTab]} 
          onPress={() => setActiveTab('products')}
        >
          <Text style={styles.tabText}>Меню</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tabButton, activeTab === 'promos' && styles.activeTab]} 
          onPress={() => setActiveTab('promos')}
        >
          <Text style={styles.tabText}>Акции</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'users' && <UsersTab />}
      {activeTab === 'products' && <ProductsTab />}
      {activeTab === 'promos' && <PromosTab />}
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
});

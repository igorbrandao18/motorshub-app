import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const MOCK_USER = 'Usuário Teste';
const MOCK_BRANDS = [
  { code: '1', name: 'Fiat' },
  { code: '2', name: 'Ford' },
  { code: '3', name: 'Chevrolet' },
  { code: '4', name: 'Volkswagen' },
];

export default function Home() {
  const [user, setUser] = useState(MOCK_USER);
  const router = useRouter();

  function handleLogout() {
    // Simula logout
    router.replace('/signin');
  }

  function handleBrand(brand: { code: string; name: string }) {
    router.push({ pathname: '/model', params: { code: brand.code, name: brand.name } });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {user}!</Text>
      <Button title="Logout" onPress={handleLogout} />
      <Text style={styles.subtitle}>Car Brands</Text>
      <FlatList
        data={MOCK_BRANDS}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.brand} onPress={() => handleBrand(item)}>
            <Text style={styles.brandText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={{ width: '100%' }}
        contentContainerStyle={{ alignItems: 'center' }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginVertical: 16,
    fontWeight: '600',
  },
  brand: {
    backgroundColor: '#e0f7fa',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: 220,
    alignItems: 'center',
  },
  brandText: {
    fontSize: 16,
    color: '#00796b',
    fontWeight: 'bold',
  },
}); 
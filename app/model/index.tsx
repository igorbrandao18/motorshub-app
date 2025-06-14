import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

const MOCK_MODELS = {
  '1': [
    { code: '1a', name: 'Uno' },
    { code: '1b', name: 'Palio' },
    { code: '1c', name: 'Toro' },
  ],
  '2': [
    { code: '2a', name: 'Ka' },
    { code: '2b', name: 'Fiesta' },
    { code: '2c', name: 'EcoSport' },
  ],
  '3': [
    { code: '3a', name: 'Onix' },
    { code: '3b', name: 'Prisma' },
    { code: '3c', name: 'Tracker' },
  ],
  '4': [
    { code: '4a', name: 'Gol' },
    { code: '4b', name: 'Polo' },
    { code: '4c', name: 'Virtus' },
  ],
};

export default function Model() {
  const params = useLocalSearchParams();
  const brandCode = params.code as string;
  const brandName = params.name as string;
  const models = MOCK_MODELS[brandCode] || [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Models of {brandName}</Text>
      <FlatList
        data={models}
        keyExtractor={item => item.code}
        renderItem={({ item }) => (
          <View style={styles.model}>
            <Text style={styles.modelText}>{item.name}</Text>
          </View>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 16,
  },
  model: {
    backgroundColor: '#f1f8e9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    width: 220,
    alignItems: 'center',
  },
  modelText: {
    fontSize: 16,
    color: '#33691e',
    fontWeight: 'bold',
  },
}); 
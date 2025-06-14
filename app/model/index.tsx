import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles as homeStyles } from '../home/styles';

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

const THEME_COLOR = '#0a7ea4';

function ModelCard({ model, onPress, pressed }: { model: { code: string; name: string }; onPress: () => void; pressed?: boolean }) {
  return (
    <TouchableOpacity
      style={[homeStyles.card, pressed && homeStyles.cardPressed]}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Text style={homeStyles.brandName}>{model.name}</Text>
      <View style={{ flex: 1 }} />
      <Ionicons name="chevron-forward" size={22} color={THEME_COLOR} />
    </TouchableOpacity>
  );
}

export default function Model() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const brandCode = params.code as string;
  const brandName = params.name as string;
  const models = MOCK_MODELS[brandCode] || [];
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <View style={homeStyles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={28} color={THEME_COLOR} />
        </TouchableOpacity>
        <Text style={[homeStyles.userName, { flex: 1, textAlign: 'center' }]}>{brandName}</Text>
        <View style={{ width: 44 }} />
      </View>
      <FlatList
        data={models}
        keyExtractor={item => item.code}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 32 }}
        renderItem={({ item, index }) => (
          <ModelCard
            model={item}
            onPress={() => setSelected(item.code)}
            pressed={selected === item.code}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
} 
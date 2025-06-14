import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles as homeStyles } from '../home/styles';
import { getModels } from '../services/brands';

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
  const [models, setModels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getModels(brandCode)
      .then(data => setModels(data.modelos))
      .catch(err => setError(err.message || 'Erro ao buscar modelos'))
      .finally(() => setLoading(false));
  }, [brandCode]);

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <View style={homeStyles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={28} color={THEME_COLOR} />
        </TouchableOpacity>
        <Text style={[homeStyles.userName, { flex: 1, textAlign: 'center' }]}>{brandName}</Text>
        <View style={{ width: 44 }} />
      </View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#888', fontSize: 18 }}>Carregando modelos...</Text>
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#d32f2f', fontSize: 16 }}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={models}
          keyExtractor={item => item.codigo}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 32 }}
          renderItem={({ item, index }) => (
            <ModelCard
              model={{ code: item.codigo, name: item.nome }}
              onPress={() => {
                setSelected(item.codigo);
                setTimeout(() => {
                  setSelected(null);
                  router.push({ pathname: '/model', params: { code: item.codigo, name: item.nome } });
                }, 300);
              }}
              pressed={selected === item.codigo}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
} 
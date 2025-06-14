import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles as homeStyles } from '../home/styles';

const THEME_COLOR = '#0a7ea4';
const { width } = Dimensions.get('window');

export default function Details() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const modelCode = params.code as string;
  const modelName = params.name as string;

  // Placeholder para imagem do carro (poderia ser dinâmico)
  const carImage = 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80';

  return (
    <SafeAreaView style={homeStyles.safeArea}>
      <View style={homeStyles.header}>
        <TouchableOpacity onPress={() => router.back()} activeOpacity={0.7} style={{ marginRight: 16 }}>
          <Ionicons name="arrow-back" size={28} color={THEME_COLOR} />
        </TouchableOpacity>
        <Text style={[homeStyles.userName, { flex: 1, textAlign: 'center' }]}>{modelName}</Text>
        <View style={{ width: 44 }} />
      </View>
      <Animated.View entering={FadeInDown.delay(200).duration(800)} style={localStyles.card}>
        <Image source={{ uri: carImage }} style={localStyles.image} resizeMode="cover" />
        <Text style={localStyles.modelCode}>Código: {modelCode}</Text>
        <View style={localStyles.infoBox}>
          <Text style={localStyles.infoLabel}>Ano:</Text>
          <Text style={localStyles.infoValue}>2024</Text>
        </View>
        <View style={localStyles.infoBox}>
          <Text style={localStyles.infoLabel}>Valor estimado:</Text>
          <Text style={localStyles.infoValue}>R$ 120.000</Text>
        </View>
        <TouchableOpacity style={localStyles.ctaBtn} activeOpacity={0.85} onPress={() => alert('Em breve: mais detalhes!')}>
          <Ionicons name="car-sport" size={22} color="#fff" style={{ marginRight: 8 }} />
          <Text style={localStyles.ctaText}>Ver mais informações</Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 18,
    borderRadius: 24,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#0a7ea4',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
    marginTop: 32,
  },
  image: {
    width: width * 0.7,
    height: width * 0.4,
    borderRadius: 18,
    marginBottom: 18,
  },
  modelCode: {
    fontSize: 16,
    color: '#888',
    marginBottom: 18,
    textAlign: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#444',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: THEME_COLOR,
    fontWeight: 'bold',
  },
  ctaBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginTop: 24,
    shadowColor: THEME_COLOR,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
}); 
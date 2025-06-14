import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../providers/AuthProvider';
import { getBrands } from '../services/brands';
import { BrandCard } from './BrandCard';
import { styles } from './styles';

const MOCK_USER = 'Usuário Teste';
const THEME_COLOR = '#0a7ea4';
const { width } = Dimensions.get('window');

function getBrandLogo(brandName: string) {
  const domainMap: Record<string, string> = {
    Fiat: 'fiat.com',
    Ford: 'ford.com',
    Chevrolet: 'chevrolet.com',
    Volkswagen: 'vw.com',
  };
  const domain = domainMap[brandName] || 'carlogos.org';
  return `https://logo.clearbit.com/${domain}`;
}

export default function Home() {
  const router = useRouter();
  const { signOut } = useAuth();
  const [selectedCard, setSelectedCard] = useState<string | null>(null);
  const [brands, setBrands] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getBrands()
      .then(data => setBrands(data))
      .catch(err => setError(err.message || 'Erro ao buscar marcas'))
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    console.log('Home: handleLogout called, initiating signOut.');
    await signOut();
    router.replace('/signin');
  }

  function handleBrand(brand: any) {
    setSelectedCard(brand.codigo);
    setTimeout(() => {
      setSelectedCard(null);
      router.push({ pathname: '/model', params: { code: brand.codigo, name: brand.nome } });
    }, 300);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInDown.duration(700)} style={styles.header}>
        <View style={styles.userBox}>
          <Ionicons name="person-circle" size={44} color={THEME_COLOR} />
          <Text style={styles.userName}>{MOCK_USER}</Text>
        </View>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={28} color={THEME_COLOR} />
        </TouchableOpacity>
      </Animated.View>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#888', fontSize: 18 }}>Carregando marcas...</Text>
        </View>
      ) : error ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#d32f2f', fontSize: 16 }}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={brands}
          keyExtractor={item => item.codigo}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 32 }}
          renderItem={({ item, index }) => (
            <Animated.View entering={FadeInUp.delay(200 + index * 80).duration(700)}>
              <BrandCard
                brand={{ code: item.codigo, name: item.nome }}
                logo={getBrandLogo(item.nome)}
                onPress={() => handleBrand(item)}
                themeColor={THEME_COLOR}
                pressed={selectedCard === item.codigo}
              />
            </Animated.View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
} 
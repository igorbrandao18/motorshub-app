import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, FlatList, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BrandCard } from './BrandCard';
import { styles } from './styles';
import { Brand } from './types';

const MOCK_USER = 'Usuário Teste';
const MOCK_BRANDS: Brand[] = [
  { code: '1', name: 'Fiat' },
  { code: '2', name: 'Ford' },
  { code: '3', name: 'Chevrolet' },
  { code: '4', name: 'Volkswagen' },
];
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
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  function handleLogout() {
    router.replace('/signin');
  }

  function handleBrand(brand: Brand) {
    setSelectedCard(brand.code);
    setTimeout(() => {
      setSelectedCard(null);
      router.push({ pathname: '/model', params: { code: brand.code, name: brand.name } });
    }, 300);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInDown.duration(700)} style={styles.header}>
        <TouchableOpacity style={{ marginRight: 16 }} activeOpacity={0.7}>
          <Ionicons name="menu" size={32} color={THEME_COLOR} />
        </TouchableOpacity>
        <View style={styles.userBox}>
          <Ionicons name="person-circle" size={44} color={THEME_COLOR} />
          <Text style={styles.userName}>{MOCK_USER}</Text>
        </View>
      </Animated.View>
      <FlatList
        data={MOCK_BRANDS}
        keyExtractor={item => item.code}
        contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 18, paddingBottom: 32 }}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(200 + index * 80).duration(700)}>
            <BrandCard
              brand={item}
              logo={getBrandLogo(item.name)}
              onPress={() => handleBrand(item)}
              themeColor={THEME_COLOR}
              pressed={selectedCard === item.code}
            />
          </Animated.View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
} 
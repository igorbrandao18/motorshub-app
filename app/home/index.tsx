import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

const MOCK_USER = 'Usuário Teste';
const MOCK_BRANDS = [
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

  function handleLogout() {
    router.replace('/signin');
  }

  function handleBrand(brand: { code: string; name: string }) {
    router.push({ pathname: '/model', params: { code: brand.code, name: brand.name } });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View entering={FadeInUp.duration(700)} style={styles.header}>
        <View style={styles.userBox}>
          <Ionicons name="person-circle" size={38} color={THEME_COLOR} />
          <Text style={styles.userName}>{MOCK_USER}</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout} activeOpacity={0.8}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.Text entering={FadeInUp.delay(200).duration(700)} style={styles.title}>Car Brands</Animated.Text>
      <FlatList
        data={MOCK_BRANDS}
        keyExtractor={item => item.code}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <Animated.View entering={FadeInUp.delay(300 + index * 100).duration(700)}>
            <TouchableOpacity style={styles.card} onPress={() => handleBrand(item)} activeOpacity={0.85}>
              <Image
                source={{ uri: getBrandLogo(item.name) }}
                style={styles.brandLogo}
                onError={(e) => {}}
              />
              <Text style={styles.brandName}>{item.name}</Text>
              <Ionicons name="chevron-forward" size={22} color={THEME_COLOR} style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </Animated.View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 10,
  },
  userBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: THEME_COLOR,
    marginLeft: 6,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: THEME_COLOR,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 14,
    gap: 4,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: THEME_COLOR,
    marginLeft: 24,
    marginBottom: 12,
    marginTop: 8,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2fafd',
    borderRadius: 14,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    width: width - 32,
  },
  brandLogo: {
    width: 38,
    height: 38,
    borderRadius: 8,
    marginRight: 16,
    backgroundColor: '#e0f7fa',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
}); 
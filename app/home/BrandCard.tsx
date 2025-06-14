import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';
import { Brand } from './types';

interface BrandCardProps {
  brand: Brand;
  logo: string;
  onPress: () => void;
  themeColor?: string;
  pressed?: boolean;
}

export const BrandCard: React.FC<BrandCardProps> = ({ brand, logo, onPress, themeColor = '#0a7ea4', pressed }) => (
  <TouchableOpacity
    style={[styles.card, pressed && styles.cardPressed]}
    onPress={onPress}
    activeOpacity={0.85}
  >
    <Image source={{ uri: logo }} style={styles.brandLogo} />
    <Text style={styles.brandName}>{brand.name}</Text>
    <View style={{ flex: 1 }} />
    <Ionicons name="chevron-forward" size={22} color={themeColor} />
  </TouchableOpacity>
); 
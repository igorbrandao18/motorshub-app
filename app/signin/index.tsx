import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Image, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { useAuth } from '../../providers/AuthProvider';
import { signIn } from '../services/auth';

const MOCK_USER = 'teste';
const MOCK_PASS = '123';
const THEME_COLOR = '#0a7ea4';
const { width } = Dimensions.get('window');

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: { user: '', password: '' },
  });
  const { user, signIn: signInContext, loading: authLoading } = useAuth();

  React.useEffect(() => {
    if (user) router.replace('/home');
  }, [user]);

  async function onSubmit({ user, password }: { user: string; password: string }) {
    setError(null);
    setLoading(true);
    try {
      const userData = await signIn(user, password);
      await signInContext(userData);
      // router.replace('/home'); // redireciona via useEffect
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#fff' }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.container}>
        <Animated.View entering={FadeInDown.duration(800)} style={styles.logoBox}>
          <Image
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/743/743007.png' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.brand}>MotorsHub</Text>
        </Animated.View>
        <Animated.Text entering={FadeInUp.delay(200).duration(700)} style={styles.title}>Welcome!</Animated.Text>
        <Animated.Text entering={FadeInUp.delay(300).duration(700)} style={styles.subtitle}>Sign in to your account</Animated.Text>
        <View style={styles.form}>
          <Controller
            control={control}
            name="user"
            rules={{ required: 'Username is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Animated.View entering={FadeInUp.delay(400).duration(700)} style={styles.inputContainer}>
                <Ionicons name="person-outline" size={20} color={THEME_COLOR} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!loading}
                  returnKeyType="next"
                  placeholderTextColor="#aaa"
                />
              </Animated.View>
            )}
          />
          {errors.user && <Animated.Text entering={FadeInUp.delay(450).duration(700)} style={styles.error}>{errors.user.message as string}</Animated.Text>}

          <Controller
            control={control}
            name="password"
            rules={{ required: 'Password is required' }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Animated.View entering={FadeInUp.delay(500).duration(700)} style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color={THEME_COLOR} style={styles.icon} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  editable={!loading}
                  returnKeyType="done"
                  placeholderTextColor="#aaa"
                />
                <TouchableOpacity
                  onPress={() => setShowPassword((v) => !v)}
                  style={styles.eyeButton}
                  disabled={loading}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={THEME_COLOR}
                  />
                </TouchableOpacity>
              </Animated.View>
            )}
          />
          {errors.password && <Animated.Text entering={FadeInUp.delay(550).duration(700)} style={styles.error}>{errors.password.message as string}</Animated.Text>}

          {error && <Animated.Text entering={FadeInUp.delay(600).duration(700)} style={styles.error}>{error}</Animated.Text>}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Animated.Text entering={FadeInUp.delay(700).duration(700)} style={styles.buttonText}>
              {loading ? 'Loading...' : 'Sign In'}
            </Animated.Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  logoBox: {
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: width * 0.22,
    height: width * 0.22,
    marginBottom: 4,
  },
  brand: {
    fontSize: 22,
    fontWeight: 'bold',
    color: THEME_COLOR,
    letterSpacing: 1.2,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#222',
  },
  subtitle: {
    fontSize: 18,
    color: '#888',
    marginBottom: 24,
    textAlign: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 340,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#222',
  },
  eyeButton: {
    padding: 4,
  },
  button: {
    backgroundColor: THEME_COLOR,
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: '#d32f2f',
    marginBottom: 8,
    marginLeft: 4,
    fontSize: 14,
    textAlign: 'center',
  },
}); 
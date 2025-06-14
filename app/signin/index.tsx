import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

const MOCK_USER = 'teste';
const MOCK_PASS = '123';

export default function SignIn() {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function handleLogin() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (user === MOCK_USER && password === MOCK_PASS) {
        router.replace('/home');
      } else {
        Alert.alert('Login failed', 'Invalid username or password');
      }
    }, 700);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title={loading ? 'Loading...' : 'Login'} onPress={handleLogin} disabled={loading} />
      <Text style={styles.demoInfo}>User: teste | Password: 123</Text>
    </View>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: 260,
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  demoInfo: {
    marginTop: 20,
    color: '#888',
    fontSize: 14,
  },
}); 
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';
import { AuthProvider, useAuth } from '../providers/AuthProvider';

function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    console.log('AuthGuard: user', user, 'authLoading', authLoading, 'segments', segments);
    if (authLoading) {
      console.log('AuthGuard: Auth is loading, returning.');
      return; // Espera o estado de autenticação carregar
    }

    const isSignInScreen = segments[segments.length - 1] === 'signin';

    if (user) {
      // Se o usuário está logado e tenta acessar a tela de login
      if (isSignInScreen) {
        console.log('AuthGuard: User logged in, on signin screen. Redirecting to /home');
        router.replace('/home');
      }
    } else { // Se o usuário NÃO está logado
      // Se o usuário tenta acessar qualquer tela que NÃO seja a de login
      if (!isSignInScreen) {
        console.log('AuthGuard: User not logged in, not on signin screen. Redirecting to /signin');
        router.replace('/signin');
      }
    }
  }, [user, authLoading, segments]);

  return <>{children}</>;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthGuard>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <Stack.Screen name="model" options={{ headerShown: false }} />
            <Stack.Screen name="signin" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </AuthGuard>
        <StatusBar style="auto" />
      </ThemeProvider>
    </AuthProvider>
  );
}

import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet } from 'react-native';
import { AppNavigator } from './src/navigation/AppNavigator';
import { ThemeProvider, colors } from './src/theme';
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.style = [
        Text.defaultProps.style,
        { fontFamily: 'Poppins_400Regular' },
      ];
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  try {
    return (
      <ThemeProvider>
        <AppNavigator />
        <StatusBar style="light" />
      </ThemeProvider>
    );
  } catch (error) {
    console.error('App Error:', error);
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Erro ao carregar o app</Text>
        <Text style={styles.errorDetail}>{String(error)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.background,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  errorDetail: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

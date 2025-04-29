import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function Index() {
  useEffect(() => {
    // Hide the splash screen after our app is ready
    SplashScreen.hideAsync();
  }, []);

  // Redirect to the tabs layout
  return <Redirect href="/(tabs)" />;
}
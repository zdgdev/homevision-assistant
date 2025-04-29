import { useState, useEffect } from 'react';
import { View, StyleSheet, Platform, Text } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '@/context/ThemeContext';
import { Camera as CameraType } from '@/types';
import NightVisionFilter from './NightVisionFilter';

// Only import Camera on non-web platforms
const Camera = Platform.select({
  native: () => require('expo-camera').Camera,
  default: () => null,
})();

interface CameraFeedProps {
  camera: CameraType;
  nightVisionEnabled?: boolean;
  isPaused?: boolean;
  style?: object;
  showOverlay?: boolean;
}

export default function CameraFeed({ 
  camera, 
  nightVisionEnabled = false, 
  isPaused = false,
  style = {},
  showOverlay = true,
}: CameraFeedProps) {
  const { colors } = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  
  const overlayOpacity = useSharedValue(0.4);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundDarker,
      overflow: 'hidden',
      position: 'relative',
    },
    camera: {
      flex: 1,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      zIndex: 1,
    },
    loadingOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.backgroundDarker,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
    errorOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: colors.backgroundDarker,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 3,
    },
    errorText: {
      color: colors.error,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
    },
    pausedOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 2,
    },
    webPlaceholder: {
      flex: 1,
      backgroundColor: colors.backgroundDarker,
      justifyContent: 'center',
      alignItems: 'center',
    },
    webPlaceholderText: {
      color: colors.text,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      textAlign: 'center',
    },
  });
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web' && Camera) {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
      } else {
        setHasPermission(true); // Web handles permissions differently
      }
      setIsLoading(false);
    })();
  }, []);
  
  useEffect(() => {
    overlayOpacity.value = withTiming(showOverlay ? 0.4 : 0, { duration: 300 });
  }, [showOverlay]);
  
  const overlayStyle = useAnimatedStyle(() => {
    return {
      opacity: overlayOpacity.value,
    };
  });

  if (hasPermission === null) {
    return <View style={styles.loadingOverlay} />;
  }

  if (hasPermission === false) {
    return (
      <View style={styles.errorOverlay}>
        <Text style={styles.errorText}>No access to camera</Text>
      </View>
    );
  }

  // Show a placeholder on web platform
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.webPlaceholder, style]}>
        <Text style={styles.webPlaceholderText}>
          Camera preview is not available in web browser.{'\n'}
          Please use the mobile app for full camera functionality.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      {!isLoading && !hasError && !isPaused && Camera && (
        <Camera
          style={styles.camera}
          type={Camera?.Constants?.Type?.back}
        />
      )}
      
      {nightVisionEnabled && !isLoading && !hasError && !isPaused && (
        <NightVisionFilter />
      )}
      
      {showOverlay && (
        <Animated.View style={[styles.overlay, overlayStyle]}>
          <LinearGradient
            colors={['rgba(0,0,0,0.7)', 'transparent', 'rgba(0,0,0,0.7)']}
            style={StyleSheet.absoluteFillObject}
          />
        </Animated.View>
      )}
      
      {isLoading && (
        <View style={styles.loadingOverlay} />
      )}
      
      {hasError && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorText}>Camera error</Text>
        </View>
      )}
      
      {isPaused && (
        <View style={styles.pausedOverlay} />
      )}
    </View>
  );
}
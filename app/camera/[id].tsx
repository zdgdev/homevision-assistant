import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ChevronLeft, Fullscreen as FullscreenIcon, Settings, ZoomIn, ZoomOut, Video, CirclePause as PauseCircle, CirclePlay as PlayCircle, Moon, Cctv } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { GestureHandlerRootView, PinchGestureHandler } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import CameraFeed from '@/components/camera/CameraFeed';
import { mockCameras } from '@/data/mockData';

export default function CameraDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  
  const [camera, setCamera] = useState(mockCameras.find(c => c.id.toString() === id));
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [nightVisionEnabled, setNightVisionEnabled] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const scale = useSharedValue(1);
  
  useEffect(() => {
    // Here we would fetch the specific camera data
    if (!camera) {
      router.back();
    }
  }, [id, camera, router]);

  const pinchHandler = useAnimatedGestureHandler({
    onActive: (event) => {
      scale.value = Math.max(0.5, Math.min(event.scale, 3));
    },
    onEnd: () => {
      if (scale.value < 0.7) {
        scale.value = 0.5;
      } else if (scale.value > 2.5) {
        scale.value = 3;
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const togglePlayPause = () => {
    setIsPaused(!isPaused);
  };

  const toggleNightVision = () => {
    setNightVisionEnabled(!nightVisionEnabled);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!camera) {
    return null;
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundDarker,
    },
    feedContainer: {
      flex: 1,
      overflow: 'hidden',
    },
    controlsOverlay: {
      ...StyleSheet.absoluteFillObject,
      justifyContent: 'space-between',
      padding: 16,
    },
    topBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? insets.top : 0,
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.backgroundTransparent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    cameraInfo: {
      backgroundColor: colors.backgroundTransparent,
      borderRadius: 16,
      padding: 8,
      flexDirection: 'row',
      alignItems: 'center',
    },
    cameraIcon: {
      marginRight: 8,
    },
    cameraName: {
      fontFamily: 'Inter-Bold',
      fontSize: 14,
      color: colors.textLight,
    },
    cameraLocation: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textLight,
      opacity: 0.8,
    },
    settingsButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: colors.backgroundTransparent,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: Platform.OS === 'ios' ? insets.bottom : 16,
    },
    controlsGroup: {
      flexDirection: 'row',
    },
    controlButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.backgroundTransparent,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 6,
    },
    recordButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: colors.error,
      justifyContent: 'center',
      alignItems: 'center',
    },
    recordingIndicator: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: colors.error,
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.container}>
        <PinchGestureHandler onGestureEvent={pinchHandler}>
          <Animated.View style={[styles.feedContainer, animatedStyle]}>
            <CameraFeed 
              camera={camera} 
              nightVisionEnabled={nightVisionEnabled}
              isPaused={isPaused}
            />
          </Animated.View>
        </PinchGestureHandler>
        
        <View style={styles.controlsOverlay}>
          <View style={styles.topBar}>
            <Pressable style={styles.backButton} onPress={() => router.back()}>
              <ChevronLeft size={24} color={colors.textLight} />
            </Pressable>
            
            <View style={styles.cameraInfo}>
              <Cctv size={16} color={colors.textLight} style={styles.cameraIcon} />
              <View>
                <Text style={styles.cameraName}>{camera.name}</Text>
                <Text style={styles.cameraLocation}>{camera.location}</Text>
              </View>
            </View>
            
            <Pressable style={styles.settingsButton}>
              <Settings size={20} color={colors.textLight} />
            </Pressable>
          </View>
          
          <View style={styles.bottomBar}>
            <View style={styles.controlsGroup}>
              <Pressable 
                style={styles.controlButton} 
                onPress={toggleNightVision}
              >
                <Moon 
                  size={20} 
                  color={nightVisionEnabled ? colors.success : colors.textLight} 
                />
              </Pressable>
              
              <Pressable style={styles.controlButton}>
                <ZoomOut size={20} color={colors.textLight} />
              </Pressable>
              
              <Pressable style={styles.controlButton}>
                <ZoomIn size={20} color={colors.textLight} />
              </Pressable>
            </View>
            
            <View style={styles.controlsGroup}>
              <Pressable 
                style={styles.controlButton}
                onPress={togglePlayPause}
              >
                {isPaused ? (
                  <PlayCircle size={24} color={colors.textLight} />
                ) : (
                  <PauseCircle size={24} color={colors.textLight} />
                )}
              </Pressable>
              
              <Pressable 
                style={[styles.controlButton, isRecording && styles.recordButton]}
                onPress={toggleRecording}
              >
                <Video size={20} color={colors.textLight} />
              </Pressable>
              
              <Pressable 
                style={styles.controlButton}
                onPress={toggleFullscreen}
              >
                <FullscreenIcon size={20} color={colors.textLight} />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}
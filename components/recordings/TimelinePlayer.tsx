import { useState, useRef } from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { Video } from 'expo-av';
import { useTheme } from '@/context/ThemeContext';
import { Play, Pause, SkipBack, SkipForward, Moon, Volume2, Volume1, VolumeX } from 'lucide-react-native';

interface TimelinePlayerProps {
  recording: any;
}

export default function TimelinePlayer({ recording }: TimelinePlayerProps) {
  const { colors } = useTheme();
  const videoRef = useRef<Video>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [nightVisionEnabled, setNightVisionEnabled] = useState(false);

  const formatTime = (timeInMillis: number) => {
    const totalSeconds = Math.floor(timeInMillis / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const togglePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pauseAsync();
    } else {
      videoRef.current?.playAsync();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    if (videoRef.current) {
      const newPosition = Math.max(0, position - 10000);
      videoRef.current.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      const newPosition = Math.min(duration, position + 10000);
      videoRef.current.setPositionAsync(newPosition);
      setPosition(newPosition);
    }
  };

  const toggleNightVision = () => {
    setNightVisionEnabled(!nightVisionEnabled);
  };

  const cycleVolume = () => {
    if (volume === 0) {
      setVolume(0.5);
      videoRef.current?.setVolumeAsync(0.5);
    } else if (volume === 0.5) {
      setVolume(1);
      videoRef.current?.setVolumeAsync(1);
    } else {
      setVolume(0);
      videoRef.current?.setVolumeAsync(0);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundDarker,
    },
    videoContainer: {
      flex: 1,
      justifyContent: 'center',
      position: 'relative',
    },
    video: {
      width: '100%',
      height: '100%',
    },
    controlsOverlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      justifyContent: 'space-between',
    },
    topControls: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 16,
    },
    centerControls: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    controlButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 8,
    },
    playPauseButton: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: colors.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 16,
    },
    bottomControls: {
      padding: 16,
    },
    progressContainer: {
      marginBottom: 16,
    },
    progressBar: {
      height: 4,
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
      borderRadius: 2,
      marginBottom: 8,
    },
    progress: {
      height: 4,
      backgroundColor: colors.primary,
      borderRadius: 2,
    },
    timeDisplay: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    timeText: {
      color: colors.textLight,
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
    },
    nightVisionFilter: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 255, 0, 0.15)',
      mixBlendMode: 'multiply',
      zIndex: 1,
      pointerEvents: 'none',
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        <Video
          ref={videoRef}
          style={styles.video}
          source={{ uri: recording.videoUrl }}
          resizeMode="contain"
          isLooping
          onPlaybackStatusUpdate={(status) => {
            if (status.isLoaded) {
              setPosition(status.positionMillis);
              setDuration(status.durationMillis || 0);
              setIsPlaying(status.isPlaying);
            }
          }}
        />
        
        {nightVisionEnabled && <View style={styles.nightVisionFilter} />}
        
        <View style={styles.controlsOverlay}>
          <View style={styles.topControls}>
            <Pressable style={styles.controlButton} onPress={toggleNightVision}>
              <Moon size={20} color={nightVisionEnabled ? colors.success : colors.textLight} />
            </Pressable>
            
            <Pressable style={styles.controlButton} onPress={cycleVolume}>
              {volume === 0 && <VolumeX size={20} color={colors.textLight} />}
              {volume === 0.5 && <Volume1 size={20} color={colors.textLight} />}
              {volume === 1 && <Volume2 size={20} color={colors.textLight} />}
            </Pressable>
          </View>
          
          <View style={styles.centerControls}>
            <Pressable style={styles.controlButton} onPress={skipBackward}>
              <SkipBack size={20} color={colors.textLight} />
            </Pressable>
            
            <Pressable style={styles.playPauseButton} onPress={togglePlayPause}>
              {isPlaying ? 
                <Pause size={24} color={colors.textLight} /> : 
                <Play size={24} color={colors.textLight} />
              }
            </Pressable>
            
            <Pressable style={styles.controlButton} onPress={skipForward}>
              <SkipForward size={20} color={colors.textLight} />
            </Pressable>
          </View>
          
          <View style={styles.bottomControls}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progress, 
                    { width: `${(position / duration) * 100 || 0}%` }
                  ]}
                />
              </View>
              
              <View style={styles.timeDisplay}>
                <Text style={styles.timeText}>{formatTime(position)}</Text>
                <Text style={styles.timeText}>{formatTime(duration)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
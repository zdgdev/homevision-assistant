import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Clock, Dot } from 'lucide-react-native';

interface RecordingListItemProps {
  recording: any;
  isSelected: boolean;
  onPress: () => void;
}

export default function RecordingListItem({ 
  recording, 
  isSelected,
  onPress 
}: RecordingListItemProps) {
  const { colors } = useTheme();

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDuration = (durationMs: number) => {
    const totalSeconds = Math.floor(durationMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: isSelected ? colors.primaryTransparent : colors.background,
    },
    thumbnailContainer: {
      width: 100,
      height: 60,
      borderRadius: 8,
      overflow: 'hidden',
      backgroundColor: colors.backgroundDarker,
    },
    thumbnail: {
      width: '100%',
      height: '100%',
    },
    infoContainer: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 4,
    },
    metaContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeIcon: {
      marginRight: 4,
    },
    timeText: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    durationText: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.primary,
      paddingHorizontal: 6,
      paddingVertical: 2,
      backgroundColor: colors.primaryTransparent,
      borderRadius: 4,
    },
    locationText: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <Pressable 
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.thumbnailContainer}>
        <Image 
          source={{ uri: recording.thumbnailUrl }}
          style={styles.thumbnail}
        />
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{recording.title}</Text>
        
        <View style={styles.metaContainer}>
          <View style={styles.timeContainer}>
            <Clock size={12} color={colors.textSecondary} style={styles.timeIcon} />
            <Text style={styles.timeText}>{formatTime(recording.timestamp)}</Text>
          </View>
          
          <Dot size={16} color={colors.textSecondary} />
          
          <Text style={styles.durationText}>
            {formatDuration(recording.duration)}
          </Text>
          
          <Dot size={16} color={colors.textSecondary} />
          
          <Text style={styles.locationText}>{recording.location}</Text>
        </View>
      </View>
    </Pressable>
  );
}
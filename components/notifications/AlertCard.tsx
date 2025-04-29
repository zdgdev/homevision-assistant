import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { TriangleAlert as AlertTriangle, Clock } from 'lucide-react-native';

interface AlertCardProps {
  title: string;
  message: string;
  timestamp: number;
  onPress: () => void;
}

export default function AlertCard({ 
  title, 
  message, 
  timestamp, 
  onPress 
}: AlertCardProps) {
  const { colors } = useTheme();

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    
    if (diff < 60000) { // less than a minute
      return 'Just now';
    } else if (diff < 3600000) { // less than an hour
      const minutes = Math.floor(diff / 60000);
      return `${minutes}m ago`;
    } else if (diff < 86400000) { // less than a day
      const hours = Math.floor(diff / 3600000);
      return `${hours}h ago`;
    } else {
      const date = new Date(timestamp);
      return date.toLocaleTimeString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    }
  };

  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      borderRadius: 8,
      borderLeftWidth: 4,
      borderLeftColor: colors.warning,
      padding: 12,
      marginBottom: 8,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    iconContainer: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: 'rgba(255, 166, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    titleContainer: {
      flex: 1,
    },
    title: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.text,
    },
    time: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    message: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.text,
      marginBottom: 8,
    },
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    timeIndicator: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    clockIcon: {
      marginRight: 4,
    },
    timeText: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <AlertTriangle size={16} color={colors.warning} />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      
      <Text style={styles.message}>{message}</Text>
      
      <View style={styles.footer}>
        <View style={styles.timeIndicator}>
          <Clock size={12} color={colors.textSecondary} style={styles.clockIcon} />
          <Text style={styles.timeText}>{formatTime(timestamp)}</Text>
        </View>
      </View>
    </Pressable>
  );
}
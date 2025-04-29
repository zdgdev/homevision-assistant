import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { Wifi, Clock } from 'lucide-react-native';

export default function StatusBar() {
  const { colors } = useTheme();
  
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true
    });
  };

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.card,
    },
    leftSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    rightSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    statusText: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 12,
    },
    clockIcon: {
      marginRight: 4,
    },
    networkContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    wifiIcon: {
      marginRight: 4,
    },
    systemActive: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.success,
      marginRight: 8,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.systemActive} />
        <Text style={styles.statusText}>System Active</Text>
      </View>
      
      <View style={styles.rightSection}>
        <View style={styles.timeContainer}>
          <Clock size={12} color={colors.textSecondary} style={styles.clockIcon} />
          <Text style={styles.statusText}>{getCurrentTime()}</Text>
        </View>
        
        <View style={styles.networkContainer}>
          <Wifi size={12} color={colors.textSecondary} style={styles.wifiIcon} />
          <Text style={styles.statusText}>Connected</Text>
        </View>
      </View>
    </View>
  );
}
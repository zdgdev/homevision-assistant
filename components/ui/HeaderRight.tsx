import { View, Pressable, StyleSheet } from 'react-native';
import { Bell, Menu } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';

export default function HeaderRight() {
  const { colors } = useTheme();
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingRight: 16,
    },
    iconButton: {
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: 8,
    },
    notificationDot: {
      position: 'absolute',
      top: 8,
      right: 10,
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.error,
    },
  });

  return (
    <View style={styles.container}>
      <Pressable style={styles.iconButton}>
        <Bell size={20} color={colors.text} />
        <View style={styles.notificationDot} />
      </Pressable>
      
      <Pressable style={styles.iconButton}>
        <Menu size={20} color={colors.text} />
      </Pressable>
    </View>
  );
}
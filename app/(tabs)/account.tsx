import { View, Text, StyleSheet, ScrollView, Pressable, Image, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { BellRing, LogOut, ShieldCheck, Key, CircleHelp as HelpCircle, ChevronRight } from 'lucide-react-native';

export default function AccountScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const { user, signOut } = useAuth();

  const menuItems = [
    {
      id: 'notifications',
      title: 'Notification Settings',
      icon: <BellRing size={20} color={colors.primary} />,
      onPress: () => {},
    },
    {
      id: 'security',
      title: 'Security & Privacy',
      icon: <ShieldCheck size={20} color={colors.primary} />,
      onPress: () => {},
    },
    {
      id: 'password',
      title: 'Change Password',
      icon: <Key size={20} color={colors.primary} />,
      onPress: () => {},
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={20} color={colors.primary} />,
      onPress: () => {},
    },
    {
      id: 'logout',
      title: 'Sign Out',
      icon: <LogOut size={20} color={colors.error} />,
      onPress: signOut,
      color: colors.error,
    },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
    },
    profileSection: {
      alignItems: 'center',
      paddingVertical: 24,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    avatar: {
      width: 80,
      height: 80,
      borderRadius: 40,
      marginBottom: 12,
    },
    name: {
      fontFamily: 'Inter-Bold',
      fontSize: 20,
      color: colors.text,
    },
    email: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 4,
    },
    role: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.primary,
      backgroundColor: colors.primaryTransparent,
      paddingVertical: 4,
      paddingHorizontal: 12,
      borderRadius: 12,
      marginTop: 12,
    },
    menuSection: {
      marginTop: 16,
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.text,
      marginHorizontal: 16,
      marginBottom: 12,
    },
    menuItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    menuIconContainer: {
      width: 36,
      alignItems: 'center',
      marginRight: 12,
    },
    menuText: {
      flex: 1,
      fontFamily: 'Inter-Regular',
      fontSize: 16,
    },
    versionInfo: {
      alignItems: 'center',
      marginTop: 32,
      marginBottom: 16,
    },
    versionText: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg' }}
            style={styles.avatar}
          />
          <Text style={styles.name}>{user?.name || 'John Doe'}</Text>
          <Text style={styles.email}>{user?.email || 'john.doe@example.com'}</Text>
          <Text style={styles.role}>ADMINISTRATOR</Text>
        </View>
        
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          {menuItems.map(item => (
            <Pressable 
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuIconContainer}>
                {item.icon}
              </View>
              <Text style={[styles.menuText, item.color ? { color: item.color } : { color: colors.text }]}>
                {item.title}
              </Text>
              {item.id !== 'logout' && <ChevronRight size={20} color={colors.textSecondary} />}
            </Pressable>
          ))}
        </View>
        
        <View style={styles.versionInfo}>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}
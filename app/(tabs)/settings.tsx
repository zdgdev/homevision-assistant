import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { 
  Moon, 
  Sun, 
  Play, 
  Save, 
  Users, 
  Database, 
  Wifi,
  ChevronRight 
} from 'lucide-react-native';

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [motionDetectionEnabled, setMotionDetectionEnabled] = useState(true);
  const [nightVisionEnabled, setNightVisionEnabled] = useState(true);
  const [autoRecordingEnabled, setAutoRecordingEnabled] = useState(true);
  const [highQualityEnabled, setHighQualityEnabled] = useState(true);
  
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const renderSwitch = (value: boolean, onValueChange: (value: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.border, true: colors.primaryTransparent }}
      thumbColor={value ? colors.primary : colors.textSecondary}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
    },
    section: {
      marginTop: 16,
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.text,
      marginHorizontal: 16,
      marginBottom: 12,
    },
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    iconContainer: {
      width: 36,
      alignItems: 'center',
      marginRight: 12,
    },
    itemContent: {
      flex: 1,
    },
    itemTitle: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
    },
    itemDescription: {
      fontFamily: 'Inter-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: 2,
    },
    advancedItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              {theme === 'dark' ? 
                <Moon size={20} color={colors.primary} /> : 
                <Sun size={20} color={colors.primary} />
              }
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Dark Mode</Text>
              <Text style={styles.itemDescription}>
                Use dark theme for night monitoring
              </Text>
            </View>
            {renderSwitch(theme === 'dark', toggleTheme)}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Play size={20} color={colors.primary} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Autoplay Live Feeds</Text>
              <Text style={styles.itemDescription}>
                Automatically start streaming when opening a camera
              </Text>
            </View>
            {renderSwitch(true, () => {})}
          </View>
          
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Wifi size={20} color={colors.primary} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Use Mobile Data</Text>
              <Text style={styles.itemDescription}>
                Stream cameras when not on WiFi
              </Text>
            </View>
            {renderSwitch(false, () => {})}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Camera Settings</Text>
          
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Save size={20} color={colors.primary} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Auto Recording</Text>
              <Text style={styles.itemDescription}>
                Automatically record when motion is detected
              </Text>
            </View>
            {renderSwitch(autoRecordingEnabled, setAutoRecordingEnabled)}
          </View>
          
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Moon size={20} color={colors.primary} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>Night Vision Mode</Text>
              <Text style={styles.itemDescription}>
                Enable enhanced night vision filter
              </Text>
            </View>
            {renderSwitch(nightVisionEnabled, setNightVisionEnabled)}
          </View>
          
          <View style={styles.item}>
            <View style={styles.iconContainer}>
              <Save size={20} color={colors.primary} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>High Quality Streaming</Text>
              <Text style={styles.itemDescription}>
                Stream at maximum resolution when possible
              </Text>
            </View>
            {renderSwitch(highQualityEnabled, setHighQualityEnabled)}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced Settings</Text>
          
          <Pressable style={styles.advancedItem}>
            <View style={styles.iconContainer}>
              <Users size={20} color={colors.primary} />
            </View>
            <Text style={styles.itemTitle}>User Management</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
          
          <Pressable style={styles.advancedItem}>
            <View style={styles.iconContainer}>
              <Database size={20} color={colors.primary} />
            </View>
            <Text style={styles.itemTitle}>Storage Management</Text>
            <ChevronRight size={20} color={colors.textSecondary} />
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
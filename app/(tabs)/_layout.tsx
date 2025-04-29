import { Tabs } from 'expo-router';
import { Platform, useColorScheme } from 'react-native';
import { Camera, ChartBar as BarChart2, Settings, Clock, CircleUser as UserCircle } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import HeaderRight from '@/components/ui/HeaderRight';

export default function TabLayout() {
  const insets = useSafeAreaInsets();
  const { theme, colors } = useTheme();
  const colorScheme = useColorScheme();
  
  // Determine if we're in dark mode
  const isDark = theme === 'dark' || (theme === 'system' && colorScheme === 'dark');
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
          height: 60 + (Platform.OS === 'ios' ? insets.bottom : 0),
          paddingBottom: Platform.OS === 'ios' ? insets.bottom : 0,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Regular',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors.background,
          borderBottomColor: colors.border,
          borderBottomWidth: 1,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontFamily: 'Inter-Bold',
        },
        headerRight: () => <HeaderRight />,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Dashboard',
          tabBarIcon: ({ color, size }) => <BarChart2 color={color} size={size} />,
          headerTitle: 'Surveillance Dashboard',
        }}
      />
      <Tabs.Screen
        name="live"
        options={{
          title: 'Live View',
          tabBarIcon: ({ color, size }) => <Camera color={color} size={size} />,
          headerTitle: 'Live Camera Feed',
        }}
      />
      <Tabs.Screen
        name="recordings"
        options={{
          title: 'Recordings',
          tabBarIcon: ({ color, size }) => <Clock color={color} size={size} />,
          headerTitle: 'Video Recordings',
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size }) => <UserCircle color={color} size={size} />,
          headerTitle: 'User Account',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
          headerTitle: 'System Settings',
        }}
      />
    </Tabs>
  );
}
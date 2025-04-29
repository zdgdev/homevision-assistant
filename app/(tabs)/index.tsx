import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import CameraGrid from '@/components/camera/CameraGrid';
import StatusBar from '@/components/ui/StatusBar';
import AlertCard from '@/components/notifications/AlertCard';
import { mockCameras } from '@/data/mockData';
import { Camera as CameraType } from '@/types';

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [cameras, setCameras] = useState<CameraType[]>(mockCameras);
  const [alerts, setAlerts] = useState<any[]>([
    { id: 1, title: 'Motion Detected', message: 'Motion detected on Front Door camera', timestamp: Date.now() - 300000, camera: 'Front Door' },
    { id: 2, title: 'Camera Offline', message: 'Garage camera is offline', timestamp: Date.now() - 900000, camera: 'Garage' },
  ]);

  const handleCameraPress = (camera: CameraType) => {
    router.push({ pathname: `/camera/${camera.id}`, params: { id: camera.id } });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
    },
    content: {
      flex: 1,
      padding: 16,
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      color: colors.text,
      marginBottom: 12,
    },
    statsContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    statCard: {
      flex: 1,
      backgroundColor: colors.card,
      borderRadius: 12,
      padding: 16,
      marginHorizontal: 4,
      borderWidth: 1,
      borderColor: colors.border,
    },
    statTitle: {
      fontFamily: 'RobotoMono-Regular',
      fontSize: 12,
      color: colors.textSecondary,
      marginBottom: 4,
    },
    statValue: {
      fontFamily: 'RobotoMono-Bold',
      fontSize: 20,
      color: colors.primary,
    },
    alertsSection: {
      marginBottom: 20,
    },
    noAlerts: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
      textAlign: 'center',
      marginVertical: 10,
    },
    viewAll: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.primary,
      textAlign: 'right',
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <StatusBar />
      <ScrollView style={styles.content}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>ACTIVE CAMERAS</Text>
            <Text style={styles.statValue}>{cameras.filter(c => c.isOnline).length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>ALERTS TODAY</Text>
            <Text style={styles.statValue}>{alerts.length}</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statTitle}>STORAGE</Text>
            <Text style={styles.statValue}>72%</Text>
          </View>
        </View>

        <View style={styles.alertsSection}>
          <Text style={styles.sectionTitle}>Recent Alerts</Text>
          {alerts.length === 0 ? (
            <Text style={styles.noAlerts}>No recent alerts</Text>
          ) : (
            alerts.map(alert => (
              <AlertCard 
                key={alert.id} 
                title={alert.title} 
                message={alert.message} 
                timestamp={alert.timestamp} 
                onPress={() => {}} 
              />
            ))
          )}
          <Pressable>
            <Text style={styles.viewAll}>View all alerts</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionTitle}>Live Cameras</Text>
        <CameraGrid 
          cameras={cameras.filter(c => c.isOnline)}
          onCameraPress={handleCameraPress}
        />
      </ScrollView>
    </View>
  );
}
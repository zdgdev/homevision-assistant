import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, Pressable, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Filter, Grid2x2 as Grid, Grid2x2 as GridIcon } from 'lucide-react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CameraGrid from '@/components/camera/CameraGrid';
import CameraFilter from '@/components/camera/CameraFilter';
import { mockCameras } from '@/data/mockData';
import { Camera } from '@/types';

export default function LiveView() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [cameras, setCameras] = useState<Camera[]>(mockCameras);
  const [filteredCameras, setFilteredCameras] = useState<Camera[]>(mockCameras);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [gridLayout, setGridLayout] = useState<'2x2' | '3x3'>('2x2');
  const scrollRef = useRef<ScrollView>(null);

  // Apply filters
  const applyFilters = (filters: any) => {
    let filtered = [...cameras];
    
    if (filters.location && filters.location !== 'All') {
      filtered = filtered.filter(cam => cam.location === filters.location);
    }
    
    if (filters.status === 'Online') {
      filtered = filtered.filter(cam => cam.isOnline);
    } else if (filters.status === 'Offline') {
      filtered = filtered.filter(cam => !cam.isOnline);
    }
    
    setFilteredCameras(filtered);
    setIsFilterVisible(false);
  };

  const handleCameraPress = (camera: Camera) => {
    router.push({ pathname: `/camera/${camera.id}`, params: { id: camera.id } });
  };

  const toggleGridLayout = () => {
    setGridLayout(prev => prev === '2x2' ? '3x3' : '2x2');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
    },
    content: {
      flex: 1,
    },
    filterBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    filterText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.textSecondary,
    },
    buttonsContainer: {
      flexDirection: 'row',
    },
    iconButton: {
      padding: 8,
      marginLeft: 8,
    },
    gridContainer: {
      flex: 1,
      padding: 8,
    },
    emptyState: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.textSecondary,
      textAlign: 'center',
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.filterBar}>
          <Text style={styles.filterText}>
            {filteredCameras.length} cameras • {filteredCameras.filter(c => c.isOnline).length} online
          </Text>
          <View style={styles.buttonsContainer}>
            <Pressable 
              style={styles.iconButton} 
              onPress={() => setIsFilterVisible(true)}
            >
              <Filter size={20} color={colors.primary} />
            </Pressable>
            <Pressable 
              style={styles.iconButton} 
              onPress={toggleGridLayout}
            >
              <GridIcon size={20} color={colors.primary} />
            </Pressable>
          </View>
        </View>

        <ScrollView 
          ref={scrollRef}
          style={styles.content} 
          contentContainerStyle={styles.gridContainer}
        >
          {filteredCameras.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No cameras match the selected filters</Text>
            </View>
          ) : (
            <Animated.View entering={FadeIn.duration(300)}>
              <CameraGrid 
                cameras={filteredCameras}
                onCameraPress={handleCameraPress}
                layout={gridLayout}
              />
            </Animated.View>
          )}
        </ScrollView>

        <CameraFilter 
          isVisible={isFilterVisible}
          onClose={() => setIsFilterVisible(false)}
          onApply={applyFilters}
          locations={[...new Set(cameras.map(cam => cam.location))]}
        />
      </View>
    </GestureHandlerRootView>
  );
}
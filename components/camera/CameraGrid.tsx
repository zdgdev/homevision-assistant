import { View, StyleSheet, Dimensions, Pressable } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import CameraFeed from './CameraFeed';
import { Camera } from '@/types';

interface CameraGridProps {
  cameras: Camera[];
  onCameraPress: (camera: Camera) => void;
  layout?: '2x2' | '3x3';
}

export default function CameraGrid({ 
  cameras, 
  onCameraPress,
  layout = '2x2',
}: CameraGridProps) {
  const { colors } = useTheme();
  const screenWidth = Dimensions.get('window').width;
  
  const getGridStyles = () => {
    const columnsCount = layout === '2x2' ? 2 : 3;
    const spacing = 8;
    const totalSpacing = spacing * (columnsCount - 1);
    const itemWidth = (screenWidth - 32 - totalSpacing) / columnsCount;
    
    return {
      container: {
        flexDirection: 'row' as const,
        flexWrap: 'wrap' as const,
        justifyContent: 'flex-start' as const,
        margin: -spacing / 2,
      },
      item: {
        width: itemWidth,
        aspectRatio: 16 / 9,
        margin: spacing / 2,
      }
    };
  };

  const gridStyles = getGridStyles();

  const styles = StyleSheet.create({
    container: {
      ...gridStyles.container,
    },
    cameraItem: {
      ...gridStyles.item,
      borderRadius: 8,
      overflow: 'hidden',
    },
  });

  return (
    <View style={styles.container}>
      {cameras.map(camera => (
        <Pressable 
          key={camera.id}
          style={styles.cameraItem}
          onPress={() => onCameraPress(camera)}
        >
          <CameraFeed 
            camera={camera}
            showOverlay={true}
          />
        </Pressable>
      ))}
    </View>
  );
}
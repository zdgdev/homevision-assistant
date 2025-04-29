import { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal, 
  Pressable, 
  TouchableWithoutFeedback,
  ScrollView,
  Platform
} from 'react-native';
import { X } from 'lucide-react-native';
import { useTheme } from '@/context/ThemeContext';
import { BlurView } from 'expo-blur';

interface CameraFilterProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  locations: string[];
}

export default function CameraFilter({
  isVisible,
  onClose,
  onApply,
  locations,
}: CameraFilterProps) {
  const { colors, theme } = useTheme();
  
  const [location, setLocation] = useState('All');
  const [status, setStatus] = useState('All');
  
  const handleApply = () => {
    onApply({
      location,
      status,
    });
  };

  const renderOption = (
    title: string, 
    value: string, 
    selectedValue: string, 
    onSelect: (value: string) => void
  ) => {
    const isSelected = value === selectedValue;
    
    return (
      <Pressable
        style={[
          styles.optionButton,
          isSelected && { backgroundColor: colors.primaryTransparent }
        ]}
        onPress={() => onSelect(value)}
      >
        <Text
          style={[
            styles.optionText,
            isSelected && { color: colors.primary, fontFamily: 'Inter-Bold' }
          ]}
        >
          {title}
        </Text>
      </Pressable>
    );
  };

  const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    blurView: {
      ...StyleSheet.absoluteFillObject,
    },
    contentContainer: {
      backgroundColor: colors.background,
      borderTopLeftRadius: 16,
      borderTopRightRadius: 16,
      paddingBottom: Platform.OS === 'ios' ? 40 : 24,
      maxHeight: '70%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 16,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 18,
      color: colors.text,
    },
    closeButton: {
      padding: 4,
    },
    scrollContent: {
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.text,
      marginBottom: 12,
    },
    optionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 24,
    },
    optionButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      backgroundColor: colors.card,
      marginRight: 8,
      marginBottom: 8,
    },
    optionText: {
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      color: colors.text,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingTop: 16,
    },
    resetButton: {
      padding: 12,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: colors.border,
      minWidth: 120,
      alignItems: 'center',
    },
    resetText: {
      fontFamily: 'Inter-Regular',
      fontSize: 16,
      color: colors.text,
    },
    applyButton: {
      padding: 12,
      borderRadius: 8,
      backgroundColor: colors.primary,
      minWidth: 120,
      alignItems: 'center',
    },
    applyText: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.textLight,
    },
  });

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalContainer}>
          <BlurView 
            intensity={80} 
            tint={theme === 'dark' ? 'dark' : 'light'}
            style={styles.blurView}
          />
          
          <TouchableWithoutFeedback>
            <View style={styles.contentContainer}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Filter Cameras</Text>
                <Pressable style={styles.closeButton} onPress={onClose}>
                  <X size={24} color={colors.text} />
                </Pressable>
              </View>
              
              <ScrollView style={styles.scrollContent}>
                <Text style={styles.sectionTitle}>Location</Text>
                <View style={styles.optionsContainer}>
                  {renderOption('All Locations', 'All', location, setLocation)}
                  {locations.map(loc => (
                    renderOption(loc, loc, location, setLocation)
                  ))}
                </View>
                
                <Text style={styles.sectionTitle}>Status</Text>
                <View style={styles.optionsContainer}>
                  {renderOption('All', 'All', status, setStatus)}
                  {renderOption('Online', 'Online', status, setStatus)}
                  {renderOption('Offline', 'Offline', status, setStatus)}
                </View>
              </ScrollView>
              
              <View style={styles.buttonContainer}>
                <Pressable 
                  style={styles.resetButton}
                  onPress={() => {
                    setLocation('All');
                    setStatus('All');
                  }}
                >
                  <Text style={styles.resetText}>Reset</Text>
                </Pressable>
                
                <Pressable 
                  style={styles.applyButton}
                  onPress={handleApply}
                >
                  <Text style={styles.applyText}>Apply</Text>
                </Pressable>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
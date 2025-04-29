import { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '@/context/ThemeContext';
import { Calendar, ChevronDown } from 'lucide-react-native';
import RecordingListItem from '@/components/recordings/RecordingListItem';
import TimelinePlayer from '@/components/recordings/TimelinePlayer';
import { mockRecordings } from '@/data/mockData';

export default function RecordingsScreen() {
  const insets = useSafeAreaInsets();
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [recordings, setRecordings] = useState(mockRecordings);
  const [selectedRecording, setSelectedRecording] = useState(mockRecordings[0]);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  
  const handleRecordingSelect = (recording: any) => {
    setSelectedRecording(recording);
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
      paddingTop: Platform.OS === 'ios' ? 0 : insets.top,
    },
    playerContainer: {
      width: '100%',
      aspectRatio: 16 / 9,
      backgroundColor: colors.backgroundDarker,
    },
    dateSelector: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    dateText: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.text,
      marginLeft: 8,
    },
    chevron: {
      marginLeft: 4,
    },
    recordingsList: {
      flex: 1,
    },
    sectionTitle: {
      fontFamily: 'Inter-Bold',
      fontSize: 16,
      color: colors.text,
      marginVertical: 12,
      marginHorizontal: 16,
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
    <View style={styles.container}>
      <View style={styles.playerContainer}>
        <TimelinePlayer 
          recording={selectedRecording}
        />
      </View>
      
      <Pressable 
        style={styles.dateSelector}
        onPress={() => setIsDatePickerVisible(true)}
      >
        <Calendar size={20} color={colors.primary} />
        <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
        <ChevronDown size={16} color={colors.text} style={styles.chevron} />
      </Pressable>
      
      {recordings.length > 0 ? (
        <ScrollView style={styles.recordingsList}>
          <Text style={styles.sectionTitle}>
            {recordings.length} Recordings
          </Text>
          
          {recordings.map(recording => (
            <RecordingListItem
              key={recording.id}
              recording={recording}
              isSelected={selectedRecording.id === recording.id}
              onPress={() => handleRecordingSelect(recording)}
            />
          ))}
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No recordings found for this date</Text>
        </View>
      )}
    </View>
  );
}
import { StyleSheet, View } from 'react-native';

export default function NightVisionFilter() {
  const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(0, 255, 0, 0.15)',
      mixBlendMode: 'multiply',
      zIndex: 1,
    },
    noiseOverlay: {
      ...StyleSheet.absoluteFillObject,
      opacity: 0.1,
      zIndex: 2,
    },
    scanLine: {
      position: 'absolute',
      left: 0,
      right: 0,
      height: 2,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      zIndex: 3,
    },
  });

  // Create scan lines for the night vision effect
  const renderScanLines = () => {
    const scanLines = [];
    for (let i = 0; i < 100; i += 4) {
      scanLines.push(
        <View 
          key={i} 
          style={[styles.scanLine, { top: `${i}%` }]} 
        />
      );
    }
    return scanLines;
  };

  return (
    <>
      <View style={styles.container} />
      <View style={styles.noiseOverlay} />
      {renderScanLines()}
    </>
  );
}
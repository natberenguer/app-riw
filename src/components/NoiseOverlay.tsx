import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';

type NoiseOverlayProps = {
  visible?: boolean;
  opacity?: number;
  source?: ImageSourcePropType;
};

const defaultNoiseLocal = require('../../assets/noise-220.png');

export const NoiseOverlay: React.FC<NoiseOverlayProps> = ({
  visible = true,
  opacity = 0.25,
  source = defaultNoiseLocal,
}) => {
  if (!visible) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFillObject, styles.noise, { opacity }]}
        resizeMode="repeat"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  noise: {
    width: '100%',
    height: '100%',
  },
});


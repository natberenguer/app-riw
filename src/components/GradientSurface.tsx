import React from 'react';
import { ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { NoiseOverlay } from './NoiseOverlay';

type GradientSurfaceProps = {
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
  withNoise?: boolean;
  colorsOverride?: string[];
};

export const GradientSurface: React.FC<GradientSurfaceProps> = ({
  children,
  style,
  withNoise = true,
  colorsOverride,
}) => {
  return (
    <LinearGradient
      colors={
        colorsOverride ?? ['#0d0e14', '#08090d', '#140925', '#0a0814']
      }
      locations={[0, 0.45, 0.75, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={style}
    >
      {withNoise && <NoiseOverlay opacity={0.22} />}
      {children}
    </LinearGradient>
  );
};


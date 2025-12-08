import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography, gradients } from '../theme';
import { GradientSurface } from './GradientSurface';

interface SegmentedControlProps {
  options: string[];
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  selectedIndex,
  onSelect,
}) => {
  return (
    <GradientSurface
      style={styles.container}
      colorsOverride={gradients.prismatic}
    >
      <View style={styles.inner}>
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              index === selectedIndex && styles.optionSelected,
            ]}
            onPress={() => onSelect(index)}
            accessibilityRole="tab"
            accessibilityState={{ selected: index === selectedIndex }}
          >
            <Text
              style={[
                styles.text,
                index === selectedIndex && styles.textSelected,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </GradientSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 18,
    padding: 3,
    marginTop: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  inner: {
    flexDirection: 'row',
    gap: 6,
  },
  option: {
    flex: 1,
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionSelected: {
    backgroundColor: colors.foreground,
  },
  text: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
    color: colors.textLight,
  },
  textSelected: {
    color: colors.text,
    fontWeight: typography.fontWeight.semibold,
  },
});


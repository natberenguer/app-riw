import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

interface TagProps {
  label: string;
  variant?: 'default' | 'primary' | 'accent' | 'muted';
}

export const Tag: React.FC<TagProps> = ({ label, variant = 'default' }) => {
  return (
    <View
      style={[
        styles.tag,
        variant === 'primary' && styles.tagPrimary,
        variant === 'accent' && styles.tagAccent,
        variant === 'muted' && styles.tagMuted,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === 'primary' && styles.textPrimary,
          variant === 'accent' && styles.textAccent,
          variant === 'muted' && styles.textMuted,
        ]}
      >
        {label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceAlt,
    marginRight: 8,
    marginBottom: 8,
  },
  tagPrimary: {
    backgroundColor: colors.foreground,
    borderColor: colors.foreground,
  },
  tagAccent: {
    backgroundColor: 'rgba(59,130,246,0.12)',
    borderColor: 'rgba(59,130,246,0.4)',
  },
  tagMuted: {
    backgroundColor: colors.backgroundAlt,
    borderColor: colors.mediumGray,
  },
  text: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text,
  },
  textPrimary: {
    color: colors.primary,
  },
  textAccent: {
    color: colors.primaryAlt,
  },
  textMuted: {
    color: colors.textSecondary,
  },
});


import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';

interface BadgeProps {
  count: number;
  size?: 'small' | 'medium';
}

export const Badge: React.FC<BadgeProps> = ({ count, size = 'small' }) => {
  if (count === 0) return null;

  return (
    <View style={[styles.badge, size === 'medium' && styles.badgeMedium]}>
      <Text style={[styles.text, size === 'medium' && styles.textMedium]}>
        {count > 99 ? '99+' : count}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: colors.red,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -8,
    right: -8,
  },
  badgeMedium: {
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.white,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  textMedium: {
    fontSize: typography.fontSize.sm,
  },
});


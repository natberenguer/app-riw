import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, typography } from '../theme';
import { GradientSurface } from './GradientSurface';

interface DateSelectorProps {
  dates: { day: string; date: number }[];
  selectedDate: number;
  onSelectDate: (date: number) => void;
}

export const DateSelector: React.FC<DateSelectorProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  const gradientColors = ['#7C60C5', '#5A35A0', '#2D155C', '#23304F'];

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      bounces={false}
    >
      {dates.map((item) => {
        const isSelected = item.date === selectedDate;
        return (
          <TouchableOpacity
            key={item.date}
            onPress={() => onSelectDate(item.date)}
            activeOpacity={0.7}
          >
            <GradientSurface
              style={[
                styles.dateCard,
                isSelected && styles.dateCardSelected,
              ]}
              colorsOverride={gradientColors}
            >
              <Text
                style={[
                  styles.dayText,
                  isSelected && styles.dayTextSelected,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  isSelected && styles.dateTextSelected,
                ]}
              >
                {item.date}
              </Text>
            </GradientSurface>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    marginBottom: 0,
  },
  contentContainer: {
    paddingVertical: 0,
    paddingTop: 6,
    paddingHorizontal: 12,
    gap: 12,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dateCard: {
    width: 80,
    height: 80,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#5A35A0',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  dateCardSelected: {
    borderColor: '#2D155C',
    borderWidth: 2,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  dayText: {
    fontSize: typography.fontSize.sm,
    color: colors.white,
    marginBottom: 6,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'uppercase',
  },
  dayTextSelected: {
    fontWeight: typography.fontWeight.semibold,
  },
  dateText: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.white,
  },
  dateTextSelected: {
    color: colors.white,
  },
});


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import { Event } from '../types';
import { Tag } from './Tag';

interface EventCardProps {
  event: Event;
  onToggleFavorite?: (eventId: string) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onToggleFavorite,
}) => {
  const formatTime = (time: string) => {
    return time;
  };

  const eventType = () => {
    const source = `${event.category ?? ''} ${event.format ?? ''}`.toLowerCase();
    if (source.includes('keynote')) return 'Keynote';
    if (source.includes('panel') || source.includes('painel')) return 'Painel';
    return 'Palestra';
  };

  const speakerName = event.speakerName || 'Palestrante a confirmar';
  const speakerRoleCompany =
    event.speakerTitle && event.speakerCompany
      ? `${event.speakerTitle} • ${event.speakerCompany}`
      : event.speakerTitle || event.speakerCompany || '';

  const venue = [event.conference, event.location || event.stage]
    .filter(Boolean)
    .join(' • ');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Tag label={eventType()} variant="muted" />
        <TouchableOpacity
          style={[
            styles.saveButton,
            event.isFavorite && styles.saveButtonActive,
          ]}
          onPress={() => onToggleFavorite?.(event.id)}
          accessibilityRole="button"
          accessibilityLabel={
            event.isFavorite ? 'Remover do My Schedule' : 'Salvar no My Schedule'
          }
        >
          <Ionicons
            name={event.isFavorite ? 'bookmark' : 'bookmark-outline'}
            size={16}
            color={event.isFavorite ? colors.primary : colors.text}
          />
          <Text
            style={[
              styles.saveText,
              event.isFavorite && styles.saveTextActive,
            ]}
          >
            Salvar
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.time}>
        {formatTime(event.startTime)} - {formatTime(event.endTime)}
        {event.timezone && ` ${event.timezone}`}
      </Text>

      <Text style={styles.title}>{event.title}</Text>

      <View style={styles.speakerBlock}>
        <Text style={styles.speakerName}>{speakerName}</Text>
        {speakerRoleCompany ? (
          <Text style={styles.speakerRole}>{speakerRoleCompany}</Text>
        ) : null}
      </View>

      {venue.length > 0 && <Text style={styles.venue}>{venue}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    padding: 16,
    shadowColor: colors.black,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    backgroundColor: colors.white,
  },
  saveButtonActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(139,92,246,0.12)',
  },
  saveText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontWeight: typography.fontWeight.semibold,
  },
  saveTextActive: {
    color: colors.primary,
  },
  time: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 8,
  },
  speakerBlock: {
    marginBottom: 10,
  },
  speakerName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  speakerRole: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  venue: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontWeight: typography.fontWeight.bold,
    fontStyle: 'italic',
  },
});


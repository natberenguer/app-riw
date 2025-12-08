import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { DateSelector } from '../components/DateSelector';
import { SegmentedControl } from '../components/SegmentedControl';
import { EventCard } from '../components/EventCard';
import { colors, typography } from '../theme';
import { api } from '../services/api';
import { Event } from '../types';

const AgendaScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [scheduleType, setScheduleType] = useState(0); // 0: Agenda completa, 1: Meus favoritos
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedConferences, setSelectedConferences] = useState<string[]>([]);

  const [dates, setDates] = useState<{ day: string; date: number; fullDate: Date }[]>([]);

  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const data = await api.getEvents();
        setEvents(data);

        const uniqueDates = Array.from(
          new Set(
            data.map((e) =>
              new Date(e.date.getFullYear(), e.date.getMonth(), e.date.getDate()).getTime()
            )
          )
        )
          .sort((a, b) => a - b)
          .map((timestamp) => new Date(timestamp));

        const dateItems = uniqueDates.map((d) => ({
          day: d.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
          date: d.getDate(),
          fullDate: d,
        }));

        setDates(dateItems);
        if (dateItems.length > 0) {
          setSelectedDate(dateItems[0].date);
        }
      } catch (error) {
        console.error('Error loading events:', error);
        setEvents([]);
      }
      setLoading(false);
    };
    loadEvents();
  }, []);

  const selectedFullDate = useMemo(
    () => dates.find((d) => d.date === selectedDate)?.fullDate ?? null,
    [dates, selectedDate]
  );

  const toggleSelection = (value: string, setFn: (next: string[]) => void, current: string[]) => {
    if (current.includes(value)) {
      setFn(current.filter((item) => item !== value));
    } else {
      setFn([...current, value]);
    }
  };

  const filteredEvents = useMemo(() => {
    if (!selectedFullDate) return [];

    const isSameDay = (dateA: Date, dateB: Date) =>
      dateA.getDate() === dateB.getDate() &&
      dateA.getMonth() === dateB.getMonth() &&
      dateA.getFullYear() === dateB.getFullYear();

    return events
      .filter((event) => isSameDay(event.date, selectedFullDate))
      .filter((event) => (scheduleType === 1 ? event.isFavorite : true))
      .filter((event) =>
        selectedTopics.length > 0
          ? (event.tags || []).some((tag) => selectedTopics.includes(tag))
          : true
      )
      .filter((event) =>
        selectedConferences.length > 0 ? selectedConferences.includes(event.conference) : true
      )
      .sort((a, b) => {
        const toMinutes = (time: string) => {
          const [h, m] = time.split(':').map(Number);
          return h * 60 + m;
        };
        return toMinutes(a.startTime) - toMinutes(b.startTime);
      });
  }, [
    events,
    selectedFullDate,
    scheduleType,
    selectedTopics,
    selectedConferences,
  ]);

  const groupedBySlot = useMemo(() => {
    const grouped: { [slot: string]: Event[] } = {};
    filteredEvents.forEach((event) => {
      const slot = `${event.startTime} - ${event.endTime}`;
      if (!grouped[slot]) grouped[slot] = [];
      grouped[slot].push(event);
    });

    const sortedSlots = Object.keys(grouped).sort((a, b) => {
      const toMinutes = (value: string) => {
        const [start] = value.split(' - ');
        const [h, m] = start.split(':').map(Number);
        return h * 60 + m;
      };
      return toMinutes(a) - toMinutes(b);
    });

    return sortedSlots.map((slot) => ({ slot, items: grouped[slot] }));
  }, [filteredEvents]);

  const topics = useMemo(
    () => Array.from(new Set(events.flatMap((e) => e.tags || []))).sort(),
    [events]
  );

  const availableConferences = useMemo(() => {
    if (selectedTopics.length === 0) {
      return Array.from(new Set(events.map((e) => e.conference))).sort();
    }
    return Array.from(
      new Set(
        events
          .filter((e) => (e.tags || []).some((tag) => selectedTopics.includes(tag)))
          .map((e) => e.conference)
      )
    ).sort();
  }, [events, selectedTopics]);

  const hasActiveFilters =
    selectedTopics.length > 0 || selectedConferences.length > 0;

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedConferences([]);
  };

  const handleToggleFavorite = async (eventId: string) => {
    const updated = await api.toggleFavoriteEvent(eventId);
    setEvents(updated);
  };

  const formatDateHeader = (date: Date | null) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderChipRow = (
    label: string,
    options: string[],
    selected: string[],
    onToggle: (value: string) => void
  ) => {
    if (options.length === 0) return null;
    return (
      <View style={styles.filterRow}>
        <Text style={styles.filterLabel}>{label}</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterChipsContent}
        >
          {options.map((value) => {
            const isActive = selected.includes(value);
            return (
              <TouchableOpacity
                key={value}
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => onToggle(value)}
              >
                <Text style={[styles.filterChipText, isActive && styles.filterChipTextActive]}>
                  {value}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Agenda" />

      <ScrollView
        style={styles.mainScroll}
        contentContainerStyle={styles.mainContent}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.stickyBar}>
          <DateSelector
            dates={dates}
            selectedDate={selectedDate ?? 0}
            onSelectDate={setSelectedDate}
          />

          <SegmentedControl
            options={['Full Schedule', 'My Schedule']}
            selectedIndex={scheduleType}
            onSelect={setScheduleType}
          />
        </View>

        <View style={styles.filtersContainer}>
          {renderChipRow('Assuntos', topics, selectedTopics, (value) =>
            toggleSelection(value, setSelectedTopics, selectedTopics)
          )}
          {renderChipRow(
            'Conferências',
            availableConferences,
            selectedConferences,
            (value) => toggleSelection(value, setSelectedConferences, selectedConferences)
          )}
          {hasActiveFilters && (
            <TouchableOpacity style={styles.clearFilters} onPress={clearFilters}>
              <Ionicons name="close" size={16} color={colors.text} />
              <Text style={styles.clearFiltersText}>Limpar filtros</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.sectionDivider} />

        <View style={styles.resultHeader}>
          <Text style={styles.dateHeaderText}>{formatDateHeader(selectedFullDate)}</Text>
          <Text style={styles.resultCount}>
            {loading ? 'Carregando...' : `${filteredEvents.length} evento(s)`}
          </Text>
        </View>

        {filteredEvents.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconContainer}>
              <Ionicons name="calendar-outline" size={80} color={colors.mediumGray} />
              <View style={styles.emptyXContainer}>
                <Ionicons name="close-circle" size={60} color={colors.red} />
              </View>
            </View>
            <Text style={styles.emptyTitle}>
              {scheduleType === 1 ? 'Nenhum favorito ainda' : 'Nada por aqui'}
            </Text>
            <Text style={styles.emptyDescription}>
              {scheduleType === 1
                ? 'Adicione eventos aos favoritos para vê-los em My Schedule.'
                : 'Ajuste os filtros ou escolha outra data para encontrar eventos.'}
            </Text>
          </View>
        ) : (
          <View style={styles.eventsContainer}>
            {groupedBySlot.map(({ slot, items }) => (
              <View key={slot} style={styles.dateSection}>
                <View style={styles.timeHeader}>
                  <Text style={styles.timeHeaderText}>{slot}</Text>
                </View>
                {items.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onToggleFavorite={handleToggleFavorite}
                  />
                ))}
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  mainScroll: {
    flex: 1,
  },
  mainContent: {
    paddingHorizontal: 12,
    paddingBottom: 32,
  },
  stickyBar: {
    backgroundColor: colors.background,
    paddingTop: 4,
    paddingBottom: 8,
    gap: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.surfaceAlt,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: 12,
    marginBottom: 8,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: typography.fontSize.base,
  },
  filtersContainer: {
    marginBottom: 12,
    gap: 8,
  },
  filterRow: {
    gap: 6,
  },
  filterLabel: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
    marginLeft: 4,
    marginBottom: 4,
  },
  filterChipsContent: {
    paddingRight: 16,
  },
  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'rgba(0,0,0,0.08)',
    marginBottom: 16,
    marginTop: 4,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.white,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: 'rgba(139,92,246,0.08)',
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontWeight: typography.fontWeight.medium,
  },
  filterChipTextActive: {
    color: colors.primary,
  },
  clearFilters: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  clearFiltersText: {
    color: colors.text,
    fontSize: typography.fontSize.sm,
  },
  eventsContainer: {
    flex: 1,
  },
  dateSection: {
    marginBottom: 14,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateHeaderText: {
    color: colors.text,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
  },
  resultCount: {
    color: colors.textSecondary,
    fontSize: typography.fontSize.sm,
  },
  timeHeader: {
    backgroundColor: colors.backgroundAlt,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  timeHeaderText: {
    color: colors.text,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 60,
  },
  emptyIconContainer: {
    position: 'relative',
    marginBottom: 24,
  },
  emptyXContainer: {
    position: 'absolute',
    bottom: -10,
    right: -10,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
});

export default AgendaScreen;


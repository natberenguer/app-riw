import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import { Match } from '../types';
import { GradientSurface } from './GradientSurface';

interface ChatListProps {
  matches: Match[];
  onMatchPress?: (match: Match) => void;
  showQuickActions?: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({
  matches,
  onMatchPress,
  showQuickActions = false,
}) => {
  const renderQuickActions = () => (
    <View style={styles.quickActions}>
      <Text style={styles.quickTitle}>Ações rápidas</Text>
      <View style={styles.quickRow}>
        <TouchableOpacity style={styles.quickCard}>
          <Ionicons name="calendar-outline" size={22} color={colors.textLight} />
          <View>
            <Text style={styles.quickCardTitle}>Sugerir reunião</Text>
            <Text style={styles.quickCardSubtitle}>Slots automáticos no evento</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickCard}>
          <Ionicons name="id-card-outline" size={22} color={colors.textLight} />
          <View>
            <Text style={styles.quickCardTitle}>Enviar cartão</Text>
            <Text style={styles.quickCardSubtitle}>Compartilhar contato</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (matches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="chatbubbles-outline" size={64} color={colors.mediumGray} />
        <Text style={styles.emptyTitle}>Nenhum match ainda</Text>
        <Text style={styles.emptyText}>
          Continue explorando perfis na aba Meetmaking para encontrar matches!
        </Text>
        {showQuickActions && renderQuickActions()}
      </View>
    );
  }

  const renderMatchItem = ({ item }: { item: Match }) => {
    return (
      <GradientSurface style={styles.matchItem}>
        <TouchableOpacity
          style={styles.matchItemInner}
          onPress={() => onMatchPress?.(item)}
        >
          <View style={styles.matchImageContainer}>
            {item.profile.imageUrl ? (
              <Image
                source={{ uri: item.profile.imageUrl }}
                style={styles.matchImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.matchImage, styles.placeholderImage]}>
                <Ionicons name="person" size={32} color={colors.lightGray} />
              </View>
            )}
            {item.profile.isOnline && <View style={styles.onlineIndicator} />}
          </View>
          <View style={styles.matchInfo}>
            <View style={styles.matchHeader}>
              <Text style={styles.matchName}>{item.profile.name}</Text>
              {item.unreadCount && item.unreadCount > 0 && (
                <View style={styles.unreadBadge}>
                  <Text style={styles.unreadText}>{item.unreadCount}</Text>
                </View>
              )}
            </View>
            <Text style={styles.matchRole}>
              {item.profile.role} • {item.profile.company}
            </Text>
            {item.lastMessage && (
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            )}
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.foreground} />
        </TouchableOpacity>
      </GradientSurface>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={matches}
        renderItem={renderMatchItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={showQuickActions ? renderQuickActions() : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingTop: 16,
  },
  quickActions: {
    marginBottom: 12,
  },
  quickTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  quickRow: {
    flexDirection: 'row',
    gap: 12,
  },
  quickCard: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  quickCardTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLight,
  },
  quickCardSubtitle: {
    fontSize: typography.fontSize.xs,
    color: colors.textLight,
    opacity: 0.9,
  },
  matchItem: {
    borderRadius: 12,
    marginBottom: 12,
  },
  matchItemInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  matchImageContainer: {
    position: 'relative',
    marginRight: 12,
  },
  matchImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceAlt,
  },
  placeholderImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.white,
  },
  matchInfo: {
    flex: 1,
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  matchName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLight,
    marginRight: 8,
  },
  unreadBadge: {
    backgroundColor: colors.foreground,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadText: {
    color: colors.primary,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
  },
  matchRole: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: typography.fontSize.sm,
    color: colors.textLight,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.base,
  },
});



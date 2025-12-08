import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// @ts-ignore - Expo vector icons types resolved at runtime
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import { Tag } from './Tag';
import { Profile } from '../types';
import { GradientSurface } from './GradientSurface';

interface ProfileCardProps {
  profile: Profile;
  variant?: 'large' | 'small';
  availability?: string;
  location?: string;
  onLike?: () => void;
  onDislike?: () => void;
  showActions?: boolean;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  variant = 'large',
  availability,
  location,
  onLike,
  onDislike,
  showActions = false,
}) => {
  if (variant === 'small') {
    return (
      <View style={styles.smallContainer}>
        <View style={styles.smallImageContainer}>
          {profile.imageUrl ? (
            <Image
              source={{ uri: profile.imageUrl }}
              style={styles.smallImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.smallImage, styles.placeholderImage]} />
          )}
          {profile.isOnline && <View style={styles.onlineIndicator} />}
        </View>
        <Text style={styles.smallName} numberOfLines={1}>
          {profile.name}
        </Text>
        <Text style={styles.smallRole} numberOfLines={1}>
          {profile.role}
        </Text>
        <Text style={styles.smallCompany} numberOfLines={1}>
          {profile.company}
        </Text>
      </View>
    );
  }

  return (
    <GradientSurface
      style={styles.largeContainer}
      colorsOverride={[colors.backgroundAlt, colors.background]}
    >
      <View style={styles.coverSection}>
        {profile.imageUrl ? (
          <Image
            source={{ uri: profile.imageUrl }}
            style={styles.coverImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.coverImage, styles.placeholderImage]} />
        )}
        <View style={styles.coverOverlay} />
        <View style={styles.avatarWrap}>
          {profile.imageUrl ? (
            <Image source={{ uri: profile.imageUrl }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.placeholderImage]} />
          )}
        </View>
      </View>
      <View style={styles.infoSection}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{profile.name}</Text>
          {profile.age && <Text style={styles.age}> • {profile.age}</Text>}
        </View>
        {location && <Text style={styles.location}>{location}</Text>}
        <View style={styles.titleRow}>
          <Text style={styles.role}>{profile.role}</Text>
          <Text style={styles.company}>• {profile.company}</Text>
        </View>
        {profile.description && (
          <Text style={styles.description}>{profile.description}</Text>
        )}
        <View style={styles.metaRow}>
          {availability && (
            <View style={styles.metaPill}>
              <Text style={styles.metaText}>Disponível: {availability}</Text>
            </View>
          )}
          {profile.isOnline && (
            <View style={[styles.metaPill, styles.onlinePill]}>
              <Text style={[styles.metaText, styles.metaTextOn]}>
                Online agora
              </Text>
            </View>
          )}
        </View>
        {profile.tags && profile.tags.length > 0 && (
          <View style={styles.tagsContainer}>
            {profile.tags.map((tag, index) => (
              <Tag key={index} label={tag} variant="accent" />
            ))}
          </View>
        )}
        {showActions && (
          <>
            <View style={styles.divider} />
            <View style={styles.actionsRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionGhost]}
                onPress={onDislike}
                accessibilityLabel="Sem interesse"
              >
                <Ionicons name="close-outline" size={20} color={colors.text} />
                <View>
                  <Text style={styles.actionLabel}>Sem interesse</Text>
                  <Text style={styles.actionHint}>Não priorizar</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.actionPrimary]}
                onPress={onLike}
                accessibilityLabel="Interesse"
              >
                <Ionicons
                  name="briefcase-outline"
                  size={20}
                  color={colors.white}
                />
                <View>
                  <Text style={[styles.actionLabel, styles.actionLabelLight]}>
                    Interesse
                  </Text>
                  <Text style={[styles.actionHint, styles.actionHintLight]}>
                    Sugerir conexão
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </GradientSurface>
  );
};

const styles = StyleSheet.create({
  largeContainer: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  coverSection: {
    width: '100%',
    height: 140,
    position: 'relative',
    overflow: 'visible',
    backgroundColor: colors.backgroundAlt,
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    backgroundColor: colors.surfaceAlt,
  },
  coverOverlay: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.18)',
  },
  avatarWrap: {
    position: 'absolute',
    bottom: -32,
    left: 16,
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: colors.background,
    overflow: 'hidden',
    backgroundColor: colors.background,
    zIndex: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },
  name: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  age: {
    fontSize: typography.fontSize.lg,
    color: colors.textSecondary,
  },
  location: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
  },
  infoSection: {
    paddingTop: 76,
    paddingHorizontal: 16,
    paddingBottom: 16,
    gap: 6,
    backgroundColor: colors.background,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 4,
    marginBottom: 8,
  },
  role: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  company: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    fontWeight: typography.fontWeight.medium,
  },
  description: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    lineHeight: typography.lineHeight.normal * typography.fontSize.sm,
    marginBottom: 12,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  metaPill: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  onlinePill: {
    backgroundColor: 'rgba(45,212,191,0.2)',
  },
  metaText: {
    fontSize: typography.fontSize.xs,
    color: colors.text,
    fontWeight: typography.fontWeight.semibold,
  },
  metaTextOn: {
    color: colors.text,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 12,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  actionGhost: {
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  actionPrimary: {
    backgroundColor: colors.primary,
  },
  actionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
  },
  actionHint: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
  },
  actionLabelLight: {
    color: colors.white,
  },
  actionHintLight: {
    color: 'rgba(255,255,255,0.8)',
  },
  smallContainer: {
    width: 120,
    marginRight: 16,
    alignItems: 'center',
  },
  smallImageContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  smallImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.surfaceAlt,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.online,
    borderWidth: 2,
    borderColor: colors.white,
  },
  smallName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  smallRole: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 2,
  },
  smallCompany: {
    fontSize: typography.fontSize.xs,
    color: colors.primary,
    textAlign: 'center',
  },
  overlayTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  intentPill: {
    backgroundColor: 'rgba(255,255,255,0.12)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    maxWidth: '65%',
  },
  intentText: {
    color: colors.textLight,
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.semibold,
  },
  scoreBadge: {
    backgroundColor: 'rgba(16,185,129,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignItems: 'flex-end',
  },
  scoreValue: {
    color: colors.textLight,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    lineHeight: typography.fontSize.sm * typography.lineHeight.tight,
  },
  scoreLabel: {
    color: colors.textLight,
    fontSize: typography.fontSize.xs,
    opacity: 0.9,
  },
});


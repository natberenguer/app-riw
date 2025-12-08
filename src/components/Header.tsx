import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import { Badge } from './Badge';
import { GradientSurface } from './GradientSurface';

interface HeaderProps {
  title?: string;
  showMenu?: boolean;
  showChat?: boolean;
  showNotifications?: boolean;
  notificationCount?: number;
  language?: 'PT' | 'EN';
  onMenuPress?: () => void;
  onChatPress?: () => void;
  onNotificationPress?: () => void;
  onToggleLanguage?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showMenu = false,
  showChat = false,
  showNotifications = false,
  notificationCount = 0,
  language = 'PT',
  onMenuPress,
  onChatPress,
  onNotificationPress,
  onToggleLanguage,
}) => {
  return (
    <GradientSurface style={styles.container}>
      {showMenu && (
        <TouchableOpacity onPress={onMenuPress} style={styles.iconButton}>
          <Ionicons name="menu" size={24} color={colors.white} />
        </TouchableOpacity>
      )}
      {title && <Text style={styles.title}>{title}</Text>}
      <View style={styles.rightIcons}>
        <TouchableOpacity onPress={onToggleLanguage} style={styles.langButton}>
          <Text style={styles.langText}>{language}</Text>
        </TouchableOpacity>
        {showChat && (
          <TouchableOpacity onPress={onChatPress} style={styles.iconButton}>
            <Ionicons name="chatbubble-outline" size={24} color={colors.white} />
          </TouchableOpacity>
        )}
        {showNotifications && (
          <TouchableOpacity
            onPress={onNotificationPress}
            style={styles.iconButton}
          >
            <View>
              <Ionicons name="notifications-outline" size={24} color={colors.white} />
              {notificationCount > 0 && <Badge count={notificationCount} />}
            </View>
          </TouchableOpacity>
        )}
      </View>
    </GradientSurface>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 56,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textLight,
    flex: 1,
    textAlign: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(0,0,0,0.12)',
    marginLeft: 8,
  },
  langText: {
    color: colors.textLight,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
  },
  iconButton: {
    padding: 8,
    marginLeft: 8,
    position: 'relative',
  },
});


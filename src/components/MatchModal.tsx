import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography } from '../theme';
import { Match } from '../types';

interface MatchModalProps {
  match: Match | null;
  visible: boolean;
  onClose: () => void;
  onSendMessage: () => void;
}

export const MatchModal: React.FC<MatchModalProps> = ({
  match,
  visible,
  onClose,
  onSendMessage,
}) => {
  if (!match) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>It's a Match! 🎉</Text>
            <Text style={styles.subtitle}>
              Você e {match.profile.name} deram like um no outro
            </Text>
            <View style={styles.profileContainer}>
              {match.profile.imageUrl && (
                <Image
                  source={{ uri: match.profile.imageUrl }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              )}
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.button, styles.sendMessageButton]}
                onPress={onSendMessage}
              >
                <Text style={styles.buttonText}>Enviar Mensagem</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.keepSwipingButton]}
                onPress={onClose}
              >
                <Text style={[styles.buttonText, styles.keepSwipingText]}>
                  Continuar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '85%',
    maxWidth: 400,
  },
  content: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  profileContainer: {
    marginBottom: 24,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: colors.green,
  },
  buttonsContainer: {
    width: '100%',
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  sendMessageButton: {
    backgroundColor: colors.primary,
  },
  keepSwipingButton: {
    backgroundColor: colors.surfaceAlt,
  },
  buttonText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  keepSwipingText: {
    color: colors.text,
  },
});



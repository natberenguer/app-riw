import React, { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ProfileCard } from './ProfileCard';
import { Profile } from '../types';
import { colors, typography } from '../theme';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;
const SWIPE_OUT_DURATION = 250;
const CARD_TRANSITION_DURATION = 300;

interface SwipeableCardProps {
  profile: Profile;
  onSwipeLeft: () => void;
  onSwipeRight: () => void;
  isTopCard: boolean;
  availability?: string;
  location?: string;
  showActions?: boolean;
}

export const SwipeableCard: React.FC<SwipeableCardProps> = ({
  profile,
  onSwipeLeft,
  onSwipeRight,
  isTopCard,
  availability,
  location,
  showActions = false,
}) => {
  const position = useRef(new Animated.ValueXY()).current;
  const scaleAnim = useRef(new Animated.Value(isTopCard ? 1 : 0.95)).current;
  const opacityAnim = useRef(new Animated.Value(isTopCard ? 1 : 0.95)).current;

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 1.5, 0, SCREEN_WIDTH * 1.5],
    outputRange: ['-30deg', '0deg', '30deg'],
  });

  // Animar quando o card se torna o card principal
  useEffect(() => {
    if (isTopCard) {
      Animated.parallel([
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(opacityAnim, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      scaleAnim.setValue(0.95);
      opacityAnim.setValue(0.95);
    }
  }, [isTopCard]);

  const likeOpacity = position.x.interpolate({
    inputRange: [0, SCREEN_WIDTH * 0.25],
    outputRange: [0, 1],
  });

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH * 0.25, 0],
    outputRange: [1, 0],
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => isTopCard,
      onMoveShouldSetPanResponder: () => isTopCard,
      onPanResponderMove: (_, gesture) => {
        if (isTopCard) {
          position.setValue({ x: gesture.dx, y: gesture.dy });
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (!isTopCard) return;

        if (gesture.dx > SWIPE_THRESHOLD) {
          // Swipe right (like)
          Animated.timing(position, {
            toValue: { x: SCREEN_WIDTH + 100, y: gesture.dy },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false,
          }).start(() => {
            onSwipeRight();
            position.setValue({ x: 0, y: 0 });
          });
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          // Swipe left (dislike)
          Animated.timing(position, {
            toValue: { x: -SCREEN_WIDTH - 100, y: gesture.dy },
            duration: SWIPE_OUT_DURATION,
            useNativeDriver: false,
          }).start(() => {
            onSwipeLeft();
            position.setValue({ x: 0, y: 0 });
          });
        } else {
          // Return to center
          Animated.spring(position, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const cardStyle = {
    transform: [
      { translateX: position.x },
      { translateY: position.y },
      { rotate },
      { scale: scaleAnim },
    ],
    opacity: opacityAnim,
  };

  return (
    <Animated.View
      style={[styles.card, cardStyle]}
      {...(isTopCard ? panResponder.panHandlers : {})}
    >
      <View style={styles.stackContainer} pointerEvents="none">
        <View style={[styles.stackLayer, styles.stackLayerBack]} />
        <View style={[styles.stackLayer, styles.stackLayerFront]} />
      </View>
      <ProfileCard
        profile={profile}
        variant="large"
        availability={availability}
        location={location}
        onLike={onSwipeRight}
        onDislike={onSwipeLeft}
        showActions={isTopCard && showActions}
      />
    </Animated.View>
  );
};

interface SwipeButtonsProps {
  onLike: () => void;
  onDislike: () => void;
}

export const SwipeButtons: React.FC<SwipeButtonsProps> = ({
  onLike,
  onDislike,
}) => {
  return (
    <View style={styles.buttonsContainer}>
      <TouchableOpacity
        style={[styles.button, styles.dislikeButton]}
        onPress={onDislike}
        accessibilityLabel="Pular sugestão"
        accessibilityRole="button"
      >
        <Ionicons name="close-outline" size={30} color={colors.text} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.likeButton]}
        onPress={onLike}
        accessibilityLabel="Enviar pedido de conexão"
        accessibilityRole="button"
      >
        <Ionicons name="hand-right-outline" size={30} color={colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    width: SCREEN_WIDTH - 40,
    alignSelf: 'center',
  },
  stackContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stackLayer: {
    position: 'absolute',
    width: SCREEN_WIDTH - 28,
    height: '94%',
    borderRadius: 18,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: 'rgba(139,92,246,0.35)',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 12,
    elevation: 6,
  },
  stackLayerFront: {
    opacity: 0.6,
    transform: [{ scale: 0.96 }, { translateY: 8 }],
    zIndex: -2,
  },
  stackLayerBack: {
    opacity: 0.3,
    transform: [{ scale: 0.92 }, { translateY: 16 }],
    zIndex: -3,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    gap: 40,
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  dislikeButton: {
    backgroundColor: 'rgba(15,23,42,0.08)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  likeButton: {
    backgroundColor: colors.primary,
  },
});

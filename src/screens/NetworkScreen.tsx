import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { SegmentedControl } from '../components/SegmentedControl';
import { SwipeableCard } from '../components/SwipeableCard';
import { MatchModal } from '../components/MatchModal';
import { ChatList } from '../components/ChatList';
import { GradientSurface } from '../components/GradientSurface';
import { Tag } from '../components/Tag';
import { colors, typography } from '../theme';
import { api } from '../services/api';
import { Profile, Match } from '../types';

const NetworkScreen: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matches, setMatches] = useState<Match[]>([]);
  const [newMatch, setNewMatch] = useState<Match | null>(null);
  const [showMatchModal, setShowMatchModal] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [detailProfile, setDetailProfile] = useState<Profile | null>(null);
  const filters = [
    { label: 'Investimento', description: 'VCs, angels e M&A', icon: 'trending-up' },
    { label: 'Produto', description: 'PMs, founders e UX', icon: 'bulb-outline' },
    { label: 'Tech Leadership', description: 'CTOs, eng managers', icon: 'hardware-chip-outline' },
    { label: 'Fundraising', description: 'Pitch, deck e intros', icon: 'cash-outline' },
    { label: 'Hiring', description: 'Talentos e recrutadores', icon: 'people-outline' },
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const [profilesData, matchesData] = await Promise.all([
          api.getProfiles(),
          api.getMatches(),
        ]);
        // Filtrar perfis que já foram avaliados ou que são matches
        const matchProfileIds = matchesData.map((m) => m.profile.id);
        const availableProfiles = profilesData.filter(
          (p) => !matchProfileIds.includes(p.id) && p.id !== '1' // Excluir o próprio perfil
        );
        setProfiles(availableProfiles);
        setMatches(matchesData);
      } catch (error) {
        console.error('Error loading data:', error);
        setProfiles([]);
        setMatches([]);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedFilters]);

  const filteredProfiles = useMemo(() => {
    if (selectedFilters.length === 0) return profiles;
    return profiles.filter((profile) => {
      const tags = profile.tags?.map((t) => t.toLowerCase()) ?? [];
      return selectedFilters.some((filter) => {
        const f = filter.toLowerCase();
        return (
          tags.some((t) => t.includes(f)) ||
          profile.role.toLowerCase().includes(f) ||
          profile.company.toLowerCase().includes(f)
        );
      });
    });
  }, [profiles, selectedFilters]);

  const stats = useMemo(() => {
    const pending = Math.max(filteredProfiles.length - currentIndex, 0);
    const totalMatches = matches.length;
    const responseRate = Math.min(98, 62 + totalMatches * 5);
    const meetings = Math.max(Math.round(totalMatches * 0.6), 1);
    return { pending, totalMatches, responseRate, meetings };
  }, [filteredProfiles.length, currentIndex, matches]);

  const toggleFilter = (filter: string) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const getAvailability = (profile: Profile, index: number) => {
    const windows = ['Hoje à tarde', 'Amanhã de manhã', 'Amanhã à tarde', 'Esta semana'];
    return windows[index % windows.length];
  };

  const getLocation = (profile: Profile, index: number) => {
    const spots = [
      'Lounge Tech • Expo',
      'Área Business • Hall B',
      'Startup District',
      `${profile.company} booth`,
    ];
    return spots[index % spots.length];
  };

  const handleSwipeLeft = async () => {
    if (currentIndex < filteredProfiles.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSwipeRight = async () => {
    if (currentIndex < filteredProfiles.length) {
      const profile = filteredProfiles[currentIndex];
      const isMatch = await api.likeProfile(profile.id);
      
      if (isMatch) {
        // Atualizar matches
        const updatedMatches = await api.getMatches();
        setMatches(updatedMatches);
        const match = updatedMatches.find((m) => m.profile.id === profile.id);
        if (match) {
          setNewMatch(match);
          setShowMatchModal(true);
        }
      }
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleButtonLike = () => {
    handleSwipeRight();
  };

  const handleButtonDislike = () => {
    handleSwipeLeft();
  };

  const handleMatchModalClose = () => {
    setShowMatchModal(false);
    setNewMatch(null);
  };

  const handleSendMessage = () => {
    setShowMatchModal(false);
    setSelectedTab(1); // Mudar para aba Chat
    setNewMatch(null);
  };

  const renderFilters = () => (
    <View style={styles.filtersSection}>
      <Text style={styles.sectionLabel}>Ajuste as recomendações</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filtersContent}
      >
        {filters.map(({ label, description, icon }) => {
          const isActive = selectedFilters.includes(label);
          return (
            <TouchableOpacity
              key={label}
              style={[
                styles.filterChip,
                isActive && styles.filterChipActive,
              ]}
              onPress={() => toggleFilter(label)}
            >
              <View
                style={[
                  styles.filterIcon,
                  isActive && styles.filterIconActive,
                ]}
              >
                <Ionicons
                  name={icon as keyof typeof Ionicons.glyphMap}
                  size={16}
                  color={isActive ? colors.primary : colors.text}
                />
              </View>
              <View style={styles.filterTextGroup}>
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}
                >
                  {label}
                </Text>
                <Text
                  style={[
                    styles.filterChipDescription,
                    isActive && styles.filterChipDescriptionActive,
                  ]}
                >
                  {description}
                </Text>
              </View>
              {isActive && (
                <View style={styles.filterCheck}>
                  <Ionicons name="checkmark" size={14} color={colors.white} />
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderMeetmaking = () => {
    const currentProfiles = filteredProfiles.slice(currentIndex, currentIndex + 2);
    const topCard = currentProfiles[0];
    const nextCard = currentProfiles[1];

    return (
      <View style={styles.meetmakingContainer}>
        {renderFilters()}
        {currentIndex >= filteredProfiles.length ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>Fila concluída</Text>
            <Text style={styles.emptyText}>
              Ajuste filtros ou retorne mais tarde para novas sugestões.
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.stage}>
              {nextCard && (
                <SwipeableCard
                  profile={nextCard}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  isTopCard={false}
                  availability={getAvailability(nextCard, currentIndex + 1)}
                  location={getLocation(nextCard, currentIndex + 1)}
                />
              )}
              {topCard && (
                <SwipeableCard
                  profile={topCard}
                  onSwipeLeft={handleSwipeLeft}
                  onSwipeRight={handleSwipeRight}
                  isTopCard={true}
                  availability={getAvailability(topCard, currentIndex)}
                  location={getLocation(topCard, currentIndex)}
                  showActions
                />
              )}
            </View>
          </>
        )}
      </View>
    );
  };

  const renderProfileDetail = () => {
    if (!detailProfile) return null;
    return (
      <Modal
        visible={!!detailProfile}
        transparent
        animationType="slide"
        onRequestClose={() => setDetailProfile(null)}
      >
        <View style={styles.detailOverlay}>
          <View style={styles.detailCard}>
            <View style={styles.detailHeader}>
              <View>
                <Text style={styles.detailName}>{detailProfile.name}</Text>
                <Text style={styles.detailRole}>
                  {detailProfile.role} • {detailProfile.company}
                </Text>
              </View>
              <TouchableOpacity onPress={() => setDetailProfile(null)}>
                <Ionicons name="close" size={22} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {detailProfile.description && (
                <Text style={styles.detailDescription}>
                  {detailProfile.description}
                </Text>
              )}
              {detailProfile.tags && (
                <View style={styles.detailTags}>
                  {detailProfile.tags.map((tag) => (
                    <Tag key={tag} label={tag} />
                  ))}
                </View>
              )}
              <View style={styles.detailMetaRow}>
                <Ionicons name="calendar-outline" size={16} color={colors.text} />
                <Text style={styles.detailMetaText}>Sugestão: {getAvailability(detailProfile, 0)}</Text>
              </View>
              <View style={styles.detailMetaRow}>
                <Ionicons name="navigate-outline" size={16} color={colors.text} />
                <Text style={styles.detailMetaText}>{getLocation(detailProfile, 0)}</Text>
              </View>
            </ScrollView>
            <View style={styles.detailActions}>
              <TouchableOpacity
                style={[styles.detailCta, styles.primaryCta]}
                onPress={() => {
                  setSelectedTab(1);
                  setDetailProfile(null);
                }}
              >
                <Ionicons name="chatbubbles-outline" size={18} color={colors.white} />
                <Text style={styles.detailCtaText}>Abrir chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.detailCta, styles.secondaryCta]}
                onPress={() => setDetailProfile(null)}
              >
                <Ionicons name="calendar" size={18} color={colors.text} />
                <Text style={[styles.detailCtaText, styles.secondaryCtaText]}>
                  Sugerir reunião
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header title="Network" />
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tabsContainer}>
          <SegmentedControl
            options={['Meetmaking', 'Chat']}
            selectedIndex={selectedTab}
            onSelect={setSelectedTab}
          />
        </View>

        {selectedTab === 0 ? (
          renderMeetmaking()
        ) : (
          <ChatList matches={matches} showQuickActions />
        )}
      </ScrollView>
      <MatchModal
        match={newMatch}
        visible={showMatchModal}
        onClose={handleMatchModalClose}
        onSendMessage={handleSendMessage}
      />
      {renderProfileDetail()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  tabsContainer: {
    marginTop: 8,
  },
  meetmakingContainer: {
    flex: 1,
    paddingBottom: 12,
  },
  filtersSection: {
    marginTop: 8,
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.semibold,
    color: colors.textSecondary,
    marginBottom: 8,
  },
  filtersContent: {
    paddingVertical: 8,
    gap: 12,
    paddingHorizontal: 4,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 12,
    minWidth: 210,
    shadowColor: colors.black,
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 1,
  },
  filterChipActive: {
    backgroundColor: 'rgba(139,92,246,0.08)',
    borderColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    fontWeight: typography.fontWeight.semibold,
  },
  filterChipTextActive: {
    color: colors.primary,
  },
  filterChipDescription: {
    fontSize: typography.fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  filterChipDescriptionActive: {
    color: colors.textSecondary,
  },
  filterIcon: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.mediumGray,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconActive: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(139,92,246,0.12)',
  },
  filterTextGroup: {
    flex: 1,
  },
  filterCheck: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stage: {
    height: 360,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
    paddingBottom: 24,
    paddingTop: 12,
    marginTop: 24,
    overflow: 'visible',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: typography.fontSize.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  detailOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  detailCard: {
    backgroundColor: colors.background,
    width: '100%',
    borderRadius: 16,
    padding: 20,
    maxHeight: '80%',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailName: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  detailRole: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginTop: 4,
  },
  detailDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
    lineHeight: typography.lineHeight.relaxed * typography.fontSize.sm,
    marginBottom: 12,
  },
  detailTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  detailMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  detailMetaText: {
    fontSize: typography.fontSize.sm,
    color: colors.text,
  },
  detailActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 12,
  },
  detailCta: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryCta: {
    backgroundColor: colors.primary,
  },
  secondaryCta: {
    backgroundColor: colors.foreground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  detailCtaText: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.semibold,
    color: colors.white,
  },
  secondaryCtaText: {
    color: colors.text,
  },
});

export default NetworkScreen;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../components/Header';
import { QuickAccessIcon } from '../components/QuickAccessIcon';
import { ProfileCard } from '../components/ProfileCard';
import { Badge } from '../components/Badge';
import { NoiseOverlay } from '../components/NoiseOverlay';
import { colors, typography } from '../theme';
import { mockInvitations } from '../services/mockData';
import { api } from '../services/api';
import { Profile } from '../types';
import { GradientSurface } from '../components/GradientSurface';

const HomeScreen: React.FC = () => {
  const [recommendedAttendees, setRecommendedAttendees] = useState<Profile[]>([]);
  const [invitationCount, setInvitationCount] = useState(0);
  const [language, setLanguage] = useState<'PT' | 'EN'>('PT');

  useEffect(() => {
    const loadData = async () => {
      try {
        const attendees = await api.getRecommendedAttendees();
        const count = await api.getInvitationCount();
        setRecommendedAttendees(attendees);
        setInvitationCount(count);
      } catch (error) {
        console.error('Error loading data:', error);
        // Fallback para dados vazios em caso de erro
        setRecommendedAttendees([]);
        setInvitationCount(0);
      }
    };
    loadData();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <Header
        title="Rio Innovation Week"
        showMenu
        showChat
        showNotifications
        notificationCount={1}
        language={language}
        onToggleLanguage={() =>
          setLanguage((prev) => (prev === 'PT' ? 'EN' : 'PT'))
        }
      />
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* Acontecendo Agora */}
        <GradientSurface style={styles.nowCard}>
          <NoiseOverlay opacity={0.18} />
          <View style={styles.nowHeader}>
            <Text style={styles.badgeLive}>AGORA</Text>
            <Text style={styles.nowStage}>Palco Principal • Sala A</Text>
          </View>
          <Text style={styles.nowTitle}>Keynote: AI for Real</Text>
          <Text style={styles.nowSub}>09:30 — 10:10 • Maria Costa (CTO, NovaIA)</Text>
          <View style={styles.nowFooter}>
            <View style={styles.nowProgressOuter}>
              <View style={styles.nowProgressInner} />
            </View>
            <TouchableOpacity style={styles.nowCTA}>
              <Text style={styles.nowCTAText}>Ver detalhes</Text>
            </TouchableOpacity>
          </View>
        </GradientSurface>

        {/* Essentials */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Essentials</Text>
          </View>
          <View style={styles.utilRow}>
            {[
              { id: 'badge', label: 'Credencial', icon: 'qr-code' },
              { id: 'alerts', label: 'Avisos', icon: 'alert-circle' },
              { id: 'help', label: 'Suporte', icon: 'help-circle' },
            ].map((item) => (
              <TouchableOpacity key={item.id} style={styles.utilItem}>
                <View style={styles.utilIconWrap}>
                  <Ionicons
                    name={item.icon as keyof typeof Ionicons.glyphMap}
                    size={20}
                    color={colors.textLight}
                  />
                </View>
                <Text style={styles.utilLabel}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Próxima sessão (favoritos) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Minha próxima sessão</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Ver agenda</Text>
            </TouchableOpacity>
          </View>
          <GradientSurface style={styles.nextCard}>
            <NoiseOverlay opacity={0.12} />
            <Text style={styles.nextTime}>11:00 — 11:40 • Sala B</Text>
            <Text style={styles.nextTitle}>Edge AI para cidades inteligentes</Text>
            <Text style={styles.nextMeta}>Favorito • Trilha: IA/Cloud</Text>
            <View style={styles.nextActions}>
              <TouchableOpacity style={styles.pill}>
                <Text style={styles.pillText}>Salvar lugar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryLink}>
                <Text style={styles.linkText}>Ver rota</Text>
              </TouchableOpacity>
            </View>
          </GradientSurface>
          <FlatList
            data={[
              { id: 's1', title: 'API Security em larga escala', time: '12:00 • Sala C' },
              { id: 's2', title: 'Product ops para times remotos', time: '13:00 • Sala D' },
            ]}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.nextList}
            renderItem={({ item }) => (
              <View style={styles.nextMiniCard}>
                <Text style={styles.nextMiniTime}>{item.time}</Text>
                <Text style={styles.nextMiniTitle} numberOfLines={2}>
                  {item.title}
                </Text>
              </View>
            )}
          />
        </View>

        {/* Networking */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Networking</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Ver mais</Text>
            </TouchableOpacity>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.recommendedContent}
          >
            {recommendedAttendees.slice(0, 3).map((attendee) => (
              <ProfileCard
                key={attendee.id}
                profile={attendee}
                variant="small"
              />
            ))}
          </ScrollView>
        </View>

        {/* Gamificação */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Missões do evento</Text>
            <TouchableOpacity>
              <Text style={styles.linkText}>Ver todas</Text>
            </TouchableOpacity>
          </View>
          <GradientSurface style={styles.missionsCard}>
            <NoiseOverlay opacity={0.16} />
            <Text style={styles.missionHint}>Tarefas de hoje</Text>
            {[
              'Visite 3 stands de IA',
              'Assista 2 keynotes hoje',
              'Dê feedback em 1 sessão',
            ].map((mission) => (
              <View key={mission} style={styles.missionRow}>
                <View style={styles.checkbox} />
                <Text style={styles.missionText}>{mission}</Text>
              </View>
            ))}
            <View style={styles.progressOuter}>
              <View style={[styles.progressInner, { width: '45%' }]} />
            </View>
            <Text style={styles.progressLabel}>2/5 concluídas</Text>
          </GradientSurface>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.text,
  },
  sectionTitleLight: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
  },
  linkText: {
    color: colors.primary,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  linkTextLight: {
    color: colors.foreground,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.medium,
  },
  nowCard: {
    marginTop: 12,
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  nowHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  badgeLive: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: colors.textLight,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: '600',
    fontSize: typography.fontSize.xs,
  },
  nowStage: {
    color: colors.textLight,
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
  },
  nowTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.textLight,
    marginBottom: 4,
  },
  nowSub: {
    color: colors.textLight,
    fontSize: typography.fontSize.base,
    marginBottom: 12,
  },
  nowFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  nowProgressOuter: {
    flex: 1,
    height: 6,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  nowProgressInner: {
    width: '45%',
    height: '100%',
    borderRadius: 6,
    backgroundColor: colors.foreground,
  },
  nowCTA: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.18)',
  },
  nowCTAText: {
    color: colors.textLight,
    fontWeight: typography.fontWeight.semibold,
  },
  nextCard: {
    borderRadius: 14,
    padding: 16,
    overflow: 'hidden',
    marginBottom: 12,
  },
  nextTime: {
    color: colors.textLight,
    fontSize: typography.fontSize.sm,
    marginBottom: 6,
  },
  nextTitle: {
    color: colors.textLight,
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 4,
  },
  nextMeta: {
    color: colors.textLight,
    fontSize: typography.fontSize.base,
    marginBottom: 10,
  },
  nextActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pill: {
    backgroundColor: colors.foreground,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  pillText: {
    color: colors.primary,
    fontWeight: typography.fontWeight.semibold,
  },
  secondaryLink: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  nextList: {
    gap: 12,
    paddingVertical: 4,
  },
  nextMiniCard: {
    width: 180,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundAlt,
    marginRight: 8,
  },
  nextMiniTime: {
    fontSize: typography.fontSize.sm,
    color: colors.textSecondary,
    marginBottom: 6,
  },
  nextMiniTitle: {
    fontSize: typography.fontSize.base,
    color: colors.text,
    fontWeight: typography.fontWeight.semibold,
  },
  recommendedContent: {
    paddingHorizontal: 16,
  },
  utilRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  utilItem: {
    flex: 1,
    aspectRatio: 1.05,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  utilIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.surfaceAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  utilLabel: {
    color: colors.text,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    textAlign: 'center',
  },
  missionsCard: {
    marginHorizontal: 0,
    marginBottom: 32,
    borderRadius: 16,
    padding: 16,
    overflow: 'hidden',
  },
  missionHint: {
    color: colors.foreground,
    fontSize: typography.fontSize.sm,
    marginBottom: 10,
  },
  missionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.foreground,
    marginRight: 8,
  },
  missionText: {
    color: colors.foreground,
    fontSize: typography.fontSize.base,
  },
  progressOuter: {
    marginTop: 12,
    height: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  progressInner: {
    height: '100%',
    borderRadius: 8,
    backgroundColor: colors.foreground,
  },
  progressLabel: {
    color: colors.foreground,
    marginTop: 6,
    fontSize: typography.fontSize.sm,
  },
});

export default HomeScreen;


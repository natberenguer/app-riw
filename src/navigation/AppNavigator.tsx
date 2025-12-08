import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors, navigationTheme, gradients } from '../theme';
import { LinearGradient } from 'expo-linear-gradient';
import { NoiseOverlay } from '../components/NoiseOverlay';
import HomeScreen from '../screens/HomeScreen';
import NetworkScreen from '../screens/NetworkScreen';
import AgendaScreen from '../screens/AgendaScreen';
import MapScreen from '../screens/MapScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();

const getLabel = (routeName: string) => {
  switch (routeName) {
    case 'Home':
      return 'Home';
    case 'Network':
      return 'Network';
    case 'Agenda':
      return 'Agenda';
    case 'Mapa':
      return 'Mapa';
    case 'Mais':
      return 'Mais';
    default:
      return routeName;
  }
};

const screenOptions = ({ route }: { route: { name: string } }) => {
  const label = getLabel(route.name);

  return {
    tabBarIcon: ({ focused, color, size }: { focused: boolean; color: string; size: number }) => {
      let iconName: keyof typeof Ionicons.glyphMap;

      if (route.name === 'Home') {
        iconName = focused ? 'home' : 'home-outline';
      } else if (route.name === 'Network') {
        iconName = focused ? 'people' : 'people-outline';
      } else if (route.name === 'Agenda') {
        iconName = focused ? 'calendar' : 'calendar-outline';
      } else if (route.name === 'Mapa') {
        iconName = focused ? 'map' : 'map-outline';
      } else if (route.name === 'Mais') {
        iconName = focused ? 'menu' : 'menu-outline';
      } else {
        iconName = 'ellipse-outline';
      }

      return <Ionicons name={iconName} size={24} color={color} />;
    },
    tabBarLabel: ({ color }: { color: string }) => (
      <Text
        style={{
          color,
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
          fontFamily: 'Poppins_500Medium',
          textAlign: 'center',
          includeFontPadding: false,
          paddingTop: 1,
          lineHeight: 14,
        }}
      >
        {label}
      </Text>
    ),
    tabBarActiveTintColor: colors.foreground,
    tabBarInactiveTintColor: colors.lightGray,
    tabBarShowLabel: true,
    tabBarLabelPosition: 'below-icon',
    headerShown: false,
    tabBarStyle: {
      borderTopWidth: 1,
      borderTopColor: colors.border,
      elevation: 8,
      shadowColor: colors.black,
      shadowOffset: { width: 0, height: -2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      paddingBottom: 10,
      paddingTop: 6,
      height: 78,
      backgroundColor: 'transparent',
    },
    tabBarItemStyle: {
      paddingVertical: 4,
    },
    tabBarBackground: () => (
      <LinearGradient
        colors={gradients.prismatic}
        locations={[0, 0.45, 0.75, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ flex: 1 }}
      >
        <NoiseOverlay opacity={0.22} />
      </LinearGradient>
    ),
  };
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        sceneContainerStyle={{ backgroundColor: colors.background }}
        screenOptions={screenOptions}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
          }}
        />
        <Tab.Screen 
          name="Network" 
          component={NetworkScreen}
          options={{
            tabBarLabel: 'Network',
          }}
        />
        <Tab.Screen 
          name="Agenda" 
          component={AgendaScreen}
          options={{
            tabBarLabel: 'Agenda',
          }}
        />
        <Tab.Screen 
          name="Mapa" 
          component={MapScreen}
          options={{
            tabBarLabel: 'Mapa',
          }}
        />
        <Tab.Screen 
          name="Mais" 
          component={MoreScreen}
          options={{
            tabBarLabel: 'Mais',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};


import React, { useEffect, useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { 
  Platform, 
  StyleSheet, 
  View,
  Animated,
} from 'react-native';

// Import your screen components
import HomeScreen from '../screens/home/HomeScreen';
import AppointmentsScreen from '../screens/appointment/AppointmentsScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type RootTabParamList = {
  Home: undefined;
  Appointments: undefined;
  Profile: undefined;
  Settings: undefined;
};

// Living Tab Icon with animations
const LivingTabIcon = ({ name, focused, color, size }: { 
  name: string; 
  focused: boolean; 
  color: string; 
  size: number;
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      // Pulse animation when focused
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Subtle rotation
      Animated.loop(
        Animated.sequence([
          Animated.timing(rotateAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(rotateAnim, {
            toValue: -1,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      // Reset animations when not focused
      pulseAnim.setValue(1);
      rotateAnim.setValue(0);
    }
  }, [focused, pulseAnim, rotateAnim]);

  const interpolatedRotate = rotateAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-5deg', '5deg'],
  });

  return (
    <Animated.View
      style={[
        styles.iconButton,
        focused && styles.iconButtonFocused,
        {
          transform: [
            { scale: pulseAnim },
            { rotate: interpolatedRotate },
          ],
        },
      ]}>
      <Ionicons 
        name={name as any} 
        size={size} 
        color='white'
      />
    </Animated.View>
  );
};

// Living Navigation Bar Component
const LivingTabBar = () => {
  const breatheAnim = useRef(new Animated.Value(1)).current;
  const starAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Gentle breathing animation for the entire navigation bar
    Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Twinkling animation for the decorative star
    Animated.loop(
      Animated.sequence([
        Animated.timing(starAnim, {
          toValue: 1.3,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(starAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [breatheAnim, starAnim]);

  return (
    <Animated.View
      style={[
        styles.tabBarBackground,
        {
          transform: [{ scale: breatheAnim }],
        },
      ]}>
      <View style={styles.tabBarGlass} />
      <Animated.View style={[styles.decorativeIcon, { transform: [{ scale: starAnim }] }]}>
        <Ionicons name="star" size={16} color="#fff" />
      </Animated.View>
    </Animated.View>
  );
};

const Tab = createBottomTabNavigator<RootTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarBackground: LivingTabBar,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <LivingTabIcon name="home" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Appointments" 
        component={AppointmentsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <LivingTabIcon name="calendar" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <LivingTabIcon name="person" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Settings" 
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <LivingTabIcon name="settings" focused={focused} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 25,
    left: 30,
    right: 30,
    height: 60,
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    elevation: 0,
    shadowOpacity: 0,
  },
  tabBarGlass: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(37, 99, 235, 0.85)', // Semi-transparent blue
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)', // Glassy border
    // Additional glassmorphism effects
    backdropFilter: 'blur(20px)', // Note: This may not work in React Native
  },
  iconButton: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    borderRadius: 12,
  },
  iconButtonFocused: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)', // More transparent for glass effect
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)', // Glassy border for focused state
  },
});
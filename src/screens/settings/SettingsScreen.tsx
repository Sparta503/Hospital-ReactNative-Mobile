import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Living Setting Item Component
const LivingSettingItem = ({ item }: { item: any }) => {
  const textOpacityAnim = useRef(new Animated.Value(1)).current;
  const iconScaleAnim = useRef(new Animated.Value(1)).current;
  const pressScaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Text opacity pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(textOpacityAnim, {
          toValue: 0.7,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacityAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Icon scale pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconScaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(iconScaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [textOpacityAnim, iconScaleAnim]);

  const handlePressIn = () => {
    Animated.spring(pressScaleAnim, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressScaleAnim, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        {
          transform: [{ scale: pressScaleAnim }],
        },
      ]}>
      <TouchableOpacity
        key={item.id}
        style={[
          styles.settingItem,
          (item.id === '1' || item.id === '2' || item.id === '3' || item.id === '4' || item.id === '5' || item.id === '6') && styles.notificationsItem, // Apply special styling to all items
        ]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
        onPress={() => item.onPress?.()}
      >
        <View style={styles.settingLeft}>
          <Animated.View
            style={[
              (item.id === '1' || item.id === '2' || item.id === '3' || item.id === '4' || item.id === '5' || item.id === '6') ? styles.settingIconContainer : styles.settingIcon, // Different icon styling
              {
                transform: [{ scale: iconScaleAnim }],
              },
            ]}>
            <Ionicons
              name={item.icon as any}
              size={24}
              color={(item.id === '1' || item.id === '2' || item.id === '3' || item.id === '4' || item.id === '5' || item.id === '6') ? "#fff" : "#2563eb"} // White for all items with backgrounds, blue for others
            />
          </Animated.View>
          <Animated.Text
            style={[
              styles.settingText,
              (item.id === '1' || item.id === '2' || item.id === '3' || item.id === '4' || item.id === '5' || item.id === '6') && styles.notificationsText, // White text for all items with backgrounds
              {
                opacity: textOpacityAnim,
              },
            ]}>
            {item.title}
          </Animated.Text>
        </View>
        {item.type === 'toggle' ? (
          <Switch
            value={item.value}
            onValueChange={item.onValueChange}
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={item.value ? '#2563eb' : '#f4f3f4'}
          />
        ) : (
          <LivingChevron />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

// Living Chevron Component
const LivingChevron = () => {
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Gentle bounce animation for chevron
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bounceAnim]);

  const translateX = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 3], // Subtle horizontal movement
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateX }],
      }}>
      <Ionicons name="chevron-forward" size={20} color="#fff" />
    </Animated.View>
  );
};

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [biometricAuth, setBiometricAuth] = React.useState(false);

  // Settings icon animations
  const settingsIconScaleAnim = useRef(new Animated.Value(1)).current;
  const settingsIconOpacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Settings icon scale pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(settingsIconScaleAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(settingsIconScaleAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Settings icon opacity pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(settingsIconOpacityAnim, {
          toValue: 0.7,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(settingsIconOpacityAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [settingsIconScaleAnim, settingsIconOpacityAnim]);

  const settings = [
    {
      id: '1',
      title: 'Notifications',
      icon: 'notifications',
      type: 'toggle',
      value: notificationsEnabled,
      onValueChange: setNotificationsEnabled,
    },
    {
      id: '2',
      title: 'Dark Mode',
      icon: 'moon',
      type: 'toggle',
      value: darkMode,
      onValueChange: setDarkMode,
    },
    {
      id: '3',
      title: 'Biometric Authentication',
      icon: 'finger-print',
      type: 'toggle',
      value: biometricAuth,
      onValueChange: setBiometricAuth,
    },
    {
      id: '4',
      title: 'Account Settings',
      icon: 'person',
      type: 'navigate',
    },
    {
      id: '5',
      title: 'Help & Support',
      icon: 'help-circle',
      type: 'navigate',
    },
    {
      id: '6',
      title: 'About',
      icon: 'information-circle',
      type: 'navigate',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animated.View
          style={[
            {
              transform: [{ scale: settingsIconScaleAnim }],
              opacity: settingsIconOpacityAnim,
            },
          ]}>
          <Ionicons name="settings" size={28} color="#2563eb" style={styles.headerIcon} />
        </Animated.View>
        <Text style={styles.headerText}>Settings</Text>
      </View>
      <View style={styles.settingsList}>
        {settings.map((item) => (
          <LivingSettingItem key={item.id} item={item} />
        ))}
      </View>
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: 8, // Add slight downward positioning
  },
  headerIcon: {
    marginRight: 12,
    marginTop: 4, // Slight downward adjustment for the icon
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  settingsList: {
    // Remove background and border radius to let individual items have their own
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationsItem: {
    backgroundColor: '#2563eb',
    borderRadius: 12,
    borderBottomWidth: 0,
    overflow: 'hidden',
    marginBottom: 15, // Add spacing between blue background items
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  settingIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    // Remove backgroundColor to let icons blend into blue button
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingText: {
    fontSize: 14,
    color: '#333',
  },
  notificationsText: {
    color: '#fff',
  },
  versionContainer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});

export default SettingsScreen;
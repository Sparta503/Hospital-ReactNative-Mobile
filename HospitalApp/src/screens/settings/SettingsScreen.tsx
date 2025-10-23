import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [biometricAuth, setBiometricAuth] = React.useState(false);

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

  const renderSettingItem = (item: any) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.settingItem}
      onPress={() => item.onPress?.()}
    >
      <View style={styles.settingLeft}>
        <Ionicons 
          name={item.icon as any} 
          size={24} 
          color="#2563eb" 
          style={styles.settingIcon} 
        />
        <Text style={styles.settingText}>{item.title}</Text>
      </View>
      {item.type === 'toggle' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={item.value ? '#2563eb' : '#f4f3f4'}
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color="#999" />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      <View style={styles.settingsList}>
        {settings.map(renderSettingItem)}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#1a1a1a',
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
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
  settingText: {
    fontSize: 16,
    color: '#333',
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
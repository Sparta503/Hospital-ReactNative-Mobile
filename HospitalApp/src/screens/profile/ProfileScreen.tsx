import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Living Menu Item Component
const LivingMenuItem = ({ item }: { item: any }) => {
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
      toValue: 3,
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
        style={styles.menuItem}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        <Animated.View
          style={[
            styles.menuIcon,
            {
              transform: [{ scale: iconScaleAnim }],
            },
          ]}>
          <Ionicons name={item.icon} size={24} color="#2563eb" />
        </Animated.View>
        <Animated.Text
          style={[
            styles.menuText,
            {
              opacity: textOpacityAnim,
            },
          ]}>
          {item.title}
        </Animated.Text>
        <LivingChevron />
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

export default function ProfileScreen() {
  const user = {
    name: 'Abel Chomunodisa',
    email: 'Chomunodisaa68@gmail.com',
    phone: '+263780488779',
    bloodType: 'O+',
    // Add a placeholder image or use a default avatar
    avatar: 'https://via.placeholder.com/150',
  };

  const menuItems = [
    { id: '1', title: 'Medical Records', icon: 'document-text' as const },
    { id: '2', title: 'Prescriptions', icon: 'medkit' as const },
    { id: '3', title: 'Lab Results', icon: 'flask' as const },
    { id: '4', title: 'Billing', icon: 'card' as const },
  ];

  return (
    <View style={[styles.container, { paddingBottom: 100 }]}>
      <View style={styles.profileHeader}>
        <Image 
          source={{ uri: user.avatar }} 
          style={styles.avatar}
        />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Phone</Text>
            <Text style={styles.infoValue}>{user.phone}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Blood Type</Text>
            <Text style={styles.infoValue}>{user.bloodType}</Text>
          </View>
        </View>
      </View>

      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <LivingMenuItem key={item.id} item={item} />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  
  profileHeader: {
    alignItems: 'center',
    paddingTop: 2,
    paddingHorizontal: 5,
    paddingBottom: 10,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    marginBottom: 24,
  },
  avatar: {
    width: 50,
    height: 10,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#fff',
  },
  email: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 10,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  menuContainer: {
    // Remove background and border radius to let individual items have their own
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 14,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    marginBottom: 10,
    borderBottomWidth: 0,
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  menuText: {
    flex: 1,
    fontSize: 15,
    color: '#fff',
  },
});

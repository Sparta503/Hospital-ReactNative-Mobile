import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UserDataCard = ({ icon, title, value }: { icon: string; title: string; value: string }) => {
  const opacityAnim = useRef(new Animated.Value(0.9)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Opacity pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.9,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scale breathing
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacityAnim, scaleAnim]);

  return (
    <Animated.View style={[styles.dataCard, { opacity: opacityAnim, transform: [{ scale: scaleAnim }] }]}>
      <Ionicons name={icon as any} size={24} color="#2563eb" />
      <Text style={styles.dataTitle}>{title}</Text>
      <Text style={styles.dataValue}>{value}</Text>
    </Animated.View>
  );
};

const QuickAction = ({ icon, title, onPress }: { icon: string; title: string; onPress: () => void }) => {
  const pressAnim = useRef(new Animated.Value(1)).current;
  const opacityAnim = useRef(new Animated.Value(0.9)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Opacity pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 0.9,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Scale breathing
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacityAnim, scaleAnim]);

  const handlePressIn = () => {
    Animated.spring(pressAnim, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale: Animated.multiply(pressAnim, scaleAnim) }], opacity: opacityAnim }}>
      <TouchableOpacity
        style={styles.quickAction}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
        activeOpacity={0.8}
      >
        <Ionicons name={icon as any} size={20} color="#fff" />
        <Text style={styles.quickActionText}>{title}</Text>
        <Ionicons name="chevron-forward" size={16} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default function HomeScreen() {
  const userData = [
    { icon: 'heart', title: 'Heart Rate', value: '72 bpm' },
    { icon: 'calendar', title: 'Next Appt', value: 'Mar 1, 2PM' },
    { icon: 'water', title: 'Blood Type', value: 'A+' },
    { icon: 'medkit', title: 'Last Checkup', value: 'Jan 15' },
  ];

  const spinAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    ).start();
  }, [spinAnim]);

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Ionicons name="person-circle" size={45} color="#2563eb" />
        <View style={styles.headerText}>
          <View style={styles.greetingRow}>
            <Text style={styles.greeting}>Welcome, Abel</Text>
            <Animated.View style={{ transform: [{ rotate: spin }] }}>
              <Ionicons name="refresh" size={20} color="#fff" />
            </Animated.View>
          </View>
          <Text style={styles.subtitle}>Your health dashboard</Text>
        </View>
      </View>

      <View style={styles.dataGrid}>
        {userData.map((data, index) => (
          <UserDataCard
            key={index}
            icon={data.icon}
            title={data.title}
            value={data.value}
          />
        ))}
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          <QuickAction icon="calendar-outline" title="Book Appointment" onPress={() => {}} />
          <QuickAction icon="medical-outline" title="Find Doctor" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
}

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
    padding: 12,
    backgroundColor: '#2563eb',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  headerText: {
    marginLeft: 16,
  },
  greetingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  subtitle: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
    marginTop: 2,
  },
  dataGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  dataCard: {
    backgroundColor: 'rgba(37, 99, 235, 0.1)',
    borderRadius: 18,
    padding: 8,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#2563eb',
  },
  dataTitle: {
    fontSize: 8,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  dataValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2563eb',
    marginTop: 4,
    textAlign: 'center',
  },
  actionsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  actionsRow: {
    flexDirection: 'column',
  },
  quickAction: {
    backgroundColor: '#2563eb',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#2563eb',
  },
  quickActionText: {
    fontSize: 10,
    color: '#fff',
    flex: 1,
    marginLeft: 8,
    textAlign: 'left',
  },
});

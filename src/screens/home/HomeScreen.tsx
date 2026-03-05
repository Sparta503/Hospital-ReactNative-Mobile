import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import BookAppointment from './BookAppoint';
import FindDoctor from './FindDoctor';

const UserDataCard = ({ icon, title, value }: { icon: string; title: string; value: string }) => {
  const blinkAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Text blinking
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(blinkAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [blinkAnim]);

  return (
    <View style={styles.dataCard}>
      <View style={styles.iconContainer}>
        <Ionicons name={icon as any} size={24} color="#2563eb" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.dataTitle}>{title}</Text>
        <Animated.Text style={[styles.dataValue, { opacity: blinkAnim }]}>{value}</Animated.Text>
      </View>
    </View>
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
  const [modalVisible, setModalVisible] = useState(false);
  const [findDoctorModalVisible, setFindDoctorModalVisible] = useState(false);
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
    <View style={{ flex: 1 }}>
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
            <QuickAction icon="calendar-outline" title="Book Appointment" onPress={() => setModalVisible(true)} />
            <QuickAction icon="medical-outline" title="Find Doctor" onPress={() => setFindDoctorModalVisible(true)} />
          </View>
        </View>
      </ScrollView>
      <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <BookAppointment navigation={{ goBack: () => setModalVisible(false) }} />
      </Modal>
      <Modal visible={findDoctorModalVisible} animationType="slide" onRequestClose={() => setFindDoctorModalVisible(false)}>
        <FindDoctor navigation={{ goBack: () => setFindDoctorModalVisible(false) }} />
      </Modal>
    </View>
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
    backgroundColor: 'rgba(108, 117, 125, 0.8)', // Glassy grey background
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(108, 117, 125, 0.3)', // Glassy grey border
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
    backgroundColor: 'rgba(108, 117, 125, 0.8)', // Glassy grey background
    borderRadius: 18,
    padding: 8,
    alignItems: 'center',
    width: '48%',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(108, 117, 125, 0.3)', // Glassy grey border
  },
  iconContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20, // Padding to account for icon space
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
    backgroundColor: 'rgba(108, 117, 125, 0.8)', // Glassy grey background
    borderRadius: 20, // Increased border radius for bigger appearance
    padding: 16, // Increased padding for bigger buttons
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14, // Increased margin for better spacing
    borderWidth: 1,
    borderColor: 'rgba(108, 117, 125, 0.3)', // Glassy grey border
  },
  quickActionText: {
    fontSize: 10,
    color: '#fff',
    flex: 1,
    marginLeft: 8,
    textAlign: 'left',
  },
});

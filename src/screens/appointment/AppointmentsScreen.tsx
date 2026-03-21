import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Animated, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Appointment = {
  id: string;
  doctor: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
};

const AppointmentCard = ({ item }: { item: Appointment }) => {
  const opacityAnim = useRef(new Animated.Value(0.9)).current;
  const iconScaleAnim = useRef(new Animated.Value(1)).current;
  const iconOpacityAnim = useRef(new Animated.Value(0.8)).current;

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

    // Icon scale breathing
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconScaleAnim, {
          toValue: 1.1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(iconScaleAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Icon opacity pulsing
    Animated.loop(
      Animated.sequence([
        Animated.timing(iconOpacityAnim, {
          toValue: 1,
          duration: 1600,
          useNativeDriver: true,
        }),
        Animated.timing(iconOpacityAnim, {
          toValue: 0.8,
          duration: 1600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [opacityAnim, iconScaleAnim, iconOpacityAnim]);

  return (
    <Animated.View style={[styles.appointmentCard, { opacity: opacityAnim }]}>
      <View style={styles.cardHeader}>
        <Animated.View style={{ transform: [{ scale: iconScaleAnim }], opacity: iconOpacityAnim }}>
          <Ionicons name="calendar" size={24} color="#fff" />
        </Animated.View>
        <View style={styles.cardContent}>
          <Text style={styles.doctorName}>{item.doctor}</Text>
          <Text style={styles.appointmentText}>{item.date} at {item.time}</Text>
        </View>
        <Animated.View style={{ transform: [{ scale: iconScaleAnim }], opacity: iconOpacityAnim }}>
          <Ionicons name="medkit" size={20} color="#fff" />
        </Animated.View>
      </View>
      <Text style={[
        styles.status,
        item.status === 'upcoming' ? styles.upcoming : 
        item.status === 'completed' ? styles.completed : styles.cancelled
      ]}>
        {item.status}
      </Text>
    </Animated.View>
  );
};

export default function AppointmentsScreen() {
  const appointments: Appointment[] = [
    {
      id: '1',
      doctor: 'Dr. Smith',
      date: '2023-11-15',
      time: '10:00 AM',
      status: 'upcoming',
    },
    {
      id: '2',
      doctor: 'Dr. Johnson',
      date: '2023-11-10',
      time: '2:00 PM',
      status: 'completed',
    },
    {
      id: '3',
      doctor: 'Dr. Lee',
      date: '2023-11-05',
      time: '9:00 AM',
      status: 'cancelled',
    },
    // Add more sample appointments as needed
  ];

  const emergencyIconAnim = useRef(new Animated.Value(1)).current;
  const emergencyButtonAnim = useRef(new Animated.Value(0.95)).current;
  const emergencyPressAnim = useRef(new Animated.Value(1)).current;
  const titleAnim = useRef(new Animated.Value(1)).current;

  const handleEmergencyPressIn = () => {
    Animated.spring(emergencyPressAnim, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const handleEmergencyPressOut = () => {
    Animated.spring(emergencyPressAnim, { toValue: 1, friction: 3, tension: 40, useNativeDriver: true }).start();
  };

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(emergencyIconAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(emergencyIconAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(emergencyButtonAnim, {
          toValue: 1,
          duration: 1400,
          useNativeDriver: true,
        }),
        Animated.timing(emergencyButtonAnim, {
          toValue: 0.95,
          duration: 1400,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(titleAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(titleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [emergencyIconAnim, emergencyButtonAnim, titleAnim]);

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Animated.View style={{ transform: [{ scale: titleAnim }] }}>
          <Ionicons name="calendar" size={24} color="#2563eb" />
        </Animated.View>
        <Text style={styles.title}>My Appointments</Text>
      </View>
      <FlatList
        data={appointments}
        renderItem={({ item }) => <AppointmentCard item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        ListFooterComponent={() => (
          <Animated.View style={{ opacity: emergencyButtonAnim }}>
            <Animated.View style={{ transform: [{ scale: emergencyPressAnim }] }}>
              <TouchableOpacity
                style={styles.emergencyButton}
                activeOpacity={0.8}
                onPressIn={handleEmergencyPressIn}
                onPressOut={handleEmergencyPressOut}
                onPress={() => Linking.openURL('tel:911')}
              >
                <Animated.View style={{ transform: [{ scale: emergencyIconAnim }] }}>
                  <Ionicons name="call" size={18} color="#fff" />
                </Animated.View>
                <Text style={styles.emergencyText}>Emergency</Text>
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: 'rgba(3, 65, 200, 0.9)', // Darker blue background
    borderRadius: 24,
    padding: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: 'rgba(3, 65, 200, 0.3)', // Darker blue border
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardContent: {
    flex: 1,
    marginLeft: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
    color: '#fff',
  },
  appointmentText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  status: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  upcoming: {
    backgroundColor: '#007bff',
  },
  completed: {
    backgroundColor: '#17a2b8',
  },
  cancelled: {
    backgroundColor: '#dc3545',
  },
  emergencyButton: {
    backgroundColor: 'rgba(3, 65, 200, 0.9)', // Darker blue background
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  emergencyText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 6,
  },
});

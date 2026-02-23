import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

type Appointment = {
  id: string;
  doctor: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
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
    // Add more sample appointments as needed
  ];

  const renderAppointment = ({ item }: { item: Appointment }) => (
    <View style={styles.appointmentCard}>
      <Text style={styles.doctorName}>{item.doctor}</Text>
      <Text style={styles.appointmentText}>{item.date} at {item.time}</Text>
      <Text style={[
        styles.status,
        item.status === 'upcoming' ? styles.upcoming : 
        item.status === 'completed' ? styles.completed : styles.cancelled
      ]}>
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Appointments</Text>
      <FlatList
        data={appointments}
        renderItem={renderAppointment}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
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
    marginBottom: 20,
  },
  list: {
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
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
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '500',
    color: '#fff',
  },
  upcoming: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  completed: {
    backgroundColor: 'rgba(144, 238, 144, 0.3)',
  },
  cancelled: {
    backgroundColor: 'rgba(255, 99, 71, 0.3)',
  },
});

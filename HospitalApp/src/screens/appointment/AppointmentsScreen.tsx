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
      <Text>{item.date} at {item.time}</Text>
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
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  doctorName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    marginTop: 8,
    padding: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '500',
  },
  upcoming: {
    backgroundColor: '#e3f2fd',
    color: '#1976d2',
  },
  completed: {
    backgroundColor: '#e8f5e9',
    color: '#388e3c',
  },
  cancelled: {
    backgroundColor: '#ffebee',
    color: '#d32f2f',
  },
});

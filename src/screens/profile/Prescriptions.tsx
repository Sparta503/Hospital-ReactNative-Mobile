import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  prescribedDate: string;
  status: 'active' | 'completed' | 'discontinued';
};

export default function Prescriptions({ navigation }: any) {
  const prescriptions: Prescription[] = [
    {
      id: '1',
      medication: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Once daily',
      duration: '30 days',
      instructions: 'Take with food, avoid potassium supplements',
      prescribedDate: '2023-11-15',
      status: 'active',
    },
    {
      id: '2',
      medication: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      duration: '90 days',
      instructions: 'Take with meals',
      prescribedDate: '2023-11-10',
      status: 'active',
    },
    {
      id: '3',
      medication: 'Amlodipine',
      dosage: '5mg',
      frequency: 'Once daily',
      duration: '60 days',
      instructions: 'Take at bedtime',
      prescribedDate: '2023-10-28',
      status: 'completed',
    },
    {
      id: '4',
      medication: 'Omeprazole',
      dosage: '20mg',
      frequency: 'Once daily',
      duration: '14 days',
      instructions: 'Take before meals',
      prescribedDate: '2023-10-20',
      status: 'discontinued',
    },
  ];

  const renderPrescription = ({ item }: { item: Prescription }) => (
    <TouchableOpacity style={styles.prescriptionCard} onPress={() => {}}>
      <View style={styles.prescriptionInfo}>
        <Text style={styles.medicationName}>{item.medication}</Text>
        <Text style={styles.dosage}>{item.dosage} - {item.frequency}</Text>
        <Text style={styles.duration}>Duration: {item.duration}</Text>
        <Text style={styles.prescribedDate}>Prescribed: {item.prescribedDate}</Text>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.status,
            item.status === 'active' ? styles.active :
            item.status === 'completed' ? styles.completed : styles.discontinued
          ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.instructions}>Instructions: {item.instructions}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#2563eb" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.title}>Prescriptions</Text>
      </View>

      <FlatList
        data={prescriptions}
        renderItem={renderPrescription}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  list: {
    paddingHorizontal: 20,
  },
  prescriptionCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  prescriptionInfo: {
    flex: 1,
  },
  medicationName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dosage: {
    fontSize: 16,
    color: '#2563eb',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  prescribedDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  statusContainer: {
    marginBottom: 8,
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  active: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  completed: {
    backgroundColor: '#d1ecf1',
    color: '#0c5460',
  },
  discontinued: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  instructions: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
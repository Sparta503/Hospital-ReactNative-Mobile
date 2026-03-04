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

type MedicalRecord = {
  id: string;
  date: string;
  doctor: string;
  diagnosis: string;
  treatment: string;
  notes: string;
  facility: string;
};

export default function MedicalRecords({ navigation }: any) {
  const medicalRecords: MedicalRecord[] = [
    {
      id: '1',
      date: '2023-11-15',
      doctor: 'Dr. Sarah Johnson',
      diagnosis: 'Hypertension',
      treatment: 'Prescribed Lisinopril 10mg daily',
      notes: 'Patient shows good response to medication. Follow-up in 3 months.',
      facility: 'City General Hospital',
    },
    {
      id: '2',
      date: '2023-10-28',
      doctor: 'Dr. Michael Chen',
      diagnosis: 'Type 2 Diabetes',
      treatment: 'Metformin 500mg twice daily, lifestyle counseling',
      notes: 'Patient educated on diet and exercise. Glucose levels stable.',
      facility: 'City General Hospital',
    },
    {
      id: '3',
      date: '2023-09-12',
      doctor: 'Dr. Emily Davis',
      diagnosis: 'Seasonal Allergies',
      treatment: 'Antihistamine prescription, environmental controls',
      notes: 'Symptoms improved with treatment. Advised to avoid triggers.',
      facility: 'Downtown Clinic',
    },
    {
      id: '4',
      date: '2023-08-05',
      doctor: 'Dr. Robert Wilson',
      diagnosis: 'Routine Check-up',
      treatment: 'Vaccinations updated, blood work ordered',
      notes: 'Overall health excellent. Continue current regimen.',
      facility: 'City General Hospital',
    },
    {
      id: '5',
      date: '2023-06-20',
      doctor: 'Dr. Lisa Brown',
      diagnosis: 'Migraine',
      treatment: 'Triptan medication, stress management techniques',
      notes: 'Episodes reduced with medication. Lifestyle factors addressed.',
      facility: 'Neurology Center',
    },
  ];

  const renderMedicalRecord = ({ item }: { item: MedicalRecord }) => (
    <TouchableOpacity style={styles.recordCard} onPress={() => {}}>
      <View style={styles.recordHeader}>
        <View style={styles.dateContainer}>
          <Ionicons name="calendar" size={16} color="#2563eb" />
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.facility}>{item.facility}</Text>
      </View>

      <View style={styles.recordInfo}>
        <Text style={styles.doctor}>Dr. {item.doctor}</Text>
        <Text style={styles.diagnosis}>Diagnosis: {item.diagnosis}</Text>
        <Text style={styles.treatment}>Treatment: {item.treatment}</Text>
        <Text style={styles.notes}>Notes: {item.notes}</Text>
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
        <Text style={styles.title}>Medical Records</Text>
      </View>

      <FlatList
        data={medicalRecords}
        renderItem={renderMedicalRecord}
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
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginLeft: 6,
  },
  facility: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  recordInfo: {
    marginBottom: 12,
  },
  doctor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  diagnosis: {
    fontSize: 14,
    color: '#d9534f',
    fontWeight: '600',
    marginBottom: 6,
  },
  treatment: {
    fontSize: 14,
    color: '#5cb85c',
    fontWeight: '600',
    marginBottom: 6,
  },
  notes: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});
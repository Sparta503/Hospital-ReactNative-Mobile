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

type LabResult = {
  id: string;
  testName: string;
  date: string;
  result: string;
  normalRange: string;
  status: 'normal' | 'abnormal' | 'pending';
};

export default function LabResults({ navigation }: any) {
  const labResults: LabResult[] = [
    { id: '1', testName: 'Complete Blood Count', date: '2023-11-15', result: 'Normal', normalRange: 'Within range', status: 'normal' },
    { id: '2', testName: 'Blood Glucose', date: '2023-11-10', result: '95 mg/dL', normalRange: '70-100 mg/dL', status: 'normal' },
    { id: '3', testName: 'Cholesterol Level', date: '2023-11-05', result: '220 mg/dL', normalRange: '<200 mg/dL', status: 'abnormal' },
    { id: '4', testName: 'Thyroid Function', date: '2023-10-28', result: 'Pending', normalRange: 'N/A', status: 'pending' },
    { id: '5', testName: 'Urine Analysis', date: '2023-10-20', result: 'Normal', normalRange: 'Within range', status: 'normal' },
  ];

  const renderLabResult = ({ item }: { item: LabResult }) => (
    <TouchableOpacity style={styles.labCard} onPress={() => {}}>
      <View style={styles.labInfo}>
        <Text style={styles.testName}>{item.testName}</Text>
        <Text style={styles.labDate}>{item.date}</Text>
        <View style={styles.resultContainer}>
          <Text style={styles.result}>{item.result}</Text>
          <Text style={styles.normalRange}>{item.normalRange}</Text>
        </View>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.status,
            item.status === 'normal' ? styles.normal :
            item.status === 'abnormal' ? styles.abnormal : styles.pending
          ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
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
        <Text style={styles.title}>Lab Results</Text>
      </View>

      <FlatList
        data={labResults}
        renderItem={renderLabResult}
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
  labCard: {
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
  labInfo: {
    flex: 1,
  },
  testName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  labDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resultContainer: {
    marginBottom: 8,
  },
  result: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2563eb',
    marginBottom: 2,
  },
  normalRange: {
    fontSize: 12,
    color: '#666',
  },
  statusContainer: {
    alignSelf: 'flex-start',
  },
  status: {
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  normal: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  abnormal: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  pending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
});
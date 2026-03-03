import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type Doctor = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  distance: string;
};

export default function FindDoctor({ navigation }: any) {
  const [searchQuery, setSearchQuery] = useState('');

  const doctors: Doctor[] = [
    { id: '1', name: 'Dr. Sarah Johnson', specialty: 'Cardiologist', rating: 4.8, distance: '2.3 km' },
    { id: '2', name: 'Dr. Michael Chen', specialty: 'Dermatologist', rating: 4.9, distance: '1.8 km' },
    { id: '3', name: 'Dr. Emily Davis', specialty: 'Pediatrician', rating: 4.7, distance: '3.1 km' },
    { id: '4', name: 'Dr. Robert Wilson', specialty: 'Orthopedic', rating: 4.6, distance: '4.2 km' },
    { id: '5', name: 'Dr. Lisa Brown', specialty: 'Gynecologist', rating: 4.8, distance: '2.7 km' },
  ];

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderDoctor = ({ item }: { item: Doctor }) => (
    <TouchableOpacity style={styles.doctorCard} onPress={() => {}}>
      <View style={styles.doctorInfo}>
        <Text style={styles.doctorName}>{item.name}</Text>
        <Text style={styles.doctorSpecialty}>{item.specialty}</Text>
        <View style={styles.doctorDetails}>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={14} color="#ffd700" />
            <Text style={styles.rating}>{item.rating}</Text>
          </View>
          <Text style={styles.distance}>{item.distance}</Text>
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
        <Text style={styles.title}>Find a Doctor</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search doctors or specialties"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredDoctors}
        renderItem={renderDoctor}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 8,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  doctorCard: {
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
  doctorInfo: {
    flex: 1,
  },
  doctorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  doctorSpecialty: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  doctorDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  rating: {
    fontSize: 14,
    color: '#333',
    marginLeft: 4,
  },
  distance: {
    fontSize: 14,
    color: '#666',
  },
});
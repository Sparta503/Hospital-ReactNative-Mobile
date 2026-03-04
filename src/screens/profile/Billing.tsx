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

type Bill = {
  id: string;
  service: string;
  date: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
};

export default function Billing({ navigation }: any) {
  const bills: Bill[] = [
    { id: '1', service: 'Cardiology Consultation', date: '2023-11-15', amount: '$150.00', status: 'paid' },
    { id: '2', service: 'Blood Test', date: '2023-11-10', amount: '$75.00', status: 'paid' },
    { id: '3', service: 'X-Ray Examination', date: '2023-11-05', amount: '$200.00', status: 'pending' },
    { id: '4', service: 'Medication', date: '2023-10-28', amount: '$45.00', status: 'paid' },
    { id: '5', service: 'Physical Therapy', date: '2023-10-20', amount: '$120.00', status: 'overdue' },
  ];

  const renderBill = ({ item }: { item: Bill }) => (
    <TouchableOpacity style={styles.billCard} onPress={() => {}}>
      <View style={styles.billInfo}>
        <Text style={styles.serviceName}>{item.service}</Text>
        <Text style={styles.billDate}>{item.date}</Text>
        <View style={styles.statusContainer}>
          <Text style={[
            styles.status,
            item.status === 'paid' ? styles.paid :
            item.status === 'pending' ? styles.pending : styles.overdue
          ]}>
            {item.status.toUpperCase()}
          </Text>
        </View>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Ionicons name="chevron-forward" size={20} color="#2563eb" />
      </View>
    </TouchableOpacity>
  );

  const totalBalance = bills.reduce((sum, bill) => {
    if (bill.status === 'pending' || bill.status === 'overdue') {
      return sum + parseFloat(bill.amount.replace('$', ''));
    }
    return sum;
  }, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#2563eb" />
        </TouchableOpacity>
        <Text style={styles.title}>Billing & Payments</Text>
      </View>

      <View style={styles.balanceContainer}>
        <Text style={styles.balanceLabel}>Outstanding Balance</Text>
        <Text style={styles.balanceAmount}>${totalBalance.toFixed(2)}</Text>
      </View>

      <FlatList
        data={bills}
        renderItem={renderBill}
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
  balanceContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  list: {
    paddingHorizontal: 20,
  },
  billCard: {
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
  billInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  billDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
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
  paid: {
    backgroundColor: '#d4edda',
    color: '#155724',
  },
  pending: {
    backgroundColor: '#fff3cd',
    color: '#856404',
  },
  overdue: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 4,
  },
});
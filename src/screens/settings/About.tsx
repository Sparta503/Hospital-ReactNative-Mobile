import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

interface AboutProps {
  visible?: boolean;
  onClose?: () => void;
}

const AboutScreen: React.FC<AboutProps> = ({ visible = false, onClose }) => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const isModal = typeof onClose === 'function';

  if (isModal && !visible) {
    return null;
  }

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      navigation.goBack();
    }
  };

  const modalContent = (
    <View style={styles.modalOverlay}>
      <View style={styles.modalFullPage}>
        {/* Header */}
        <View style={[styles.header, styles.modalHeader]}>
          <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* App Logo & Name Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="medical" size={50} color="#2563eb" />
            </View>
            <Text style={styles.appName}>Hospital App</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          {/* About Description Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="information-circle" size={20} color="#2563eb" />
              <Text style={styles.cardTitle}>About This App</Text>
            </View>
            <Text style={styles.description}>
              Hospital is your comprehensive health companion app designed to make managing your healthcare easier and more accessible. 
              Connect with doctors, schedule appointments, and monitor your health all in one place.
            </Text>
          </View>

          {/* Features Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="sparkles" size={20} color="#2563eb" />
              <Text style={styles.cardTitle}>Key Features</Text>
            </View>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="calendar" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Schedule Appointments</Text>
                  <Text style={styles.featureSubtitle}>Book and manage appointments easily</Text>
                </View>
              </View>
              <View style={styles.featureDivider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="person" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Find Doctors</Text>
                  <Text style={styles.featureSubtitle}>Connect with healthcare professionals</Text>
                </View>
              </View>
              <View style={styles.featureDivider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="heart" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Health Tracking</Text>
                  <Text style={styles.featureSubtitle}>Monitor your health metrics</Text>
                </View>
              </View>
              <View style={styles.featureDivider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="settings" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Customization</Text>
                  <Text style={styles.featureSubtitle}>Personalize your experience</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Contact Card */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="mail" size={20} color="#2563eb" />
              <Text style={styles.cardTitle}>Contact Us</Text>
            </View>
            <TouchableOpacity style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color="#6b7280" />
              <Text style={styles.contactText}>support@hospitalapp.com</Text>
            </TouchableOpacity>
            <View style={styles.contactDivider} />
            <TouchableOpacity style={styles.contactItem}>
              <Ionicons name="call-outline" size={20} color="#6b7280" />
              <Text style={styles.contactText}>(555) 123-4567</Text>
            </TouchableOpacity>
          </View>

          {/* Legal Card */}
          <View style={[styles.card, styles.legalCard]}>
            <View style={styles.cardHeader}>
              <Ionicons name="shield-checkmark" size={20} color="#6b7280" />
              <Text style={[styles.cardTitle, styles.legalTitle]}>Legal Disclaimer</Text>
            </View>
            <Text style={styles.legalText}>
              This app is for informational purposes only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
              with any questions you may have regarding a medical condition.
            </Text>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </View>
  );

  const screenContent = (
    <View style={styles.screenContainer}>
      <View style={styles.screenPage}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.closeButton}>
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>About</Text>
          <View style={styles.headerPlaceholder} />
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <Ionicons name="medical" size={50} color="#2563eb" />
            </View>
            <Text style={styles.appName}>Hospital App</Text>
            <Text style={styles.version}>Version 1.0.0</Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="information-circle" size={20} color="#2563eb" />
              <Text style={styles.cardTitle}>About This App</Text>
            </View>
            <Text style={styles.description}>
              Hospital is your comprehensive health companion app designed to make managing your healthcare easier and more accessible. 
              Connect with doctors, schedule appointments, and monitor your health all in one place.
            </Text>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="sparkles" size={20} color="#2563eb" />
              <Text style={styles.cardTitle}>Key Features</Text>
            </View>
            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="calendar" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Schedule Appointments</Text>
                  <Text style={styles.featureSubtitle}>Book and manage appointments easily</Text>
                </View>
              </View>
              <View style={styles.featureDivider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="person" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Find Doctors</Text>
                  <Text style={styles.featureSubtitle}>Connect with healthcare professionals</Text>
                </View>
              </View>
              <View style={styles.featureDivider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="heart" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Health Tracking</Text>
                  <Text style={styles.featureSubtitle}>Monitor your health metrics</Text>
                </View>
              </View>
              <View style={styles.featureDivider} />
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Ionicons name="settings" size={18} color="#2563eb" />
                </View>
                <View style={styles.featureTextContainer}>
                  <Text style={styles.featureTitle}>Customization</Text>
                  <Text style={styles.featureSubtitle}>Personalize your experience</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="mail" size={20} color="#2563eb" />
              <Text style={styles.cardTitle}>Contact Us</Text>
            </View>
            <TouchableOpacity style={styles.contactItem}>
              <Ionicons name="mail-outline" size={20} color="#6b7280" />
              <Text style={styles.contactText}>support@hospitalapp.com</Text>
            </TouchableOpacity>
            <View style={styles.contactDivider} />
            <TouchableOpacity style={styles.contactItem}>
              <Ionicons name="call-outline" size={20} color="#6b7280" />
              <Text style={styles.contactText}>(555) 123-4567</Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.card, styles.legalCard]}>
            <View style={styles.cardHeader}>
              <Ionicons name="shield-checkmark" size={20} color="#6b7280" />
              <Text style={[styles.cardTitle, styles.legalTitle]}>Legal Disclaimer</Text>
            </View>
            <Text style={styles.legalText}>
              This app is for informational purposes only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
              with any questions you may have regarding a medical condition.
            </Text>
          </View>

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </View>
  );

  if (visible && onClose) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        transparent={true}
        onRequestClose={onClose}
      >
        {modalContent}
      </Modal>
    );
  }

  return screenContent;
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalFullPage: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  modalHeader: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  screenPage: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#2563eb',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  headerPlaceholder: {
    width: 44,
  },
  content: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  version: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '500',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginLeft: 8,
  },
  description: {
    fontSize: 15,
    color: '#4b5563',
    lineHeight: 22,
  },
  featureList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  featureIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 2,
  },
  featureSubtitle: {
    fontSize: 13,
    color: '#6b7280',
  },
  featureDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 48,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  contactDivider: {
    height: 1,
    backgroundColor: '#f3f4f6',
    marginLeft: 28,
  },
  contactText: {
    fontSize: 15,
    color: '#4b5563',
    marginLeft: 12,
  },
  legalCard: {
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  legalTitle: {
    color: '#6b7280',
  },
  legalText: {
    fontSize: 13,
    color: '#9ca3af',
    lineHeight: 20,
  },
  bottomSpace: {
    height: 20,
  },
});

export default AboutScreen;
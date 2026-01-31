import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCompletion = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const habit = route.params?.habit;
  const initialCount = route.params?.currentCount ?? 0;
  const [completionCount, setCompletionCount] = useState(initialCount.toString());

  if (!habit) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.content}>
        <View style={styles.form}>
          <Text style={styles.errorText}>No habit data found</Text>
        </View>
      </ScrollView>
    );
  }

  const updateCompletion = async () => {
    const newCount = parseInt(completionCount) || 0;
    try {
      const response = await fetch(`https://c346-ca2-server.onrender.com/habit/${habit.habit_id}/completions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ new_count: newCount })
      });
      if (response.ok) {
        Alert.alert('Success', 'Completion count updated', [
          { text: 'OK', onPress: () => navigation.navigate('Home') }
        ]);
      } else {
        const data = await response.json();
        Alert.alert('Error', data.message || 'Failed to update count');
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to connect to server');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Completion Count</Text>
          <TextInput
            style={styles.input}
            value={completionCount}
            onChangeText={setCompletionCount}
            placeholder="Enter completion count"
            keyboardType="numeric"
          />
        </View>

        <TouchableOpacity style={styles.addBtn} onPress={updateCompletion}>
          <Text style={styles.addBtnText}>Save Completion Count</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cancelBtn} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelBtnText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafb',
  },
  content: {
    paddingBottom: 30,
  },
  form: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: '#333',
  },
  addBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  cancelBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f44336',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  cancelBtnText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingVertical: 20,
  },
});

export default EditCompletion;

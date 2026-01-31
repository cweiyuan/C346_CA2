import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditCompletion = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const habit = route.params?.habit;
  const initialCount = route.params?.currentCount ?? 0;
  const [completionCount, setCompletionCount] = useState(initialCount.toString());

  if (!habit) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No habit data found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Edit Completion Count</Text>
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
      <TouchableOpacity
        style={styles.updateBtn}
        onPress={async () => {
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
        }}
      >
        <Text style={styles.updateBtnText}>Save Completion Count</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.deleteBtnText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafb',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#333',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
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
    width: '100%',
  },
  updateBtn: {
    backgroundColor: '#4caf50',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  updateBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  deleteBtn: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#f44336',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    width: '100%',
  },
  deleteBtnText: {
    color: '#f44336',
    fontSize: 16,
    fontWeight: '700',
  },
  errorText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});

export default EditCompletion;

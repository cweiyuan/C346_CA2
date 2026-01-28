import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';  // For navigation

export default function HomeScreen() {
  const [habits, setHabits] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch('https://c346-ca2-server.onrender.com/habits');
      const data = await response.json();
      setHabits(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const deleteHabit = async (habitId) => {
    try {
      await fetch(`https://c346-ca2-server.onrender.com/deletehabits/${habitId}`, {
        method: 'DELETE'
      });
      fetchHabits();  // Refresh list
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.habitItem}>
      <View style={styles.habitInfo}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.category}>Category: {item.category}</Text>
        <Text style={styles.points}>+{item.points_per_completion} pts</Text>
      </View>
      <TouchableOpacity 
        style={styles.deleteBtn}
        onPress={() => deleteHabit(item.habit_id)}
        title="Delete"
      >
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={habits}
        keyExtractor={(item) => item.habit_id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8f0',  // Light green theme
  },
  list: {
    padding: 16,
  },
  habitItem: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  habitInfo: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: '#4caf50',
    marginBottom: 4,
  },
  points: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff9800',
  },
  deleteBtn: {
    backgroundColor: '#f44336',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    justifyContent: 'center',
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

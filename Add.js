import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = async () => {
  if (newHabit.trim() === '') return;

  try {
    const response = await fetch(
      'https://c346-ca2-server.onrender.com/addhabits',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newHabit,
          description: 'User added habit',
          category: 'General',
          points_per_completion: 10,
          is_active: 1,
        }),
      }
    );

    const savedHabit = await response.json();
    
    setHabits((prevHabits) => [...prevHabits, savedHabit]);
    setNewHabit('');

  } catch (error) {
    console.error(error);
  }
};

  const renderItem = ({ item }) => {
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Category: {item.category}</Text>
        <Text>Points after completion: {item.points_per_completion}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter a sustainable habit"
        value={newHabit}
        onChangeText={setNewHabit}
      />

      <Button title="Add Habit" onPress={addHabit} />

      <FlatList
        data={habits}
        keyExtractor={(item) => item.habit_id.toString()}
        renderItem={renderItem}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

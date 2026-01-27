import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  const addHabit = () => {
    if (newHabit.trim() === '') return;

    const newHabitObject = {
      habit_id: Date.now(),              
      title: newHabit,
      description: 'User added habit',
      category: 'General',
      points_per_completion: 10,
      is_active: 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    setHabits((prevHabits) => [...prevHabits, newHabitObject]);
    setNewHabit('');
  };

  const renderItem = ({ item }) => {
    return (
      <view>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>Category: {item.category}</Text>
        <Text>Points after completion: {item.points_per_completion}</Text>
      </view>
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

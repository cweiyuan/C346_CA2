import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, TextInput, Button } from 'react-native';
import { useState } from 'react';

export default function App() {

  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState('');

  // Add habit function
  const addHabit = () => {
    if (newHabit.trim() === '') return;

    setHabits((prevHabits) => [
      ...prevHabits,
      { id: Date.now().toString(), title: newHabit }
    ]);

    setNewHabit('');
  };

  // Render each habit
  const renderItem = ({ item }) => {
    return <Text>{item.title}</Text>;
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
        keyExtractor={(item) => item.id}
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

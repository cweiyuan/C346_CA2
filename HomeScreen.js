import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  FlatList  } from 'react-native';
import { useState, useEffect } from 'react';

export default function App() {

  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await fetch(
        'https://c346-ca2-server.onrender.com/habits'
      );
      const data = await response.json();
      setHabits(data);
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
      <Button
        title="Summary"
        onPress={() => navigation.navigate('PointScreen')}
      />

      <Button
        title="Habit"
        onPress={() => navigation.navigate('CompleteHabitcreen')}
      />

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

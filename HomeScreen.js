import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  FlatList  } from 'react-native';

export default function App() {

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

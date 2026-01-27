import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,  FlatList  } from 'react-native';

export default function App() {

  const renderItem = ({ item }) => {
    return <Text>{item.title}</Text>;
  };

   return (
    <View style={styles.container}>
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

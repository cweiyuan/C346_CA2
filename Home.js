import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SectionList, Button, StatusBar } from 'react-native';
import { datasource } from './Data.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  opacityStyle: {
    borderWidth: 1,
  },
  textStyle: {
    fontSize: 15,
    margin: 10,
    textAlign: 'left',
  },
  headerText: {
    fontSize: 20,
    margin: 10,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const Home = ({ navigation }) => {
  const [myData, setMydata] = useState([]);

  const getData = async () => {
    let datastr = await AsyncStorage.getItem('alphadata');
    if (datastr != null) {
      let jsondata = JSON.parse(datastr);
      setMydata(jsondata);
    } else {
      setMydata(datasource);
    }
  };

  getData();

  const renderItem = ({ item, index, section }) => {
    return (
      <TouchableOpacity
        style={styles.opacityStyle}
        onPress={() => {
          navigation.navigate('Edit', {
            index: index,
            type: section.title,
            key: item.key,
          });
        }}>
        <Text style={styles.textStyle}>{item.key}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ margin: 10, flex: 1 }}>
      <Button
        title="Add Letter"
        onPress={() => {
          let datastr = JSON.stringify(myData);
          navigation.navigate('Add', { datastring: datastr });
        }}
      />
      <SectionList
        sections={myData}
        renderItem={renderItem}
        renderSectionHeader={({ section: { title, bgcolor } }) => (
          <Text style={[styles.headerText, { backgroundColor: bgcolor }]}>
            {title}
          </Text>
        )}
      />
      <StatusBar translucent={false} />
    </View>
  );
};

export default Home;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
  TextInput,
} from 'react-native';
import axios from 'axios';
const Home = () => {
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [task, setTask] = useState('');
  // type ItemProps = {item: any};
  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        'https://to-do-backend-e479vpwcf-astitva877.vercel.app/api/task',
      );
      console.log(response.data);
      setData(response.data);
      console.log(data);
      // setLoading(false);
    } catch (error) {
      console.log('Error fetching tasks:', error);
    }
  };
  useEffect(() => {
    fetchTasks();
  }, []);
  const deleteTask = async id => {
    try {
      const response = await axios.delete(
        `https://to-do-backend-e479vpwcf-astitva877.vercel.app/api/task/${id}`,
      );
      console.log('Delete successful:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Delete failed:', error);
      // console.log({id});
    }
    // console.log(item._id);
  };
  const updateTask = async id => {
    try {
      const response = await axios.put(
        `https://to-do-backend-e479vpwcf-astitva877.vercel.app/api/task/${id}`,
        {
          // Request body or data
          task: task,
        },
      );

      console.log('Update successful:', response.data);
      fetchTasks();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  const Item = ({item}) => (
    <View style={styles.item}>
      <View
        style={{
          height: '100%',
          width: '76%',
          // backgroundColor: 'red',
          justifyContent: 'center',
        }}>
        <Text style={styles.title}>{item?.task}</Text>
      </View>
      {/* <TouchableOpacity
        style={styles.icon}
        onPress={() => updateTask(item._id)}>
        <Image
          source={require('../assests/edit.png')}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </TouchableOpacity> */}
      <TouchableOpacity
        style={styles.icon}
        onPress={() => deleteTask(item._id)}>
        <Image
          source={require('../assests/delete.png')}
          resizeMode="contain"
          style={styles.imageStyle}
        />
      </TouchableOpacity>
    </View>
  );
  const postData = async () => {
    if (task === '') {
      Alert.alert('First write the task');
    } else {
      try {
        const response = await axios.post(
          'https://to-do-backend-e479vpwcf-astitva877.vercel.app/api/task/create',
          {
            // Request body or data
            task: task,
          },
        );

        console.log('Post successful:', response.data);
        fetchTasks();
      } catch (error) {
        console.error('Post failed:', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.upperflex}>
        <Text style={styles.heading}>To DO App</Text>
      </View>
      <View style={{flex: 0.1, alignItems: 'center'}}>
        <View style={{height: '100%', width: '90%', flexDirection: 'row'}}>
          <TextInput
            value={task}
            onChangeText={setTask}
            style={{
              height: '80%',
              width: '80%',
              backgroundColor: '#D8D8D8',
              borderRadius: 8,
            }}
            placeholder="Enter Task"
            maxLength={40}
          />
          <TouchableOpacity
            style={{
              height: '80%',
              width: '20%',
              backgroundColor: '#D8D8D8',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => postData()}>
            <Text>Ok</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{flex: 0.8, alignItems: 'center'}}>
        <View style={{height: '100%', width: '90%'}}>
          <FlatList
            data={data}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item._id}
          />
        </View>
      </View>

      {/* <View
        style={{flex: 0.1, justifyContent: 'center', alignItems: 'flex-end'}}>
        <TouchableOpacity
          style={{height: 50, width: 50, position: 'absolute'}}
          onPress={() => setModalVisible(true)}>
          <Image
            source={require('../assests/pen.png')}
            resizeMode="contain"
            style={{height: '80%', width: '80%'}}
          />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
  upperflex: {flex: 0.1, alignItems: 'center', justifyContent: 'center'},
  heading: {fontSize: 16, color: '#000000', fontWeight: '600'},
  item: {
    backgroundColor: '#f9c2ff',
    // padding: 20,
    // paddingVertical: 30,
    marginVertical: 8,
    // marginHorizontal: 16,
    borderRadius: 10,
    width: '100%',
    height: 60,
    // alignItems: 'center',
    flexDirection: 'row',
  },
  title: {
    fontSize: 16,
    color: '#000000',
  },
  icon: {
    width: '13%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {height: '50%', width: '80%'},
});

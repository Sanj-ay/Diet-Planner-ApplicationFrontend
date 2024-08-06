import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CardsRow from './CardsRow';
import axios from 'axios';
const Diet = () => {
  const navigation = useNavigation();
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [activity, setActivity] = useState('');
  const [dietType, setDietType] = useState('');
  const [results, setResults] = useState([]);

  const calculateBMR = () => {
    const bmr = gender === 'male' ?
      10 * weight + 6.25 * height - 5 * age + 5 :
      10 * weight + 6.25 * height - 5 * age - 161;

    const calorieNeeds = parseInt((bmr * parseFloat(activity)) / 10);
    return calorieNeeds;
  };

  axios.get('http://localhost:8080/api/v1/foods')
  .then(response => {
    console.log(response.data); // Handle response data
  })
  .catch(error => {
    console.error('Error fetching foods:', error);
  });

  const fetchData = async () => {
    try {
      const response = await fetch(`https://api.edamam.com/api/food-database/v2/parser?app_id=3faae6d3&app_key=5c2c36e96887eff88f2646b9c904b110&nutrition-type=cooking&calories=${calculateBMR()}-300&category=generic-meals`);
      const data = await response.json();
      setResults(data.hints);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const addToMeal = (foodLabel, mealCategory, imageUrl) => {
    navigation.navigate('List', {
      foodLabel,
      mealCategory,
      imageUrl,
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}> Create Own Diet </Text>
      <View style={styles.row}>
      <TextInput
        style={styles.input}
        placeholder="Enter your age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
        
      />
      <TextInput
        style={styles.input}
        placeholder="Enter height (cm)"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      </View>
       <View style={styles.row2}>
      <TextInput
        style={styles.input}
        placeholder="Enter weight (kg)"
        value={weight}
        onChangeText={setWeight}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your gender"
        value={gender}
        onChangeText={setGender}
      />
      </View>
      <View style={styles.row2}>
      <TextInput
        style={styles.input}
        placeholder="Enter  activity level"
        value={activity}
        onChangeText={setActivity}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter diet type"
        value={dietType}
        onChangeText={setDietType}
      />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={fetchData}>
        <Text style={styles.buttonText}>Create</Text>
      </TouchableOpacity>
      
      <ScrollView style={styles.resultsContainer}>
        <CardsRow items={results} addToMeal={addToMeal} />
      </ScrollView>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection:'column',
    flex:1,
    padding: 20,
    backgroundColor: '#f4f4f4',
    
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    flexDirection:"row",
    width:150,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultsContainer: {
    flex: 1,
    marginTop: 20,
  },
  row:{
    flexDirection:'row',
    padding:5,
    marginHorizontal:10,
    gap:5,

  },
  row2:{
    flexDirection:'row',
    padding:5,
    marginHorizontal:10,
    gap:5,

  }
});

export default Diet;

import React, { useState, useEffect } from 'react';
import { View,  Linking,Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

const List = ({ route }) => {
  const [foodLabel, setFoodLabel] = useState('');
  const [mealCategory, setMealCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [foodList, setFoodList] = useState([]);
  const [filteredFoodList, setFilteredFoodList] = useState([]);

  useEffect(() => {
    if (route.params) {
      setFoodLabel(route.params.foodLabel);
      setMealCategory(route.params.mealCategory);
      setImageUrl(route.params.imageUrl);
      setFoodList((prevList) => [...prevList, { foodLabel: route.params.foodLabel, mealCategory: route.params.mealCategory, imageUrl: route.params.imageUrl }]);
    }
  }, [route.params]);

  useEffect(() => {
    // Filter foodList based on selected meal category
    if (mealCategory) {
      const filteredItems = foodList.filter(item => item.mealCategory === mealCategory);
      setFilteredFoodList(filteredItems);
    } else {
      setFilteredFoodList(foodList);
    }
  }, [foodList, mealCategory]);

  const removeFoodItem = (index) => {
    const updatedList = [...foodList];
    updatedList.splice(index, 1);
    setFoodList(updatedList);
  };

  const renderFoodItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => removeFoodItem(index)}>
      <View style={styles.foodItem}>
        <Image source={{ uri: item.imageUrl }} style={styles.foodImage} />
        <View>
          <Text onPress={() => Linking.openURL(`https://www.youtube.com/results?search_query=${item.foodLabel}`)}style={styles.foodLabel}>{item.foodLabel}</Text>
          <Text style={styles.mealCategory}>Meal Category: {item.mealCategory}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const handleMealCategoryClick = (category) => {
    setMealCategory(category);
    console.log(`${category} clicked`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, mealCategory === 'Breakfast' && styles.selectedButton]} onPress={() => handleMealCategoryClick('Breakfast')}>
          <Text style={[styles.buttonText, mealCategory === 'Breakfast' && styles.selectedButtonText]}>Breakfast</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, mealCategory === 'Lunch' && styles.selectedButton]} onPress={() => handleMealCategoryClick('Lunch')}>
          <Text style={[styles.buttonText, mealCategory === 'Lunch' && styles.selectedButtonText]}>Lunch</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, mealCategory === 'Dinner' && styles.selectedButton]} onPress={() => handleMealCategoryClick('Dinner')}>
          <Text style={[styles.buttonText, mealCategory === 'Dinner' && styles.selectedButtonText]}>Dinner</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.category}>Meal Category: {mealCategory}</Text>
      <FlatList
        data={filteredFoodList}
        renderItem={renderFoodItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius:15,
  },
  selectedButton: {
    backgroundColor: '#2980b9',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  selectedButtonText: {
    fontWeight: 'bold',
  },
  category: {
    fontSize: 18,
    marginBottom: 10,
  },
  foodItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  foodImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  foodLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealCategory: {
    fontSize: 14,
    color: 'gray',
  },
});

export default List;
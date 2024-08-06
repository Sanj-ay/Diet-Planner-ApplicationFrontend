import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

const Card = ({ item, addToMeal }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.food.label}</Text>
        <View style={styles.nutritionValues}>
          {Object.entries(item.food.nutrients).map(([key, value]) => (
            <Text key={key} style={styles.nutritionText}>{`${key}: ${value.toFixed(2)}`}</Text>
          ))}
        </View>
        <View style={styles.addMealButtons}>
          <TouchableOpacity style={styles.mealButton} onPress={() => addToMeal(item.food.label, 'Breakfast', item.food.image)}>
            <Text>Breakfast</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealButton} onPress={() => addToMeal(item.food.label, 'Lunch', item.food.image)}>
            <Text> Lunch</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.mealButton} onPress={() => addToMeal(item.food.label, 'Dinner', item.food.image)}>
            <Text> Dinner</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '100%',
    
  },
  cardImage: {
    width: '100%',
    height: 120,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardContent: {
    padding: 8,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 4,
  },
  nutritionValues: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nutritionText: {
    fontSize: 10,
    marginRight: 8,
  },
  addMealButtons: {
    flexDirection: 'row',
    gap:30,
    marginLeft:30,
    marginTop: 8,
  },
  mealButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
  }});
  export default Card;
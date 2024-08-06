import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from './Card';

const CardsRow = ({ items, addToMeal }) => {
  const renderCards = () => {
    const cards = [];
    for (let i = 0; i < items.length; i += 3) {
      const chunk = items.slice(i, i + 1);
      cards.push(
        <View key={i} style={styles.cardsRow}>
          {chunk.map((item) => (
            <Card key={item.food.foodId} item={item} addToMeal={addToMeal} />
          ))}
        </View>
      );
    }
    return cards;
  };

  return <>{renderCards()}</>;
};

const styles = StyleSheet.create({
  cardsRow: {
    flexDirection: '',
    justifyContent: 'space-between',
    marginBottom: 16,
    
  },
});

export default CardsRow;
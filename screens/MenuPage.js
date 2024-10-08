import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';


const MenuPage = ({ route, navigation }) => {
  const { menu } = route.params;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Chef's Menu</Text>
      <Text>Total Menu Items: {menu.length}</Text>

      <FlatList
        data={menu}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10, borderBottomWidth: 1, paddingBottom: 10 }}>
            <Text>Dish: {item.dishName}</Text>
            <Text>Description: {item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Text>Price: R{item.price}</Text>
          </View>
        )}
      />

      
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()} 
      >
        <Text style={styles.buttonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8BFD8',
  },
});

export default MenuPage;

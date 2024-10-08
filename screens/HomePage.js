import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, Button, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';


const courseData = {
  MainCourse: [
    { label: 'Spaghetti Bolognese - R380', value: 'Bobotie', fee: 380, description: 'A traditional South African dish made with spiced minced meat baked with an egg-based topping.' },
    { label: 'Grilled Salmon - R350', value: 'Boerewors', fee: 350, description: 'A type of sausage from South Africa made primarily from beef, spiced and grilled to perfection.' },
    { label: 'Margherita Pizza - R300', value: 'Fajitas', fee: 300, description: 'Grilled meat (usually chicken or beef) served with sautéed peppers and onions, commonly wrapped in a soft tortilla.' },
    { label: 'Chicken Alfredo Pasta - R400', value: 'Peppermint Crips Tart', fee: 400, description: 'A South African dessert made with layers of whipped cream, caramel, and crushed peppermint crisp bars.' },
    { label: 'Grilled Salmon - R400', value: 'Potjiekos', fee: 400, description: 'A slow-cooked stew typically prepared outdoors in a round, cast-iron pot, filled with meats and vegetables.' },
    
  ],

  Starter: [
    { label: 'Stuffed Mushrooms - R100', value: 'Stuffed Mushrooms', fee: 100, description: 'A flavorful curry made with aromatic spices like cumin, coriander, turmeric, and typically includes lamb or chicken.' },
    { label: 'Caprese Salad - R150', value: 'Caprese Salad', fee: 150, description: 'South African kebabs made with marinated meat (often lamb) and skewered with dried apricots, peppers, and onions.' },
    { label: 'Spring Rolls - R50', value: 'Spring Rolls', fee: 150, description: 'A hollowed-out loaf of bread filled with spicy curry, originating from Durban, South Africa.' },
    { label: 'Shrimp Cocktail - R250', value: 'Shrimp Cocktail', fee: 250, description: 'A sweet, sticky pudding from South Africa made with apricot jam and a rich cream sauce.' },
    { label: 'French Onion Soup - R175', value: 'French Onion Soup', fee: 175, description: 'A fusion dish combining the flavors of bobotie with the crunchiness of spring rolls.' },
  ],
  
  Dessert: [
    { label: 'Crème Brûlée - R190', value: 'Crème Brûlée', fee: 190, description: 'A traditional French dessert consisting of a sweet pastry crust filled with creamy, cinnamon-flavored milk custard.' },
    { label: 'Milk Tart- R180', value: 'Milk Tart', fee: 180, description: 'Fried dough infused with syrup or honey, with a crispy outside and a sweet, juicy center.' },
    { label: 'Lemon Tart - R185', value: 'Lemon Tart ', fee: 185, description: 'Pastry treats filled with sweet coconut and apricot jam.' },
    { label: 'Cremora tart - R100', value: 'Cremora tart', fee: 100, description: 'A no-bake tart made with whipped cream, condensed milk, and a powdered coffee creamer called Cremora.' },
    { label: 'Chocolate Cake - R80', value: 'Malva Pudding', fee: 80, description: 'Rich chocolate layered cake with ganache.' },
  ],
};

const HomePage = ({navigation}) => {
  const [selectedCategory, setSelectedCategory] = useState('Starter');
  const [selectedDish, setSelectedDish] = useState(null); 
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('starter');
  const [price, setPrice] = useState('');
  const [menu, setMenu] = useState([]);
  const [menuData, setMenuData] = useState(courseData);

  const selectDish = (dish) => {
    setSelectedDish(dish);
  };

  const MenuPage = () => {
    if (!dishName || !description || !price) {
      Alert.alert('Error', 'Please fill all the fields.');
      return;
    }
    
    const newItem = { dishName, description, course, price };
    setMenuData({
      ...menuData,
      [selectedCategory]: [...menuData[selectedCategory], newItem],
    });
    setMenu([...menu, newItem]);
    navigation.navigate('MenuScreen', { menu: [...menu, newItem] });

    
    setDishName('');
    setDescription('');
    setPrice('');
  };

 
  const displayDishes = () => {
    return menuData[selectedCategory].map((dish, index) => (
      <TouchableOpacity key={index} style={styles.menuItem} onPress={() => selectDish(dish)}>
        <Text>{dish.label}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
       
        <View style={styles.header}>
          <Text style={styles.logo}> Fine Dining </Text>
        </View>

        

        
        <View style={styles.menuLabel}>
          <Text style={styles.menuText}>Menu</Text>
          <Text style={styles.menuNumber}>{menuData[selectedCategory].length}</Text>
        </View>

      
        <View style={styles.courseButtons}>
          <Button title="Starters" onPress={() => setSelectedCategory('Starter')} />
          <Button title="Main Course" onPress={() => setSelectedCategory('MainCourse')} />
          <Button title="Dessert" onPress={() => setSelectedCategory('Dessert')} />
        </View>

       
        <Picker
          selectedValue={selectedDish}
          style={{ height: 50, width: 250, marginVertical: 20 }}
          onValueChange={(itemValue) => selectDish(itemValue)}
        >
          {menuData[selectedCategory].map((dish, index) => (
            <Picker.Item key={index} label={dish.label} value={dish} />
          ))}
        </Picker>
        
        <View style={styles.menuItems}>
          <ScrollView>{displayDishes()}</ScrollView>
        </View>

        
        {selectedDish && (
          <View style={styles.selectedDish}>
            <Text style={styles.dishTitle}>{selectedDish.label}</Text>
            <Text style={styles.dishDescription}>{selectedDish.description}</Text>
          </View>
        )}

        <View style={{ padding: 20 }}>
          <Text>Dish Name:</Text>
          <TextInput
            placeholder="Enter Dish Name"
            value={dishName}
            onChangeText={setDishName}
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Text>Description:</Text>
          <TextInput
            placeholder="Enter Description"
            value={description}
            onChangeText={setDescription}
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Text>Price:</Text>
          <TextInput
            placeholder="Enter Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            style={{ borderWidth: 2, marginBottom: 20, padding: 10 }}
          />

          <Button title="Add to Menu" onPress={MenuPage} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8BFD8',
  },

  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  header: {
    marginVertical: 20,
    alignItems: 'center',
  },

  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },

  mainPicture: {
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ImageSize: {
    width: 200,
    height: 200,
  },

  menuLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 50,
  },

  menuText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },

  menuNumber: {
    fontSize: 22,
    color: '#333',
  },

  courseButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },

  menuItems: {
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },

  selectedDish: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  dishTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  dishDescription: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default HomePage;

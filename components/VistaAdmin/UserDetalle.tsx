import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const UserDetalle = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { user } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nombre:</Text>
        <Text>{user.name}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FAD201',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailsContainer: {
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default UserDetalle;

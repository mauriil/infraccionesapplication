import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const DetalleMultaScreen = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { multa } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles de la Multa</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{multa.date}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Descripción:</Text>
        <Text>{multa.description}</Text>
      </View>

      {/* Add more details as needed based on your data structure */}

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Ubicación:</Text>
        <Text>{multa.location}</Text>
      </View>

      {/* Add other details as needed */}

      <Text style={styles.label}>Comentarios Adicionales:</Text>
      <Text>{multa.comments}</Text>

      {/* You can include additional details based on your data structure */}

      {/* Add a "Go Back" button or navigation options based on your navigation setup */}
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

export default DetalleMultaScreen;

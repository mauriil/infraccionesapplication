import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const TransporteDetalle = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { transporte } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nro Legajo:</Text>
        <Text>{transporte.numero_legajo}</Text>
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

export default TransporteDetalle;

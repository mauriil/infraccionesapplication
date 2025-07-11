import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

const TurismoDetalle = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { turismo } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Emmpresa:</Text>
        <Text>{turismo.nombre_empresa}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFAF9',
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

export default TurismoDetalle;

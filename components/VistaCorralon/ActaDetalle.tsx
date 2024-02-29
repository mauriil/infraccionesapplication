import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';

const DetalleActaScreen = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { acta } = route.params;
  console.log("🚀 ~ DetalleActaScreen ~ acta:", acta)

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles de la Acta</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{acta.fecha_recepcion}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Corralon:</Text>
        <Text>{acta.corralon.nombre}</Text>
      </View>

      <View style={styles.detailsContainerPhoto}>
        <Text style={styles.label}>Fotos:</Text>
        {acta.fotos.map((foto, index) => (
          <Image
            key={index}
            source={{ uri: foto }}
            style={{ width: 200, height: 200, marginBottom: 8 }}
          />
        ))}
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
  detailsContainerPhoto: {
    marginBottom: 16,
  },
  selectedImage: {
    width: '100%',
    height: 200,
  },
});

export default DetalleActaScreen;

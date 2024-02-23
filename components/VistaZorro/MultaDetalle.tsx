import React from 'react';
import { View, StyleSheet, ScrollView, Text, Image } from 'react-native';

const DetalleMultaScreen = ({ route }) => {
  // Assuming the route params contain the details of the selected violation
  const { multa } = route.params;

  const formatISODate = date => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Detalles de la Multa</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{formatISODate(multa.createdAt)}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Dominio:</Text>
        <Text>{multa.dominio}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nombre propietario:</Text>
        <Text>{multa.nombre_propietario}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nombre conductor:</Text>
        <Text>{multa.nombre_conductor}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Domicilio conductor:</Text>
        <Text>{multa.domicilio_conductor}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Marca vehiculo:</Text>
        <Text>{multa.marca_vehiculo}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Modelo vehiculo:</Text>
        <Text>{multa.modelo_vehiculo}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Nro licencia:</Text>
        <Text>{multa.numero_licencia_conductor}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Ubicación:</Text>
        <Text>{multa.ubicacion_infraccion}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Estado:</Text>
        <Text>{multa.estado}</Text>
      </View>

      <View style={styles.detailsContainerPhoto}>
        <Text style={styles.label}>Fotos:</Text>
        {multa.foto.map((foto, index) => (
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
  detailsContainerPhoto: {
    marginBottom: 50,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
});

export default DetalleMultaScreen;

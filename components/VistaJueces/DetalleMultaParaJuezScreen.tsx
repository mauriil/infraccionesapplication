/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Button} from 'react-native-paper';

const DetalleMultaParaJuezScreen = ({route}) => {
  // Assuming the route params contain the details of the selected violation
  const {multa} = route.params;

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Estado de infraccion:</Text>
        <Text
          style={{
            color: 'red',
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          En curso
        </Text>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{width: '45%', marginRight: '5%'}}>
            Marcar pagado
          </Button>
          <Button
            mode="contained"
            onPress={() => console.log('Pressed')}
            style={{width: '45%'}}>
            Desestimar multa
          </Button>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Vehiculo retenido:</Text>
        <Text>Corralon: El corralito</Text>
        <Text>Ubicacion: Calle falsa 123:</Text>
        <Text>Estado: Recibido </Text>
        <Button mode="contained" onPress={() => console.log('Pressed')}>
          Aprobar liberacion
        </Button>
      </View>

      {/* You can include additional details based on your data structure */}

      {/* Add a "Go Back" button or navigation options based on your navigation setup */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#00AF5A',
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

export default DetalleMultaParaJuezScreen;

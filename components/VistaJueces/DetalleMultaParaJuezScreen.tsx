/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, ScrollView, Text, Image} from 'react-native';
import {Button} from 'react-native-paper';
import {padStart} from 'lodash';

const DetalleMultaParaJuezScreen = ({route}) => {
  // Assuming the route params contain the details of the selected violation
  const {multa} = route.params;

  const formatDate = date => {
    date = new Date(date);
    const day = date.getDate();
    const month = padStart((date.getMonth() + 1).toString(), 2, '0');
    const year = date.getFullYear();

    const hours = padStart(date.getHours().toString(), 2, '0');
    const minutes = padStart(date.getMinutes().toString(), 2, '0');
    return `${year}-${month}-${day}  ${hours}:${minutes}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Fecha:</Text>
        <Text>{formatDate(multa.createdAt)}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Dominio:</Text>
        <Text>{multa.dominio}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Ubicación:</Text>
        <Text>{multa.ubicacion_infraccion}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.label}>Referencia ubicación:</Text>
        <Text>{multa.referencia_ubicacion}</Text>
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
          {multa.estado}
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
        <Text style={styles.liberacionTitle}>Vehiculo retenido: (en proceso de construccion)</Text>
        <Text>Corralon: El corralito</Text>
        <Text>Ubicacion: Calle falsa 123:</Text>
        <Text>Estado: Recibido </Text>
        <Button mode="contained" onPress={() => console.log('Pressed')} style={styles.liberacionBtn}>
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
    marginBottom: 50,
  },
  liberacionTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
    fontSize: 24,
  },
  liberacionBtn: {
    marginTop: 16,
    marginBottom: 16,
  },
});

export default DetalleMultaParaJuezScreen;

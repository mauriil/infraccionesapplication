import axios from 'axios';
import React, {useState} from 'react';
import {View, StyleSheet, ScrollView, Text} from 'react-native';
import {Button, TextInput} from 'react-native-paper';

const InfraccionDetalle = ({route}) => {
  // Assuming the route params contain the details of the selected violation
  const {Infraccion} = route.params;

  const [newInfraccion, setNewInfraccion] = useState({
    nombre: Infraccion.nombre,
    unidades_de_valor: Infraccion.unidades_de_valor,
  });

  const addInfraccion = async () => {
    try {
      await axios.post('/api/Infracciones', newInfraccion); // Replace with your backend API endpoint
      setNewInfraccion({nombre: '', unidades_de_valor: 0});
    } catch (error) {
      console.error('Error adding Infraccion:', error);
    }
  };

  const deleteInfraccion = async () => {
    try {
      await axios.post('/api/Infracciones', newInfraccion); // Replace with your backend API endpoint
      setNewInfraccion({nombre: '', unidades_de_valor: 0});
    } catch (error) {
      console.error('Error adding Infraccion:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailsContainer}>
        <TextInput
          label="Nombre"
          value={newInfraccion.nombre}
          onChangeText={value =>
            setNewInfraccion({...newInfraccion, nombre: value})
          }
          style={styles.input}
        />
        <TextInput
          label="Unidades de vavlor"
          value={newInfraccion.unidades_de_valor}
          keyboardType="number-pad"
          onChangeText={value =>
            setNewInfraccion({...newInfraccion, unidades_de_valor: value})
          }
          style={styles.input}
        />
        
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button
            mode="contained"
            onPress={() => addInfraccion()}
            style={{width: '45%', marginRight: '5%'}}>
            Guardar
          </Button>
          <Button
            mode="contained"
            onPress={() => deleteInfraccion()}
            style={{width: '45%'}}>
            Eliminar
          </Button>
        </View>
      </View>
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
  input: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
});

export default InfraccionDetalle;

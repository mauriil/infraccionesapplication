/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {Button, Card, Paragraph, TextInput, Title} from 'react-native-paper';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import { getAllNomencladores } from '../../api/nomencladores';

const InfraccionesManagement: React.FC = () => {
  const navigation = useNavigation();
  const [Infracciones, setInfracciones] = useState([]);
  const [newInfraccion, setNewInfraccion] = useState({
    nombre: '',
    unidades_de_valor: 0,
  });
  const [showAddInfraccionFields, setShowAddInfraccionFields] = useState(false);

  const getInfracciones = async () => {
    try {
      const response = await getAllNomencladores();
      setInfracciones(response);
    } catch (error) {
      console.error('Error fetching Infracciones:', error);
    }
  };

  const addInfraccion = async () => {
    try {
      await axios.post('/api/Infracciones', newInfraccion); // Replace with your backend API endpoint
      setNewInfraccion({nombre: '', unidades_de_valor: 0});
      getInfracciones();
    } catch (error) {
      console.error('Error adding Infraccion:', error);
    }
  };

  const deleteInfraccion = async (InfraccionId: string) => {
    try {
      await axios.delete(`/api/Infracciones/${InfraccionId}`); // Replace with your backend API endpoint
      getInfracciones();
    } catch (error) {
      console.error('Error deleting Infraccion:', error);
    }
  };

  const handlePress = (Infraccion: any) => {
    navigation.navigate('InfraccionDetalle', {Infraccion});
  };

  useEffect(() => {
    getInfracciones();
  }, []); // Fetch Infracciones on component mount

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <Button
        onPress={() => setShowAddInfraccionFields(!showAddInfraccionFields)}>
        {showAddInfraccionFields ? 'Cancelar' : 'Añadir Nomenclador'}
      </Button>

      {/* Add Infraccion Form (conditionally rendered based on showAddInfraccionFields state) */}
      {showAddInfraccionFields && (
        <View>
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
          <Button mode="contained" onPress={() => addInfraccion()}>
            Guardar
          </Button>
        </View>
      )}

      <View style={{borderBottomColor: 'black', borderBottomWidth: 1}} />

      {/* Infraccion List */}
      <View
        style={{
          marginTop: 16,
        }}>
        <FlatList
          data={Infracciones}
          keyExtractor={Infraccion => Infraccion._id}
          renderItem={({item: Infraccion}) => (
            <TouchableOpacity onPress={() => handlePress(Infraccion)}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{Infraccion.nombre}</Title>
                  <Paragraph>
                    Valor: {Infraccion.unidades_de_valor} unidades
                  </Paragraph>
                </Card.Content>
              </Card>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
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
  card: {
    marginVertical: 8,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  picker: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default InfraccionesManagement;

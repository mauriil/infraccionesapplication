/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {Button, Card, Paragraph, TextInput, Title} from 'react-native-paper';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {getAllNomencladores, newNomenclador} from '../../api/nomencladores';
import Spinner from 'react-native-loading-spinner-overlay';

const InfraccionesManagement: React.FC = () => {
  const navigation = useNavigation();
  const [Infracciones, setInfracciones] = useState([]);
  const [newInfraccion, setNewInfraccion] = useState({
    nombre: '',
    unidades_de_valor: 0,
  });
  const [showAddInfraccionFields, setShowAddInfraccionFields] = useState(false);
  const [loading, setLoading] = useState(false);

  const getInfracciones = async () => {
    try {
      setLoading(true);
      const response = await getAllNomencladores();
      setInfracciones(response);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Infracciones:', error);
    }
  };

  const checkErrors = () => {
    if (newInfraccion.nombre.length < 4) {
      alert('El nombre debe tener al menos 4 caracteres');
      return false;
    }
    if (
      newInfraccion.unidades_de_valor < 0 ||
      newInfraccion.unidades_de_valor === 0
    ) {
      Alert.alert(
        'Atención',
        'El valor de las unidades de valor no puede ser 0 o negativo',
        [{text: 'OK'}],
      );
      return false;
    }
    return true;
  };

  const addInfraccion = async () => {
    if (!checkErrors()) {
      return;
    }
    try {
      setLoading(true);
      await newNomenclador(newInfraccion);
      setNewInfraccion({nombre: '', unidades_de_valor: 0});
      setLoading(false);
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

      {loading && (
        <Spinner
          visible={loading}
          textContent="Cargando"
          textStyle={{
            color: 'white',
          }}
        />
      )}

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
            error={newInfraccion.nombre.length < 4}
          />
          <TextInput
            label="Unidades de vavlor"
            value={newInfraccion.unidades_de_valor}
            keyboardType="number-pad"
            onChangeText={value =>
              setNewInfraccion({
                ...newInfraccion,
                unidades_de_valor: parseFloat(value),
              })
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
          style={{marginBottom: 35}}
          renderItem={({item: Infraccion}) => (
            <TouchableOpacity
              onPress={() => handlePress(Infraccion)}
              key={Infraccion._id}>
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
    backgroundColor: '#FFFAF9',
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

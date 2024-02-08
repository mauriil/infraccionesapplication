import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  Button,
  Card,
  Chip,
  Paragraph,
  TextInput,
  Title,
} from 'react-native-paper';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getAllTurismo } from '../../api/turismo';

const TurismoManagement: React.FC = () => {
  const navigation = useNavigation();
  const [turismos, setturismos] = useState([]);
  const [newturismos, setNewturismos] = useState({
    nombre_empresa: '',
    marca_vehiculo: '',
    dominio_vehiculo: '',
    nombre_conductores: [],
    fecha_hora_ingreso: '',
    fecha_hora_egreso: '',
  });
  const [nuevoConductor, setNuevoConductor] = useState('');
  const [showAddturismosFields, setShowAddturismosFields] = useState(false);

  const getturismos = async () => {
    try {
      const response = await getAllTurismo();
      setturismos(response);
    } catch (error) {
      console.error('Error fetching turismos:', error);
    }
  };

  const addturismos = async () => {
    try {
      console.log("🚀 ~ addturismos ~ newturismos:", newturismos)
      await axios.post('/api/turismos', newturismos); // Replace with your backend API endpoint
      setNewturismos({
        nombre_empresa: '',
        marca_vehiculo: '',
        dominio_vehiculo: '',
        nombre_conductores: [],
        fecha_hora_ingreso: '',
        fecha_hora_egreso: '',
      });
      getturismos();
      setShowAddturismosFields(false); // Close the turismos creation fields after adding
    } catch (error) {
      console.error('Error adding turismos:', error);
    }
  };

  const deleteturismos = async (turismosId: string) => {
    try {
      await axios.delete(`/api/turismos/${turismosId}`); // Replace with your backend API endpoint
      getturismos();
    } catch (error) {
      console.error('Error deleting turismos:', error);
    }
  };

  const handlePress = (turismo: any) => {
    navigation.navigate('turismoDetalle', { turismo });
  };

  useEffect(() => {
    getturismos();
  }, []); // Fetch turismos on component mount

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <Button onPress={() => setShowAddturismosFields(!showAddturismosFields)}>
        {showAddturismosFields ? 'Cancelar' : 'Añadir turismos'}
      </Button>

      {/* Add turismos Form (conditionally rendered based on showAddturismosFields state) */}
      {showAddturismosFields && (
        <View>
          <TextInput
            label="Empresa"
            value={newturismos.nombre_empresa}
            onChangeText={value =>
              setNewturismos({ ...newturismos, numero_legajo: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Marca del Vehículo"
            value={newturismos.marca_vehiculo}
            onChangeText={value =>
              setNewturismos({ ...newturismos, dominio_vehiculo: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Dominio del Vehículo"
            value={newturismos.dominio_vehiculo}
            onChangeText={value =>
              setNewturismos({ ...newturismos, dominio_vehiculo: value })
            }
            style={styles.input}
          />
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {newturismos.nombre_conductores.map((conductor, index) => (
              <Chip
                key={index}
                onClose={() => {
                  const updatedConductores = [
                    ...newturismos.nombre_conductores,
                  ];
                  updatedConductores.splice(index, 1);
                  setNewturismos({
                    ...newturismos,
                    nombre_conductores: updatedConductores,
                  });
                }}>
                {conductor}
              </Chip>
            ))}
          </View>
          <TextInput
            label="Agregar Conductor"
            value={nuevoConductor}
            onChangeText={(value) => setNuevoConductor(value)}
            onSubmitEditing={() => {
              if (nuevoConductor.trim() !== '') {
                setNewturismos({
                  ...newturismos,
                  nombre_conductores: [
                    ...newturismos.nombre_conductores,
                    nuevoConductor,
                  ],
                });
                setNuevoConductor('');
              }
            }}
            style={styles.input}
          />
          {/* Add more fields as needed */}
          <Button mode="contained" onPress={() => addturismos()}>
            Guardar
          </Button>
        </View>
      )}

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />

      {turismos.length === 0 && !showAddturismosFields && (
        <Text
          style={{
            textAlign: 'center',
            marginTop: 16,
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          No hay Taxis-Remises
        </Text>
      )}

      {/* turismos List */}
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={turismos}
          keyExtractor={turismos => turismos._id}
          renderItem={({ item: turismos }) => (
            <TouchableOpacity onPress={() => handlePress(turismos)}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{turismos.nombre_titular}</Title>
                  <Paragraph>
                    {turismos.dominio_vehiculo} - {turismos.tipo_transporte}
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
  input: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
  card: {
    marginVertical: 8,
  },
});

export default TurismoManagement;

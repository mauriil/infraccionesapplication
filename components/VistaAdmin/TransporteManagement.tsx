import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const TransporteManagement: React.FC = () => {
  const navigation = useNavigation();
  const [transportes, setTransportes] = useState([]);
  const [newTransporte, setNewTransporte] = useState({
    numero_legajo: '',
    dominio_vehiculo: '',
    numero_motor: '',
    numero_chasis: '',
    marca_vehiculo: '',
    modelo_vehiculo: '',
    nombre_titular: '',
    numero_licencia_conductor: '',
    nombre_conductor: '',
    poliza_seguro: '',
    vtv: 'Vigente',
    tipo_transporte: 'Carga-Descarga',
    observaciones: '',
  });
  const [showAddTransporteFields, setShowAddTransporteFields] = useState(false);

  const getTransportes = async () => {
    setTransportes([
      {
        numero_legajo: '123',
        dominio_vehiculo: 'ABC123',
        numero_motor: '456',
        numero_chasis: '789',
        marca_vehiculo: 'Toyota',
        modelo_vehiculo: 'Corolla',
        nombre_titular: 'John Doe',
        numero_licencia_conductor: '987654',
        nombre_conductor: 'Jane Doe',
        poliza_seguro: 'XYZ789',
        vtv: 'Vigente',
        tipo_transporte: 'Carga-Descarga',
        observaciones: 'No observations',
      },
      // Add more transportes as needed
    ]);
    // try {
    //   const response = await axios.get('/api/transportes'); // Replace with your backend API endpoint
    //   setTransportes(response.data);
    // } catch (error) {
    //   console.error('Error fetching transportes:', error);
    // }
  };

  const addTransporte = async () => {
    try {
      await axios.post('/api/transportes', newTransporte); // Replace with your backend API endpoint
      setNewTransporte({
        numero_legajo: '',
        dominio_vehiculo: '',
        numero_motor: '',
        numero_chasis: '',
        marca_vehiculo: '',
        modelo_vehiculo: '',
        nombre_titular: '',
        numero_licencia_conductor: '',
        nombre_conductor: '',
        poliza_seguro: '',
        vtv: 'Vigente',
        tipo_transporte: 'Carga-Descarga',
        observaciones: '',
      });
      getTransportes();
      setShowAddTransporteFields(false); // Close the transporte creation fields after adding
    } catch (error) {
      console.error('Error adding transporte:', error);
    }
  };

  const deleteTransporte = async (transporteId: string) => {
    try {
      await axios.delete(`/api/transportes/${transporteId}`); // Replace with your backend API endpoint
      getTransportes();
    } catch (error) {
      console.error('Error deleting transporte:', error);
    }
  };

  const handlePress = (transporte: any) => {
    navigation.navigate('transporteDetalle', { transporte });
  };

  useEffect(() => {
    getTransportes();
  }, []); // Fetch transportes on component mount

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <Button onPress={() => setShowAddTransporteFields(!showAddTransporteFields)}>
        {showAddTransporteFields ? 'Cancelar' : 'Añadir Transporte'}
      </Button>

      {/* Add Transporte Form (conditionally rendered based on showAddTransporteFields state) */}
      {showAddTransporteFields && (
        <View>
          <TextInput
            label="Número de Legajo"
            value={newTransporte.numero_legajo}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, numero_legajo: value })}
            style={styles.input}
          />
          <TextInput
            label="Dominio del Vehículo"
            value={newTransporte.dominio_vehiculo}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, dominio_vehiculo: value })}
            style={styles.input}
          />
          <TextInput
            label="Número de Motor"
            value={newTransporte.numero_motor}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, numero_motor: value })}
            style={styles.input}
          />
          {/* Add more fields as needed */}
          <Button mode="contained" onPress={() => addTransporte()}>
            Guardar
          </Button>
        </View>
      )}

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />

      {/* Transporte List */}
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={transportes}
          keyExtractor={(transporte) => transporte._id}
          renderItem={({ item: transporte }) => (
            <TouchableOpacity onPress={() => handlePress(transporte)}>
              <Card style={styles.card}>
                <Card.Content>
                  <Title>{transporte.nombre_titular}</Title>
                  <Paragraph>
                    {transporte.dominio_vehiculo} - {transporte.tipo_transporte}
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

export default TransporteManagement;

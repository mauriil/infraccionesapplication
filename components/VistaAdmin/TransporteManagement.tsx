/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getAllTransportes, newTransporteRequest } from '../../api/transportes';
import Spinner from 'react-native-loading-spinner-overlay';
import { Picker } from '@react-native-picker/picker';

const TransporteManagement: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
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
    try {
      const response = await getAllTransportes();
      setTransportes(response);
    } catch (error) {
      console.error('Error fetching transportes:', error);
    }
  };

  const addTransporte = async () => {
    setLoading(true);
    try {
      await newTransporteRequest(newTransporte);
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
      setShowAddTransporteFields(false);
      setLoading(false);
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

      {loading && (
        <Spinner
          visible={loading}
          textContent="Cargando"
          textStyle={{
            color: 'white',
          }}
        />
      )}

      {/* Add Transporte Form (conditionally rendered based on showAddTransporteFields state) */}
      {showAddTransporteFields && (
        <ScrollView>
          <TextInput
            label="Número de Legajo"
            value={newTransporte.numero_legajo}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, numero_legajo: value })}
            style={styles.input}
            error={newTransporte.numero_legajo.length < 4}
          />
          <TextInput
            label="Dominio del Vehículo"
            value={newTransporte.dominio_vehiculo}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, dominio_vehiculo: value })}
            style={styles.input}
            error={newTransporte.dominio_vehiculo.length < 4}
          />
          <TextInput
            label="Número de Motor"
            value={newTransporte.numero_motor}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, numero_motor: value })}
            style={styles.input}
            error={newTransporte.numero_motor.length < 4}
          />
          <TextInput
            label="Número de Chasis"
            value={newTransporte.numero_chasis}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, numero_chasis: value })}
            style={styles.input}
            error={newTransporte.numero_chasis.length < 4}
          />
          <TextInput
            label="Marca del Vehículo"
            value={newTransporte.marca_vehiculo}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, marca_vehiculo: value })}
            style={styles.input}
            error={newTransporte.marca_vehiculo.length < 4}
          />
          <TextInput
            label="Modelo del Vehículo"
            value={newTransporte.modelo_vehiculo}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, modelo_vehiculo: value })}
            style={styles.input}
            error={newTransporte.modelo_vehiculo.length < 4}
          />
          <TextInput
            label="Nombre del Titular"
            value={newTransporte.nombre_titular}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, nombre_titular: value })}
            style={styles.input}
            error={newTransporte.nombre_titular.length < 4}
          />
          <TextInput
            label="Número de Licencia del Conductor"
            value={newTransporte.numero_licencia_conductor}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, numero_licencia_conductor: value })}
            style={styles.input}
            error={newTransporte.numero_licencia_conductor.length < 4}
          />
          <TextInput
            label="Nombre del Conductor"
            value={newTransporte.nombre_conductor}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, nombre_conductor: value })}
            style={styles.input}
            error={newTransporte.nombre_conductor.length < 4}
          />
          <TextInput
            label="Póliza de Seguro"
            value={newTransporte.poliza_seguro}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, poliza_seguro: value })}
            style={styles.input}
            error={newTransporte.poliza_seguro.length < 4}
          />
          <Text style={styles.label}>VTV</Text>
          <Picker
            selectedValue={newTransporte.vtv}
            onValueChange={itemValue =>
              setNewTransporte({
                ...newTransporte,
                vtv: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Vigente" value="Vigente" />
            <Picker.Item label="Vencida" value="Vencida" />
          </Picker>
          <Text style={styles.label}>Tipo de Transporte</Text>
          <Picker
            selectedValue={newTransporte.tipo_transporte}
            onValueChange={itemValue =>
              setNewTransporte({
                ...newTransporte,
                tipo_transporte: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Carga-Descarga" value="Carga-Descarga" />
            <Picker.Item label="Aridos" value="Transporte de Aridos" />
          </Picker>
          <TextInput
            label="Observaciones"
            value={newTransporte.observaciones}
            onChangeText={(value) => setNewTransporte({ ...newTransporte, observaciones: value })}
            style={styles.input}
          />
          {/* Add more fields as needed */}
          <Button mode="contained" onPress={() => addTransporte()}>
            Guardar
          </Button>
        </ScrollView>
      )}

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />

      {(transportes.length === 0 && !showAddTransporteFields) && <Text style={{
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
      }}>No hay transportes</Text>}

      {/* Transporte List */}
      {!showAddTransporteFields && (
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
      )}
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
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
});

export default TransporteManagement;

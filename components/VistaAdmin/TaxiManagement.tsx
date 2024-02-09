import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import axios from 'axios';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { createNewTaxiRemis, getAllTaxiRemises } from '../../api/taxis';
import { Picker } from '@react-native-picker/picker';

const TaxiRemisManagement: React.FC = () => {
  const navigation = useNavigation();
  const [taxiRemises, setTaxiRemises] = useState([]);
  const [newTaxiRemis, setNewTaxiRemis] = useState({
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
    revision_salud: 'Vigente',
    desinfeccion_vehicular: 'Regular',
    taximetro: 'En condiciones',
    observaciones: '',
  });
  const [showAddTaxiRemisFields, setShowAddTaxiRemisFields] = useState(false);

  const getTaxiRemises = async () => {
    try {
      const response = await getAllTaxiRemises();
      setTaxiRemises(response);
    } catch (error) {
      console.error('Error fetching taxiRemises:', error);
    }
  };

  const addTaxiRemis = async () => {
    try {
      await createNewTaxiRemis(newTaxiRemis);
      setNewTaxiRemis({
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
        revision_salud: 'Vigente',
        desinfeccion_vehicular: 'Regular',
        taximetro: 'En condiciones',
        observaciones: '',
      });
      getTaxiRemises();
      setShowAddTaxiRemisFields(false); // Close the taxiRemis creation fields after adding
    } catch (error) {
      console.error('Error adding taxiRemis:', error);
    }
  };

  const deleteTaxiRemis = async (taxiRemisId: string) => {
    try {
      await axios.delete(`/api/taxiRemises/${taxiRemisId}`); // Replace with your backend API endpoint
      getTaxiRemises();
    } catch (error) {
      console.error('Error deleting taxiRemis:', error);
    }
  };

  const handlePress = (taxiRemis: any) => {
    navigation.navigate('taxiRemisDetalle', { taxiRemis });
  };

  useEffect(() => {
    getTaxiRemises();
  }, []); // Fetch taxiRemises on component mount

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <Button
        onPress={() => setShowAddTaxiRemisFields(!showAddTaxiRemisFields)}>
        {showAddTaxiRemisFields ? 'Cancelar' : 'Añadir TaxiRemis'}
      </Button>

      {/* Add TaxiRemis Form (conditionally rendered based on showAddTaxiRemisFields state) */}
      {showAddTaxiRemisFields && (
        <ScrollView>
          <TextInput
            label="Número de Legajo"
            value={newTaxiRemis.numero_legajo}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, numero_legajo: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Dominio del Vehículo"
            value={newTaxiRemis.dominio_vehiculo}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, dominio_vehiculo: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Número de Motor"
            value={newTaxiRemis.numero_motor}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, numero_motor: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Número de Chasis"
            value={newTaxiRemis.numero_chasis}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, numero_chasis: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Marca del Vehículo"
            value={newTaxiRemis.marca_vehiculo}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, marca_vehiculo: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Modelo del Vehículo"
            value={newTaxiRemis.modelo_vehiculo}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, modelo_vehiculo: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Nombre del Titular"
            value={newTaxiRemis.nombre_titular}
            onChangeText={value =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                nombre_titular: value,
              })
            }
            style={styles.input}
          />
          <TextInput
            label="Número de Licencia del Conductor"
            value={newTaxiRemis.numero_licencia_conductor}
            onChangeText={value =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                numero_licencia_conductor: value,
              })
            }
            style={styles.input}
          />
          <TextInput
            label="Nombre del Conductor"
            value={newTaxiRemis.nombre_conductor}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, nombre_conductor: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Póliza de Seguro"
            value={newTaxiRemis.poliza_seguro}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, poliza_seguro: value })
            }
            style={styles.input}
          />
          <Text style={styles.label}>VTV</Text>
          <Picker
            selectedValue={newTaxiRemis.vtv}
            onValueChange={itemValue =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                vtv: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Vigente" value="Vigente" />
            <Picker.Item label="Vencida" value="Vencida" />
          </Picker>
          <Text style={styles.label}>Revisión de Salud</Text>
          <Picker
            selectedValue={newTaxiRemis.revision_salud}
            onValueChange={itemValue =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                revision_salud: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Vigente" value="Vigente" />
            <Picker.Item label="Pendiente" value="Pendiente" />
          </Picker>
          <Text style={styles.label}>Desinfección Vehicular</Text>
          <Picker
            selectedValue={newTaxiRemis.desinfeccion_vehicular}
            onValueChange={itemValue =>
              setNewTaxiRemis({
                ...newTaxiRemis,
                desinfeccion_vehicular: itemValue,
              })
            }
            style={styles.picker}>
            <Picker.Item label="Regular" value="Regular" />
            <Picker.Item label="Pendiente" value="Pendiente" />
          </Picker>
          <TextInput
            label="Taxímetro"
            value={newTaxiRemis.taximetro}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, taximetro: value })
            }
            style={styles.input}
          />
          <TextInput
            label="Observaciones"
            value={newTaxiRemis.observaciones}
            onChangeText={value =>
              setNewTaxiRemis({ ...newTaxiRemis, observaciones: value })
            }
            style={styles.input}
          />
          {/* Add more fields as needed */}
          <Button mode="contained" onPress={() => addTaxiRemis()} style={{
            marginBottom: 100,
          }}>
            Guardar
          </Button>
        </ScrollView>
      )}

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />

      {taxiRemises.length === 0 && !showAddTaxiRemisFields && (
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

      {/* TaxiRemis List */}
      {!showAddTaxiRemisFields && taxiRemises.length > 0 && (
        <View style={{ marginTop: 16 }}>
          <FlatList
            data={taxiRemises}
            keyExtractor={taxiRemis => taxiRemis._id}
            renderItem={({ item: taxiRemis }) => (
              <TouchableOpacity onPress={() => handlePress(taxiRemis)}>
                <Card style={styles.card}>
                  <Card.Content>
                    <Title>{taxiRemis.nombre_titular}</Title>
                    <Paragraph>
                      {taxiRemis.dominio_vehiculo} - {taxiRemis.tipo_transporte}
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
  picker: {
    height: 40,
    marginBottom: 16,
    backgroundColor: 'lightgrey',
  },
});

export default TaxiRemisManagement;

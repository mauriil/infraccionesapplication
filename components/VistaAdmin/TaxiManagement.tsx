import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { getAllTaxiRemises } from '../../api/taxis';

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
      const taxiRemises = await getAllTaxiRemises();
      setTaxiRemises(taxiRemises);
    } catch (error) {
      console.error('Error fetching taxiRemises:', error);
    }
  };

  const addTaxiRemis = async () => {
    try {
      await axios.post('/api/taxiRemises', newTaxiRemis); // Replace with your backend API endpoint
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
      <Button onPress={() => setShowAddTaxiRemisFields(!showAddTaxiRemisFields)}>
        {showAddTaxiRemisFields ? 'Cancelar' : 'Añadir TaxiRemis'}
      </Button>

      {/* Add TaxiRemis Form (conditionally rendered based on showAddTaxiRemisFields state) */}
      {showAddTaxiRemisFields && (
        <View>
          <TextInput
            label="Número de Legajo"
            value={newTaxiRemis.numero_legajo}
            onChangeText={(value) => setNewTaxiRemis({ ...newTaxiRemis, numero_legajo: value })}
            style={styles.input}
          />
          <TextInput
            label="Dominio del Vehículo"
            value={newTaxiRemis.dominio_vehiculo}
            onChangeText={(value) => setNewTaxiRemis({ ...newTaxiRemis, dominio_vehiculo: value })}
            style={styles.input}
          />
          <TextInput
            label="Número de Motor"
            value={newTaxiRemis.numero_motor}
            onChangeText={(value) => setNewTaxiRemis({ ...newTaxiRemis, numero_motor: value })}
            style={styles.input}
          />
          {/* Add more fields as needed */}
          <Button mode="contained" onPress={() => addTaxiRemis()}>
            Guardar
          </Button>
        </View>
      )}

      <View style={{ borderBottomColor: 'black', borderBottomWidth: 1 }} />

      {(taxiRemis.length === 0 && !showAddTaxiRemisFields) && <Text style={{
        textAlign: 'center',
        marginTop: 16,
        fontSize: 16,
        fontWeight: 'bold',
      }}>No hay Taxis-Remises</Text>}

      {/* TaxiRemis List */}
      <View style={{ marginTop: 16 }}>
        <FlatList
          data={taxiRemises}
          keyExtractor={(taxiRemis) => taxiRemis._id}
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

export default TaxiRemisManagement;

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Button, Card, Paragraph, TextInput, Title } from 'react-native-paper';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getAllNomencladores } from '../../api/nomencladores';

const UnidadFija: React.FC = () => {
  const navigation = useNavigation();
  const [UnidadFija, setUnidadFija] = useState([]);
  const [newUnidadFija, setNewUnidadFija] = useState({
    fecha_actualizacion: '',
    valor: 0,
  });

  const getUnidadFija = async () => {
    try {
      const response = await getAllNomencladores();
      setUnidadFija(response);
    } catch (error) {
      console.error('Error fetching UnidadFija:', error);
    }
  };

  const addUnidadFija = async () => {
    try {
      await axios.post('/api/UnidadFija', newUnidadFija); // Replace with your backend API endpoint
      setNewUnidadFija({ fecha_actualizacion: '', valor: 0 });
      getUnidadFija();
    } catch (error) {
      console.error('Error adding UnidadFija:', error);
    }
  };

  useEffect(() => {
    getUnidadFija();
  }, []); // Fetch UnidadFija on component mount

  return (
    <View style={styles.container}>
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Última actualización: {newUnidadFija.fecha_actualizacion}
        </Text>

        <TextInput
          label="valor"
          value={newUnidadFija.valor}
          keyboardType="number-pad"
          onChangeText={value =>
            setNewUnidadFija({ ...newUnidadFija, valor: value })
          }
          style={styles.input}
        />
        <Button mode="contained" onPress={() => addUnidadFija()}>
          Guardar
        </Button>
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

export default UnidadFija;

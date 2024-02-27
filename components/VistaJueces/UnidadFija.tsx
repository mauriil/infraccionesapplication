import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Alert} from 'react-native';
import {Button, Card, Paragraph, TextInput, Title} from 'react-native-paper';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {getAllNomencladores} from '../../api/nomencladores';
import {getCombustible, updateCombustible} from '../../api/combustible';
import Spinner from 'react-native-loading-spinner-overlay';

const UnidadFija: React.FC = () => {
  const navigation = useNavigation();
  const [UnidadFija, setUnidadFija] = useState([]);
  const [loading, setLoading] = useState(false);

  const getUnidadFija = async () => {
    try {
      setLoading(true);
      const response = await getCombustible();
      console.log("🚀 ~ getUnidadFija ~ response:", response)
      setUnidadFija(response[0]);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching UnidadFija:', error);
      setLoading(false);
    }
  };

  const addUnidadFija = async () => {
    try {
      if (!checkErrors()) {
        return;
      }
      setLoading(true);
      await updateCombustible(UnidadFija);
      setLoading(false);
      getUnidadFija();
    } catch (error) {
      console.error('Error adding UnidadFija:', error);
    }
  };

  const checkErrors = () => {
    if (UnidadFija.valor < 0 || UnidadFija.valor === 0) {
      Alert.alert(
        'Atención',
        'El valor de las unidades de valor no puede ser 0 o negativo',
        [{text: 'OK'}],
      );
      return false;
    }
    return true;
  };

  const formatDate = (date: string) => {
    const hour = date.split(',')[1];
    const day = date.split(',')[0];

    const UTC_3 = parseInt(hour.split(':')[0]) - 3;

    return day + ',' + hour.replace(hour.split(':')[0], UTC_3.toString());
  };

  useEffect(() => {
    getUnidadFija();
  }, []); // Fetch UnidadFija on component mount

  return (
    <View style={styles.container}>
      {loading && (
        <Spinner
          visible={loading}
          textContent="Cargando"
          textStyle={{
            color: 'white',
          }}
        />
      )}
      <View>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 24,
            marginBottom: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          Última actualización: {UnidadFija.fecha_actualizacion && formatDate(UnidadFija.fecha_actualizacion)}
        </Text>

        <TextInput
          label="valor"
          value={UnidadFija.valor && UnidadFija.valor.toString()}
          keyboardType="number-pad"
          onChangeText={value => setUnidadFija({...UnidadFija, valor: parseFloat(value)})}
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

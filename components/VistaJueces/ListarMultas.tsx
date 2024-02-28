import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {
  Button,
  Card,
  Title,
  Paragraph,
  DatePick,
  TextInput,
} from 'react-native-paper';
import DatePicker from '@react-native-community/datetimepicker';
import {listaInfracciones} from '../../api/infracciones';
import Spinner from 'react-native-loading-spinner-overlay';
import {padStart} from 'lodash';

const ListarMultasVistaJuez = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const [historialMultas, setHistorialMultas] = useState([]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [infractionNumber, setInfractionNumber] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleMultaPress = multa => {
    // Navigate to DetalleMultaScreen with the selected multa details
    navigation.navigate('DetalleMultaParaJuezScreen', {multa});
  };

  const requestMultas = async () => {
    setLoading(true);
    const multas = await listaInfracciones();
    setHistorialMultas(multas);
    setLoading(false);
  };

  useEffect(() => {
    requestMultas();
  }, []);

  const formatDate = date => {
    date = new Date(date);
    const day = date.getDate();
    const month = padStart((date.getMonth() + 1).toString(), 2, '0');
    const year = date.getFullYear();

    const hours = padStart(date.getHours().toString(), 2, '0');
    const minutes = padStart(date.getMinutes().toString(), 2, '0');
    return `${year}-${month}-${day}  ${hours}:${minutes}`;
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleMultaPress(item)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{formatDate(item.createdAt)}</Title>
          <Paragraph>{item.numero_infraccion}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Spinner
        visible={loading}
        textContent={'Cargando...'}
        textStyle={{color: '#FFF'}}
      />

      <View style={styles.filtersContainer}>
        <View style={styles.filterItem}>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <Text>Fecha Desde:</Text>
            <Text>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DatePicker
              value={startDate}
              onChange={(event, date) => {
                setStartDate(date || startDate);
                setShowStartDatePicker(false);
              }}
              mode="date"
              style={{width: 320, backgroundColor: 'white'}}
            />
          )}
        </View>
        <View style={styles.filterItem}>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <Text>Fecha Hasta:</Text>
            <Text>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DatePicker
              value={endDate}
              onChange={(event, date) => {
                setEndDate(date || endDate);
                setShowEndDatePicker(false);
              }}
              mode="date"
              style={{width: 200, borderWidth: 1, padding: 8, height: 40}}
            />
          )}
        </View>
      </View>
      <View style={styles.filtersContainer}>
        <View style={styles.filterItem}>
          <Text>Nro. Multa:</Text>
          <TextInput
            value={infractionNumber}
            onChangeText={text => setInfractionNumber(text)}
            placeholder="Ingrese el número de multa"
            keyboardType="numeric"
            style={{width: '100%', borderWidth: 1, padding: 8}}
          />
        </View>
      </View>

      {historialMultas.length > 0 ? (
        <FlatList
          data={historialMultas}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>No hay multas en el historial.</Text>
      )}
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
  filtersContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  filterItem: {
    flex: 1,
    marginRight: 8,
  },
});

export default ListarMultasVistaJuez;

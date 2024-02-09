import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
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

const ListarMultasVistaJuez = () => {
  const navigation = useNavigation();

  const [historialMultas, setHistorialMultas] = useState([
    // Your historical violations data here
    {id: '1', date: '2022-02-01 (435)', description: 'Exceso de velocidad'},
    {
      id: '2',
      date: '2022-01-15 (436)',
      description: 'Estacionamiento prohibido',
    },
    // Add more historical violations as needed
  ]);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [infractionNumber, setInfractionNumber] = useState('');
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleMultaPress = multa => {
    // Navigate to DetalleMultaScreen with the selected multa details
    navigation.navigate('DetalleMultaParaJuezScreen', {multa});
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleMultaPress(item)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.date}</Title>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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

      <Button mode="contained" onPress={() => console.log('View more')}>
        Cargar Más
      </Button>
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

import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {TouchableOpacity, FlatList} from 'react-native-gesture-handler';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import { listaInfracciones } from '../../api/infracciones';

const HistorialMultasScreen = () => {
  const navigation = useNavigation();

  const [historialMultas, setHistorialMultas] = useState([]);

  const handleMultaPress = multa => {
    // Navigate to DetalleMultaScreen with the selected multa details
    navigation.navigate('DetalleMultaScreen', {multa});
  };

  const formatISODate = date => {
    const options = {year: 'numeric', month: 'long', day: 'numeric'};
    return new Date(date).toLocaleDateString('es-ES', options);
  }

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => handleMultaPress(item)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{formatISODate(item.createdAt)}</Title>
          <Paragraph>{item.dominio} - {item.nombre_conductor} - {item.estado}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  const fetchHistorialMultas = async () => {
    const multas = await listaInfracciones(global.loggedUser.user.id);
    setHistorialMultas(multas);
  };

  useEffect(() => {
    fetchHistorialMultas();
  }, []);

  return (
    <View style={styles.container}>
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
});

export default HistorialMultasScreen;

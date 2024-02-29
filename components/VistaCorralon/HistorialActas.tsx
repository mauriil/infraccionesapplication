import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import { getAllActas } from '../../api/actas';

const HistorialActasScreen = () => {
  const navigation = useNavigation();

  const [historialActas, setHistorialActas] = useState([]);

  const fetchActas = async () => {
    const response = await getAllActas();
    setHistorialActas(response);
  };

  useEffect(() => {
    fetchActas();
  }, []);

  const handleActaPress = (acta) => {
    navigation.navigate('DetalleActaScreen', { acta });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleActaPress(item)}>
      <Card style={styles.card}>
        <Card.Content>
          <Title>{item.fecha_recepcion}</Title>
          <Paragraph>Nro Infraccion: {item.infraccion.numero_infraccion}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {historialActas.length > 0 ? (
        <FlatList
          data={historialActas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      ) : (
        <Text>No hay Actas en el historial.</Text>
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
});

export default HistorialActasScreen;

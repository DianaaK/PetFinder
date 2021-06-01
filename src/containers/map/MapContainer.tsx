import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { colors, statusBarHeight } from '../../styles';
import { HeaderComponent } from '../general';
import { data } from '../list/ListContainer';
import GeneralMapComponent from './components/GeneralMapComponent';

export default function MapContainer(props: any) {
  const route: any = useRoute();

  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 44.4268, longitude: 26.1025 });
  const [positionPending, setPositionPending] = useState(true);

  useEffect(() => {
    const forPet = route.params.forPet;
    const petReport = route.params.petReport;
    if (!forPet) {
      Geolocation.getCurrentPosition(
        getCurrentPositionSuccess,
        setInitialPosition,
        { timeout: 3000 }
      );
    } else {
      const petPosition = {
        latitude: petReport.coordinates.latitude,
        longitude: petReport.coordinates.longitude
      };
      setPosition(petPosition);
      setPositionPending(false);
    }
  }, []);

  const getCurrentPositionSuccess = (position: any) => {
    const myPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    setPosition(myPosition);
    setPositionPending(false);
  };

  const setInitialPosition = (coordinates: any) => {
    if (coordinates && coordinates.length === 2) {
      const myPosition = {
        latitude: coordinates[1],
        longitude: coordinates[0]
      };
      setPosition(myPosition);
    }
    setPositionPending(false);
  };

  const onBack = () => {
    props.navigation.goBack();
  };

  const toggleFilters = () => {};

  const reportList = data;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.mainColor}
        barStyle="light-content"
        translucent
      />
      <HeaderComponent
        title="Map"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
        rightButtonAction={toggleFilters}
        rightButtonIcon={{
          type: 'MaterialIcons',
          name: 'filter-list'
        }}
      />
      <GeneralMapComponent
        data={reportList}
        position={position}
        positionPending={positionPending}
        forPet={route.params.forPet}
        petReport={route.params.petReport}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1
  }
});

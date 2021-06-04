import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { colors, statusBarHeight } from '../../styles';
import { HeaderComponent } from '../general';
import { data, petLocationsList } from '../list/ListContainer';
import GeneralMapComponent from './components/GeneralMapComponent';
import PetMapComponent from './components/PetMapComponent';

export default function MapContainer(props: any) {
  const route: any = useRoute();

  const [position, setPosition] = useState<{
    latitude: number;
    longitude: number;
  }>({ latitude: 44.4268, longitude: 26.1025 });
  const [positionPending, setPositionPending] = useState(true);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      getCurrentPositionSuccess,
      setInitialPosition,
      { timeout: 3000 }
    );
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

  const saveLocation = () => {};

  const reportList = data;
  const petLocations = petLocationsList;
  const petMap = route.params.forPet;
  const viewMode = route.params.viewMode;

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={colors.mainColor}
        barStyle="light-content"
        translucent
      />
      <HeaderComponent
        title={
          petMap
            ? `${route.params.petReport.name}'s Location`
            : viewMode
            ? 'Map'
            : 'Choose a location'
        }
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
        rightButtonAction={
          petMap ? undefined : viewMode ? toggleFilters : saveLocation
        }
        rightButtonIcon={
          petMap
            ? undefined
            : viewMode
            ? {
                type: 'MaterialIcons',
                name: 'filter-list'
              }
            : {
                type: 'MaterialIcons',
                name: 'done'
              }
        }
      />
      {petMap ? (
        <PetMapComponent
          reportedLocations={petLocations}
          position={route.params.petReport.coordinates}
          positionPending={positionPending}
          petReport={route.params.petReport}
        />
      ) : (
        <GeneralMapComponent
          viewMode={viewMode}
          data={reportList}
          position={position}
          positionPending={positionPending}
          petReport={route.params.petReport}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    flex: 1
  }
});

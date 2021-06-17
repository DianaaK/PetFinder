import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { MAP_TYPES, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { CoordinatesDTO } from '../../redux/types';
import { colors, DEVICE_HEIGHT, DEVICE_WIDTH } from '../../styles';
import {
  getAddressFromCoordinates,
  getCoordinatesFromAddress
} from '../../utils';
import { HeaderComponent, IconComponent } from '../general';

const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

interface IProps {
  navigation: any;
}

export default function AddMarkerContainer(props: IProps) {
  const route: any = useRoute();
  const initialCoordinates =
    route.params?.initialCoordinates || new CoordinatesDTO();
  const editMode = route.params?.editMode;
  const savedCoordinates = useRef(new CoordinatesDTO());
  const [position, setPosition] = useState<CoordinatesDTO>(
    new CoordinatesDTO()
  );
  const [positionPending, setPositionPending] = useState(true);
  const [address, setAddress] = useState('');
  const [currentMarkerPosition, setCurrentMarkerPosition] =
    useState<CoordinatesDTO>(initialCoordinates);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      getCurrentPositionSuccess,
      setDefaultPosition,
      { timeout: 3000 }
    );
  }, []);

  const getCurrentPositionSuccess = (position: any) => {
    const myPosition = {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
    setPosition(myPosition);
    if (!editMode) {
      setCurrentMarkerPosition(myPosition);
    }
    setPositionPending(false);
  };

  const setDefaultPosition = (coordinates: any) => {
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

  const saveLocation = () => {
    props.navigation.navigate({
      name: 'Add',
      params: { address: address, coordinates: savedCoordinates.current }
    });
  };

  const setMarkerPosition = async (event: any) => {
    event.persist();
    const coords = event.nativeEvent.coordinate;
    savedCoordinates.current = coords;
    setCurrentMarkerPosition({
      latitude: coords.latitude,
      longitude: coords.longitude
    });
    getAddressFromCoordinates(coords.latitude, coords.longitude)
      .then((result: any) => {
        const address = result.formatted_address;
        setAddress(address || '');
      })
      .catch((error) => console.warn(error));
  };

  const searchAddress = async () => {
    Keyboard.dismiss();
    getCoordinatesFromAddress(address)
      .then((result: any) => {
        const coords = result.geometry?.location;
        const address = result.formatted_address;
        setAddress(address || '');
        setCurrentMarkerPosition({
          latitude: coords.lat,
          longitude: coords.lng
        });
        savedCoordinates.current = {
          latitude: coords.lat,
          longitude: coords.lng
        };
      })
      .catch((error) => console.warn(error));
  };

  const user = {
    provider: PROVIDER_GOOGLE,
    mapType: MAP_TYPES.STANDARD
  };

  return (
    <View style={styles.container}>
      <HeaderComponent
        title="Choose a location"
        leftButtonAction={onBack}
        leftButtonIcon={{
          type: 'MaterialIcons',
          name: 'arrow-back'
        }}
        rightButtonAction={saveLocation}
        rightButtonIcon={{
          type: 'MaterialIcons',
          name: 'done'
        }}
      />
      {positionPending ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.mainColorLight} />
        </View>
      ) : (
        <>
          <MapView
            provider={user.provider}
            mapType={user.mapType}
            style={styles.map}
            initialRegion={{
              ...position,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA
            }}
            showsUserLocation={true}
            loadingEnabled={true}>
            <Marker
              draggable
              coordinate={currentMarkerPosition}
              onDragEnd={setMarkerPosition}
              pinColor="green"
            />
          </MapView>
          <View style={styles.addressInputContainer}>
            <TextInput
              placeholder={'Write an address'}
              value={address}
              onChangeText={setAddress}
              style={styles.addressInput}
            />
            <TouchableOpacity
              style={styles.sendAddressButton}
              onPress={searchAddress}>
              <IconComponent type="Ionicons" name="send" style={styles.icon} />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1
  },
  addressInputContainer: {
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 0,
    marginHorizontal: '10%',
    marginBottom: 10
  },
  addressInput: {
    backgroundColor: colors.mainColorLight,
    width: '90%'
  },
  sendAddressButton: {
    left: -4,
    width: 50,
    backgroundColor: colors.mainColorLight2,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 20,
    color: 'white'
  },
  loadingContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center'
  }
});

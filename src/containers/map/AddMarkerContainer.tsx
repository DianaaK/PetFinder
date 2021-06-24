import { useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import MapView, { MAP_TYPES, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Toast from 'react-native-toast-message';
import { CoordinatesDTO } from '../../redux/types';
import { colors, DEVICE_HEIGHT, DEVICE_WIDTH } from '../../styles';
import {
  getAddressFromCoordinates,
  getCoordinatesFromAddress
} from '../../utils';
import { HeaderComponent, IconComponent } from '../general';
import { mapStyles } from './components/styles';

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
      { timeout: 4000 }
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
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'We could not find any results for this location!',
          visibilityTime: 1000
        });
      });
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
      .catch(() => {
        Toast.show({
          type: 'error',
          text1: 'We could not find any results for this location!',
          visibilityTime: 1000
        });
      });
  };

  const user = {
    provider: PROVIDER_GOOGLE,
    mapType: MAP_TYPES.STANDARD
  };

  return (
    <View style={mapStyles.container}>
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
        <View style={mapStyles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.mainColorLight} />
        </View>
      ) : (
        <>
          <MapView
            provider={user.provider}
            mapType={user.mapType}
            style={mapStyles.map}
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
          <View style={mapStyles.addressInputContainer}>
            <TextInput
              placeholder={'Write an address'}
              value={address}
              onChangeText={setAddress}
              style={mapStyles.addressInput}
            />
            <TouchableOpacity
              style={mapStyles.sendAddressButton}
              onPress={searchAddress}>
              <IconComponent
                type="Ionicons"
                name="send"
                style={mapStyles.icon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, MAP_TYPES } from 'react-native-maps';
import { TextInput } from 'react-native-paper';
import { PetReportDTO, ReportType } from '../../../redux/types';
import { colors, DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../styles';
import { getCoordinatesFromAddress } from '../../../utils';
import { IconComponent } from '../../general';
import { ListItemComponent } from '../../list/components';

interface IProps {
  viewMode: boolean;
  data: PetReportDTO[];
  position: {
    latitude: number;
    longitude: number;
  };
  positionPending: boolean;
  petReport?: PetReportDTO;
}

const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function GeneralMap(props: IProps) {
  let previewBottom = new Animated.Value(-200);
  const navigation = useNavigation();
  const [showPreviewCard, setShowPreviewCard] = useState<boolean>(false);
  const [pet, setPet] = useState<PetReportDTO | null>(null);
  const [currentMarkerPosition, setCurrentMarkerPosition] = useState({
    latitude: 0,
    longitude: 0
  });
  const [address, setAddress] = useState('');

  useEffect(() => {
    setCurrentMarkerPosition(props.position);
  }, []);

  useEffect(() => {
    if (showPreviewCard && pet) {
      showPreview();
    }
  }, [showPreviewCard, pet]);

  const showPreview = () => {
    Animated.timing(previewBottom, {
      duration: 300,
      toValue: 40,
      useNativeDriver: false
    }).start();
  };

  const hidePreview = () => {
    Animated.timing(previewBottom, {
      duration: 300,
      toValue: -200,
      useNativeDriver: false
    }).start(() => {
      setPet(null);
      setShowPreviewCard(false);
    });
  };

  const redirectToPet = (_id: string) => {
    navigation.navigate('Details', { itemId: _id, canNavigate: false });
  };

  const renderPetMarker = (item: PetReportDTO) => (
    <Marker
      key={item._id}
      coordinate={item.coordinates}
      pinColor={item.type === ReportType.LOST ? 'tomato' : 'turquoise'}
      tracksViewChanges={false}
      onPress={onMarkerPress(item)}
    />
  );

  const onPressMap = () => {
    if (showPreviewCard && pet) {
      hidePreview();
    }
  };

  const onMarkerPress = (item: PetReportDTO) => (event: any) => {
    if (item !== pet) {
      setPet(item);
      setShowPreviewCard(true);
      event.stopPropagation();
    }
  };

  const setMarkerPosition = (event: any) => {
    setCurrentMarkerPosition(event.nativeEvent.coordinate);
  };

  const onSearchAddress = async () => {
    getCoordinatesFromAddress(address)
      .then((result: any) => {
        const coords = result.geometry?.location;
        const address = result.formatted_address;
        setCurrentMarkerPosition({
          latitude: coords.lat,
          longitude: coords.lng
        });
        setAddress(address);
      })
      .catch((error) => console.warn(error));
  };

  const user = {
    provider: PROVIDER_GOOGLE,
    mapType: MAP_TYPES.STANDARD
  };
  return (
    <View style={{ flex: 1 }}>
      {props.positionPending ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          provider={user.provider}
          mapType={user.mapType}
          style={styles.map}
          initialRegion={{
            ...props.position,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          showsUserLocation={true}
          loadingEnabled={true}
          rotateEnabled={true}
          onPress={onPressMap}>
          {props.viewMode && props.data.map((item) => renderPetMarker(item))}
          {!props.viewMode && (
            <Marker
              coordinate={currentMarkerPosition}
              draggable
              onDragEnd={setMarkerPosition}
            />
          )}
        </MapView>
      )}
      {props.viewMode && showPreviewCard && pet && (
        <>
          <Animated.View style={[styles.preview, { bottom: previewBottom }]}>
            <ListItemComponent item={pet} onPress={redirectToPet} />
          </Animated.View>
        </>
      )}
      {!props.viewMode && (
        <View style={styles.addressInputContainer}>
          <TextInput
            placeholder={'Write an address'}
            value={address}
            onChangeText={setAddress}
            style={styles.addressInput}
          />
          <TouchableOpacity
            style={styles.sendAddressButton}
            onPress={onSearchAddress}>
            <IconComponent type="Ionicons" name="send" style={styles.icon} />
          </TouchableOpacity>
        </View>
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
  preview: {
    position: 'absolute',
    width: '100%',
    height: 180
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
    backgroundColor: colors.mainColor2,
    width: '90%'
  },
  sendAddressButton: {
    left: -4,
    width: 50,
    backgroundColor: colors.mainColor,
    justifyContent: 'center'
  },
  icon: {
    fontSize: 20,
    color: 'white'
  }
});

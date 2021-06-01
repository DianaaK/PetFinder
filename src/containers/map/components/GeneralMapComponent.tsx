import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, ActivityIndicator } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { PetReportDTO, ReportType } from '../../../redux/types';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../../styles';
import { ListItemComponent } from '../../list/components';

interface IProps {
  data: PetReportDTO[];
  position: any;
  positionPending: boolean;
  forPet?: boolean;
  petReport?: PetReportDTO;
}

const ASPECT_RATIO = DEVICE_WIDTH / DEVICE_HEIGHT;
const LATITUDE_DELTA = 0.007;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default function GeneralMap(props: IProps) {
  let previewBottom = new Animated.Value(-200);
  let map: MapView | null = null;
  const navigation = useNavigation();
  const [preview, setPreview] = useState<boolean>(false);
  const [pet, setPet] = useState<PetReportDTO | null>(null);

  useEffect(() => {
    if (props.forPet && props.petReport) {
      setPet(props.petReport);
      setPreview(true);
    }
  }, []);

  useEffect(() => {
    if (preview && pet) {
      showPreview();
    }
  }, [preview, pet]);

  const renderPetMarker = (item: PetReportDTO) => (
    <Marker
      key={item._id}
      coordinate={item.coordinates}
      pinColor={item.type === ReportType.LOST ? 'tomato' : 'turquoise'}
      onPress={onMarkerPress(item)}
    />
  );

  const onPressMap = () => {
    if (preview && pet) {
      hidePreview();
    }
  };

  const onMarkerPress = (item: PetReportDTO) => (event: any) => {
    if (item !== pet) {
      const coordinates = item.coordinates || { coordinates: [0, 0] };
      map?.animateCamera({
        center: coordinates,
        heading: 0,
        pitch: 0
      });
      setPet(item);
      setPreview(true);
      event.stopPropagation();
    }
  };

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
      setPreview(false);
    });
  };

  const redirectToPet = (_id: string) => {
    navigation.navigate('Details', { itemId: _id });
  };

  return (
    <View style={{ flex: 1 }}>
      {props.positionPending ? (
        <ActivityIndicator size="large" />
      ) : (
        <MapView
          ref={(mapRef) => {
            map = mapRef;
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            ...props.position,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
          showsUserLocation={true}
          showsMyLocationButton={true}
          followsUserLocation={true}
          loadingEnabled={true}
          rotateEnabled={true}
          onPress={onPressMap}>
          {props.data.map((item) => renderPetMarker(item))}
        </MapView>
      )}
      {preview && pet && (
        <Animated.View style={[styles.preview, { bottom: previewBottom }]}>
          <ListItemComponent item={pet} onPress={redirectToPet} />
        </Animated.View>
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
  }
});

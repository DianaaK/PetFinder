import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { colors, DEVICE_HEIGHT, isIOS, statusBarHeight } from '../../../styles';
import { IconComponent } from '../../general';
import { assets } from '../../../../assets/images';
import { SliderBox } from '../../general/GallerySlider';
import { PetReportDTO } from '../../../redux/types';

interface IProps {
  item: PetReportDTO;
  isFavorite: boolean;
  isUserOwner: boolean;
  toggleIsFavorite(isFavorite: boolean): any;
}

const PetHeaderComponent = (props: IProps) => {
  const navigation = useNavigation();
  const gradientColors = [
    'rgba(0, 0, 0, 0.7)',
    'rgba(0, 0, 0, 0.4)',
    'rgba(0, 0, 0, 0.2)',
    'rgba(0, 0, 0, 0.15)',
    'rgba(0, 0, 0, 0.1)',
    'rgba(0, 0, 0, 0)'
  ];
  const gradientLocations = [0.1, 0.4, 0.7, 0.8, 0.85, 1];
  return (
    <>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <View style={styles.contaier}>
        <View style={styles.header}>
          <LinearGradient
            colors={gradientColors}
            locations={gradientLocations}
            style={styles.linearGradient}
          />
          <TouchableOpacity
            style={{ paddingVertical: isIOS ? 20 : 8, paddingHorizontal: 12 }}
            onPress={() => {
              navigation.canGoBack() && navigation.goBack();
            }}>
            <IconComponent
              type="MaterialIcons"
              name="arrow-back"
              style={styles.icon}
            />
          </TouchableOpacity>
          {!props.isUserOwner && (
            <TouchableOpacity
              style={{ paddingVertical: 8, paddingHorizontal: 12 }}
              onPress={() => {
                props.toggleIsFavorite(!props.isFavorite);
              }}>
              <IconComponent
                type="Ionicons"
                name="md-heart"
                style={[
                  styles.icon,
                  {
                    fontSize: 30,
                    color: props.isFavorite ? colors.red : colors.mainColorLight
                  }
                ]}
              />
            </TouchableOpacity>
          )}
        </View>
        {props.item.media?.length ? (
          <SliderBox
            images={props.item.media}
            imageComponentStyle={styles.image}
            imageLoadingColor={colors.mainColor}
            customDotColor={colors.mainColor}
            customInactiveDotColor={colors.mainColorLight3}
          />
        ) : (
          <Image source={assets.placeholder} style={styles.image} />
        )}
      </View>
    </>
  );
};

export default PetHeaderComponent;

const styles = StyleSheet.create({
  contaier: {
    height: DEVICE_HEIGHT / 2
  },
  header: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: statusBarHeight,
    zIndex: 2
  },
  linearGradient: {
    position: 'absolute',
    top: -5,
    width: '100%',
    height: statusBarHeight * 3.2
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  icon: {
    color: colors.lightGray,
    padding: 8,
    fontSize: 26
  }
});

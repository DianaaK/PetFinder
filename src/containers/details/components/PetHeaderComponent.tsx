import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StatusBar, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { colors, DEVICE_HEIGHT } from '../../../styles';
import { IconComponent } from '../../general';
import { assets } from '../../../../assets/images';
import { SliderBox } from '../../general/GallerySlider';

export default function PetHeaderComponent(props: any) {
  const navigation = useNavigation();
  const gradientColors = [
    'rgba(0, 0, 0, 0.7)',
    'rgba(0, 0, 0, 0.5)',
    'rgba(0, 0, 0, 0.2)',
    'rgba(0, 0, 0, 0.0)'
  ];
  const gradientLocations = [0.1, 0.4, 0.7, 1];
  return (
    <>
      <StatusBar
        translucent
        barStyle="dark-content"
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
            style={{ paddingVertical: 8, paddingHorizontal: 12 }}
            onPress={() => {
              navigation.canGoBack() && navigation.goBack();
            }}>
            <IconComponent
              type="MaterialIcons"
              name="arrow-back"
              style={styles.icon}
            />
          </TouchableOpacity>
          {props.canNavigate && !props.isUserOwner && (
            <TouchableOpacity
              style={{ paddingVertical: 8, paddingHorizontal: 12 }}
              onPress={() => {}}>
              <IconComponent
                type="Ionicons"
                name="md-heart"
                style={[
                  styles.icon,
                  {
                    fontSize: 30,
                    color: props.item.isFavorite
                      ? colors.red
                      : colors.mainColorLight
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
}

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
    zIndex: 2
  },
  linearGradient: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover'
  },
  icon: {
    color: colors.mainColorLight,
    padding: 8,
    fontSize: 26
  }
});

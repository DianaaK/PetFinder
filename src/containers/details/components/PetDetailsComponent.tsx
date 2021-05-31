import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { assets } from '../../../../assets/images';
import { ReportType } from '../../../redux/types';
import { colors, fonts } from '../../../styles';
import { IconComponent, TextComponent } from '../../general';

export default function PetDetailsComponent(props: any) {
  const pet = props.item;

  return (
    <View style={styles.container}>
      <TextComponent style={styles.description}>
        {pet.description}
      </TextComponent>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20
        }}>
        <View style={{ flex: 1, paddingLeft: 8, paddingVertical: 4 }}>
          <View style={styles.rowContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {pet.user.image ? (
                <Image
                  source={{ uri: pet.user.image || '' }}
                  style={styles.image}
                />
              ) : (
                <Image
                  source={assets.placeholder}
                  style={styles.image}
                  resizeMode="cover"
                />
              )}
              <TextComponent style={styles.username}>
                {pet.user.firstname}
              </TextComponent>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <IconComponent
                type="MaterialIcons"
                name="calendar-today"
                style={styles.icon}
              />
              <TextComponent style={styles.date}>{pet.date}</TextComponent>
            </View>
          </View>
          <TextComponent style={styles.userType}>
            {pet.type === ReportType.LOST ? 'Owner' : 'Rescuer'}
          </TextComponent>
          {pet.user.email && (
            <TextComponent style={styles.userType}>
              Mail: {pet.user.email}
            </TextComponent>
          )}
          {pet.user.phone && (
            <TextComponent style={styles.userType}>
              Phone: {pet.user.phone}
            </TextComponent>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  description: {
    color: colors.mainColor4,
    lineHeight: 20,
    fontFamily: fonts.secondFont
  },
  username: {
    fontSize: 16,
    color: colors.mainColor2,
    fontFamily: fonts.mainFont
  },
  userType: {
    marginLeft: 38,
    fontSize: 13,
    color: colors.mainColor4,
    fontFamily: fonts.secondFont
  },
  date: {
    fontSize: 14,
    color: colors.mainColor2,
    fontFamily: fonts.mainFont
  },
  icon: {
    color: colors.mainColor5,
    paddingRight: 5,
    fontSize: 12
  },
  image: {
    height: 30,
    width: 30,
    borderRadius: 20,
    marginRight: 8
  }
});

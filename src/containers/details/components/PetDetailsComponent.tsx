import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextComponent } from '../../general';

export default function PetDetailsComponent(props: any) {
  const pet = props.item;

  return (
    <View style={styles.ownerSectionContainer}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 20
        }}>
        <View
          style={{
            height: 45,
            width: 45,
            backgroundColor: '#bfcbce',
            borderRadius: 23
          }}
        />
        <View style={{ flex: 1, paddingLeft: 8, paddingVertical: 4 }}>
          <View style={{ flex: 1, flexDirection: 'row' }}>
            <TextComponent
              style={{ flex: 1, color: '#636363', fontWeight: '700' }}>
              Maya Berkovskaya
            </TextComponent>
            <TextComponent style={{ color: '#a3a3a3' }}>
              May 25, 2019
            </TextComponent>
          </View>
          <TextComponent style={{ color: '#a3a3a3' }}>Owner</TextComponent>
        </View>
      </View>

      <TextComponent
        style={{ color: '#969696', fontWeight: '500', lineHeight: 20 }}>
        My job requires moving to another country. I dont have the opportunity
        to take cat with me. I am looking for good people who will shelter my{' '}
        {pet.name}. My job requires moving to another country. I dont have the
        opportunity to take cat with me. I am looking for good people who will
        shelter my {pet.name}. My job requires moving to another country. I dont
        have the opportunity to take cat with me. I am looking for good people
        who will shelter my {pet.name}. My job requires moving to another
        country. I dont have the opportunity to take cat with me. I am looking
        for good people who will shelter my {pet.name}.
      </TextComponent>
    </View>
  );
}

const styles = StyleSheet.create({
  ownerSectionContainer: { flex: 1, padding: 32 }
});

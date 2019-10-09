import React, {useState} from 'react';
import {View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import {colors} from '../constants/colors';
import {SafeAreaView} from 'react-navigation';
import UIInput from '../components/UIInput';
import UIButton from '../components/UIButton';

const LoginScreen = ({navigation}) => {
  const [password, setPassword] = useState('');
  const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={{flex: 1}}
        keyboardVerticalOffset={keyboardVerticalOffset}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'flex-end',
            flex: 1,
            backgroundColor: colors.background,
          }}>
          <View
            style={{
              width: '80%',
              height: '70%',
              alignItems: 'center',
            }}>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                flex: 1,
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: '600',
                  color: colors.onBackground,
                  fontFamily: 'Montserrat-Bold',
                }}>
                Ustaw hasło do notatnika
              </Text>
              <View style={{width: '100%', marginTop: 30}}>
                <UIInput
                  color={colors.primaryVariant}
                  value={password}
                  setValue={setPassword}
                  secure
                />
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                flex: 3,
              }}>
              <UIButton color={colors.primaryVariant} label="Dalej" />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Linking } from 'react-native';
import { NavBar } from '../components/NavBar';

const TELEGRAM_GROUP_USERNAME = '@Putin_tg_Russia'

export default function About(): React.JSX.Element {
  const tgHelper = async () => {
    const tgUrl = `tg://resolve?domain=${TELEGRAM_GROUP_USERNAME}`;
    const webUrl = `https://t.me/${TELEGRAM_GROUP_USERNAME}`;

    try {
      // Проверяем, установлен ли Telegram и можно ли открыть ссылку
      const supported = await Linking.canOpenURL(tgUrl);
      if (supported) {
        await Linking.openURL(tgUrl);
      } else {
        // Если Telegram не установлен, открываем веб-ссылку
        await Linking.openURL(webUrl);
      }
    } catch (error) {
      alert('Не удалось открыть Telegram');
    }
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <Image
          source={require("../assets/images/background.jpeg")}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          blurRadius={3} // Лёгкое размытие для лучшей читаемости
        />
        <View style={styles.overlay}>
          <Text style={styles.title}>О нас</Text>
          <Text style={styles.description}>
            Добро пожаловать в наш мир кофе — место, где страсть к качеству и забота о каждом клиенте встречаются в каждой чашке.
            Мы тщательно отбираем лучшие кофейные зерна, чтобы подарить вам насыщенный, богатый вкус и аромат, который вдохновляет.
            Наша миссия — не просто продавать кофе, а создавать атмосферу уюта и вдохновения, поддерживая вас в каждом дне.
            Мы верим, что отличный кофе — это не только напиток, но и маленький ритуал счастья, который объединяет людей.
            Спасибо, что выбираете нас — вместе мы делаем мир вкуснее и добрее.
          </Text>
          <Text style={styles.helperBlock} onPress={tgHelper}>Поддержка</Text>
        </View>
        <NavBar />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00000080', // Тёмный полупрозрачный фон для контраста
  },
  safe: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: 'rgba(0,0,0,0.4)', // Тёмный полупрозрачный слой поверх изображения
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#F4E3D7', // Светлый теплый оттенок, гармонирует с кофейным фоном
    marginBottom: 25,
    textShadowColor: '#00000080',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  description: {
    fontSize: 18,
    color: '#F4E3D7',
    textAlign: 'center',
    lineHeight: 28,
    fontWeight: '400',
    textShadowColor: '#00000060',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  helperBlock: {
    position: 'absolute',
    bottom: 20,
    fontSize: 12,
    fontWeight: '700',
    color: '#F4E3D7', 
  }
});

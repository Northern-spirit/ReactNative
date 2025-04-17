import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';

type ScreenComponent = React.ComponentType<any>;

interface Screens {
  login: ScreenComponent;
  home: ScreenComponent;
  cart: ScreenComponent;
  productDetail: ScreenComponent;
  promotions: ScreenComponent;
  map: ScreenComponent;
  about: ScreenComponent;
}

export type RootStackParamList = {
  login: undefined;
  Home: undefined;
  Cart: undefined;
  ProductDetail: { id: string };
  Promotions: undefined;
  Map: undefined;
  About: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function Layout() {
  const [isReady, setIsReady] = useState(false);
  const [screens, setScreens] = useState<Screens>({} as Screens);

  useEffect(() => {
    async function loadScreens() {
      const [
        loginScreen,
        homeScreen,
        cartScreen,
        productDetailScreen,
        promotionsScreen,
        mapScreen,
        aboutScreen,
      ] = await Promise.all([
        import('./login'),
        import('./home'),
        import('./cart'),
        import('./product/[id]'),
        import('./promotions'),
        import('./map'),
        import('./about'),
      ]);

      setScreens({
        login: loginScreen.default,
        home: homeScreen.default,
        cart: cartScreen.default,
        productDetail: productDetailScreen.default,
        promotions: promotionsScreen.default,
        map: mapScreen.default,
        about: aboutScreen.default,
      });
      setIsReady(true);
    }

    loadScreens();
  }, []);

  if (!isReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const screenOptions: NativeStackNavigationOptions = {
    headerShown: false,
  };

  return (
      <RootStack.Navigator initialRouteName="login" screenOptions={screenOptions}>
        <RootStack.Screen name="login" component={screens.login} />
        <RootStack.Screen name="Home" component={screens.home} />
        <RootStack.Screen name="Cart" component={screens.cart} />
        <RootStack.Screen name="ProductDetail" component={screens.productDetail} />
        <RootStack.Screen name="Promotions" component={screens.promotions} />
        <RootStack.Screen name="Map" component={screens.map} />
        <RootStack.Screen name="About" component={screens.about} />
      </RootStack.Navigator>
  );
}

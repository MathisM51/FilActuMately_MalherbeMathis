import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, StyleSheet, StatusBar } from 'react-native';
import FeedScreen from './components/FeedScreen';
import AddPostScreen from './components/AddPostScreen';
import EditPostScreen from './components/EditPostScreen';
import LogoTitle from './components/LogoTitle';
import store from './redux/store';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <View style={styles.container}>
          <StatusBar 
            barStyle="light-content" 
            backgroundColor="#111216"
          />
          <Stack.Navigator initialRouteName="Feed">
            <Stack.Screen 
              name="Feed" 
              options={{ 
                headerTitle: props => <LogoTitle {...props} />,
                headerTitleAlign: 'center',
                headerStyle: {
                  backgroundColor: '#111216',
                  height: 120,
                  borderBottomWidth: 1,
                  borderBottomColor: '#ffffff',
                  elevation: 0,
                  shadowOpacity: 0,
                },
                headerTintColor: '#fff',
              }}
            >
              {props => <FeedScreen {...props} />}
            </Stack.Screen>
            <Stack.Screen 
              name="AddPost" 
              options={{ headerShown: false }}
              component={AddPostScreen}
            />
            <Stack.Screen 
              name="EditPost" 
              options={{ headerShown: false }}
              component={EditPostScreen}
            />
          </Stack.Navigator>
        </View>
      </NavigationContainer>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111216',
  },
});

export default App;

import { createStackNavigator } from '@react-navigation/stack';
import DetailsScreen from './screens/Details';
import HomeScreen from './screens/Home';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <StackNav.Navigator>
        <StackNav.Screen name='HomeS' component={HomeScreen} options={{headerShown: false}}/>
        <StackNav.Screen name='Details' component={DetailsScreen}/>
      </StackNav.Navigator>
    </NavigationContainer>
  );
}

const StackNav = createStackNavigator();
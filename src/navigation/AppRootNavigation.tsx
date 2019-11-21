import { createAppContainer, createSwitchNavigator, NavigationContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import Login from '@screens/Login/Login';
import Home from '@screens/BottomTab/Home';
import { BottomTabContainer } from "@screens/BottomTab/components/BottomTabContainer";
import Settings from "@screens/BottomTab/Settings";
import AddWorkout from '@screens/AddWorkout/AddWorkout';
import CreateExercice from '@screens/AddWorkout/components/CreateExercice';
import ViewWorkout from '@screens/ViewWorkout/ViewWorkout';

const MenuNavigaton = createBottomTabNavigator(
    {
        ['Home']: Home,
        ['Settings']: Settings,
    }, {
        tabBarComponent: BottomTabContainer
    }
);



const AppStack: NavigationContainer = createStackNavigator(
    {
        AddWorkout: AddWorkout,
        CreateExercice: CreateExercice,
        ViewWorkout:ViewWorkout,
        Main: MenuNavigaton,
    },
    {
        headerMode: 'none',
        initialRouteName: 'Main'
    }

);
const AuthStack: NavigationContainer = createStackNavigator(
    {
        Login: Login,
    },
    {
        headerMode: 'none',
    }
);


const AppNavigator = createSwitchNavigator(
    {
        //   AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        initialRouteName: 'App',//Auth
    })


const AppContainer: NavigationContainer = createAppContainer(AppNavigator);



export default AppContainer;

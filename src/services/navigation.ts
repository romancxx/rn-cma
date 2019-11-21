import { NavigationActions, StackActions } from 'react-navigation';
import { BackHandler } from 'react-native';

let _navigator: any;

function setRefNavigator(navigatorRef: any) {
    _navigator = navigatorRef;
}

function navigate(routeName: string, params?: any) {
    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params,
        }),
    );
}

function goBack(params?: any) {
    _navigator.dispatch(NavigationActions.back(params));
}



export default {
    navigate,
    setRefNavigator,
    goBack,
};

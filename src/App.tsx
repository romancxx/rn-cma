
import React from 'react';
import { IntlProvider } from "react-intl";

import { ApplicationProvider, IconRegistry } from 'react-native-ui-kitten';
import AppContainer from "@navigation/AppRootNavigation";
import { mapping, light, dark } from '@eva-design/eva';
import { IAppState } from '@states/reducer';
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "@states/store";
import NavigationService from '@services/navigation'
import { EvaIconsPack } from '@ui-kitten/eva-icons';

// ========================================================
// Internationalization
// ========================================================
const mapStateToPropsLocale = (state: IAppState) => {
  return { locale: state.settings.locale, messages: state.settings.messages };
};

const ConnectedIntlProvider = connect(mapStateToPropsLocale)(IntlProvider);


// ========================================================
// UI Kitten
// ========================================================
const mapStateToPropsTheme = (state: IAppState) => {
  return { theme: state.settings.theme };
};

const ConnectedApplicationProvider = connect(mapStateToPropsTheme)(ApplicationProvider);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedIntlProvider>
          <ConnectedApplicationProvider
            mapping={mapping}>
            <IconRegistry icons={EvaIconsPack} />
            <AppContainer
              ref={navigatorRef => {
                NavigationService.setRefNavigator(navigatorRef);
              }}
            />
          </ConnectedApplicationProvider>
        </ConnectedIntlProvider >
      </PersistGate>
    </Provider>

  );
};

export default App;

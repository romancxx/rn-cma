import React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import BottomTab  from './BottomTabComponent';

export class BottomTabContainer extends React.Component<NavigationScreenProps> {

  private onTabSelect = (index: number) => {
    const { navigation } = this.props;
    const { [index]: selectedRoute } = navigation.state.routes;

    this.props.navigation.navigate({
      routeName: selectedRoute.routeName,
    });
  };

  public render(): React.ReactNode {
    return (
      <BottomTab
        selectedIndex={this.props.navigation.state.index}
        onTabSelect={this.onTabSelect}
      />
    );
  }
}
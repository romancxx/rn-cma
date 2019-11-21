import React, { Component } from 'react'
import { BottomNavigation, BottomNavigationTab, Layout } from 'react-native-ui-kitten';
import { InjectedIntl } from 'react-intl';
import { injectIntl } from 'react-intl';

interface IState {
    selectedIndex: number;
}

interface IProps {
    selectedIndex: number;
    onTabSelect: (index: number) => void;
    intl: InjectedIntl;
}

class BottomTab extends Component<IProps, IState> {
    state: IState = {
        selectedIndex: 0
    }

    render(): React.ReactNode {
        const { selectedIndex, onTabSelect, intl } = this.props;

        return (
            <BottomNavigation
                selectedIndex={selectedIndex}
                onSelect={onTabSelect}>
                <BottomNavigationTab
                    title={intl.formatMessage({ id: "home.title" })}
                    />
                <BottomNavigationTab
                    title={intl.formatMessage({ id: "settings.title" })} />
            </BottomNavigation>
        )
    }
}
export default injectIntl(BottomTab);
import React, { Component } from 'react'
import { Layout, Text } from 'react-native-ui-kitten';
import { SafeAreaView, StyleSheet, View } from 'react-native';
// import {
//     NavigationParams,
//     NavigationScreenProp,
//     NavigationState,
// } from 'react-navigation';
import { InjectedIntl, injectIntl } from "react-intl";
import { IAppState } from '@states/reducer';
import { login } from "@states/actions/auth";
import { connect } from "react-redux";
import { IAuthState } from '@states/reducers/auth';
import SpinnerButton from '@components/SpinnerButton';
import NavigationService from '@services/navigation';

interface IProps {
    auth: IAuthState
    intl: InjectedIntl
    // navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    login(username: string, password: string): any;
}

interface IState { }

class Login extends Component<IProps, IState> {

    componentDidMount() {
        if (this.props.auth.isAuth) {
            NavigationService.navigate('Main')
        }
    }

    componentDidUpdate() {
        if (this.props.auth.isAuth) {
            NavigationService.navigate('Main')
        }
    }

    render() {
        const { intl, login, auth } = this.props;
        return (
            <Layout style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <Text category="h4">React-Native-Starter</Text>
                    <SpinnerButton
                        onPress={() => login("", "")}
                        text={intl.formatMessage({ id: "login.title" })}
                        loading={auth.loading} />
                </SafeAreaView>
            </Layout>
        )
    }
}

const mapStateToProps = (state: IAppState) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    login
};

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
});
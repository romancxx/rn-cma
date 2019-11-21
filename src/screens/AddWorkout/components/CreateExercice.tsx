import React, { Component } from 'react'
import { Layout, Text, withStyles, ThemeType, ThemedComponentProps, Button } from 'react-native-ui-kitten';
import Header from '@components/Header';
import { withFormik, FormikProps } from "formik";
import { ArrowIosBackFill } from '@assets/icons';
import {
    NavigationParams,
    NavigationScreenProp,
    NavigationState,
} from 'react-navigation';
import * as Yup from "yup";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import InputBox from '../../../components/Workout/InputBox';
import { CreateExerciceForm, CreateExerciceFormValues } from '@components/Workout/CreateExerciceForm';
import { connect } from 'react-redux';
import { IAppState } from '@states/reducer';
import { StyleSheet } from 'react-native';
import { IExerciceInfo } from '@states/reducers/workout';


interface PropsComponent {
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
    submit(id: string, data: CreateExerciceFormValues): void;
    edit?(id: string, form: CreateExerciceFormValues): void;
    id: string;
    exercice?: IExerciceInfo;
}

interface StateComponent {
    loading: boolean;
}

type Props = PropsComponent;


class CreateExercice extends Component<PropsComponent, StateComponent> {
    state: StateComponent = {
        loading: false,
    }

    onBack = () => {
        this.props.navigation.goBack();
    };

    componentDidMount() {
        const { params } = this.props.navigation.state;
        if (params && params.exercice) {
            console.log("params")
        }
    }

    onEdit = (id: string, form: CreateExerciceFormValues) => {
        const { params } = this.props.navigation.state;
        if (params && params.edit) {
            params.edit(id, form);
        }
        this.props.navigation.goBack();
    }

    onSubmit = (form: CreateExerciceFormValues) => {
        const { params } = this.props.navigation.state;
        if (params) {
            params.submit(params.id, form)
        }
        this.props.navigation.goBack();
    }

    render() {
        const { edit = undefined, exercice = undefined, navigation } = this.props;
        const { params } = navigation.state;
        const { loading } = this.state
        return (
            <Layout
                style={styles.setContainer}>
                <Header title="Create a new exercice"
                    iconLeft={ArrowIosBackFill}
                    iconLeftOnClick={this.onBack} />
                <Layout
                    style={styles.form}>
                    <CreateExerciceForm
                        onSubmit={this.onSubmit}
                        loading={loading}
                        edit={params && params.edit ? this.onEdit : undefined}
                        exercice={params && params.exercice ? params.exercice : undefined} />
                </Layout>
            </Layout>
        )
    }
}

const mapStateToProps = (state: IAppState) => ({
    // auth: state.auth
});

const mapDispatchToProps = {
    // login
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateExercice)

const styles = StyleSheet.create({
    setContainer: {
        flex: 1,
        padding: wp(6),
    },
    form: {
        marginTop: hp(4),
        alignItems: 'center',
    },
    validateButton: {
        marginTop: hp(2)
    }
});
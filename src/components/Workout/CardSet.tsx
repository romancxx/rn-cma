import React, { Component } from 'react'
import { Layout, Text, withStyles, ThemeType, ThemedComponentProps, Icon } from 'react-native-ui-kitten';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CardExercice } from './CardExercice';
import {
    List,
    ListItem,
} from 'react-native-ui-kitten';
import {
    NavigationInjectedProps, withNavigation, NavigationScreenProp, NavigationState, NavigationParams,
} from 'react-navigation';
import { ListRenderItemInfo } from 'react-native';
import { ISetInfo, IExerciceInfo } from '@states/reducers/workout';
import { CreateExerciceFormValues } from './CreateExerciceForm';
import { TextInput } from 'react-native';
import NavigationService from '@services/navigation';

interface IPropsComponent {
    setInfo: ISetInfo;
    addExercice?(id: string, data: CreateExerciceFormValues): void;
    editTitle?(id: string, value: string): void;
    editExercice?(id: string, exercice: CreateExerciceFormValues): void;
}

type IProps = ThemedComponentProps & IPropsComponent;


class CardSetComponent extends Component<IProps> {

    renderItem = (info: any) => {
        const { themedStyle, editExercice } = this.props;
        return (
            <Layout style={themedStyle.line}>
                <CardExercice
                    exerciceInfo={info.item}
                    editExercice={editExercice} />
            </Layout>
        )
    }

    addExercice = () => {
        NavigationService.navigate('CreateExercice', {
            submit: this.props.addExercice,
            id: this.props.setInfo.id
        });
    }

    render() {
        const { themedStyle, setInfo, editTitle } = this.props;
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={themedStyle.setContainer}>
                <Layout
                    style={{
                        alignItems: "center",
                        marginBottom: hp(2),
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                    {editTitle ?
                        <TextInput
                            value={setInfo.title}
                            style={themedStyle.title}
                            onChangeText={(text: string) => { editTitle(setInfo.id, text) }}
                        /> :
                        <Text style={themedStyle.title}>{setInfo.title}</Text>
                    }

                </Layout>
                <List
                    data={setInfo.exercices}
                    renderItem={this.renderItem}
                />
                {editTitle ? <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={this.addExercice}
                    style={themedStyle.addExerciceButton}>
                    <Text
                        style={{
                            marginTop: hp(1.5),
                            fontSize: hp(2),
                            fontWeight: 'bold',
                        }}>
                        Add exercice
                        </Text>
                </TouchableOpacity> : null}
            </TouchableOpacity>
        )
    }
}


export const CardSet = withStyles(CardSetComponent, (theme: ThemeType) => ({
    setContainer: {
        backgroundColor: theme['background-basic-color-1'],
        paddingVertical: hp(2),
        borderRadius: hp(2)

    },
    line: {
        borderTopColor: theme['background-basic-color-2'],
        borderTopWidth: 1.5,
    },
    addExerciceButton: {
        borderTopColor: theme['background-basic-color-2'],
        borderTopWidth: 1.5,
        justifyContent: "center",
        alignItems: "center",
        flex: 1
    },
    title: {
        color: theme['text-basic-color'],
        fontSize: hp(2.8),
        lineHeight: hp(2.8),
        fontWeight: 'bold'
    }
}));
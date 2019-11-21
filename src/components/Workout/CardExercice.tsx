import React, { Component } from 'react'
import { Layout, Text, withStyles, ThemeType, ThemedComponentProps } from 'react-native-ui-kitten';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { IExerciceInfo, InitialDuration, InitialWeight } from '@states/reducers/workout';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { CreateExerciceFormValues } from './CreateExerciceForm';
import NavigationService from '@services/navigation';

interface IPropsCard {
    exerciceInfo: IExerciceInfo
    editExercice?(id: string, form: CreateExerciceFormValues): void;
}

type IProps = ThemedComponentProps & IPropsCard;


class CardExerciceComponent extends Component<IProps> {

    editExercice = () => {
        if (this.props.editExercice) {
            NavigationService.navigate('CreateExercice', {
                edit: this.props.editExercice,
                exercice: this.props.exerciceInfo
            });
        }
    }

    renderExerciceInfo = (title: string, data: string) => {
        if (data == "") {
            return;
        }
        return (
            <Layout
                style={{
                    alignItems: "center",
                    marginTop: "4%"
                }}>
                <Text
                    style={{
                        lineHeight: 14,
                        fontWeight: "bold"
                    }}
                    category="s1"> {data} </Text>
                <Text
                    style={{ lineHeight: 14 }}
                    category="s1"> {title} </Text>
            </Layout>
        )
    }

    render() {
        const { themedStyle, exerciceInfo } = this.props;
        const {
            title,
            reps = "",
            sets = "",
            rest = InitialDuration,
            duration = InitialDuration,
            weight = InitialWeight } = exerciceInfo;
        return (
            <TouchableOpacity
                activeOpacity={0.7}
                style={themedStyle.setContainer}
                onPress={this.editExercice}>
                <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                    <Layout
                        style={{
                            flexDirection: 'column',
                        }}>
                        <Text
                            category="s1"
                            style={{ fontWeight: "bold", fontSize: 18 }}>
                            {title}
                        </Text>
                        {duration.value !== "" ?
                            <Text
                                style={{
                                    marginTop: hp(-0.7)
                                }}
                                category="s2">
                                During {duration.value + " " + duration.unit}
                            </Text> :
                            null
                        }
                    </Layout>
                    {weight.value !== "" ? <Text
                        category="s1"
                        style={{ fontWeight: "bold" }}>
                        {weight.value + " " + weight.unit}
                    </Text> : null
                    }
                </Layout>
                <Layout
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between"
                    }}>
                    {this.renderExerciceInfo("Reps", reps)}
                    {this.renderExerciceInfo("Sets", sets)}
                    {rest.value !== "" ? <Layout
                        style={{ alignItems: "center", marginTop: "4%" }}>
                        <Text
                            style={{ lineHeight: 14, fontWeight: "bold" }}
                            category="s1"> {rest.value + " " + rest.unit} </Text>
                        <Text
                            style={{ lineHeight: 14 }}
                            category="s1">Rest </Text>
                    </Layout> : null
                    }
                </Layout>

            </TouchableOpacity>
        )
    }
}


export const CardExercice = withStyles(CardExerciceComponent, (theme: ThemeType) => ({
    setContainer: {
        backgroundColor: theme['background-basic-color-1'],
        paddingHorizontal: wp(5),
        paddingVertical: hp(2),
        justifyContent: "center",
    },
}));
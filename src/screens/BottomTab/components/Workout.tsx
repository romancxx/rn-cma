import React, { Component } from 'react'
import { Layout, Text, Icon, withStyles, ThemeType, ThemedComponentProps } from 'react-native-ui-kitten';
import { IAppState } from '@states/reducer';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntl } from 'react-intl';
import { IWorkout } from '@states/reducers/workout';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native';
import { MUSCU } from '@assets/images/index';

interface PropsComponent {
    intl: InjectedIntl;
    data: IWorkout;
}

interface State { }

type Props = ThemedComponentProps & PropsComponent

class WorkoutComponent extends Component<Props, State> {
    render() {
        const { data, themedStyle } = this.props;
        // console.log(data)
        return (
            <Layout
                style={{
                    marginBottom: hp(2),
                    borderRadius: hp(1.5),
                    position: 'relative'
                }}>
                <Image

                    style={{
                        width: '100%',
                        height: hp(20),
                        borderRadius: hp(1.5)
                    }}
                    source={MUSCU}
                />
                <Layout
                    style={themedStyle.containerLayout}>
                    <Text
                        category='h5'
                        style={{
                            color: '#fff'
                        }}>
                        {data.title}
                    </Text>

                    <Layout
                        style={{
                            alignItems: "center",
                            // marginTop: "4/%"
                            backgroundColor: 'transparent',
                            justifyContent: 'center'
                        }}>

                        <Text
                            style={{
                                color: '#fff'
                            }}
                            category="h6"> {data.duration !== undefined ? data.duration.value : ""} </Text>
                        <Text
                            style={{
                                color: '#fff',
                                fontSize: hp(1.8),
                                marginTop: hp(-1)
                            }}
                            category="h6"> {data.duration !== undefined ? data.duration.unit : ''} </Text>
                    </Layout>
                    <Icon
                        name="arrow-ios-forward-outline"
                        fill="#fff"
                        height={hp(4.5)}
                        width={hp(4.5)} />
                </Layout>
            </Layout>
        )
    }
}

const Workout = withStyles(WorkoutComponent, (theme: ThemeType) => ({
    container: {
        flex: 1,
        backgroundColor: theme['background-basic-color-2'],
    },
    containerLayout: {
        flexDirection: 'row',
        display: 'flex',
        alignContent: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: "rgba(256, 256, 256, 0.3)",
        width: "100%",
        height: hp(6),
        borderBottomLeftRadius: hp(1.5),
        borderBottomRightRadius: hp(1.5),
        paddingLeft: hp(2.5),
        paddingRight: hp(1),
        justifyContent: 'space-between',
        alignItems: 'center',
    }
}));

const mapStateToProps = (state: IAppState) => ({
});

const mapDispatchToProps = {
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(injectIntl(Workout));



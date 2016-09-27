import React, {Component} from 'react';
import IconMaterial from 'react-native-vector-icons/MaterialIcons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonIcon from 'react-native-vector-icons/Ionicons';

import {
    ScrollView,
    View,
    StyleSheet,
    TouchableOpacity,
    Text
} from 'react-native';



class NavBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selected: 0
        };
    }

    setSelected(index) {
        this.setState({
            selected: index
        })
    }

    renderIcon(font, name, size, color) {
        switch(font) {
            case 'material':
                return <IconMaterial name={name} size={size} color={color} />;
            case 'font-awesome':
                return <IconAwesome name={name} size={size} color={color} />;
            case 'ionicons':
                return <IconIonIcon name={name} size={size} color={color} />;
            default:
                return <IconMaterial name={name} size={size} color={color} />;
        }
    }

    render () {
        const myProps = this.props;

        return (
            <View style={{flex: 1}}>

                <View style={myProps.contentStyle}>
                    { myProps.children[this.state.selected] }
                </View>

                <View style={[styles.navBar, myProps.navStyle]}>
                    <View style={styles.columnWrap}>
                        {
                            myProps.children.map((item, index) => {
                                const isSelected = this.state.selected === index;
                                const color = isSelected ? myProps.selectedColor : myProps.unselectedColor;
                                const Icon = this.renderIcon(item.props.font, item.props.name, 30, color);

                                return (
                                    <TouchableOpacity style={[styles.buttonStyle, { borderBottomColor: color}]}
                                                      key={index}
                                                      onPress={() => {
                                                          this.setSelected(index);
                                                      }}
                                    >
                                        {Icon}
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </View>
                </View>
            </View>
        );
    }
};


const styles = StyleSheet.create({
    navBar: {
        backgroundColor: 'white',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0
    },
    columnWrap: {
        flexDirection: 'row'
    },
    buttonStyle: {
        flex: 1,
        marginBottom: 0,
        marginTop: 5,
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 5
    }
});


export default NavBar;
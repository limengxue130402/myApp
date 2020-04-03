import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, ScrollView, AsyncStorage, TouchableOpacity} from 'react-native'
import Swiper from 'react-native-swiper';
import { Tabs, Actions } from 'react-native-router-flux';

export default class SwiperPage extends Component {
    start = () => {
        AsyncStorage.setItem('isInstall','true',()=>{
            this.props.afterInstall();
        });
    }
    render() {
        return (
            <Swiper style={styles.wrapper} >
                <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../assets/swiper.png')}/>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity style={styles.start} onPress={this.start}>
                            <Text style={{color:'#fff'}}>开始体验</Text>
                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View style={styles.slide}>
                    <Image style={styles.img} source={require('../../assets/swiper.png')}/>
                </View>
                <View style={styles.slide1}>
                    <Image style={styles.img} source={require('../../assets/swiper.png')}/>
                </View>
            </Swiper>           
        )
    }
}

const styles = StyleSheet.create({
    img:{
        width:'100%',
        height:'100%'
    },
    slide1:{
        flex:1,
        // width:'100%',
        height:'100%',
        alignItems:'center'
    },
    start:{
        bottom:150,
        width:100,
        height:40,
        backgroundColor:'red',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    }
})
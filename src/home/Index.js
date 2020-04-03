import React, { Component } from 'react'
import {StyleSheet, View, Text, StatusBar, TextInput, Image, ScrollView, TouchableOpacity, } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Carousel,Button} from '@ant-design/react-native';

export default class Home1 extends Component {
    render() {
        return (
            <>
                <StatusBar backgroundColor='#f23030'/>
                <ScrollView>
                    <View style={{height:70,backgroundColor:'#f23030',alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                        <Icon name='search1' size={30} style={{position:'absolute',left:80,top:20,zIndex:2}} color='white'/>
                        <TextInput placeholder='请输入您要搜索的关键字' placeholderTextColor='white' style={{paddingLeft:60,fontSize:18,backgroundColor:'#fbb8b8',width:'75%',height:40,borderRadius:30}}/>
                        <Icon name='shoppingcart' size={30} color='white' style={{position:'absolute',right:18,top:20}}/>
                    </View>
                    <View style={{height:220}}>
                        <Carousel
                            dots={true}
                            autoplay={true}
                            dotActiveStyle={{backgroundColor:'#fd0304'}}
                            dotStyle={{backgroundColor:'white'}}
                        >
                            <Image style={{width:'100%',height:220}} source={require('../../assets/server.jpg')}/>
                            <Image style={{width:'100%',height:220}} source={require('../../assets/server.jpg')}/>
                            <Image style={{width:'100%',height:220}} source={require('../../assets/server.jpg')}/>

                        </Carousel>
                    </View>
                    <View>
                        <View style={styles.list}>
                            <View style={[styles.circle,{backgroundColor:'#ffcccc'}]}>
                                <Image source={require('../../assets/gongju.jpg')} style={{width:35,height:35}}/>
                            </View>
                            <Text style={styles.words}>居家维修保养</Text>
                            <Icon name='right' size={20} color='#f0f0f0' style={{position:'absolute',right:30}}/>
                        </View>
                        <View style={styles.list}>
                            <View style={[styles.circle,{backgroundColor:'#ffe1b1'}]}>
                                <Image source={require('../../assets/guoqi.jpg')} style={{width:35,height:35}}/>
                            </View>
                            <Text style={styles.words}>住宿优惠</Text>
                            <Icon name='right' size={20} color='#f0f0f0' style={{position:'absolute',right:30}}/>
                        </View>
                        <View style={styles.list}>
                            <View style={[styles.circle,{backgroundColor:'#bfe6a8'}]}>
                                <Image source={require('../../assets/nonzhong.jpg')} style={{width:35,height:35}}/>
                            </View>
                            <Text style={styles.words}>出行接送</Text>
                            <Icon name='right' size={20} color='#f0f0f0' style={{position:'absolute',right:30}}/>
                        </View>
                        <View style={styles.list}>
                            <View style={[styles.circle,{backgroundColor:'#c3ddf2'}]}>
                                <Image source={require('../../assets/gift.jpg')} style={{width:35,height:35}}/>
                            </View>
                            <Text style={styles.words}>E族活动</Text>
                            <Icon name='right' size={20} color='#f0f0f0' style={{position:'absolute',right:30}}/>
                        </View>
                    </View>
                    <View style={{marginTop:40,alignItems:'center'}}>
                        <TouchableOpacity style={{width:'50%',backgroundColor:'#f23030',height:40,borderRadius:5,alignItems:'center',justifyContent:'center'}}>
                            <Text style={{color:'white',fontSize:18}}>发布需求</Text>
                        </TouchableOpacity>
                    </View>
                    
                    <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
                        <Text style={{color:'#767676'}}>@E族之家 版权所有</Text>
                    </View>
                </ScrollView>
                
            </>
        )
    }
}

const styles = StyleSheet.create({
    list:{
        width:'100%',
        height:80,
        backgroundColor:'white',
        marginTop:5,
        flexDirection:'row',
        alignItems:'center'
    },
    circle:{
        width:60,
        height:60,
        borderRadius:90,
        marginLeft:26,
        alignItems:'center',
        justifyContent:'center'
    },
    words:{
        fontSize:18,
        color:'#5d5d5d',
        fontFamily:'微软雅黑',
        marginLeft:43
    }

})
import React, { Component } from 'react'
import {View, Text, TextInput, Dimensions, FlatList, Image,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
const {width} = Dimensions.get('window')
// 172.17.100.2:8081
export default class List extends Component {
    constructor(){
        super();
        let data = []
        for(var i = 0; i < 6; i++){
            data.push({tit:i,key:i})
        }
        this.state={
            data,
        }
    }
    render() {
        return (
            <View style={{flex:1}}>
                <View style={{height:149,backgroundColor:'white',alignItems:'center',}}>
                    <View style={{flexDirection:'row'}}>
                        <TextInput placeholder='请输入商品名称' style={{backgroundColor:'#eeeeee',marginTop:10,width:width*0.8,borderRadius:5,fontSize:18,}} />
                        <Icon name='search1' size={25}  style={{position:'absolute',right:10,top:20}}/>
                    </View>
                    <View style={{width:'100%',height:5,backgroundColor:'#f4f4f4',marginTop:10}}></View>
                    <View style={{flexDirection:'row',width:width*0.8,marginTop:27}}>
                        <Text style={{fontSize:20,color:'#f23030',fontFamily:'微软雅黑'}}>综合</Text>
                        <Text style={styles.words}>销量</Text>
                        <Text style={styles.words}>新品</Text>
                        <Text style={styles.words}>价格</Text>
                        <Text style={styles.words}>信用</Text>
                    </View>
                </View>
                <FlatList
                    data = {this.state.data}
                    numColumns={2}
                    renderItem = {({item}) => 
                        <View style={styles.slide}>
                            {
                                item.tit % 2 == 0 ? 
                                <Image style={styles.imgs} source={require('../../assets/xiapian.jpg')} />
                                : <Image style={styles.imgs} source={require('../../assets/shupian.jpg')}/>
                            }
                            <Text style={{marginTop:50,color:'#666666',fontSize:14,marginLeft:10,marginRight:10}}>Oishi/上好佳玉米卷20包膨化休闲食品Oishi/上好佳</Text>
                            <Text style={{color:'red',position:'absolute',top:290,left:10}}>36.00</Text>
                            
                        </View>
                    }
                />
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    slide:{
        width:width*0.45,
        height:310,
        marginLeft:width*0.035,
        marginTop:16,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
    },
    imgs:{
        width:width*0.35,
        height:180
    },
    words:{
        marginLeft:50,
        fontSize:20,
        fontFamily:'微软雅黑'
    }
})
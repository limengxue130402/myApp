import React, { Component } from 'react'
import {View, Text, StatusBar, TouchableOpacity, ToastAndroid, ScrollView} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import {Actions} from 'react-native-router-flux';
import { ActivityIndicator } from '@ant-design/react-native';

export default class Push extends Component {
    constructor(){
        super();
        this.state={
            titles: [],
            page:1,
            isLoading:false
        }
    }
    componentDidMount(){
        fetch("https://cnodejs.org/api/v1/topics?limit=12&&page="+this.state.page)
            .then((res)=>res.json())
            .then(res => {
                this.setState({
                    titles:res.data,
                    isLoading:true,

                })
            })
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.page !== prevProps.page){
            fetch("https://cnodejs.org/api/v1/topics?limit=12&&page="+this.state.page)
            .then((res)=>res.json())
            .then(res => {
                this.setState({
                    titles:res.data,
                })
            })
        } 
    }
    lastPage = ()=>{
        if(this.state.page == 1){
            ToastAndroid.show('这里是开头哦',ToastAndroid.SHORT);
        }
        else{
            this.setState({
                page:this.state.page -1
            })
            
        }
    }
    nextPage = ()=>{
        this.setState({
            page:this.state.page +1
        })
    }
    render() {
        if(!this.state.isLoading){
            return(
                <ActivityIndicator style={{justifyContent:'center',alignItems:'center'}} size="large" color="red"/>
            )
        }
        return (
            <ScrollView>
            <View style={{width:'100%',height:'100%',backgroundColor:'#eee'}} >
                <StatusBar backgroundColor='#f23030'/>
                <View>
                    <View style={{width:'100%',height:50,backgroundColor:'#f23030',justifyContent:'center',alignItems:'center'}}>
                        <Icon onPress={()=>Actions.pop()} name='left' size={30} color='white' style={{position:'absolute',left:10}}/>
                        <Text style={{color:'white',fontSize:20}}>我的发布</Text>
                        <Icon name='ellipsis1' size={30} color='white' style={{position:'absolute',right:10}}/>
                    </View>
                    <View >
                        {
                            this.state.titles.map((item)=>
                            <View style={{flexDirection:'row',backgroundColor:'white',marginTop:1,height:50,justifyContent:'center',alignItems:'center',fontSize:20}}> 
                                <Text style={{position:'absolute',left:5}}>
                                    {item.title ? (item.title.length > 15 ? item.title.substr(0, 15) + "..." : item.title) : ""}
                                </Text>
                                <Text style={{position:'absolute',right:65}}>{item.create_at.substr(0,10)}</Text>
                                {
                                    parseInt(item.reply_count)%2==0?<Text style={{color:'#f23030',position:'absolute',right:10}}>已回复</Text>:<Text style={{color:'grey',position:'absolute',right:10}}>已回复</Text>
                                }
                            </View>
                            )    
                        }
                    </View>
                    <View style={{flexDirection:'row',marginTop:5,justifyContent:'center',backgroundColor:'white',marginTop:0,height:80,alignItems:'center'}}>
                        <TouchableOpacity onPress={()=>{this.lastPage()}} style={{width:80,height:30,backgroundColor:'#f23030',justifyContent:'center',alignItems:'center',borderRadius:20,position:'absolute',left:50}}>
                            <Text style={{color:'white'}}>上一页</Text>
                        </TouchableOpacity>
                        <Text>第{this.state.page}页</Text>
                        <TouchableOpacity onPress={()=>{this.nextPage()}} style={{width:80,height:30,backgroundColor:'#f23030',justifyContent:'center',alignItems:'center',borderRadius:20,position:'absolute',right:50}}>
                            <Text style={{color:'white',}}>下一页</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
        )
    }
}

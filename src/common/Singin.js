import React, { Component } from 'react'
import { Text, View, TouchableOpacity, TextInput, ToastAndroid, StatusBar,AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons"
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils/index'
export default class Singin extends Component {
    constructor(){
        super();
        this.state={
            username:'',//用户名
            pwd:'',//密码
            confirmPwd:'',//确认密码1
            isRegister:false
        }
    }
    userhandle = (text)=>{
        this.setState({username:text})
    }
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }
    confirm = (text)=>{
        this.setState({confirmPwd:text})
    }
    register = ()=>{
        if(this.state.username !== '' && this.state.pwd !== '' && this.state.pwd === this.state.confirmPwd){
            this.setState({
                isRegister:true
            });
            myFetch.post('/login',{
                username:this.state.username,
                pwd:this.state.pwd
            }).then(res=>{
                console.log("data数据："+res.data)
                if(res.data.token === '1'){
                    ToastAndroid.show('账户已存在',ToastAndroid.SHORT);
                }else if(res.data.token === '2'){
                    ToastAndroid.show('连接错误',ToastAndroid.SHORT);
                }else{
                    ToastAndroid.show('注册成功',ToastAndroid.SHORT);
                    console.log("注册成功")
                    console.log(JSON.stringify(res.data))
                    AsyncStorage.setItem('register',JSON.stringify(res.data)).
                    then(()=>{
                        this.setState({isRegister:false});
                        Actions.login();
                        console.log("asdfg")
                    });
                    
                }
    
            })
        }else if(this.state.pwd !== this.state.confirmPwd){
            ToastAndroid.show('两次输入密码不一样',ToastAndroid.SHORT);
        }else{
            ToastAndroid.show('请输入正确的信息',ToastAndroid.SHORT);
        }
    }
    

    render() {
        return (
            <View style={{flex: 1,}}>
                <StatusBar backgroundColor='#f23030'/>
                <View style={{width:'100%',height:50,backgroundColor:'#f23030',justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontSize:20}}>注册</Text>
                    <TouchableOpacity style={{position:'absolute',right:10}}>
                    <Text style={{color:'white',fontSize:15}} onPress={Actions.login}>登录</Text>
                    </TouchableOpacity>
                </View>
                <View
          style={{ alignItems: 'center',marginTop:20}}>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon name="user" color="red"/>
            <TextInput placeholder="用户名" 
                onChangeText={this.userhandle}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon1 name="onepassword" color="red"/>
            <TextInput 
                onChangeText={this.pwdhandle}
                placeholder="密码" 
                secureTextEntry={true}
            />
          </View>
          <View
            style={{
              width: '80%',
              marginRight: 10,
              borderBottomColor: '#ccc',
              borderBottomWidth: 1,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 20,
            }}>
            <Icon1 name="textbox-password" color="red"/>
            <TextInput 
                onChangeText={this.confirm}
                placeholder="确认密码" 
                secureTextEntry={true}
            />
          </View>
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.register}
                >
                <Text>注册</Text>
            </TouchableOpacity>
            
        </View>
            </View>
        )
    }
}

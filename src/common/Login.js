
import React, {Component} from 'react';
import {View, Text, Image, TextInput, AsyncStorage, TouchableOpacity, ToastAndroid, StatusBar,} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {myFetch} from '../utils/index'
import Icon from 'react-native-vector-icons/AntDesign';
import Icon1 from "react-native-vector-icons/MaterialCommunityIcons"
export default class Login extends Component {
    constructor(){
        super();
        this.state = {
            username:'',
            pwd:'',
            newname:'',
            newpwd:'',
            isloading:false
        }
    }
    //用户名
    userhandle = (text)=>{
        this.setState({username:text})
    }
    //密码
    pwdhandle = (text)=>{
        this.setState({pwd:text})
    }


    login =()=>{
      AsyncStorage.getItem('register').
      then(res=>{
          let userDate = JSON.parse(res);
          if(userDate === null){
            ToastAndroid.show('请去注册账户',ToastAndroid.SHORT);
            Actions.singin()
          }
          else{
          this.setState({
              newname:userDate.username,
              newpwd:userDate.pwd
          },()=>{
              if(this.state.username === '' && this.state.pwd === ''){
                  ToastAndroid.show('用户名和密码不可为空',ToastAndroid.SHORT);
              }else if(this.state.username !== this.state.newname || this.state.pwd !== this.state.newpwd){
                  ToastAndroid.show('用户名和密码不正确',ToastAndroid.SHORT);
              }else if(this.state.isloading){
                  ToastAndroid.show('登录成功',ToastAndroid.SHORT);
                  Actions.homePage();
              }
          })}
      });
      this.setState({
          isloading:true
      });
      myFetch.post('/login',{
          username:this.state.username,
          pwd:this.state.pwd
      }).then(res=>{
          AsyncStorage.setItem('user',JSON.stringify(res.data)).
              then(()=>{
                  this.setState({isloading:false});
              });
      })
  }

  render() {
    return (
      <View style={{flex: 1,}}>
        <StatusBar backgroundColor='#f23030'/>
        <View style={{width:'100%',height:50,backgroundColor:'#f23030',justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:20}}>登录</Text>
            <TouchableOpacity style={{position:'absolute',right:10}} onPress={Actions.singin}>
              <Text style={{color:'white',fontSize:15}}>注册</Text>
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
            <TouchableOpacity 
                style={{
                    width: '80%',
                    height: 40,
                    backgroundColor: '#ccc',
                    marginTop: 30,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onPress={this.login}>
                <Text>登录</Text>
            </TouchableOpacity>
            
        </View>
        {
            this.state.isloading
            ?<View><Text>正在登录...</Text></View>
            :null
        }
      </View>
    );
  }
}
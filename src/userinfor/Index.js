import React, { Component } from 'react'
import {View, Text, StatusBar, Image, FlatList, StyleSheet, ScrollView,TouchableOpacity, AsyncStorage} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-picker';
import {Actions} from 'react-native-router-flux';
const options = {
    title: '选择头像',
    cancelButtonTitle: '取消',
    takePhotoButtonTitle: '拍照',
    chooseFromLibraryButtonTitle: '本地上传',
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
export default class My extends Component {
    constructor(){
        super();
        this.state={
            avatarSource:''
        }
    }
    takePhoto = ()=>{
        ImagePicker.showImagePicker(options, (response) => {
            if (response.didCancel) {
              return;
            } else if (response.error) {
              console.log('Error:', response.error);
            } else if (response.customButton) {
              console.log('custom:', response.customButton);
            } else {
                
              const source = { uri: response.uri };
              this.setState({
                avatarSource: source,
              },()=>{AsyncStorage.setItem('imgSource',JSON.stringify(response.uri),()=>{
                  console.log("store success")
              })});
            }
          });
        
    }
    componentDidMount() {
        AsyncStorage.getItem('imgSource').then((value)=>{
            this.setState({
                avatarSource:{uri:JSON.parse(value)}
            })
        })
    }
    componentDidUpdate(prevProps,prevState){
        if(this.state.avatarSource !== prevProps.avatarSource){
            AsyncStorage.getItem('imgSource').then((value)=>{
                this.setState({
                    avatarSource:{uri:JSON.parse(value)}
                })
            })
        }
    }
    exit = ()=>{
        Actions.login();
        AsyncStorage.removeItem('user');
    }
    render() {
        return (
            <>
                <StatusBar backgroundColor='#f23030'/>
                <ScrollView>
                    <View style={{flex:1}}>
                        <TouchableOpacity onPress={this.takePhoto} style={{height:200,width:'100%',backgroundColor:'#f23030',alignItems:'center',justifyContent:'center'}}>    
                            {
                               this.state.avatarSource==''?<Image source={require('../../assets/touxiang.jpg')} style={{width:100,height:100}}/>:
                               <Image source={this.state.avatarSource} style={{width:100,height:100}}/>
                            }                         
                            <Text style={{color:'white',fontSize:16,marginTop:10}}>BINNU  DHILLON</Text>
                        </TouchableOpacity>
                        <View style={{backgroundColor:'white',flexDirection:'row',height:50,alignItems:'center',marginTop:5}}>
                            <Icon name='user' size={30} color='#f0f0f0' style={{marginLeft:20}}/>
                            <Text style={{color:'#4f4e4e',fontSize:15,marginLeft:20}}>我的个人中心</Text>
                        </View>
                        <View style={{marginTop:5,height:270,backgroundColor:'white',width:'100%'}}>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.box}>
                                    <Icon name='setting' size={30} color='#aeaeae'/>
                                    <Text style={styles.titles}>账户管理</Text>
                                </View>
                                <View style={styles.box}>
                                    <Icon name='enviromento' size={30} color='#aeaeae'/>
                                    <Text style={styles.titles}>收货地址</Text>
                                </View>
                                <View style={styles.box}>
                                    <Icon name='idcard' size={30} color='#aeaeae'/>
                                    <Text style={styles.titles}>我的信息</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.box}>
                                    <Icon name='filetext1' size={30} color='#aeaeae'/>
                                    <Text style={styles.titles}>我的订单</Text>
                                </View>
                                <View style={styles.box}>
                                    <Icon name='qrcode' size={30} color='#aeaeae'/>
                                    <Text style={styles.titles}>我的二维码</Text>
                                </View>
                                <View style={styles.box}>
                                    <Icon name='bank' size={30} color='#aeaeae'/>
                                    <Text style={styles.titles}>我的积分</Text>
                                </View>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <View style={styles.box}>
                                    <Icon name='staro' size={30} color='#aeaeae'/>
                                    <Text style={styles.titles}>我的收藏</Text>
                                </View>
                            </View>
                    </View>
                    <View style={{backgroundColor:'white',flexDirection:'row',height:50,alignItems:'center',marginTop:10}}>
                        <Icon name='user' size={30} color='#f0f0f0' style={{marginLeft:20}}/>
                        <Text style={{color:'#4f4e4e',fontSize:15,marginLeft:20}}>E族活动</Text>
                    </View>
                    <View style={{marginTop:5,height:180,backgroundColor:'white',width:'100%'}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.box}>
                                <Icon name='tool' size={30} color='#aeaeae'/>
                                <Text style={styles.titles}>居家维修保养</Text>
                            </View>
                            <View style={styles.box}>
                                <Icon name='car' size={30} color='#aeaeae'/>
                                <Text style={styles.titles}>出行接送</Text>
                            </View>
                            <View style={styles.box}>
                                <Icon name='adduser' size={30} color='#aeaeae'/>
                                <Text style={styles.titles}>我的受赠人</Text>
                            </View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <View style={styles.box}>
                                <Icon name='layout' size={30} color='#aeaeae'/>
                                <Text style={styles.titles}>我的住宿优惠</Text>
                            </View>
                            <View style={styles.box}>
                                <Icon name='flag' size={30} color='#aeaeae'/>
                                <Text style={styles.titles}>我的活动</Text>
                            </View>
                            <TouchableOpacity onPress={()=>Actions.mypush()}  style={styles.box}>
                                
                                <Icon name='filetext1' size={30} color='#aeaeae'/>
                                <Text style={styles.titles}>我的发布</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <View style={{marginTop:30,marginBottom:30,alignItems:'center'}}>
                        <TouchableOpacity onPress={this.exit} style={{backgroundColor:'red',width:'50%',height:40,borderRadius:20,justifyContent:'center',alignItems:'center'}}>
                            <Text style={{color:'white',fontSize:18}}>退出登录</Text>
                        </TouchableOpacity>
                        <Text style={{color:'#aeaeae',fontSize:18,marginTop:10}}>BINNU GHILLON | 退出</Text>
                    </View>
                </View>
                </ScrollView>
            </>
           
        )
    }
}

const styles = StyleSheet.create({
    box:{
        width:'33.3%',
        height:90,
        justifyContent:'center',
        alignItems:'center'
    },
    titles:{
        fontFamily:'微软雅黑',
        fontSize:14,
        color:"#4f4e4e",
        marginTop:10
    }
})
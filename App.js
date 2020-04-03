import React, { Component, useEffect, useState } from 'react'
import {StyleSheet, View, Text, Image, BackHandler,ToastAndroid,AsyncStorage} from 'react-native';
import { Router, Overlay, Scene, Tabs, Drawer, Lightbox, Modal, Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/AntDesign';
import SplashScreen from 'react-native-splash-screen'
import Home from './src/home/Index';
import Goods from './src/goods/Index';
import User from './src/userinfor/Index';
import Login from './src/common/Login'
import SwiperPage from './src/common/SwiperPage';
import Push from './src/common/Push';
import Singin from './src/common/Singin';
// import Singup from './src/common/Singup';

console.disableYellowBox= true;


const App = () =>{
    let [isLogin,setLogin] = useState(false);//是否登录
    let [isInstall,setInstall] = useState(true);//是否为第一次安装
    let [isSingin,setSingin] = useState(false);//是否已经注册
    let now = 0;
    // AsyncStorage.clear();
    let init = ()=>{
		AsyncStorage.getItem('isInstall')
		.then(res=>{
			// console.log('isinstall',res)
			if(res){
				setInstall(false);
			}
		})
		
        AsyncStorage.getItem('register').
        then(res=>{
                let data = JSON.parse(res);
                if(!data){
                    // console.log(1);
                    SplashScreen.hide();
                }
                if(data && data.token){
                    setSingin(true);
                    SplashScreen.hide();
                }
        });

        AsyncStorage.getItem('user')
		.then(res=>{
			let user = JSON.parse(res)
			if(!user){
                // console.log("隐藏")
				SplashScreen.hide();
			}
			if(user&&user.token){
				setLogin(true);
				SplashScreen.hide();
			}
        })
	}
	useEffect(()=>{
        init();
	},[])
	let afterInstall = ()=>{
        setInstall(false);
	}
	if(isInstall){
		return <View style={{flex:1}}>
			<SwiperPage afterInstall={afterInstall}/>
		</View>
	}
    
    return(
        <Router
            backAndroidHandler={()=>{
                if(Actions.currentScene != 'home'){
                    Actions.pop();
                    return true;
                }else{
                    if(new Date().getTime()-now<2000){
                        BackHandler.exitApp();
                    }else{
                        ToastAndroid.show('确定要退出吗',100);
                        now = new Date().getTime();
                        return true;
                    }
                }
                
            }}
        >
            <Overlay>
                <Modal key="modal" hideNavBar>
                    <Lightbox key="lightbox">
                        <Drawer
                            key="drawer"
                            contentComponent={()=><Text>drawer</Text>}
                            drawerIcon={()=><Icon name="menuunfold" size={25} />}
                            
                        >
                            <Scene key="root">
                                <Tabs
                                    key="tabbar"
                                    hideNavBar
                                    activeTintColor="red"
                                    inactiveTintColor="blue"
                                    tabBarStyle={{backgroundColor:'#ffffff'}}
                                >
                                    {/* 首页 */}
                                    <Scene hideNavBar key="homePage" title="首页" icon={
                                        ({focused})=><Icon color={focused?'#f44b4b':'#999999'} name='home' size={25}/>
                                    }>
                                        <Scene key='home' component={Home}/>
                                    </Scene>

                                    {/* 商品分类 */}
                                    <Scene
                                        hideNavBar
                                        key='goodsPage'
                                        title='商品分类'
                                        icon={
                                            ({focused})=><Icon color={focused?'#f44b4b':'#999999'} name='appstore-o' size={25}/>
                                        }
                                    >
                                        <Scene key='list' component={Goods} />

                                    </Scene>
                                    {/* 用户中心 */}
                                    <Scene
                                        hideNavBar
                                        hideDrawerButton
                                        key='userPage'
                                        title='用户中心'
                                        icon={
                                            ({focused})=><Icon color={focused?'#f44b4b':'#999999'} name='user' size={25}/>
                                        }
                                        component={User}
                                    />  
                                </Tabs>
                            </Scene>
                        </Drawer>
                    </Lightbox>
                    <Scene initial={!isSingin} key="singin" component={Singin}/>
                    <Scene initial={!isLogin && isSingin} key="login" component={Login} />
                    {/* <Scene initial={!isSingin} key="singin" component={Singin}/> */}
                    <Scene key="mypush" component={Push}/>
                </Modal>
            </Overlay>
        </Router>
    )
}

export default App;
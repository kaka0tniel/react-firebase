import React, { Component } from "react";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import { createStackNavigator, creat } from 'react-navigation-stack'

import { createDrawerNavigator } from 'react-navigation-drawer';
// import { createAppContainer } from 'react-navigation';
import InsertData from "../component/InsertData";
import ViewData from "../component/ViewData";
import Home from '../component/Home';
import Crud from '../component/Crud';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/dist/Entypo';

const Dashboard = createStackNavigator({
    Home: {
      screen: Home
    },
    Crud: {
        screen: Crud
    },
    InsertData: {
        screen: InsertData
    },
    ViewData: {
        screen: ViewData
    }
  });

  export default createAppContainer(Dashboard);
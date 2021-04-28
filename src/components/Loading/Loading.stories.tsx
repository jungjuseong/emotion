import React from 'react'
import {Loading} from './loading'

export default{
    title: 'Components/Loading',
    component: Loading,
}

export const View = () =>
    <Loading view={true}/>

export const notView = () =>
    <Loading view={false}/>
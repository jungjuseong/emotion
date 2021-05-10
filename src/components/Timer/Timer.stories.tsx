import React from 'react'
import {Story} from '@storybook/react'

import {Timer, ITimer,TimerState, RunState} from './Timer' 
import { template } from 'lodash'
import {css} from '@emotion/react'

export default{
    title: 'Components/Timer',
    component: Timer
}

const Template: Story<ITimer> = (args) =>
    <div css={[
        css `background-color:gray;`
    ]}>
        <Timer {...args} />
        <button onClick={()=>{timerState.state.m_runState=RunState.RUNNING;console.log(timerState.runState)}}>시작</button>
    </div>

let timerState=new TimerState(15)
export const QuizTimer = Template.bind({});
QuizTimer.args={
    state:timerState, 
    view:true, 
    onStart:()=>{console.log("startTimer")},
    onComplete:()=>{console.log("endTimer")}
    
}

/*const Template2: Story<ITimer> = (args) =>
    <div css={[
        css `background-color:gray;`
    ]}>
        <CountDown2 {...args} />
        <button onClick={()=>{timerState.state.m_runState=1;console.log(timerState.runState)}}>시작</button>
    </div>

export const CountDown2 = Template2.bind({});
CountDown2.args={
    state:timerState, 
    view:true, 
    onStart:()=>{console.log("startTimer")},
    onComplete:()=>{console.log("endTimer")}
    
}*/

import React from 'react'
import {Story} from '@storybook/react'
import {AudioBox} from './AudioBox'
import { ToggleBtnProps } from '../ToggleBtn/ToggleBtn'

export default{
    title: 'components/AudioBox',
    component: AudioBox
}

export const Reading = () => {
    const [play,setPlay] = React.useState(false);
    const [audio,setAudio] = React.useState(false);

    const _onPlay=()=>{setPlay(!play);}
    const _onAudio=()=>{setAudio(!audio);}

    const audioProps = [
        {class_name:'btn_audio',view:!audio,onClick:_onAudio},
        {class_name:'btn_play',view:!play&&audio,onClick:_onPlay},
        {class_name:'btn_pause',view:play&&audio,onClick:_onPlay},
        {class_name:'btn_stop',view:audio,onClick:_onAudio},
    ]

    return(
        <div className={"t_compre"}>
            <AudioBox {...audioProps} />
        </div>
    )
}
import React from 'react'
import {Story} from '@storybook/react'
import {AudioBox} from './AudioBox'

export default{
    title: 'components/AudioBox',
    component: AudioBox
}

export const Reading = () => {
    const [play,setPlay] = React.useState(false);
    const _onPlay=()=>{setPlay(!play);}
    const audioProps = [
        {class_name:'btn_audio',view:false},
        {class_name:'btn_play',view:!play,onClick:_onPlay},
        {class_name:'btn_pause',view:play,onClick:_onPlay},
        {class_name:'btn_stop'},
    ]

    return(
        <div className={"t_compre"}>
            <AudioBox {...audioProps} />
        </div>
    )
}
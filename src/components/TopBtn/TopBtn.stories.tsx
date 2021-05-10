import React from 'react'
import {TopBtn} from './TopBtn'

export default {
    title: 'components/TopBtn',
    component: TopBtn
}

export const reading = () => {
    const [title,setTitle] = React.useState('Passage');
    const _onClick1=()=>{setTitle('Passage');}
    const _onClick2=()=>{setTitle('Compreshension');}
    const TopProps = [
        {class_name:"btn_passage",on:title==='Passage',onClick:_onClick1},
        {class_name:"btn_comprehension",on:title==='Compreshension',onClick:_onClick2}
    ]

    return(
        <div className={"t_compre"} style={{height:100,backgroundColor: '#5a6ea8'}}>
        <TopBtn {...TopProps} />
        </div>
    )
}
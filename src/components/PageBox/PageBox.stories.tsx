import React from 'react'
import {PageBox} from './PageBox'

export default {
    title: 'Components/PageBox',
    componemt: PageBox
}

export const Reading = () => {
    const [onNum,setOn] = React.useState(0);
    const _pageClick=(idx: number)=>{setOn(idx);}
    const pageProps = [
        {idx:0,on:onNum===0,onClick:_pageClick},
        {idx:1,on:onNum===1,onClick:_pageClick},
        {idx:2,on:onNum===2,onClick:_pageClick},
    ]

    return(
        <div className={"t_compre"} >
          <PageBox {...pageProps} />
        </div>
    )
}
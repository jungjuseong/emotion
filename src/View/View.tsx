import React, { Children } from "react";

import { css } from '@emotion/react';
import { Button } from "src/Button/Button";
import {ButtonGroup} from 'src/ButtonGroup/ButtonGroup'
import { Text } from 'src/text/index'
import { buttonGroup } from "src/ButtonGroup/ButtonGroup.stories";
import  Icon  from 'src/Icon/Icon'

export type ViewProps = {
    //**텍스트 내용 */
    children: React.ReactNode;
    theme: 'passage'|'comprehension';
}

export const View = ({children,theme}: ViewProps) =>{
    if(theme==='passage'){
        return(
            <div css={css`background:#5a5ab9; padding-left:25px;padding-right:25px;`}>
            <br />
                <ButtonGroup align='middle'>
                    <Button size='small'>button</Button>
                    <Button size='small'>button</Button>
                </ButtonGroup>
                <ButtonGroup align='right'>
                    <Button size='small' theme="view">
                        Reading<br />Strategy
                    </Button>
                    <Button size='small' theme="view">
                        Student<br />Book
                    </Button>
                </ButtonGroup>
                <Text css={css`padding:10px; padding-top:1px;`}>{children}</Text>
                <ButtonGroup align='middle'>
                    <Button size='small' isRound={true}theme="view">button</Button>
                    <Button size='small' isRound={true}theme="view">button</Button>
                    <Button size='small' isRound={true}theme="view">button</Button>
                </ButtonGroup>
            </div>
        )
    }
    else if(theme==='comprehension'){
        return(
            <div css={css`background:#5a5ab9; padding-left:25px;padding-right:25px;`}>
            <br />
                <ButtonGroup align='middle'>
                    <Button size='small'>button</Button>
                    <Button size='small'>button</Button>
                </ButtonGroup>
                <ButtonGroup align='right'>
                <Button theme= 'player' iconOnly= {true} ><Icon icon="pencil" color="white" /></Button>
                    <Button size='small' theme="view">
                        Reading<br />Strategy
                    </Button>
                    <Button size='small' theme="view">
                        Student<br />Book
                    </Button>
                </ButtonGroup>
                <Text css={css`padding:10px; padding-top:1px;float:left;`}>{children}</Text>
                <Text css={css`padding:10px; padding-top:1px;float:left;`}>{children}</Text>
                <div css={css`clear:both;`} />
                <ButtonGroup align='middle'>
                    <Button size='small'isRound={true}theme="view">button</Button>
                    <Button size='small'isRound={true}theme="view">button</Button>
                    <Button size='small'isRound={true}theme="view">button</Button>
                </ButtonGroup>
            </div>
        )
    }
}

import React from 'react';
import { observable } from 'mobx';
import * as _ from "lodash";
import {css} from '@emotion/react'
import goodImg from "./goodjob.png"

//import './goodjob.scss';

export type GoodJobProps = {
	view: boolean;
	/** default 800ms */
	delay: number;
	onComplete: () => void;
}


export function GoodJob({view, delay, onComplete}: GoodJobProps) {

	const [m_off, setOff] = React.useState(false);
	
	const f_1 = _.debounce(() => {
		if(view && m_off) {
			onComplete();
		}
		setOff(false);
	}, 10);

	const f_2 = _.debounce(() => {
		if(view) {
			setOff(true);
			f_1();
		} else
			setOff(false);
	}, delay);		
	
	React.useEffect(() => {
		console.log("useEffect")
		if (view) {
			setOff(false);
			f_2();
		} else
			setOff(false);
	}, [view]);

	// const arr: string[] = [];
	// arr.push('common_goodjob');
	// if(props.view && m_off) arr.push('off');
	// else if(props.view) arr.push('on');

	/*let class_name;
	
	if (view && m_off) class_name = 'common_goodjob off';
	else if(view) class_name = 'common_goodjob on';

	console.log(class_name);*/

	return (
		<div 
			//className={class_name}
			css={[
				view&&style,
				view&&on,
				view&&m_off&&off,
			]}
		/>
	);
	
}

GoodJob.defaultProps = {
    delay: 800,
};

const style = css`
	position: absolute;
	left: 50%;
	top: 50%;
	background-image: url(${goodImg});
	width:579px;
	height:447px;
	//width: width("./goodjob.png");
	//height: height("./goodjob.png");
	
	transform: translate(-50%, -50%) scale(0.8, 0.8);
	//visibility: hidden;
	pointer-events: none;
	z-index: -1;
`

const on = css`
	visibility: visible;
	pointer-events: auto;
	z-index: 100;
	opacity: 1;
	transform: translate(-50%, -50%) scale(1, 1);
	transition: transform 0.3s cubic-bezier(0.405, 0.420, 0.135, 1.200) 0s;
`

const off = css `
	visibility: visible;
	pointer-events: auto;
	z-index: 100;
	opacity: 0;
	transform: translate(-50%, -50%) scale(0.8, 0.8);
	transition: transform 0.3s, opacity 0.3s;
`
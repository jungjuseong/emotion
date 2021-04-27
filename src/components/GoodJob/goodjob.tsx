import React from 'react';
import { observable } from 'mobx';
import * as _ from "lodash";

import './goodjob.scss';

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
	let class_name;
	
	if (view && m_off) class_name = 'common_goodjob off';
	else if(view) class_name = 'common_goodjob on';

	console.log(class_name);
	return (
		<div className={class_name} />
	);
	
}

GoodJob.defaultProps = {
    delay: 800,
};
import * as React from 'react';

export interface INItem {
	className?: string;
	idx: number;
	on: boolean;
	onClick: (idx: number) => void;

}

export function NItem(props:INItem){
	const _click = () => {
		props.onClick(props.idx);
	}
	return(
		<span 
		className={(props.className ? props.className : '') + (props.on ? ' on' : '')} 
		onClick={_click}
		>
			{props.idx + 1}
		</span>
	)
}


export default NItem;
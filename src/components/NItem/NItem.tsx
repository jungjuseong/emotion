import * as React from 'react';

export type NItemProps = {
	className?: string;
	idx: number;
	on: boolean;
	onClick: (idx: number) => void;

}

export const NItem = (props:NItemProps) => {
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
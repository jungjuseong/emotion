import * as React from 'react';
import { observable, action } from 'mobx';
import { observer } from 'mobx-react';

export type ToggleBtnProps = {
	id?: string;
	useMap?: string;
	class_name?: string;
	on?: boolean;
	disabled?: boolean;
	view?: boolean;
	preventEvent?: boolean;
	style?: React.CSSProperties;
	onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
	onMouseDown?: (evt: Event) => void;
	onMouseUp?: (evt: Event) => void;
	onMouseLeave?: (evt: Event) => void;
	onTransitionEnd?: (evt: React.TransitionEvent<HTMLElement>) => void;
	onRef?: (el: HTMLElement) => void;
	disableCapture?: boolean;	
}

export const ToggleBtn = (props:ToggleBtnProps) => {
	let m_el:HTMLElement;

	const [m_pID, setPid] = React.useState(-1);
	let m_on = props.on;

	React.useEffect(() => {
		if(m_pID >= 0 ) {
			try {
				if(m_el) m_el.releasePointerCapture(m_pID);
			} catch (e) {}
			setPid(-1);
		}
		m_on = props.on;
	}, [props.disabled, props.view, props.on]);

	const _inited = (el: HTMLElement|null) => {
		if(m_el || !el) return;

		m_el = el;
		if(props.onRef) props.onRef(el);
		el.setAttribute('touch-action', 'none');

		el.addEventListener('pointerdown', (evt) => {
			if (m_pID >= 0) return;
			setPid(evt.pointerId);
			if(!props.disableCapture) {
				try {el.setPointerCapture(m_pID);} catch (e) {}
			}
			if(props.onMouseDown) props.onMouseDown(evt);
		});	
	
		el.addEventListener('pointerup', (evt) => {
			if (m_pID !== evt.pointerId) return;
			try {el.releasePointerCapture(m_pID);} catch (e) {}
			setPid(-1);
			if(props.onMouseUp) props.onMouseUp(evt);
		});

		el.addEventListener('pointerleave', (evt) => {
			if(props.disableCapture) {
				if (m_pID !== evt.pointerId) return;
				try {el.releasePointerCapture(m_pID);} catch (e) {}
				setPid(-1);
			}
			if(props.onMouseLeave) props.onMouseLeave(evt);
		});

		el.addEventListener('pointercancel', (evt) => {
			if (m_pID !== evt.pointerId) return;
			try {el.releasePointerCapture(m_pID);} catch (e) {}
			setPid(-1);
			if(props.onMouseLeave) props.onMouseLeave(evt);
		});

	}
	const _onClick = (evt: React.MouseEvent<HTMLElement>) => {
		if(props.onClick) props.onClick(evt);
		if(props.preventEvent) {
			evt.preventDefault();
			evt.stopPropagation();
		}
	}

	const arr: string[] = [];
	if(props.class_name) arr.push(props.class_name as string);
	if(m_on) arr.push('on');
	if(m_pID > 0) arr.push('down');
	
	const local_class_name = arr.join(' ');
	let style = props.style;
	if(props.view === false) {
		if(!style) style = {};
		style.display = 'none';
	}

	console.log("className:", local_class_name)
	return (
		<button 
			id={props.id} 
			className={local_class_name} 
			onClick={_onClick}
			ref={_inited} 
			disabled={props.disabled}
			draggable={false}
			onTransitionEnd={props.onTransitionEnd}
			style={style}
		/>
	);
	
}
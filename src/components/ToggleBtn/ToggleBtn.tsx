import * as React from 'react';
import {css} from '@emotion/react'

export type ToggleBtnProps = {
	/**버튼 ID */
	id?: string;
	/**버튼 이름 */
	class_name?: string;
	/**토글 ON 여부 */
	on?: boolean;
	/**버튼 비활성화 여부 */
	disabled?: boolean;
	/**버튼 노출 여부 */
	view?: boolean;
	/**클릭 이벤트 */
	onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
	
	preventEvent?: boolean;
	style?: any;

	/*useMap?: string;
	onMouseDown?: (evt: Event) => void;
	onMouseUp?: (evt: Event) => void;
	onMouseLeave?: (evt: Event) => void;
	onTransitionEnd?: (evt: React.TransitionEvent<HTMLElement>) => void;
	onRef?: (el: HTMLElement) => void;
	disableCapture?: boolean;*/

	/**기본이미지 */
	src?:string;
	/**ON상태 이미지 */
	srcOn?:string;
	/**누르고있을때 이미지 */
	srcDown?:string;
	/**비활성 상태 이미지 */
	srcDis?:string;
	/**넓이 */
	width?:string;
	/**높이 */
	height?:string;
}

export const ToggleBtn = (props:ToggleBtnProps) => {
	let m_el:HTMLElement;

	//const [m_pID, setPid] = React.useState(-1);
	let m_on = props.on;

	React.useEffect(() => {
		/*if(m_pID >= 0 ) {
			try {
				if(m_el) m_el.releasePointerCapture(m_pID);
			} catch (e) {}
			setPid(-1);
		}*/
		m_on = props.on;
	}, [props.disabled, props.view, props.on]);

	/*const _inited = (el: HTMLElement|null) => {
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

	}*/
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
	//if(m_pID > 0) arr.push('down');
	
	const local_class_name = arr.join(' ');
	let style = props.style;
	/*if(props.view === false) {
		if(!style) style = {};
		style.display = 'none';
	}*/

	const btnStyle = css`
		touch-action: none;
		padding: 0px;
		border: none;
		background-color: transparent;
		outline: none;
		background-image: url(${props.src});
		background-repeat: no-repeat;
		width: ${props.width};
		height: ${props.height};
		cursor: pointer;
		display:${props.view===false? 'none': 'inline'};	
		&.on{
			background-image: url(${props.srcOn});
			//pointer-events: none;
			cursor: auto;
		}
		&:active{
			background-image: url(${props.srcDown ? props.srcDown: props.src});
		}
		&:disabled{
			background-image: url(${props.srcDis});
			pointer-events: none;
			cursor: auto;
		}
		&:before{
			position:absolute; 
			pointer-events:none; 
			width:0px; height:0px; 
			visibility: hidden;
			overflow:hidden; 
			z-index:-1;
			content:url(${props.src}) url(${props.srcDown}) url(${props.srcOn}) url(${props.srcDis});
		}
	`

	//console.log("className:", local_class_name)
	//console.log(btnStyle)
	//console.log(props.style)
	return (
		<button 
			id={props.id} 
			className={local_class_name} 
			onClick={_onClick}
			//ref={_inited} 
			disabled={props.disabled}
			draggable={false}
			//onTransitionEnd={props.onTransitionEnd}
			style={style}
			css={[btnStyle,style]}
		/>
	);
}

ToggleBtn.defaultProps = {
	view:true,
	disabled:false,
	on:false,
}

import * as React from 'react';
//import * as ReactDOM from 'react-dom';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import {css} from '@emotion/react'

//import * as _ from 'lodash';
import ReactResizeDetector from 'react-resize-detector';
import { View } from 'src/components/View/View';

export type WrapTextProps = {
	children?: JSX.Element;
	className?: string;
	view: boolean;
	maxSize?: number;
	minSize?: number;
	lineHeight?: number;
	maxLineNum?: number;      					// minSize로 바꿀 최대 라인 수
	textAlign?: 'left'|'center'|'right';
	rcalcNum?: number;
	viewWhenInit?: boolean;
	onRef?: (el: HTMLElement) => void;
	onClick?: (evt?: React.MouseEvent<HTMLElement>) => void;
}

export const WrapTextNew = (props:WrapTextProps) => {

	const [_width, setWidth] = React.useState(0);
	const [_fontSize, setFontSize] = React.useState(0);

	let _div: HTMLDivElement|null = null;
	let _bndW = 0;

	let _myW = 0;
	let _numOfLine = 0;

	()=>setFontSize(props.maxSize ? props.maxSize : 0)

	const _ref = (div: HTMLDivElement) => {
		if(_div || !div) return;
		_div = div;
		if(props.onRef) props.onRef(div);
	}
	
	const _canCalc = () => {
		if(!props.view) return false;
		else if(_myW <= 0) return false;
		else if(!_div) return false;
		else if(_width > 0) return false;
		else return true;	
	}

	const _aniFrame = (f: number) => {
		if(!_canCalc()) return;

		_calc();
		window.requestAnimationFrame(_aniFrame);
	}

	const _calc = () => {
		if(!_canCalc()) return;
		else if(!_div) return;

		const  brect = _div.getBoundingClientRect();

		const gap = (_myW - brect.width);

		// console.log('calc gap', this._myW, brect);

		if(gap < -1 || gap > 1) {
			return;
		}

		const childs = _div.childNodes;

		const len = childs.length;
		if(len === 0) return;
		
		let numLine = 0;

		let middle = -100;
		let left = Number.MAX_SAFE_INTEGER;
		let right = Number.MIN_SAFE_INTEGER;
		let cntIdx = 0;

		childs.forEach((node, idx) => {
			let marginR = 0;
			let marginL = 0;
			if(node instanceof HTMLElement) {
				const el = node as HTMLElement;
				const s = window.getComputedStyle(el);
				
				if(s.position === 'absolute') {
					//
				} else if(s.display === 'inline') {
					let mr = s.marginRight ? parseInt(s.marginRight, 10) : 0;
					let ml = s.marginLeft ? parseInt(s.marginLeft, 10) : 0;
					if(isNaN(mr)) mr = 0;
					if(isNaN(ml)) ml = 0;

					const rects = el.getClientRects();

					for(let i = 0; i < rects.length; i++) {
						const rect = rects.item(i);
						if(!rect) continue;
						const rtop = rect.top;
						const rbottom = rect.bottom;
						const rleft = rect.left - ml;
						const rright = rect.right + mr;
		
					
						if(cntIdx === 0) {
							middle = (rtop + rbottom) / 2;
							numLine = 1;
						} else {
							if(middle < rtop || middle > rbottom) {
								middle = (rtop + rbottom) / 2;
								numLine++;					
							}
						}
					
						left = Math.min(left, rleft);
						right = Math.max(right, rright);

						cntIdx++;
					}
				
				} else {
					let rect = el.getBoundingClientRect();

					let mr = s.marginRight ? parseInt(s.marginRight, 10) : 0;
					let ml = s.marginLeft ? parseInt(s.marginLeft, 10) : 0;
					if(isNaN(mr)) mr = 0;
					if(isNaN(ml)) ml = 0;
					marginR = mr;
					marginL = ml;

					const rtop = rect.top;
					const rbottom = rect.bottom;
					const rleft = rect.left - marginL;
					const rright = rect.right + marginR;
	
					if(rbottom - rtop > 0) {
						if(cntIdx === 0) {
							middle = (rtop + rbottom) / 2;
							numLine = 1;
						} else {
							if(middle < rtop || middle > rbottom) {
								middle = (rtop + rbottom) / 2;
								numLine++;					
							}
						}
		
						left = Math.min(left, rleft);
						right = Math.max(right, rright);

						cntIdx++;
					}
				}

			} else {
				const range = document.createRange();
				range.selectNodeContents(node);
				const rects = range.getClientRects();

				for(let i = 0; i < rects.length; i++) {
					const rect = rects.item(i);
					if(!rect) continue;
					const rtop = rect.top;
					const rbottom = rect.bottom;
					const rleft = rect.left;
					const rright = rect.right;
	
				
					if(cntIdx === 0) {
						middle = (rtop + rbottom) / 2;
						numLine = 1;
					} else {
						if(middle < rtop || middle > rbottom) {
							middle = (rtop + rbottom) / 2;
							numLine++;					
						}
					}
	
					left = Math.min(left, rleft);
					right = Math.max(right, rright);

					cntIdx++;
				}
			}
	
		});
		_numOfLine = numLine;

		// console.log(this.props.maxLineNum, this.props.maxLineNum < 1); 
		let maxLineNum = props.maxLineNum ? props.maxLineNum : 1;
		if(maxLineNum < 1) maxLineNum = 1;

		// console.log(' canc, numLine', this._fontSize, numLine);
		if(numLine > maxLineNum) {
			const minSize = props.minSize ? props.minSize : 0;
			if(_fontSize > 0 && minSize > 0 && _fontSize > minSize) {
				setFontSize(_fontSize-1)
			} else setWidth(Math.ceil(right - left + 2));
		} else if(cntIdx > 0) {
			setWidth(Math.ceil(right - left + 2));
		}

	}

	const _resized = (w: number, h: number) => {
		_myW = w;
		window.requestAnimationFrame(_aniFrame);
	}

	//확인필요
	React.useEffect(() => {
		if(props.view) {
			setFontSize(props.maxSize ? props.maxSize : 0)
			setWidth(0)
			window.requestAnimationFrame(_aniFrame);
		} else if(!props.view) {
			setWidth(0)
		}
		console.log("chView"+props.view+" width = "+_width)
	},[props.view]);

	React.useEffect(()=>{
		if(props.view && props.rcalcNum) {
			setFontSize(props.maxSize ? props.maxSize : 0)
			setWidth(0)
			window.requestAnimationFrame(_aniFrame);
		}
		console.log("chRcalcNum"+props.rcalcNum)
	},[props.rcalcNum])

	React.useEffect(()=>{
		if(_fontSize === 0 && props.maxSize) {
			setFontSize(props.maxSize)
		}
		console.log("chfontSize"+_fontSize)
	},[props.maxSize])

		const style = css`
			white-space: normal;
			display: inline-block;
			width:${_width > 0 ? _width+'px' : '100%'};
			text-align:${props.textAlign ? props.textAlign : _numOfLine <= 1 ? 'center':'left' };
			font-size:${_fontSize > 0 ? _fontSize + 'px' : ''};
			line-height: ${props.lineHeight ? props.lineHeight + '%' : ''};
		`
		
		/*const style: React.CSSProperties = {
			whiteSpace: 'normal',
		};
		// console.log('render', this._fontSize);
		if(_fontSize > 0) style.fontSize = _fontSize + 'px';
		if(props.lineHeight) style.lineHeight = props.lineHeight + '%';

		// console.log(' render', this._fontSize);

		let textAlign: 'left'|'center'|'right';
		if(_width > 0) {
			style.width = _width + 'px';
			style.display = 'inline-block';

			
			if(props.textAlign) textAlign = props.textAlign;
			else if(_numOfLine <= 1) textAlign = 'center';
			else textAlign = 'left';

			style.textAlign = textAlign;
		} else {
			style.width = '100%';
			style.display = 'inline-block';
			if(!props.viewWhenInit) style.opacity = 0.01;

			if(props.textAlign) textAlign = props.textAlign;
			else if(_numOfLine <= 1) textAlign = 'center';
			else textAlign = 'left';

			style.textAlign = textAlign;
		}*/

		return (
				<div 
					css={[
						style,
					]}
					ref={_ref} className={props.className} onClick={props.onClick}>
					{props.children}
					<ReactResizeDetector handleWidth={true} handleHeight={true} onResize = {()=>_resized}/>
				</div>
		);


}
import * as React from 'react';
import * as _ from 'lodash';
import {css} from '@emotion/react';
//import { App } from '../../App';


export enum RunState {
	INIT,
	RUNNING,
	PAUSE,
}


export class TimerState extends React.Component{
	state = {
		m_runState: RunState.INIT,
		m_max: 60
	}
	private m_playSound = true;

	constructor(max: number){
		super(max);
		this.state.m_max = max;
	}

	setRun = (_runState:RunState) => {
		this.setState({
			m_runState: _runState 
		})
	}
	setMax = (_max:number)=>{
		this.setState({
			m_max: _max
		})
	}
	setPlaySound = (v: boolean) => {this.m_playSound=v}

	public get runState(){return this.state.m_runState}
	public get max(){return this.state.m_max}
	public get isRunning(){return this.state.m_runState === RunState.RUNNING}
	public get playSound(){return this.m_playSound}
	
}


export type ITimer = {
     state: TimerState;
     view: boolean;
     onComplete: () => void;
	 onStart?: () => void;
	 
	 timerRadius?: number|null;
}


function _pToC(cX: number, cY: number, r: number, deg: number) {
     let rad = (deg - 90) * Math.PI / 180.0;
     return {
         x: cX + (r * Math.cos(rad)),
         y: cY + (r * Math.sin(rad))
     };
}


function _dArc(cX: number, cY: number, r: number, sdeg: number, edeg: number) {

	let d;
	if(edeg - sdeg >= 360) {
		d = [
			'M', cX, cY,
			'm', -r, 0,
			'a', r, r, 0, '1', 0, r * 2, 0,
			'a', r, r, 0, '1', 0, -r * 2, 0
		].join(' ');
	} else {
		let largeFlag = edeg - sdeg <= 180 ? '0' : '1';
		let sPt = _pToC(cX, cY, r, edeg);
		let ePt = _pToC(cX, cY, r, sdeg);
		d = [
		'M', sPt.x, sPt.y,
		'A', r, r, 0, largeFlag, 0, ePt.x, ePt.y,
		'L', cX, cY,
		'L', sPt.x, sPt.y,
		].join(' ');
	}
	return d;
}


export const Timer = (props:ITimer) => {

	const [m_text,setText] = React.useState('')
	const [m_d,setD] = React.useState('')
	const [stroke,setStroke] = React.useState('#ff0')

    let m_runState = RunState.INIT;
    let m_sec = 0;
    let m_stime = 0;

	const _arcR = props.timerRadius ? props.timerRadius : 32;
	const _arcC = _arcR;
	const _arcWH = 2 * _arcC;

    //let _drawArc: _.DebouncedFunc<(time: number) => void>;
 

	React.useEffect(()=>{
		setText(_getTime(props.state.max));
		setD('');
		console.log("useEffect1")		 
	},[])

	React.useEffect(()=>{
		console.log("useEffect2")
		if(!props) return;
		const state = props.state.state;
		const max = state.m_max;
		console.log(state)
		console.log(state.m_runState)
		if(state.m_runState === RunState.RUNNING && m_runState !== RunState.RUNNING) {
			m_runState = RunState.RUNNING;
			_start();
		} else if(state.m_runState === RunState.INIT) {
			setText(_getTime(max));
			setD('');
		}
		m_runState = state.m_runState;
			
			
	},[props.state]);

	const _drawArc = _.throttle((time: number) => {
		if(!props || m_runState !== RunState.RUNNING) return;

		const max = props.state.state.m_max * 1000;
		let angle = 0;
		if( m_sec <= 5 ) {
			const d = time % 1000;
			if( time === 0 ) angle = 0;
			else if( d === 0) angle = 1;
			else angle = d / 1000;
		} else {
			angle = time / max;
		}
		angle = angle * 360;
			
		setD(_dArc(_arcC, _arcC, _arcR, 0, angle));
	}, 50, {trailing: true});


    const _start = () => {
         // this.m_cnt = this.props.state.max;
        m_sec = props.state.state.m_max;
        setText(_getTime(m_sec));
        setD('');
        m_stime = Date.now();
        _run(0);

		if(props.onStart) props.onStart();
    }


    const _run = (f: number) => {
        if(!props || m_runState !== RunState.RUNNING) return;

        const max = props.state.state.m_max;

        const time = Date.now() - m_stime;
        const sec = max - Math.floor(time / 1000);
        if(m_sec !== sec) {
            setText(_getTime(sec));
            /*if(sec === 0) {
        	    if(props.state.playSound) App.pub_playDingend();
            }else if( sec < 5 ) {
                if(props.state.playSound) App.pub_playDing();
            }else if( sec >= 5 &&  sec <= 10) {
                if(props.state.playSound) App.pub_playClock();
        	}*/
        }
        m_sec = sec;
		
		setStroke((m_sec <= 5) ? '#f00' : '#ff0');
		console.log("color = " + stroke)
        if(sec > 0) {
            _drawArc(time);
            window.requestAnimationFrame(_run);
        }else {
			_drawArc.cancel();
			setD(_dArc(_arcC, _arcC, _arcR, 0, 360));
			props.onComplete();
        }
    }


	const _getTime = (t: number) => {
		const m = Math.floor(t / 60);
		const s = t % 60;

		let ret = '';
		if(m < 10) ret = '0' + m;
		else ret = '' + m;
		if(s < 10) ret = ret + ':0' + s;
		else ret = ret + ':' + s;
		return ret;
	}

    return (
        <div className="q_timer" hidden={!props.view} >
            <svg  width={_arcWH} height={_arcWH} viewBox={'0 0 ' + _arcWH + ' ' + _arcWH}>
                <path fill={stroke} d={m_d}/>
            </svg>
        	<div className="m_text" css={[
				css`
					//background-color:gray;
				`
			]}>{m_text}</div>
        </div>
    ); 
}


const _START = -0.5 * Math.PI;

export const CountDown2 = (props:ITimer) => {

	const [m_sec, setSec] = React.useState(0)
	const [m_view, setView] = React.useState(false)

	let m_runState = RunState.INIT;
	let m_stime = 0;

	let m_canvas!: HTMLCanvasElement;
	let m_ctx!: CanvasRenderingContext2D;
	let m_r: number = 0;
	
	
	React.useEffect(()=>{
		setSec(props.state.max);
		setView(props.view);
	},[])
	
	React.useEffect(()=>{
		if(!props) return;
		const state = props.state.state;
		if(state.m_runState === RunState.RUNNING && m_runState !== RunState.RUNNING) {
			m_runState = RunState.RUNNING;
			_start();
		} else if(state.m_runState === RunState.INIT && m_runState !== RunState.INIT) {
				setSec(state.m_max);
			if(m_ctx) {
				const r = m_r;
				m_ctx.clearRect(0, 0, 2 * r, 2 * r);
			}
		}
		m_runState = state.m_runState;
				// console.log('Timer ' + this.props.state.isRun);
	})


	const _drawArc = _.throttle((time: number) => {
		if(!m_canvas || !props || m_runState !== RunState.RUNNING) return;

		const angle = 2 * Math.PI * time / 1000;
		const r = m_r;

		m_ctx.clearRect(0, 0, 2 * r, 2 * r);
		m_ctx.beginPath();
		/*this.m_ctx.fillStyle = '#5538EB';*/
		m_ctx.fillStyle = 'rgb(255, 231, 73)';
		m_ctx.moveTo(r, r);
		m_ctx.arc(r, r, r, _START, angle + _START);
		m_ctx.fill();
	}, 50);
		
	
	const _start = () => {
		// this.m_cnt = this.props.state.max;
		setSec(props.state.state.m_max);
		m_stime = Date.now();
		_run(0);

		if(props.onStart) props.onStart();
	}

	const _run = (f: number) => {
		if(!props || m_runState !== RunState.RUNNING) return;

		const time = Date.now() - m_stime;
		const sec = props.state.state.m_max - Math.floor(time / 1000);
		if(m_sec !== sec) {
			setSec(sec);
			/*if(sec === 0) {
				if(props.state.playSound) App.pub_playDingend();

				props.onComplete();
			} else if( sec <= 5 ) {
				if(props.state.playSound) App.pub_playDing();
			}*/
		}
		if(sec > 0) {
			_drawArc(time % 1000);
			window.requestAnimationFrame(_run);
		} else {
			_drawArc(1000);
		}
	}
	const _refCanvas = (el: HTMLCanvasElement|null) => {
		if(m_canvas || !el) return;
		m_canvas = el;
		m_r = el.width / 2;
		m_ctx = el.getContext('2d') as CanvasRenderingContext2D;
	}

	/*React.useEffect(() => {
		if(props.view) {
			setView(true);
		} else {
			// this.m_view = false;
		}
	},[props.view])*/
	
	const _onTransEnd = () => {
		if(!props.view) setView(false);
	}

	return (
		<div className={'countdown2 ' + (m_view ? '' : 'hide')}>
			<div className={'countdown ' + (props.view ? 'view' : 'hide')} onTransitionEnd={_onTransEnd}>
				<canvas width="206px" height="206px" ref={_refCanvas}/>
				<div><div>{m_sec}</div></div>
			</div>
		</div>
	);
	
}


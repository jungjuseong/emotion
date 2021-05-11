import * as React from 'react';
import * as _ from 'lodash';
import { Observer, observer } from 'mobx-react';

import { IStateCtx, IActionsCtx, SENDPROG, BTN_DISABLE } from './t_store';
import { App } from '../../App';
import * as felsocket from '../../felsocket';
import { ToggleBtn } from '@common/component/button';
import NItem from '@common/component/NItem';
import * as kutil from '@common/util/kutil';
import * as common from '../common';
import { observable, makeObservable } from 'mobx';
import { CoverPopup } from '../../share/CoverPopup';
import SendUI from '../../share/sendui_new';
import * as style from '../../share/style';
import { MPlayer, MConfig, IMedia, MPRState } from '@common/mplayer/mplayer';
import { CountDown2, TimerState } from '../../share/Timer';
import Yourturn from '../../share/yourturn';

const SwiperComponent = require('react-id-swiper').default;

interface ITrans {
	view: boolean;
	scripts: common.IScript[];
	onClosed: () => void;
}
@observer
const TransPopup =(props:ITrans) => {
	const [m_view,setView] = React.useState(false)
	const [_swiper,setSwiper] = React.useState(null)//확인필요

	const _refSwiper = (el: SwiperComponent) => {
		if(_swiper || !el) return;
		_swiper = el.swiper;
	}
	const _onClose = () => {
		App.pub_playBtnTab();
		m_view = false;
	}
	public componentDidUpdate(prev: ITrans) {
		if (props.view && !prev.view) {
			m_view = true;
			if(_swiper) {
				_swiper.slideTo(0, 0);
			}
			_.delay(() => {
				if(_swiper) {
					_swiper.update();
					if(_swiper.scrollbar) _swiper.scrollbar.updateSize();
					_swiper.slideTo(0, 0);
				}
			}, 500);
		} else if (!props.view && prev.view) {
			m_view = false;
		}
	}
	public render() {
		const { view, scripts } = props;
		return (
			<CoverPopup className="trans_popup" view={props.view && m_view} onClosed={props.onClosed} >
				<span className="title">TRANSLATION</span><ToggleBtn className="btn_close" onClick={_onClose} />
				<div className="trans_script">
					<SwiperComponent
						ref={_refSwiper}
						direction="vertical"
						scrollbar={{ el: '.swiper-scrollbar', draggable: true,}}
						observer={true}
						slidesPerView="auto"
						freeMode={true}						
					>
						{scripts.map((script, idx) => {
							return (
							<div key={idx} className="script_eng">
								{script.dms_eng}
								<div>{script.dms_kor.ko}</div>
							</div>
							);
						})}
					</SwiperComponent>
				</div>
			</CoverPopup>
		);
	}
}
interface IPopupItem {
	type: 'off'|'READALOUD'|'SHADOWING'|'QNA';
	view: boolean;
	onClosed: () => void;
	onSend: () => void;
}
@observer
class PassagePopup extends React.Component<IPopupItem> {
	@observable const m_view = false;

	constructor(props: IPopupItem) {
		super(props);
		makeObservable(this);
	}

	const _onClose = () => {
		App.pub_playBtnTab();
		m_view = false;
	}
	public componentDidUpdate(prev: IPopupItem) {
		if (props.view && !prev.view) {
			m_view = true;
		} else if (!props.view && prev.view) {
			m_view = false;
		}
	}
	public render() {
		let title;
		if(props.type === 'READALOUD') title = 'READ ALONG';
		else if(props.type === 'SHADOWING') title = 'LISTEN & REPEAT';
		else if(props.type === 'QNA') title = 'Q & A';
		else title = props.type;

		return (
			<CoverPopup className={'passage_popup ' + props.type} view={props.view && m_view} onClosed={props.onClosed} >
				<span>{title}</span><ToggleBtn className="btn_close" onClick={_onClose} />
				<div className="popup_content">
					<span>Read along together.</span>
					<span>Listen and repeat.</span>
					<span>Do you have any questions?</span>
				</div>
				<SendUI
					view={props.view}
					type={'teacher'}
					sended={false}
					originY={0}
					onSend={props.onSend}
				/>
			</CoverPopup>
		);
	}
}
interface IImgPassage { 
	view: boolean;
	passage: common.IPassage;
	onClosed: () => void;
}
@observer
class ImgPassage extends React.Component<IImgPassage> {
	@observable const m_view = false;

	constructor(props: IImgPassage) {
		super(props);
		makeObservable(this);
	}

	const _onClose = () => {
		App.pub_playBtnTab();
		m_view = false;
	}
	public componentDidUpdate(prev: IImgPassage) {
		if(props.view && !prev.view) {
			m_view = true;
		} else if(!props.view && prev.view) {
			m_view = false;
		}
	}
	public render() {
		const { passage } = props;
		return (
			<CoverPopup className="img_passage" view={m_view} onClosed={props.onClosed}>
				<img src={App.data_url + passage.image} draggable={false} />
				<ToggleBtn className="btn_close" onClick={_onClose} />
			</CoverPopup>
		);
	}
}

interface IScriptItem {
	script: common.IScript;
	curSeq: number;
	retCnt: number;
	qnaRet: common.IQnaReturn;
	viewReturn: boolean;
	onChoose: (script: common.IScript) => void;
}
@observer
class ScriptItem extends React.Component<IScriptItem> {
	
	const _clickReturn = () => {
		if(props.viewReturn) {
			App.pub_playBtnTab();
			felsocket.startStudentReportProcess($ReportType.JOIN, props.qnaRet.users);	
		}
	}
	const _onClick = (evt: React.MouseEvent) => {
		
		if(evt.target && evt.target instanceof HTMLElement) {
			const el = evt.target as HTMLElement;
			if(el.classList && el.classList.contains('ret-num')) return; 
		}
		props.onChoose(props.script);
	}
	// 	script.seq === curSeq ? 'on' : '' 
	public render() {
		const { script, curSeq, qnaRet, retCnt, viewReturn } = props;
		const arr: string[] = [
			'script_line', 
			(script.seq === curSeq) ? 'on' : ''
		];
		return (
			<span id={'script_' + script.seq} className={arr.join(' ')} onClick={_onClick}>
				<span onClick={_clickReturn} className="ret-num" style={{display: viewReturn && qnaRet.num > 0 ? '' : 'none'}}>{qnaRet.num}</span>
				<span className="ret-cnt" style={{display: 'none'}}>{retCnt}</span>
				{/* {script.dms_eng} */}
				<span dangerouslySetInnerHTML={{__html: script.dms_passage}}/>
			</span>
		);
	}
}

interface IInfo {
	passage: common.IPassage;
	scripts: common.IScript[];
	qnaRets: common.IQnaReturn[];
}
interface IPASSAGE {
	view: boolean;
    videoPopup: boolean;
    viewStoryBook: boolean;
	studying: boolean;
	inview: boolean;
	data: common.IData;
	state: IStateCtx;
	actions: IActionsCtx;
	onStudy: (studying: BTN_DISABLE) => void;
	onSetNavi: (title: 'COMPREHENSION', tab: 'WARMUP'|'QUESTION') => void;
}

const PASSAGE = (props:IPASSAGE) => {
	const [_curIdx,setCurIdx] = React.useState(0)
	const [_curSeq,setCurSeq] = React.useState(-1)
	const [_zoom,setZoom] = React.useState(false)
	const [_pass_pop,setPassPop] = React.useState('off')// 'off'|'READALOUD'|'SHADOWING'|'QNA'
	const [_studyDiv,setStudyDiv] = React.useState('off')// 'off'|'READALOUD'|'SHADOWING'|'QNA'
	const [_trans,setTrans] = React.useState(false)
	const [_prog,setProg] = React.useState(SENDPROG.READY)
	const [_studyProg,setStudyProg] = React.useState(SENDPROG.READY)
	const [_retCnt,setRetCnt] = React.useState(0)
	const [_numOfStudent,setNumOfStudent] = React.useState(0)
	const [_audioOn,setAudioOn] = React.useState(false)
	const [_viewCountDown,setViewCountDown] = React.useState(false)
	const [_yourturn,setYourturn] = React.useState(-1)
	const [_ytNext,setYtNext] = React.useState(-1)
	const [_opt,setOpt] = React.useState(true)

	const _player = new MPlayer(new MConfig(false));
	const _swiper: Swiper|null = null;

	const _countdown = new TimerState(3);

	const _infos: IInfo[] = [];
	const _retUsers: string[] = [];

	React.useEffect(()=>{
		const passages = props.data.passage;
		const scripts = props.data.scripts;

		for(let i = 0; i < passages.length; i++) {
			const passage = passages[i];
			const info: IInfo = {
				passage,
				scripts: [],
				qnaRets: [],			
			};

			for(let j = 0; j < scripts.length; j++) {
				if(scripts[j].passage_page === passage.page) {
					info.scripts.push(scripts[j]);
					info.qnaRets.push({num: 0, users: []});
				}
			}
			_infos.push(info);
		}
	},[])

	const _refAudio = (audio: HTMLAudioElement|null) => {
		if(!audio || _player.media) return;
		_player.mediaInited(audio as IMedia);

		_player.load(App.data_url + props.data.audio);

		_player.addOnTime((time: number) => {
			// console.log(time);
			if(_studyDiv === 'READALOUD') {
				const scrs = _infos[_curIdx].scripts;
				time = time / 1000;
				let seq = -1;
				const len = scrs.length;
				for(let i = 0; i < len; i++) {
					const script = scrs[i];
					if(time >= script.audio_start && time <= script.audio_end) {
						seq = script.seq;
						break;
					}
				}
				if(seq >= 0 && seq !== _curSeq) {
					setCurSeq(seq);
					const msg: common.IMsgForIdx = {msgtype: 'focusidx',idx: seq,};
					felsocket.sendPAD($SocketType.MSGTOPAD, msg);
					_transAt(seq);
				}
			} else if((_studyDiv === 'off' || _studyDiv === 'QNA') && _audioOn) {
				const scrs = props.data.scripts;
				time = time / 1000;
				let seq = -1;
				let page = -1;
				const len = scrs.length;
				for(let i = 0; i < len; i++) {
					const script = scrs[i];
					if(time >= script.audio_start && time <= script.audio_end) {
						seq = script.seq;
						page = script.passage_page;
						break;
					}
				}
				if(seq >= 0 && seq !== _curSeq) {
					if(page >= 0 && page > (_curIdx + 1)) {
						// _initAll();
						setCurIdx(page - 1)
						// await kutil.wait(300);
						if(_swiper) {
							_swiper.update();
							if(_swiper.scrollbar) _swiper.scrollbar.updateSize();
						}
					}
					setCurSeq(seq);	
					const msg: common.IMsgForIdx = {msgtype: 'focusidx',idx: seq,};
					felsocket.sendPAD($SocketType.MSGTOPAD, msg);
					_transAt(seq);
				}
			} 
		});

		_player.addOnPlayEnd(() => {
			if(_studyDiv === 'READALOUD') {
				// props.onStudy('');
				const msg: common.IMsg = {msgtype: 'dialogue_end'};
				felsocket.sendPAD($SocketType.MSGTOPAD, msg);	
			} else if(_studyDiv === 'SHADOWING') {
				if(_handleYourTurn(true)) return;
			}
			
			setAudioOn(false)
			setCurSeq(-1)
			// _studyDiv = 'off';
		});

		_player.addOnPlayEndTemp(() => {
			if(_studyDiv === 'READALOUD') {
				setCurSeq(-1);
				// _studyDiv = 'off';	
				// props.onStudy('');
				const msg: common.IMsg = {msgtype: 'dialogue_end'};
				felsocket.sendPAD($SocketType.MSGTOPAD, msg);		
			} else if(_studyDiv === 'SHADOWING') {
				if(_curSeq < 0) return;
				_handleYourTurn(false);
			} else {
				if(_audioOn) setAudioOn(false);
				setCurSeq(-1);
			}

		});
		_player.addOnState((newState: MPRState, oldState: MPRState) => {
			if(_studyDiv !== 'SHADOWING' && _studyDiv !== 'READALOUD') return;
			let msgtype: 'playing'|'paused';
			if(_studyDiv === 'SHADOWING' && _yourturn >= 0) msgtype = 'playing';
			else if(newState !== MPRState.PAUSED && _player.bPlay) msgtype = 'playing';
			else msgtype = 'paused';
			const msg: common.IMsg = {
				msgtype,
			};
			felsocket.sendPAD($SocketType.MSGTOPAD, msg);
		});
	}
	const _handleYourTurn = (forceEnd: boolean) => {
		if(_curSeq < 0) return false;
		const scrs = _infos[_curIdx].scripts;
		let idx = -1;
		for(let i = 0; i < scrs.length; i++) {
			if(scrs[i].seq === _curSeq) {
				idx = i;
				break;
			}
		}
		if(idx < 0) return false;
		const cur = scrs[idx];
		const next = (idx < scrs.length - 1) ? scrs[idx + 1] : null;
		const delay = (cur.audio_end - cur.audio_start) * 1900;

		const ymsg: common.IMsgForIdx = {msgtype: 'view_yourturn', idx: cur.seq};
		felsocket.sendPAD($SocketType.MSGTOPAD, ymsg);
		
		setYourturn(_.delay(() => {
			
			setYourturn(-1)
			if(_studyDiv !== 'SHADOWING') return;

			_.delay(() => {
				if(_studyDiv !== 'SHADOWING') return;

				if(!next || forceEnd) {
					setCurSeq(-1)
					// _studyDiv = 'off';
					// props.onStudy('');
					const dmsg: common.IMsg = {msgtype: 'dialogue_end'};
					felsocket.sendPAD($SocketType.MSGTOPAD, dmsg);
					
					return;
				}
				setCurSeq(next.seq)

				if(_curSeq >= 0) _transAt(_curSeq);
				const fmsg: common.IMsgForIdx = {msgtype: 'focusidx',idx: next.seq,};
				felsocket.sendPAD($SocketType.MSGTOPAD, fmsg);
				_player.gotoAndPlay(next.audio_start * 1000, next.audio_end * 1000, 1);
			}, 300);
		}, delay))

		const msg: common.IMsg = {
			msgtype: 'playing',
		};
		felsocket.sendPAD($SocketType.MSGTOPAD, msg);	
		return true;	
	}

	const _transAt = (seq: number) => {
		if(!_swiper || !_swiper.wrapperEl)  return;

		const gap = 82;
		const s_box = document.getElementById('script_box');
		const s_bnd = document.getElementById('script-bnd');
		const s_el = document.getElementById('script_' + seq);
		
		if(!s_box || !s_el || !s_bnd) return;
		const boxRect = s_box.getBoundingClientRect();
		const bndRect = s_bnd.getBoundingClientRect();

		const diff = (boxRect.bottom - boxRect.top) - (bndRect.bottom - bndRect.top);
		if( diff >= 0) return;
		const sRect = s_el.getBoundingClientRect();

		if(sRect.top < boxRect.top + gap ) {
			const cur = _swiper.translate;
			let trans = cur + (boxRect.top + gap - sRect.top);
			if(trans > 0) trans = 0;
			_swiper.wrapperEl.style.transitionDuration = '300ms';
			_swiper.setTranslate(trans);
		} else if(sRect.bottom > boxRect.bottom - gap) {
			const cur = _swiper.translate;
			let trans = cur - (sRect.bottom - (boxRect.bottom - gap));
			if(trans < diff) trans = diff;
			_swiper.wrapperEl.style.transitionDuration = '300ms';
			_swiper.setTranslate(trans);
		}		
	}
	const _initAll = () => {
		setPassPop('off')
		setProg(SENDPROG.READY)
		_initStudy();
		felsocket.sendPAD($SocketType.PAD_ONSCREEN, null);
	}
	const _initStudy = () => {
		setZoom(false)
		setStudyDiv('off')
		setTrans(false)
		setStudyProg(SENDPROG.READY)
		setRetCnt(0)
		while(_retUsers.length > 0) _retUsers.pop();

		setAudioOn (false);
		setCurSeq (-1);

		_countdown.pause();
		_countdown.reset();
		setViewCountDown(false);
		if(	_yourturn >= 0) {
			clearTimeout(_yourturn);
			setYourturn(-1);
		}
		if(_player.bPlay) _player.pause();
		if(_swiper) _swiper.slideTo(0);
		
		props.onStudy('');
		props.actions.setQNAFnc(null);
	}
	const _onPage = async (idx: number) => {
		if(props.studying) return;
		if(idx !== _curIdx && idx >= 0 && idx < _infos.length) {
			App.pub_playBtnPage();
			// const info = _infos[idx];

			_initAll();
			setCurIdx(idx);
			await kutil.wait(300);
			if(_swiper) {
				_swiper.update();
				if(_swiper.scrollbar) _swiper.scrollbar.updateSize();
			} 
			if(_swiper) {
				const _slide = _swiper.wrapperEl.scrollHeight;
				if(_slide <= _swiper.height) setOpt(true)
				else setOpt(false);
			}
			// if(_prog === SENDPROG.SENDED)
		}
	}
	
	const _clickReturn = () => {
		App.pub_playBtnTab();
		felsocket.startStudentReportProcess($ReportType.JOIN, _retUsers);		
	}
	const _refSwiper = (el: SwiperComponent) => {
		if(_swiper || !el) return;
		_swiper = el.swiper;
	}
	const _onSend = () => {
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.READY) return;

		setProg(SENDPROG.SENDING);
		App.pub_playToPad();

		setRetCnt(0)
		while(_retUsers.length > 0) _retUsers.pop();
		const msg: common.IMsgForIdx = {msgtype: 'passage_send', idx: _curIdx};
		felsocket.sendPAD($SocketType.MSGTOPAD, msg);
		App.pub_reloadStudents(async () => {
			if(!props.view || !props.inview) return;
			else if(_prog !== SENDPROG.SENDING) return;

			setNumOfStudent(App.students.length)
			await kutil.wait(600);

			if(!props.view || !props.inview) return;
			else if(_prog !== SENDPROG.SENDING) return;

			setProg(SENDPROG.SENDED)
		});
	}
	const _clickTrans = () => {
		App.pub_playBtnTab();
		setTrans(!_trans);
		const msg: common.IMsgForIdx = {msgtype: 'view_trans', idx: _trans ? 1 : 0};
		felsocket.sendPAD($SocketType.MSGTOPAD, msg);		
	}
	const _offTrans = () => {
		setTrans(false)
		const msg: common.IMsgForIdx = {msgtype: 'view_trans', idx: _trans ? 1 : 0};
		felsocket.sendPAD($SocketType.MSGTOPAD, msg);		
	}
	const _clickZoom = () => {
		App.pub_playBtnTab();
		setZoom(_zoom);
		props.actions.setNaviView(false);
	}
	const _offZoom = () => {
		setZoom(false);
		_setNavi();
	}

	const _onPopupClosed = () => {
		setPassPop('off')
		if(_studyDiv === 'off') props.actions.setNaviView(true);
	}
	const _onReadClick = () => {
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.SENDED) return;

		if(_studyDiv === 'READALOUD') {
			App.pub_playBtnTab();
			_initStudy();
			setStudyDiv('off');
			const msg: common.IMsg = {msgtype: 'dialogue_end'};
			felsocket.sendPAD($SocketType.MSGTOPAD, msg);
			props.actions.setNaviView(true);
		} else if(_pass_pop === 'off') {
			App.pub_playBtnTab();
			_initStudy();
			setPassPop('READALOUD')
			props.actions.setNaviView(false);
		}
	}
	const _onShadowClick = () => {
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.SENDED) return;

		if(_studyDiv === 'SHADOWING') {
			App.pub_playBtnTab();
			_initStudy();
			setStudyDiv('off');
			const msg: common.IMsg = {msgtype: 'dialogue_end'};
			felsocket.sendPAD($SocketType.MSGTOPAD, msg);
			props.actions.setNaviView(true);
		} else if(_pass_pop === 'off') {
			App.pub_playBtnTab();
			_initStudy();
			setPassPop('SHADOWING')
			props.actions.setNaviView(false);
		}
	}
	const _onQAClick = () => {
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.SENDED) return;

		if(_studyDiv === 'QNA') {
			App.pub_playBtnTab();
			_initStudy();
			setStudyDiv('off')
			const msg: common.IMsg = {msgtype: 'dialogue_end'};
			felsocket.sendPAD($SocketType.MSGTOPAD, msg);
			props.actions.setNaviView(true);
		} else if(_pass_pop === 'off') {
			App.pub_playBtnTab();
			_initStudy();
			setPassPop('QNA')
			props.actions.setNaviView(false);
		}
	}

	const _setNavi = () => {
		if(_studyDiv !== 'off') props.actions.setNaviView(false);
		else props.actions.setNaviView(true);
		props.actions.setNavi(true, true);

		props.actions.setNaviFnc(
			async () => {
				if(_curIdx === 0) {
					props.state.isNaviBack = true;
					props.onSetNavi('COMPREHENSION','WARMUP');
				} else {
					App.pub_playBtnPage();
					// const info = _infos[_curIdx + 1];
					_initAll();
					setCurIdx(_curIdx - 1)

					await kutil.wait(300);
					if(_swiper) {
						_swiper.update();
						if(_swiper.scrollbar) _swiper.scrollbar.updateSize();
						
						const _slide = _swiper.wrapperEl.scrollHeight;
						if(_slide <= _swiper.height) setOpt(true);
						else setOpt(false);
					}
				}
			},
			async () => {
				if(_curIdx >= _infos.length - 1) {
					props.onSetNavi('COMPREHENSION','QUESTION');
				} else {
					App.pub_playBtnPage();
					// const info = _infos[_curIdx + 1];
					_initAll();
					setCurIdx (_curIdx + 1)
				}
					await kutil.wait(300);
					if(_swiper) {
						_swiper.update();
						if(_swiper.scrollbar) _swiper.scrollbar.updateSize();

						const _slide = _swiper.wrapperEl.scrollHeight;
						if(_slide <= _swiper.height) setOpt(true);
						else setOpt(false);
					}
				}
		);
	}

	React.useEffect(()=>{
		if(props.view){
			_initAll();
			setCurIdx(0)
		}
		else if(!props.view) {
			if(_player.bPlay) _player.pause();
			if(_audioOn) setAudioOn(false)
		}
	},[props.view])

	React.useEffect(()=>{
		if(props.videoPopup) {
			if(props.state.isVideoStudied) props.state.isVideoStudied = false;
			_player.pause();
			setAudioOn(false);
			setCurSeq(-1);
		} else if (!props.videoPopup) {
			if(props.state.isVideoStudied) {
				_initAll();
				setCurIdx(0)
				_.delay( () => {
					if(_swiper) {
						_swiper.update();
						if(_swiper.scrollbar) _swiper.scrollbar.updateSize();
						
					}
				}, 300);
			} 
		}
	},[props.videoPopup])

	React.useEffect(()=>{
		if (!props.videoPopup) _setNavi();
		else if(!props.viewStoryBook) _setNavi();
	})//props.inview 그대로일경우

	React.useEffect(()=>{
		if(props.inview) {
			_initAll();
			_setNavi();
			if(props.state.isNaviBack) {
				setCurIdx(_infos.length - 1);
				props.state.isNaviBack = false;
			}
			_.delay( () => {
				if(_swiper) {
					_swiper.update();
					if(_swiper.scrollbar) _swiper.scrollbar.updateSize();

					if(_swiper) {
						const _slide = _swiper.wrapperEl.scrollHeight;
						if(_slide <= _swiper.height) setOpt(true);
						else setOpt(false);
					}
				}
			}, 300);

		} else if (!props.inview) {
			if(_player.bPlay) _player.pause();
			if(_audioOn) setAudioOn(false);
        }
	},[props.inview])

	const _onAudio = () => {
		if(_studyDiv === 'READALOUD' || _studyDiv === 'SHADOWING') return;

		App.pub_playBtnTab();
		_audioOn = !_audioOn;

		if(_player.bPlay) _player.pause();

		if(_audioOn) {
			_curSeq = -1;
			const passage = _infos[_curIdx].passage;
			_player.gotoAndPlay(passage.start * 1000, passage.end * 1000, 1);
			if(_swiper) {
				_swiper.update();
				if(_swiper.scrollbar) _swiper.scrollbar.updateSize();
			}
		} else {
			_curSeq = -1;
			// _curIdx = 0;
			if(_swiper) {
				_swiper.update();
				if(_swiper.scrollbar) _swiper.scrollbar.updateSize();
			}
		}
		// const audio = props.data.audio;
		// if(_audioOn === true) App.pub_play(App.data_url + audio, App.pub_stop);
		// else if(_audioOn === false) App.pub_stop();
	}

	const _onChoose = (script: common.IScript) => {
		if(_studyDiv === 'READALOUD' || _studyDiv === 'SHADOWING') return;

		if(_audioOn) _audioOn = false;

		const prevSeq = _curSeq;
		_curSeq = script.seq;
		_transAt(_curSeq);
		App.pub_playBtnTab();

		if(_curSeq === prevSeq) {
			if(_player.bPlay) {
				_player.pause();
				_curSeq = -1;
			} else _player.gotoAndPlay(script.audio_start * 1000, script.audio_end * 1000, 1);
		} else {
			_player.gotoAndPlay(script.audio_start * 1000, script.audio_end * 1000, 1);
		}
	}
	const _studySend = async () => {
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.SENDED) return;
		else if(_studyDiv !== 'off') return;
		else if(_studyProg !== SENDPROG.READY) return;	
		App.pub_playToPad();

		let msgtype: 'readaloud_send'|'shadowing_send'|'qna_send';
		if(_pass_pop === 'READALOUD') msgtype = 'readaloud_send';
		else if(_pass_pop === 'SHADOWING') msgtype = 'shadowing_send';
		else if(_pass_pop === 'QNA') { 
			msgtype = 'qna_send';
			const rets = _infos[_curIdx].qnaRets;
			for(let i = 0; i < rets.length; i++) {
				const ret = rets[i];
				while(ret.users.length > 0) ret.users.pop();
				ret.num = 0;
			}
		}	else return;
		_retCnt = 0;
		while(_retUsers.length > 0) _retUsers.pop();
		_studyProg = SENDPROG.SENDING;
		_studyDiv = _pass_pop;

		props.onStudy(_pass_pop === 'QNA' ? 'ex_video' : 'all');
		// const msg: common.IMsg = {msgtype};
		const msg: common.IMsgForIdx = {msgtype, idx: _curIdx};
		felsocket.sendPAD($SocketType.MSGTOPAD, msg);

		await kutil.wait(500);
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.SENDED) return;
		else if(_studyProg !== SENDPROG.SENDING) return;
		
		_studyProg = SENDPROG.SENDED;
		_pass_pop = 'off';
		_numOfStudent = App.students.length;
		if(_studyDiv === 'READALOUD' || _studyDiv === 'SHADOWING') {
			_viewCountDown = true;
			_countdown.reset();
			await kutil.wait(300);
			if(!props.view || !props.inview) return;
			else if(_prog !== SENDPROG.SENDED) return;
			if(_studyDiv === 'READALOUD' || _studyDiv === 'SHADOWING') {
				_countdown.start();
			}
		} else if(_studyDiv === 'QNA') {
			props.actions.setQNAFnc(_onQNA);
		}
	}
	const _onQNA = (qmsg: common.IQNAMsg) => {
		if(_studyDiv !== 'QNA') return;
		let sidx = -1;
		for(let i = 0; i < App.students.length; i++) {
			if(App.students[i].id === qmsg.id) {
				sidx = i;
				break;
			}
		}
		if(sidx < 0) return;

		if(_retUsers.indexOf(qmsg.id) >= 0) return;

		const rets = _infos[_curIdx].qnaRets;
		
		for(let i = 0; i < qmsg.returns.length; i++) {  // 문제별 
			const scriptIdx = qmsg.returns[i];
			if(scriptIdx < rets.length) {
				const users = rets[scriptIdx].users;
				if(users.indexOf(qmsg.id) < 0) users.push(qmsg.id);
				rets[scriptIdx].num = users.length;
			}
		}
		
		_retUsers.push(qmsg.id);
		felsocket.addStudentForStudentReportType6(qmsg.id);
		_retCnt = _retUsers.length;
	}
	const _countStart = () => {
		// console.log('_countStart');
	}
	const _countZero = async () => {
		_viewCountDown = false;
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.SENDED) return;

		await kutil.wait(300);
		if(!props.view || !props.inview) return;
		else if(_prog !== SENDPROG.SENDED) return;

		if(_studyDiv === 'READALOUD') {
			_curSeq = -1;
			const passage = _infos[_curIdx].passage;
			_player.gotoAndPlay(passage.start * 1000, passage.end * 1000, 1);
		} else if(_studyDiv === 'SHADOWING') {
			const script = _infos[_curIdx].scripts[0];
			_curSeq = script.seq;

			if(_curSeq >= 0) _transAt(_curSeq);
			const fmsg: common.IMsgForIdx = {msgtype: 'focusidx',idx: script.seq,};
			felsocket.sendPAD($SocketType.MSGTOPAD, fmsg);
			_player.gotoAndPlay(script.audio_start * 1000, script.audio_end * 1000, 1);
		}
	}


	public render() {
		const {inview} = props;
		const curIdx = _curIdx;
		const info = _infos[curIdx];

		const scripts = info.scripts;
		const qnaRets = info.qnaRets;

		return (
			<div className="PASSAGE" style={inview ? undefined : style.NONE}>
				<div className="nav">
					<div className="btn_page_box">
						{_infos.map((item, idx) => {
							return <NItem key={idx} on={idx === curIdx} idx={idx} onClick={_onPage} />;
						})}
					</div>
					<div className="right">
						<div 
							className="return_cnt_box white"
							style={(_studyDiv === 'QNA' && _studyProg >= SENDPROG.SENDED) ? undefined : style.NONE}
							onClick={_clickReturn}
						>
							<div>{_retCnt}/{_numOfStudent}</div>
						</div>
						{/* <ToggleBtn disabled={_prog < SENDPROG.SENDED || _studyDiv === 'READALOUD' || _studyDiv === 'SHADOWING'} className="btn_trans" onClick={_clickTrans}/> */}
						<ToggleBtn disabled={_studyDiv === 'READALOUD' || _studyDiv === 'SHADOWING'} className="btn_img" onClick={_clickZoom}/>
						<ToggleBtn disabled={_studyDiv === 'READALOUD' || _studyDiv === 'SHADOWING'} className="btn_audio_drop" on={_audioOn} onClick={_onAudio}/>
						{/*
							<ToggleBtn disabled={!_audioOn} on={_allOrChoose === 'choose'} className="btn_choose" onClick={_onChoose}/>
							<ToggleBtn disabled={!_audioOn} on={_allOrChoose === 'all'} className="btn_all" onClick={_onAll}/>
						*/}
					</div>
				</div>
				<audio controls={false} autoPlay={false} ref={_refAudio}/>
				<div id="script_box" className="script_box">
					<SwiperComponent
						ref={_refSwiper}
						direction="vertical"
						scrollbar={{ el: '.swiper-scrollbar', draggable: true,}}
						observer={true}
						slidesPerView="auto"
						freeMode={true}						
						noSwiping={_opt}
						followFinger={true}
						noSwipingClass={'swiper-no-swiping'}
					>
						<div id="script-bnd" className="script-bnd">
							{scripts.map((script, idx) => {
								return (
									<ScriptItem 
										key={script.seq} 
										curSeq={_curSeq} 
										script={script}
										retCnt={_retCnt}
										qnaRet={qnaRets[idx]}
										viewReturn={_studyDiv === 'QNA'}
										onChoose={_onChoose}
									/>
								);
							})}
						</div>
					</SwiperComponent>
					<CountDown2 
						state={_countdown} 
						view={_viewCountDown} 
						onStart={_countStart}  
						onComplete={_countZero}
					/>
					<Yourturn 
						className="yourturn" 
						view={_yourturn >= 0}
						start={_yourturn >= 0}
					/>
				</div>
				<div className="popup_btns">
					<ToggleBtn 
						className="btn_listen_repeat" 
						disabled={_prog < SENDPROG.SENDED || _studyDiv === 'READALOUD' || _studyDiv === 'QNA'} 
						on={_pass_pop === 'SHADOWING' || _studyDiv === 'SHADOWING'} 
						onClick={_onShadowClick}
					/>
					<ToggleBtn 
						className="btn_readalong"
						disabled={_prog < SENDPROG.SENDED || _studyDiv === 'SHADOWING' || _studyDiv === 'QNA'} 
						on={_pass_pop === 'READALOUD' || _studyDiv === 'READALOUD'} 
						onClick={_onReadClick}
					/>
					<ToggleBtn 
						className="btn_qna"
						disabled={_prog < SENDPROG.SENDED || _studyDiv === 'SHADOWING' || _studyDiv === 'READALOUD'} 
						on={_pass_pop === 'QNA' || _studyDiv === 'QNA'} 
						onClick={_onQAClick}
					/>
				</div>
					<SendUI
						view={inview && _prog <= SENDPROG.SENDING && !props.state.videoPopup}
						type={'teacher'}
						sended={false}
						originY={0}
						onSend={_onSend}
					/>
					<ImgPassage view={_zoom === true} passage={info.passage} onClosed={_offZoom}/>
					<PassagePopup 
						type={_pass_pop}
						view={_pass_pop !== 'off'} 
						onClosed={_onPopupClosed}
						onSend={_studySend}
					/>
					<TransPopup 
						view={_trans === true} 
						scripts={scripts} 
						onClosed={_offTrans}
					/>
				</div>
		);
	}
}
export default PASSAGE;



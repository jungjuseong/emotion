import React from 'react';
import { css } from '@emotion/react';

export type ToggleBtnProps = {
    /**버튼안의 내용 */
    children: React.ReactNode;
    id?: string;
	useMap?: string;
	className?: string;
    /**버튼 선택 여부 */
	on: boolean;
    /**버튼 비활성화 여부 */
	disabled: boolean;
    /**버튼 노출 여부 */
	view: boolean;
	preventEvent?: boolean;
	onClick?: (evt: React.MouseEvent<HTMLElement>) => void;
	onMouseLeave?: (evt: Event) => void;
	onTransitionEnd?: (evt: React.TransitionEvent<HTMLElement>) => void;
	onRef?: (el: HTMLElement) => void;
	disableCapture?: boolean;
	/**기본이미지 */
    src: string;
	/**클릭시 이미지 */
    src_down: string;
	/**비활성화 이미지 */
    src_dis: string;
	/**선택된 이미지 */
    src_on: string;
}

export const ToggleBtn = ({
    children,id,useMap,className,on,disabled,view,preventEvent,disableCapture,src,src_on,src_down,src_dis,
    onClick,onMouseLeave,onTransitionEnd,onRef
}:ToggleBtnProps) => {


    return(
        <button 
            css={[
                !view && [css`display:none;`],
				
                style,
                css`
                    background: url(${src});
                    width:108px;
                    height:40px;
                    &:active{
		                background: url(${src_down});
	                }
                    &:disabled{
                        background: url(${src_dis});
                    } 
                `,
				on&&[css`background: url(${src_dis});pointer-events: none;`],
            ]}
			id={id} 
			className={className} 
			onClick={onClick}
			disabled={disabled}
			draggable={false}
			onTransitionEnd={onTransitionEnd}
		>
				{children}
			</button>
    )
}

ToggleBtn.defaultProps={
    view:true,
    disabled:false,
	on:false,
}

const style = css`
    touch-action: none;
	padding: 0px;
	border: none;
	background-color: transparent;
	outline: none;
	background-repeat: no-repeat;
	pointer-events: unset;
	cursor: pointer;
	&:disabled{
		pointer-events: none;
		cursor: auto;
	}
	/*&:before{
		position:absolute; 
		pointer-events:none; 
		width:0px; height:0px; 
		visibility: hidden;
		overflow:hidden; 
		z-index:-1;
		content:$src $src_on $src_dis;
	}*/
`



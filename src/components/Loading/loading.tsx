import * as React from 'react';
import { css } from "@emotion/react";

import loadImg from '../../styles/assets/images/loading.svg'

const Loading = ({ view }: {view: boolean}) => {
	const style = css`
		position: absolute;
		left: 0px;
		top: 0px;
		width: 100%;
		height: 100%;
		background-image: url(${loadImg});
		background-position: 50% 50%;
		background-repeat: no-repeat;
		background-color: rgba(0, 0, 0, 0.1);
		z-index: 101;
	`
	const notView = css`
		visibility: hidden;
		z-index: -1;
		pointer-events: none;
	`

	return (
		<div css={[
			style,
			!view&&notView
		]} />
	);
};

export { Loading };
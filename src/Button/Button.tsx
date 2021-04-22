import React from "react";

import { css } from '@emotion/react';

export type ButtonProps = {
    /** 버튼 안의 내용 */
    children: React.ReactNode;
    /** 클릭했을 때 호출할 함수 */
    onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
    /** 버튼의 생김새를 설정합니다. */
    theme: 'primary' | 'secondary' | 'tertiary' | 'player' | 'view';
      /** 버튼의 크기를 설정합니다 */
    size: 'small' | 'medium' | 'big';
      /** 버튼을 비활성화 시킵니다. */
    disabled?: boolean;
    /** 버튼의 너비를 임의로 설정합니다. */
    width?: string | number;
    iconOnly?: boolean;
    /** 버튼 모양을 둥글게 */
    isRound?: boolean;
  };

/** `Button` 컴포넌트는 어떠한 작업을 트리거 할 때 사용합니다.  */
export const Button = ({ children, theme, size, disabled, width, iconOnly,isRound, onClick }: ButtonProps) => {
    return (
      <button
        css={[
          style, 
          themes[theme], 
          sizes[size], 
          {width},
          isRound && [Round], 
          iconOnly && [iconOnlyStyle, iconOnlySizes[size]]]}
        disabled= {disabled}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

Button.defaultProps = {
    theme: 'primary',
    size: 'medium',
    disabled: false,
    inconOnly: false,
    isRound: false
};
  
const style = css`
  outline: none;
  border: none;
  box-sizing: border-box;
  height: 2rem;
  font-size: 0.875rem;
  padding: 0 1rem;
  border-radius: 0.25rem;
  line-height: 1;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  &:focus {
      box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.2);
  }
  &:disabled {
  cursor: not-allowed;
  }
  svg {
    width: 1em;
    margin-right: 1em;
  }
`;

const themes = {
  primary: css`
    background: #20c997;
    color: white;
    svg {
      fill: white;
    }
    &:hover {
      background: #38d9a9;
    }
    &:active {
      background: #12b886;
    }
    &:disabled {
      background: #aed9cc;
    }
  `,
  secondary: css`
    background: #e9ecef;
    color: #343a40;
    svg {
      fill: #343a40;
    }
    &:hover {
      background: #f1f3f5;
    }
    &:active {
      background: #dee2e6;
    }
    &:disabled {
      color: #c6d3e1;
      svg {
        fill: #c6d3e1;
      }
    }
    
  `,
  tertiary: css`
    background: none;
    color: #20c997;
    svg {
      fill: #20c997;
    }
    &:hover {
      background: #e6fcf5;
    }
    &:active {
      background: #c3fae8;
    }
    &:disabled {
      color: #bcd9d0;
      svg {
        fill: #bcd9d0;
      }
    }
  `,
  player: css`
    background: indigo;
    color: white;
    width: 50px;
    height: 50px;
  `,
  view: css`
    background: #0b0b50;
    color: white;
    //font-size: 0.5rem;
    &:hover {
      background: #38386d
    }
    &:active {
      background: #22224d;
    }
    &:disabled {
      background: #4e4e8a;
      color: #e6e4e4;
      svg {
        fill: #e6e4e4;
      }
    }
  `
};

const sizes = {
  small: css`
    height: 1.75rem;
    font-size: 0.75rem;
    padding: 0 0.875rem;
  `,
  medium: css`
    height: 2.5rem;
    font-size: 1rem;
    padding: 0 1rem;
  `,
  big: css`
    height: 3rem;
    font-size: 1.125rem;
    padding: 0 1.5rem;
  `
};

const Round = css`
  border-radius: 20px;
`;

const iconOnlyStyle = css`
  padding: 0;
  //border-radius: 50%;
  svg {
    margin: 0;
  }
`;

const iconOnlySizes = {
  small: css`
    width: 1.75rem;
  `,
  medium: css`
    width: 2.5rem;
  `,
  big: css`
    width: 3rem;
  `
};
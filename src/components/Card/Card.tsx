import React from "react";
import './scss/main.scss';

export type CardProps = {
    className: string;
}

export const Card = ({className}: CardProps) =>
    <div className={className}>
        Smart Message from SCSS
    </div>

Card.defaultProps = {
    className: 'smart_body',
};


import React from 'react';
export declare type DialogProps = {
    visible: boolean;
    title?: string;
    description?: string;
    children?: React.ReactNode;
    hideButtons?: boolean;
    cancellable?: boolean;
    cancelText: string;
    confirmText: string;
    onCancel?: () => void;
    onConfirm?: () => void;
};
export declare const Dialog: {
    ({ visible, title, description, hideButtons, cancellable, cancelText, confirmText, children, onCancel, onConfirm }: DialogProps): JSX.Element | null;
    defaultProps: {
        cancelText: string;
        confirmText: string;
    };
};

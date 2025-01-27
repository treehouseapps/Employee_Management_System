import React, { createContext, useContext, useState } from 'react';
import MessageBox from './MessageBox';

const MessageContext = createContext();

export function MessageProvider({ children }) {
    const [messageBox, setMessageBox] = useState({
        isOpen: false,
        message: '',
        type: 'info'
    });

    const showMessage = (message, type = 'info') => {
        setMessageBox({ isOpen: true, message, type });
        // Auto-hide after 3 seconds
        setTimeout(() => {
            setMessageBox(prev => ({ ...prev, isOpen: false }));
        }, 3000);
    };

    const hideMessage = () => {
        setMessageBox(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <MessageContext.Provider value={{ messageBox, showMessage, hideMessage }}>
            {children}
            <MessageBox
                isOpen={messageBox.isOpen}
                message={messageBox.message}
                type={messageBox.type}
                onClose={hideMessage}
            />
        </MessageContext.Provider>
    );
}

export function useMessage() {
    return useContext(MessageContext);
}

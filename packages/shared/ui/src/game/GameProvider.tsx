import React from 'react';

interface GameProviderProps { children: React.JSX.Element }
export default function GameProvider({ children }: GameProviderProps) {
    return (
        <div>
            {children}
            GameProvider
        </div>
    );
}
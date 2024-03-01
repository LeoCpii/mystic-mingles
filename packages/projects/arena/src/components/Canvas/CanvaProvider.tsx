import { createContext, useMemo, useRef } from 'react';

interface CanvasContextData {
    ref: React.RefObject<HTMLCanvasElement>;
}

export const CanvasContext = createContext<CanvasContextData>({} as CanvasContextData);

export default function CanvasProvider({ children }: { children: React.ReactNode }) {
    const ref = useRef<HTMLCanvasElement>(null);

    const context = useMemo<CanvasContextData>(() => ({ ref }), [ref]);

    return (
        <CanvasContext.Provider value={context}>
            {children}
        </CanvasContext.Provider>
    );
}
import { useContext } from 'react';

import { CanvasContext } from './CanvaProvider';

export default function useCanvas() {
    const { ref } = useContext(CanvasContext);
    return { ref };
}
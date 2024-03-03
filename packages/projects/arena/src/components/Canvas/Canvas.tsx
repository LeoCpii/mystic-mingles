import type { CanvasHTMLAttributes } from 'react';

import useCanvas from './useCanvas';

interface CanvaProps extends CanvasHTMLAttributes<HTMLCanvasElement> { }
export default function Canva(props: CanvaProps) {
    const { ref } = useCanvas();

    return (
        <canvas id="canvas" ref={ref} style={{ background: 'red' }} {...props} />
    );
}
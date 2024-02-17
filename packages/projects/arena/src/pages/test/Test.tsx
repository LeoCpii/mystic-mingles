import { useEffect, useMemo, useRef } from 'react';

import Mingle, { generateRandomMingle } from '@mingles/business/mingle';
import MingleParts from '@mingles/ui/mingle-parts';

const mingle = new Mingle(generateRandomMingle());

export default function Test() {
    const color = 'red';

    const ref = useRef(null);
    const svg = useMemo(
        () => <MingleParts mingle={mingle} />,
        [color]
    );

    useEffect(() => {
        const image = new Image();
        const context = ref.current?.getContext('2d');

        image.src = `data:image/svg+xml;base64,${window.btoa(svg)}`;
        image.onload = () => {
            context.drawImage(image, 0, 0);
        };
    }, [svg]);

    return (
        <canvas ref={ref} width="200" height="200" />
    );
}
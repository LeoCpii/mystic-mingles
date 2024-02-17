import React from 'react';

import type { Species, Ally, Mingle } from '@mingles/business';

import Eyes from './eyes';
import Body from './body';
import Tail from './tail';
import Horn from './horn';
import Back from './back';
import Mouth from './mouth';
import { Direction } from './interface';

import './Mingles.scss';

type MinglePartsProps<S extends Species = Species> = { mingle: Mingle<S> | Ally<S>; direction?: Direction; size?: number };
export default function MingleParts({ mingle, direction, size = 1 }: MinglePartsProps) {
    const { body, color, genes: { back, eye, horn, mouth, tail } } = mingle;

    return (
        <svg
            x="0px"
            y="0px"
            version="1.1"
            style={{ transform: direction === 'right' ? `scale(-${size}, ${size})` : `scale(${size})` }}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 247.6 241.91"
        >
            <g id="Floor">
                <ellipse className="floor" cx="104.17" cy="221.76" rx="68.94" ry="3.64" />
            </g>
            <Tail tail={tail.name} />
            <Body body={body} color={color} />
            <Horn horn={horn.name} />
            <Mouth mouth={mouth.name} />
            <Eyes eyes={eye.name} />
            <Back back={back.name} />
        </svg >
    );
}
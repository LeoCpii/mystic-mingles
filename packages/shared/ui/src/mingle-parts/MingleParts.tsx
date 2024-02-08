import React from 'react';

import type { Species, BodyFormats, GeneParts, MingleGenes, MingleColor } from '@mingles/business';

import Eyes from './eyes';
import Body from './body';
import Tail from './tail';
import Horn from './horn';
import Mouth from './mouth';
import Back from './back';
import { Direction } from './interface';

import './Mingles.scss';

type MinglePartsProps = { [G in GeneParts]: MingleGenes[G]['name'] } & { body: BodyFormats; color: MingleColor<Species>; direction?: Direction; size?: number };
export default function MingleParts({ eye, body, tail, horn, back, mouth, color, direction, size = 1 }: MinglePartsProps) {
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
            <Tail tail={tail} />
            <Body body={body} color={color} />
            <Horn horn={horn} />
            <Mouth mouth={mouth} />
            <Eyes eyes={eye} />
            <Back back={back} />
        </svg >
    );
}
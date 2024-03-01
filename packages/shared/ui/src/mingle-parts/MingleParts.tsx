import React from 'react';

import type { Species } from '@mingles/business';

import { joinClass } from '@/utils/joinClass';

import Eyes from './eyes';
import Body from './body';
import Tail from './tail';
import Horn from './horn';
import Back from './back';
import Mouth from './mouth';
import type { Animation, Direction, Warrior } from './interface';

import './Mingles.scss';

type MinglePartsProps<S extends Species = Species> = {
    size?: number;
    isStatic?: boolean;
    mingle: Warrior<S>;
    direction?: Direction;
    animation?: Animation
};
export default function MingleParts({ mingle, direction, size = 1, isStatic = false, animation }: MinglePartsProps) {
    const { body, color, genes: { back, eye, horn, mouth, tail }, id } = mingle;

    const clss = () => {
        return joinClass([isStatic ? '' : 'float-animation', animation]);
    };

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
            <g className={clss()} id={`${id}-body-${isStatic}`}>
                <Tail tail={tail.name} />
                <Body body={body} color={color} />
                <Horn horn={horn.name} />
                <Mouth mouth={mouth.name} />
                <Eyes eyes={eye.name} />
                <Back back={back.name} />
            </g>
        </svg >
    );
}
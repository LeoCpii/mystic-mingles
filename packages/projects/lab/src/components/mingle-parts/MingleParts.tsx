import type { Species } from '@mingles/business/species';
import type { BodyFormats, GeneParts } from '@mingles/business/parts';
import type { MingleGenes, MingleColor, } from '@mingles/business/mingle';

import Eyes from './eyes';
import Body from './body';
import Tail from './tail';
import Horn from './horn';
import Mouth from './mouth';
import Back from './back';

import './Mingles.scss';

type MinglePartsProps = { [G in GeneParts]: MingleGenes[G]['name'] } & { body: BodyFormats; color: MingleColor<Species> };
export default function MingleParts({ eye, body, tail, horn, back, mouth, color }: MinglePartsProps) {
    return (
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 247.6 241.91">
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
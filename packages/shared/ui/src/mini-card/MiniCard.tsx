import React, { useState } from 'react';

import type { CardOptions, Species, ActiveParts } from '@mingles/business';

import background from '@/utils/species-card-colors';

import './MiniCard.scss';
import { uuid } from '@mingles/services';

export default function MiniCard({ attack, species, assets }: Pick<CardOptions<Species, ActiveParts>, 'attack' | 'name' | 'species' | 'assets'>) {
    const [id] = useState(uuid());

    return (
        <svg x="0px" y="0px" viewBox="0 0 250 209.74">
            <defs>
                <pattern id={id} patternUnits="userSpaceOnUse" width="600" height="450">
                    <image href={assets.image.card} x="0" y="0" width="600" height="450" />
                </pattern>
            </defs>
            <g id="Camada_1">
                <g>
                    <path fill={background[species]} d="M233.56,209.74H16.44C7.36,209.74,0,202.38,0,193.3V16.55C0,7.46,7.36,0.1,16.44,0.1h217.11
			c9.08,0,16.44,7.36,16.44,16.44V193.3C250,202.38,242.64,209.74,233.56,209.74z"/>
                    <path className="st18" d="M233.56,209.74H16.44C7.36,209.74,0,202.38,0,193.3V16.55C0,7.46,7.36,0.1,16.44,0.1h217.11
			c9.08,0,16.44,7.36,16.44,16.44V193.3C250,202.38,242.64,209.74,233.56,209.74z"/>
                </g>

                <path id="Shape_image" fill={`url(#${id})`} d="M218.32,164.97H31.68c-8.62,0-15.6-6.99-15.6-15.6V32.13c0-8.62,6.99-15.6,15.6-15.6h186.64
		c8.62,0,15.6,6.99,15.6,15.6v117.23C233.92,157.98,226.94,164.97,218.32,164.97z"/>
                <path className="st20" d="M232.45,345.06H18.19c-7.11,0-12.87-5.76-12.87-12.87V17.87C5.32,10.76,11.08,5,18.19,5h214.26
		c7.11,0,12.87,5.76,12.87,12.87v314.32C245.32,339.3,239.56,345.06,232.45,345.06z"/>
                <g>
                    <path id="icon_00000179624809326058733090000011342309855984127927_" className="st21" d="M114.31,177.43c-0.2-0.2-0.49-0.3-0.77-0.27
			l-5.75,0.6c-0.25,0.02-0.47,0.13-0.62,0.31l-9.25,10.6l-1.52-1.52c-0.37-0.37-0.97-0.37-1.34,0c0,0,0,0,0,0
			c-1.15,1.14-1.15,2.99-0.01,4.13c0,0,0.01,0.01,0.01,0.01l1.18,1.19l-3.84,3.84c-0.84,0.83-0.84,2.18-0.01,3.02
			c0,0,0.01,0.01,0.01,0.01c0.84,0.82,2.19,0.82,3.03,0l3.84-3.83l1.32,1.32c1.15,1.14,3,1.14,4.15,0c0.37-0.37,0.37-0.98,0-1.35
			l-1.69-1.69l10.6-9.25c0.18-0.15,0.29-0.37,0.31-0.61l0.61-5.74C114.61,177.92,114.51,177.64,114.31,177.43z"/>
                    <rect x="112.98" y="179.6" className="st22" width="46.8" height="19.36" />
                    <text id="Damage-Text" transform="matrix(1 0 0 1 121.2639 198.0972)" className="st21 st23 st24">{attack}</text>
                </g>
            </g>
        </svg>
    );
}
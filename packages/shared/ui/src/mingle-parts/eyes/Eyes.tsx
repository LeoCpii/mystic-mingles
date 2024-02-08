import React from 'react';

import type { MingleGenes } from '@mingles/business';

import './Eyes.scss';

type EyeProps = { eyes: MingleGenes['eye']['name'] };

function BugSpider() {
    return (
        <g id="Bug-Spider" >
            <g id="Left_00000017481920731452112610000016506677622530487433_">
                <g>
                    <circle className="pupil" cx="100.48" cy="111.83" r="12.13" />
                    <circle className="shine" cx="95.57" cy="108.19" r="3.64" />
                </g>
                <g>
                    <circle className="pupil" cx="113.95" cy="97.08" r="6.03" />
                    <circle className="shine" cx="111.85" cy="95.56" r="2.1" />
                </g>
            </g>
            <g id="Right_00000077288179175583447310000016454472135614646406_">
                <g>
                    <circle className="pupil" cx="59.62" cy="111.83" r="12.13" />
                    <circle className="shine" cx="54.77" cy="108.19" r="3.64" />
                </g>
                <g>
                    <circle className="pupil" cx="46.15" cy="97.08" r="6.03" />
                    <circle className="shine" cx="44.04" cy="95.56" r="2.1" />
                </g>
            </g>
        </g>
    );
}

function PlatClosed() {
    return (
        <g id="Plant-Closed">
            <path id="Right_00000118385291179089236640000011284854641815083963_" className="closed-eyes" d="M109.43,121.16
			c-1.23-2.41-2.64-3.85-4.12-4.79c-1.48-0.93-2.93-1.35-4.42-1.46c-1.49-0.08-2.98,0.15-4.57,0.88c-1.59,0.74-3.18,1.97-4.72,4.2
			c-0.63-1.22-0.77-2.66-0.53-4.08c0.24-1.42,0.9-2.8,1.87-3.98c0.97-1.18,2.26-2.13,3.71-2.74c1.46-0.62,3.08-0.88,4.66-0.78
			c1.58,0.11,3.16,0.58,4.52,1.39c1.36,0.8,2.51,1.91,3.32,3.2c0.8,1.3,1.27,2.75,1.33,4.19
			C110.53,118.63,110.21,120.04,109.43,121.16L109.43,121.16z"/>
            <path id="Left_00000110441970755334863810000005611809926119588017_" className="closed-eyes" d="M68.32,121.16
			c-1.23-2.41-2.64-3.85-4.12-4.79c-1.48-0.93-2.93-1.35-4.42-1.46c-1.49-0.08-2.98,0.15-4.57,0.88c-1.59,0.74-3.18,1.97-4.72,4.2
			c-0.63-1.22-0.77-2.66-0.53-4.08c0.24-1.42,0.9-2.8,1.87-3.98c0.97-1.18,2.26-2.13,3.71-2.74c1.46-0.62,3.08-0.88,4.66-0.78
			c1.58,0.11,3.16,0.58,4.52,1.39c1.36,0.8,2.51,1.91,3.32,3.2c0.8,1.3,1.27,2.75,1.33,4.19C69.43,118.63,69.1,120.04,68.32,121.16
			L68.32,121.16z"/>
        </g>
    );
}

function PlantCyclope() {
    return (
        <g id="Plant-Cyclope">
            <path className="eye" d="M101.94,106.35c0-9.71-9.67-17.58-21.6-17.58c-11.93,0-21.6,7.87-21.6,17.58s9.67,17.58,21.6,17.58
			C92.27,123.92,101.94,116.06,101.94,106.35z"/>
            <g className="shadow">
                <path d="M80.34,123.92c-11.33,0-20.61-7.11-21.51-16.14c-0.05,0.47-0.09,0.95-0.09,1.44
				c0,9.71,9.67,17.58,21.6,17.58c11.93,0,21.6-7.87,21.6-17.58c0-0.48-0.04-0.96-0.09-1.44
				C100.95,116.82,91.67,123.92,80.34,123.92z"/>
            </g>
            <path className="pupil" d="M80.34,112.45c-1.78,0-3.22-1.44-3.22-3.22c0,0,0,0,0,0v-5.76c0-1.78,1.44-3.22,3.22-3.22
			c1.78,0,3.22,1.44,3.22,3.21c0,0,0,0,0,0v5.76C83.55,111.01,82.11,112.45,80.34,112.45C80.34,112.45,80.34,112.45,80.34,112.45z"
            />
        </g>
    );
}

function ReptileCurious() {
    return (
        <g id="Reptile-Curious">
            <g id="Right_00000126302790244027275300000010871311144046752183_">
                <circle className="stroke" cx="102.07" cy="114.78" r="17.03" />
                <circle className="eye" cx="102.07" cy="114.78" r="14.44" />
                <rect x="99.07" y="106.67" className="pupil" width="5.77" height="16.21" />
            </g>
            <g id="Left_00000116946038988933156100000006024509405725842583_">
                <circle className="stroke" cx="59.62" cy="114.78" r="17.03" />
                <circle className="eye" cx="59.62" cy="114.78" r="14.44" />
                <rect x="56.62" y="106.67" className="pupil" width="5.77" height="16.21" />
            </g>
        </g>
    );
}

function RodentOriental() {
    return (
        <g id="Rodent-Oriental">
            <path d="M67.13,116.91l-10.05-5.8c-1.82-1.05-2.45-3.41-1.4-5.23l0,0c1.05-1.82,3.41-2.45,5.23-1.4l10.05,5.8
			c1.82,1.05,2.45,3.41,1.4,5.23v0C71.31,117.34,68.95,117.97,67.13,116.91z"/>
            <path d="M96.08,116.91l10.05-5.8c1.82-1.05,2.45-3.41,1.4-5.23v0c-1.05-1.82-3.41-2.45-5.23-1.4l-10.05,5.8
			c-1.82,1.05-2.45,3.41-1.4,5.23v0C91.9,117.34,94.26,117.97,96.08,116.91z"/>
        </g>
    );
}

function FishCrazy() {
    return (
        <g id="Fish-Crazy">
            <g id="Right">
                <circle className="eye" cx="59.62" cy="114.78" r="18.38" />
                <circle className="pupil" cx="59.62" cy="114.78" r="15.38" />
            </g>
            <g id="Left">
                <circle className="eye" cx="100.72" cy="114.78" r="18.38" />
                <circle className="pupil" cx="100.72" cy="114.78" r="15.38" />
            </g>
        </g>
    );
}

function Birdglass() {
    return (
        <g id="Bird-Glass">
            <circle id="MakeupLeft" className="makeup" cx="110.94" cy="128.29" r="6.96" />
            <circle id="MakeupRight" className="makeup" cx="47.78" cy="128.29" r="6.96" />
            <g id="Right">
                <circle id="PupilRight" className="pupil" cx="57.38" cy="113.11" r="8.23" />
                <circle id="ShineRight" className="shine" cx="54.5" cy="111.66" r="2.88" />
            </g>
            <g id="EyeLeft">
                <circle id="PupilLeft" className="pupil" cx="100.5" cy="113.11" r="8.23" />
                <circle id="ShineLeft" className="shine" cx="97.62" cy="111.66" r="2.88" />
            </g>
            <g id="Glass">
                <circle id="Glass-Left" className="glass-1" cx="101.27" cy="113.11" r="18.8" />
                <circle id="Glass-Right" className="glass-1" cx="59.62" cy="113.11" r="18.8" />
                <rect x="78.41" y="112.19" className="glass-2" width="4.05" height="0.92" />
            </g>
        </g>
    );
}

export default function Eyes({ eyes }: EyeProps) {
    return (
        <g id="Eyes">
            {
                eyes === 'Bug Spider' && <BugSpider />
            }
            {
                eyes === 'Plant Closed' && <PlatClosed />
            }
            {
                eyes === 'Reptile Curious' && <ReptileCurious />
            }
            {
                eyes === 'Plant Cyclope' && <PlantCyclope />
            }
            {
                eyes === 'Rodent Oriental' && <RodentOriental />
            }
            {
                eyes === 'Fish Crazy' && <FishCrazy />
            }
            {
                eyes === 'Bird Glass' && <Birdglass />
            }
        </g>
    );
};
import React from 'react';

import type { MingleGenes } from '@mingles/business';

import './Tail.scss';

type TailProps = { tail: MingleGenes['tail']['name']; };

function BugBee() {
    return (
        <g id="Bug-Bee">
            <g id="Shape">
                <path className="sting" d="M192.34,187.54l22.57-4.69c3.95-0.82,4.5-4.2,1-6.22l-19.95-11.54c-3.71-2.15-9.07-1.85-11.1,0.61
				l-2.6,3.15c-2.61,3.17-3.23,7.01-1.75,10.83l1.48,3.81C183.15,186.45,188.14,188.41,192.34,187.54z"/>
                <path className="shadow" d="M180.52,179.67l1.48,3.81c1.15,2.97,6.15,4.93,10.35,4.06l9.7-2.02c1.11-2.4,1.9-4.92,2.33-7.56
				s0.47-5.29,0.16-7.91l-8.57-4.96c-3.71-2.15-9.07-1.85-11.1,0.61l-2.6,3.15C179.65,172.01,179.03,175.84,180.52,179.67z"/>
            </g>
            <path className="stroke" d="M215.91,176.62l-19.95-11.54c-3.71-2.15-9.07-1.85-11.1,0.61l-2.6,3.15c-0.98,1.19-1.68,2.47-2.09,3.81
			c-0.55,1.79-0.59,3.68-0.11,5.59c0.12,0.48,0.27,0.96,0.46,1.43l1.48,3.81c0.17,0.43,0.43,0.84,0.74,1.23
			c1.86,2.25,6.02,3.58,9.6,2.83l9.7-2.02c0,0,0,0,0,0l12.87-2.68C218.86,182.02,219.4,178.65,215.91,176.62z"/>
        </g>
    );
}

function PlantLeaf() {
    return (
        <g id="Plant-Leaf">
            <path className="plant" d="M189.74,152.15c6.43-4.94,14.89-5.41,21.64-1.89c0.81,0.42,1.4,1.19,1.6,2.08
			c1.66,7.43-0.96,15.48-7.39,20.43c-6.83,5.25-15.95,5.45-22.88,1.19C180.37,166.17,182.91,157.4,189.74,152.15L189.74,152.15z"/>
            <path className="detail" d="M182.71,176.17c-0.66,0-1.32-0.3-1.76-0.86c-0.74-0.97-0.56-2.36,0.41-3.1l18.43-14.17
			c0.97-0.74,2.36-0.56,3.1,0.4c0,0,0,0,0,0c0.74,0.97,0.56,2.36-0.4,3.1c0,0,0,0,0,0l-18.43,14.17
			C183.67,176.01,183.2,176.17,182.71,176.17z"/>
            <path className="stroke" d="M212.98,152.34c-0.2-0.9-0.79-1.66-1.6-2.08c-6.75-3.52-15.21-3.05-21.64,1.89
			c-6.14,4.73-8.8,12.29-7.57,19.43l-0.8,0.62c-0.97,0.74-1.15,2.13-0.41,3.1c0.44,0.57,1.09,0.86,1.76,0.86
			c0.49,0,0.96-0.16,1.35-0.46l0.8-0.62c6.59,3.02,14.58,2.4,20.73-2.33C212.02,167.82,214.64,159.76,212.98,152.34z"/>
        </g>
    );
}

function ReptileLizard() {
    return (
        <g id="Reptile-Lizard">
            <path className="tail" d="M179.53,162.75c6.6,1.63,20.89,3.37,38.95-4.88c2.19-1,4.17,1.74,2.54,3.52
			c-7.99,8.72-21.87,20.79-37.2,20.33c-0.9-0.03-1.69-0.65-1.97-1.51l-4.91-14.61C176.37,163.97,177.85,162.34,179.53,162.75z"/>
            <g id="Bolinhas">
                <circle className="details" cx="186.25" cy="169.7" r="3.13" />
                <circle className="details" cx="195.6" cy="173.17" r="2.39" />
                <circle className="details" cx="201.4" cy="167.61" r="2" />
            </g>
        </g>
    );
}

function RodentSquirrel() {
    return (
        <g id="Rodent-Squirrel">
            <path className="tail" d="M152.23,186.47l57.93,16.06c7.1,1.97,14.2-3.13,14.59-10.49c0.33-6.14-4.21-11.46-10.33-12.09l-54.59-5.63
    c-4.76-0.49-9.17,2.52-10.45,7.13C148.78,183.62,150.05,185.87,152.23,186.47L152.23,186.47z"/>
            <path className="details" d="M224,187.29c-3.32,0.17-6.59,0.68-9.72,1.5c-1.68-3.27-3.69-6.45-6.01-9.48l-4.56-0.47
    c2.91,3.44,5.39,7.1,7.4,10.9c-5.55,1.88-10.61,4.78-14.76,8.53c-0.92-4.49-2.62-9.23-4.87-13.74c3.63-2.44,7.5-4.4,11.46-5.77
    l-6.76-0.7c-2.15,1.06-4.24,2.26-6.23,3.58c-0.87-1.55-1.81-3.05-2.82-4.52l-4.34-0.45c1.63,2.12,3.14,4.44,4.49,6.85
    c-3.72,2.78-7.16,6.05-10.18,9.71c-0.03,0.03-0.05,0.07-0.08,0.1l3.45,0.96c2.53-2.91,5.33-5.55,8.34-7.85
    c1.82,3.71,3.23,7.58,4.1,11.29l6.84,1.9c3.68-3.04,8.05-5.39,12.81-6.96c1.48,3.25,2.61,6.58,3.37,9.95
    c1.07-0.26,2.1-0.67,3.05-1.22c-0.77-3.26-1.87-6.48-3.27-9.63c2.91-0.72,5.93-1.15,9.01-1.27
    C224.64,189.41,224.4,188.32,224,187.29L224,187.29z M168.05,180.5c2.29-1.87,4.5-3.41,6.21-4.28c0.18-0.09,0.34-0.21,0.47-0.36
    l-5.21-0.54c-1.19,0.83-2.47,1.8-3.76,2.86c-1.4-1.32-2.87-2.56-4.42-3.7l-1.5-0.16c-1.32-0.14-2.66,0-3.93,0.39
    c0.07,0.06,0.14,0.11,0.22,0.16c2.55,1.56,4.96,3.41,7.15,5.46c-2.53,2.31-4.96,4.87-6.77,7.33l3.38,0.94
    c1.6-1.99,3.6-4.06,5.69-5.95c2.68,2.9,4.89,6.09,6.44,9.31l4.02,1.11C174.36,188.68,171.59,184.35,168.05,180.5z"/>
            <path className="stroke" d="M152.23,186.47l57.93,16.06c7.1,1.97,14.2-3.13,14.59-10.49c0.33-6.14-4.21-11.46-10.33-12.09l-54.59-5.63
    c-4.76-0.49-9.17,2.52-10.45,7.13C148.78,183.62,150.05,185.87,152.23,186.47L152.23,186.47z"/>
        </g>
    );
}

function FishGold() {
    return (
        <g id="Fish-Gold">
            <path id="Shape" className="tail" d="M202.94,147.49L202.94,147.49l-7.89-2c-11.81-3-23.81,4.14-26.81,15.94l-2,7.89
    c-0.13,0.5-0.18,1-0.17,1.49c-0.25,0.43-0.45,0.9-0.57,1.41l-2,7.89c-3,11.81,4.14,23.81,15.94,26.81l7.89,2l0,0
    c3.02,0.77,6.09-1.06,6.86-4.08l2-7.89c0,0,0,0,0,0c1.82-7.15-0.09-14.36-4.49-19.61c6.38-2.51,11.5-7.94,13.32-15.09c0,0,0,0,0,0
    l2-7.89C207.79,151.33,205.96,148.26,202.94,147.49z"/>
            <path id="Brilho_grande" className="details" d="M194.19,204.84l2-7.89c0,0,0,0,0,0c1.82-7.15-0.09-14.36-4.49-19.61
    c6.38-2.51,11.5-7.94,13.32-15.09c0,0,0,0,0,0l2-7.89c0.09-0.34,0.13-0.67,0.16-1.01c-0.75-1.78-1.2-2.83-1.2-2.83l-39.74,18.81
    l25.37,38.98C192.85,207.56,193.8,206.35,194.19,204.84z"/>
            <path id="Brilho_pequeno" className="details" d="M177.73,173.39l17.59,27.01l0.88-3.46c0,0,0,0,0,0c1.82-7.15-0.09-14.36-4.49-19.61
    c6.38-2.51,11.5-7.94,13.32-15.09c0,0,0,0,0,0l0.51-2L177.73,173.39z"/>
            <path id="Stroke_00000097462484086168856090000009523587951280761016_" className="stroke" d="M202.94,147.49L202.94,147.49l-7.89-2
    c-11.81-3-23.81,4.14-26.81,15.94l-2,7.89c-0.13,0.5-0.18,1-0.17,1.49c-0.25,0.43-0.45,0.9-0.57,1.41l-2,7.89
    c-3,11.81,4.14,23.81,15.94,26.81l7.89,2l0,0c3.02,0.77,6.09-1.06,6.86-4.08l2-7.89c0,0,0,0,0,0c1.82-7.15-0.09-14.36-4.49-19.61
    c6.38-2.51,11.5-7.94,13.32-15.09c0,0,0,0,0,0l2-7.89C207.79,151.33,205.96,148.26,202.94,147.49z"/>
        </g>
    );
}

function BirdFeather() {
    return (
        <g id="Bird-Feather">
            <g>
                <path className="feather-1" d="M190.89,194.94l-45.6-34.31l-4.7,15.42l23.7,27.33c7.42,8.56,20.85,8.09,27.66-0.96
				C193.72,200.06,193.25,196.72,190.89,194.94L190.89,194.94z"/>
                <path className="feather-2" d="M201.35,172.58l-51.44-10.37c-1.72,8.55,2.76,17.14,10.76,20.62l20.32,8.84
				c10.39,4.52,22.3-1.69,24.54-12.8C206.11,175.98,204.24,173.16,201.35,172.58z"/>
                <path className="feather-3" d="M203.38,151.53l-52.47,0.66c0.11,8.72,6.29,16.18,14.84,17.9l21.72,4.38c11.11,2.24,21.45-6.34,21.31-17.66
				C208.75,153.86,206.33,151.5,203.38,151.53z"/>
            </g>
            <path className="stroke" d="M201.35,172.58l-1.27-0.26c5.22-3.11,8.79-8.83,8.7-15.52c-0.04-2.95-2.46-5.31-5.41-5.27l-52.47,0.66
			c0.05,4.1,1.46,7.92,3.82,11l-4.82-0.97c-0.11,0.57-0.2,1.13-0.26,1.7l-4.36-3.28l-4.7,15.42l23.7,27.33
			c7.42,8.56,20.85,8.09,27.66-0.96c1.77-2.36,1.3-5.71-1.06-7.48l-2.39-1.8c7.99-0.19,15.32-5.81,17.02-14.28
			C206.11,175.98,204.24,173.16,201.35,172.58z"/>
        </g>
    );
}

export default function Tail({ tail }: TailProps) {
    return (
        <g id="Tail">
            {
                tail === 'Bug Bee' && <BugBee />
            }
            {
                tail === 'Plant Leaf' && <PlantLeaf />
            }
            {
                tail === 'Reptile Lizard' && <ReptileLizard />
            }
            {
                tail === 'Rodent Beaver' && <RodentSquirrel />
            }
            {
                tail === 'Fish Gold' && <FishGold />
            }
            {
                tail === 'Bird Feather' && <BirdFeather />
            }
        </g>
    );
}
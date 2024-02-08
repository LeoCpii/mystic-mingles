import React from 'react';

import type { MingleGenes } from '@mingles/business';

import './Back.scss';

type BackProps = { back: MingleGenes['back']['name'] };


function BugFly() {
    return (
        <g id="Bug-Fly">
            <path className="fly-wing" d="M220.13,100.32c-7.49,7.49-35.23,15.64-38.99,11.87s4.38-31.5,11.87-38.99s19.63-7.49,27.12,0
			C227.62,80.69,227.62,92.84,220.13,100.32z"/>
            <path className="fly-wing" d="M207.09,86.23c-9.77,4.09-27.82,26.68-25.76,31.59c2.06,4.91,30.82,7.88,40.58,3.78
			c9.77-4.09,14.37-15.33,10.27-25.1C228.1,86.73,216.86,82.13,207.09,86.23z"/>
        </g>
    );
}

function PlantFlower() {
    return (
        <g id="Plant-Flower">
            <g id="Shape_00000066506540023975073950000017602149844534625429_">
                <path className="flower-1" d="M203.56,73.52c-0.91-1.24-2.99-1.24-3.9,0c-1.03,1.39-10.03,13.77-10.03,20.45
        c0,7.21,5.09,12.64,11.84,12.64c6.91,0,12.12-5.43,12.12-12.64C213.59,87.29,204.59,74.91,203.56,73.52z"/>
                <path className="flower-2" d="M217.22,78.45c-0.06-0.93-0.65-1.74-1.51-2.08c-0.86-0.35-1.85-0.17-2.54,0.45
        c-0.08,0.07-6.78,6.13-11.52,10.29c-4.74-4.17-11.45-10.23-11.52-10.29c-0.99-0.9-2.53-0.82-3.43,0.17
        c-0.36,0.4-0.58,0.91-0.62,1.45c-0.12,1.59-1.12,15.64,0.07,20.64h0c2.05,8.63,7.53,13.38,15.4,13.38
        c7.94,0,13.44-4.75,15.5-13.38C218.24,94.07,217.32,80.03,217.22,78.45L217.22,78.45z"/>
            </g>
            <path id="Shadow_00000121242812638303848370000013561023529140745393_" className="flower-3" d="M217.22,78.45
    c-0.06-0.93-0.65-1.74-1.51-2.08c-0.86-0.35-1.85-0.17-2.54,0.45c-0.03,0.02-0.81,0.73-2.01,1.81c0.15,2.23,0.97,15.6-0.18,20.45
    c-1.78,7.47-6.15,12.03-12.45,13.12c1,0.17,2.01,0.26,3.02,0.26c7.94,0,13.44-4.75,15.5-13.38
    C218.24,94.07,217.32,80.03,217.22,78.45z"/>
            <path id="Stroke_00000067927673986235831140000004804222346926197389_" className="stroke" d="M217.22,78.45
    c-0.06-0.93-0.65-1.74-1.51-2.08c-0.86-0.35-1.85-0.17-2.54,0.45c-0.04,0.04-2.06,1.86-4.65,4.19c-2.24-3.76-4.47-6.83-4.95-7.48
    c-0.91-1.24-2.99-1.24-3.9,0c-0.48,0.65-2.7,3.7-4.93,7.44c-2.57-2.3-4.57-4.11-4.61-4.15c-0.99-0.9-2.53-0.82-3.43,0.17
    c-0.36,0.4-0.58,0.91-0.62,1.45c-0.12,1.59-1.12,15.64,0.07,20.64h0c2.05,8.63,7.53,13.38,15.4,13.38
    c7.94,0,13.44-4.75,15.5-13.38C218.24,94.07,217.32,80.03,217.22,78.45z"/>
        </g>
    );
}

function ReptileTurtle() {
    return (
        <g id="Reptile-Turtle">
            <path className="shell-1" d="M225.87,134c-2.11,4.91-12.38,14.63-23.17,14.09l0,0c0.06-0.64-0.09-1.35-0.5-2.09
    c-9.67-17.38-12.8-37.05-8.71-56.15c-0.01,0-0.01,0-0.02,0c0.8-3.73,1.41-5.56,1.75-6.71c0.04-0.13,0.07-0.26,0.11-0.39
    c0.06-0.21,0.1-0.4,0.13-0.58c0.04-0.25,0.06-0.5,0.05-0.73c0,0,0-0.01,0-0.01c-0.01-0.13-0.02-0.27-0.04-0.39
    c0.44-0.13,0.87-0.25,1.3-0.36c0.14-0.04,0.28-0.06,0.42-0.1c0.28-0.07,0.56-0.14,0.84-0.19c0.19-0.04,0.39-0.07,0.58-0.11
    c0.22-0.04,0.44-0.08,0.66-0.12c0.22-0.04,0.45-0.06,0.67-0.09c0.18-0.02,0.36-0.05,0.54-0.07c0.25-0.03,0.49-0.05,0.73-0.07
    c0.15-0.01,0.3-0.03,0.45-0.04c0.26-0.02,0.53-0.03,0.79-0.04c0.12,0,0.24-0.01,0.36-0.01c0.28,0,0.56,0,0.84,0
    c0.09,0,0.19,0,0.28,0.01c0.3,0.01,0.59,0.03,0.89,0.05c0.07,0,0.13,0.01,0.2,0.01c0.32,0.03,0.63,0.06,0.95,0.1
    c0.04,0,0.07,0.01,0.11,0.01c0.34,0.04,0.67,0.09,1,0.15c0.01,0,0.01,0,0.02,0c10.78,1.92,17.98,11.82,20.96,23.51
    c0.02,0.09,0.05,0.18,0.07,0.27c0.05,0.22,0.1,0.44,0.16,0.66c0.04,0.18,0.09,0.36,0.13,0.55c0.04,0.17,0.07,0.35,0.11,0.52
    c0.05,0.23,0.1,0.46,0.14,0.7c0.03,0.15,0.05,0.29,0.08,0.44c0.05,0.26,0.1,0.52,0.14,0.78c0.02,0.13,0.04,0.26,0.06,0.39
    c0.05,0.28,0.09,0.56,0.13,0.84c0.02,0.12,0.03,0.23,0.05,0.35c0.04,0.3,0.08,0.59,0.12,0.89c0.01,0.11,0.03,0.22,0.04,0.33
    c0.03,0.3,0.07,0.61,0.1,0.91c0.01,0.11,0.02,0.21,0.03,0.32c0.03,0.31,0.05,0.62,0.07,0.92c0.01,0.1,0.01,0.2,0.02,0.3
    c0.02,0.32,0.04,0.63,0.05,0.95c0,0.09,0.01,0.19,0.01,0.28c0.01,0.32,0.02,0.64,0.03,0.95c0,0.1,0,0.19,0.01,0.29
    c0.01,0.32,0.01,0.64,0.01,0.95c0,0.09,0,0.19,0,0.28c0,0.32-0.01,0.64-0.02,0.96c0,0.09,0,0.18-0.01,0.27
    c-0.01,0.32-0.03,0.64-0.04,0.96c0,0.09-0.01,0.18-0.01,0.27c-0.02,0.32-0.04,0.64-0.07,0.96c-0.01,0.09-0.01,0.17-0.02,0.26
    c-0.03,0.33-0.06,0.66-0.09,0.98c-0.01,0.08-0.01,0.15-0.02,0.23c-0.04,0.35-0.08,0.69-0.13,1.03c-0.01,0.06-0.01,0.11-0.02,0.17
    c-0.05,0.39-0.11,0.77-0.17,1.15c0,0.01,0,0.03-0.01,0.04c-0.2,1.2-0.44,2.39-0.74,3.55c-0.01,0.02-0.01,0.05-0.02,0.07
    c-0.09,0.36-0.19,0.72-0.29,1.07c-0.01,0.04-0.02,0.08-0.04,0.12c-0.1,0.34-0.2,0.68-0.31,1.01c-0.01,0.04-0.03,0.08-0.04,0.11
    c-0.08,0.26-0.17,0.53-0.26,0.79c-0.02,0.05-0.04,0.09-0.05,0.13c-0.2,0.57-0.42,1.14-0.65,1.69c-0.06,0.14-0.12,0.29-0.18,0.43
    L225.87,134z"/>
            <path className="shell-2" d="M206.69,147.84c0-0.06,0.01-0.12,0.01-0.18c0-0.05,0-0.1-0.01-0.15c-0.02-0.21-0.07-0.43-0.13-0.64
    c-0.02-0.05-0.03-0.1-0.05-0.16c-0.08-0.24-0.18-0.47-0.31-0.7c0,0,0,0,0,0h0c-1.42-2.54-2.69-5.12-3.81-7.73
    c-0.44-1.02-0.84-2.04-1.23-3.06c-0.11-0.29-0.24-0.57-0.35-0.86c-0.3-0.8-0.56-1.61-0.83-2.42c-0.17-0.51-0.37-1.02-0.53-1.54
    c-0.24-0.77-0.45-1.54-0.67-2.31c-0.16-0.56-0.34-1.11-0.48-1.67c-0.22-0.85-0.41-1.71-0.6-2.57c-0.11-0.48-0.24-0.95-0.33-1.43
    c-0.15-0.72-0.26-1.43-0.39-2.15c-0.11-0.62-0.24-1.24-0.34-1.86c-0.08-0.52-0.13-1.05-0.2-1.57c-0.11-0.82-0.23-1.63-0.31-2.45
    c-0.06-0.54-0.08-1.09-0.12-1.63c-0.06-0.8-0.14-1.59-0.18-2.39c-0.03-0.6-0.03-1.2-0.05-1.81c-0.02-0.74-0.06-1.47-0.06-2.21
    c0-0.45,0.03-0.89,0.03-1.34c0.02-0.89,0.02-1.78,0.07-2.67c0.04-0.7,0.11-1.39,0.16-2.09c0.05-0.63,0.08-1.26,0.14-1.89
    c0.13-1.29,0.3-2.57,0.49-3.85c0.01-0.04,0.01-0.07,0.01-0.11c0.6-3.94,1.51-7.84,2.7-11.66c0.17-0.54,0.21-1.05,0.16-1.52
    c-0.01-0.07-0.03-0.13-0.04-0.19c-0.03-0.16-0.05-0.32-0.11-0.47c-0.05-0.14-0.11-0.26-0.18-0.38c-0.19,0.03-0.38,0.07-0.56,0.1
    c-0.19,0.04-0.38,0.07-0.58,0.11c-0.28,0.06-0.56,0.13-0.84,0.19c-0.14,0.03-0.28,0.06-0.42,0.1c-0.43,0.11-0.86,0.23-1.3,0.36
    c0.02,0.13,0.04,0.26,0.04,0.39c0,0,0,0.01,0,0.01c0.01,0.23-0.01,0.48-0.05,0.73c-0.03,0.18-0.07,0.37-0.13,0.58
    c-0.04,0.13-0.07,0.26-0.11,0.39c-0.34,1.16-0.95,2.98-1.75,6.71c0.01,0,0.01,0,0.02,0c-4.09,19.1-0.96,38.77,8.71,56.15
    c0.41,0.74,0.56,1.44,0.5,2.09l0,0C204.04,148.16,205.37,148.07,206.69,147.84z"/>
            <path className="shell-3" d="M198.75,139.12c-0.48-1.07-0.93-2.14-1.36-3.23l21.07-10.19l-1.82-19.65l-24.74-5.26
    c0.08-1.17,0.19-2.33,0.33-3.5c0.16,0.02-1.68-0.37,25.5,5.41c7.55-7.21,7.05-6.79,7.45-6.97c0.52,1.1,0.99,2.22,1.41,3.36
    l-6.5,6.2l1.89,20.38l5.84,3.22c-0.33,1.13-0.72,2.24-1.16,3.33c-0.17-0.06,0.34,0.21-6.39-3.5
    C219.91,128.89,198.86,139.07,198.75,139.12z"/>
            <path className="shell-4" d="M225.87,134c-2.11,4.91-12.38,14.63-23.17,14.09l0,0c0.06-0.64-0.09-1.35-0.5-2.09
    c-9.67-17.38-12.8-37.05-8.71-56.15c-0.01,0-0.01,0-0.02,0c0.8-3.73,1.41-5.56,1.75-6.71c0.04-0.13,0.07-0.26,0.11-0.39
    c0.06-0.21,0.1-0.4,0.13-0.58c0.04-0.25,0.06-0.5,0.05-0.73c0,0,0-0.01,0-0.01c-0.01-0.13-0.02-0.27-0.04-0.39
    c0.44-0.13,0.87-0.25,1.3-0.36c0.14-0.04,0.28-0.06,0.42-0.1c0.28-0.07,0.56-0.14,0.84-0.19c0.19-0.04,0.39-0.07,0.58-0.11
    c0.22-0.04,0.44-0.08,0.66-0.12c0.22-0.04,0.45-0.06,0.67-0.09c0.18-0.02,0.36-0.05,0.54-0.07c0.25-0.03,0.49-0.05,0.73-0.07
    c0.15-0.01,0.3-0.03,0.45-0.04c0.26-0.02,0.53-0.03,0.79-0.04c0.12,0,0.24-0.01,0.36-0.01c0.28,0,0.56,0,0.84,0
    c0.09,0,0.19,0,0.28,0.01c0.3,0.01,0.59,0.03,0.89,0.05c0.07,0,0.13,0.01,0.2,0.01c0.32,0.03,0.63,0.06,0.95,0.1
    c0.04,0,0.07,0.01,0.11,0.01c0.34,0.04,0.67,0.09,1,0.15c0.01,0,0.01,0,0.02,0c10.78,1.92,17.98,11.82,20.96,23.51
    c0.02,0.09,0.05,0.18,0.07,0.27c0.05,0.22,0.1,0.44,0.16,0.66c0.04,0.18,0.09,0.36,0.13,0.55c0.04,0.17,0.07,0.35,0.11,0.52
    c0.05,0.23,0.1,0.46,0.14,0.7c0.03,0.15,0.05,0.29,0.08,0.44c0.05,0.26,0.1,0.52,0.14,0.78c0.02,0.13,0.04,0.26,0.06,0.39
    c0.05,0.28,0.09,0.56,0.13,0.84c0.02,0.12,0.03,0.23,0.05,0.35c0.04,0.3,0.08,0.59,0.12,0.89c0.01,0.11,0.03,0.22,0.04,0.33
    c0.03,0.3,0.07,0.61,0.1,0.91c0.01,0.11,0.02,0.21,0.03,0.32c0.03,0.31,0.05,0.62,0.07,0.92c0.01,0.1,0.01,0.2,0.02,0.3
    c0.02,0.32,0.04,0.63,0.05,0.95c0,0.09,0.01,0.19,0.01,0.28c0.01,0.32,0.02,0.64,0.03,0.95c0,0.1,0,0.19,0.01,0.29
    c0.01,0.32,0.01,0.64,0.01,0.95c0,0.09,0,0.19,0,0.28c0,0.32-0.01,0.64-0.02,0.96c0,0.09,0,0.18-0.01,0.27
    c-0.01,0.32-0.03,0.64-0.04,0.96c0,0.09-0.01,0.18-0.01,0.27c-0.02,0.32-0.04,0.64-0.07,0.96c-0.01,0.09-0.01,0.17-0.02,0.26
    c-0.03,0.33-0.06,0.66-0.09,0.98c-0.01,0.08-0.01,0.15-0.02,0.23c-0.04,0.35-0.08,0.69-0.13,1.03c-0.01,0.06-0.01,0.11-0.02,0.17
    c-0.05,0.39-0.11,0.77-0.17,1.15c0,0.01,0,0.03-0.01,0.04c-0.2,1.2-0.44,2.39-0.74,3.55c-0.01,0.02-0.01,0.05-0.02,0.07
    c-0.09,0.36-0.19,0.72-0.29,1.07c-0.01,0.04-0.02,0.08-0.04,0.12c-0.1,0.34-0.2,0.68-0.31,1.01c-0.01,0.04-0.03,0.08-0.04,0.11
    c-0.08,0.26-0.17,0.53-0.26,0.79c-0.02,0.05-0.04,0.09-0.05,0.13c-0.2,0.57-0.42,1.14-0.65,1.69c-0.06,0.14-0.12,0.29-0.18,0.43
    L225.87,134z"/>
            <path className="shell-stroke" d="M195.44,81.04c-0.03-0.16-0.05-0.32-0.11-0.47c-0.06-0.17-0.14-0.32-0.22-0.47
    c-0.02-0.04-0.04-0.09-0.06-0.13c-1.34-2.25-5.3-2.7-6.47,0.5c-0.32,0.89-0.62,1.78-0.91,2.67c-0.05,0.16-0.11,0.32-0.16,0.48
    c0,0,0.01,0,0.01,0c-7.2,22.64-3.89,46.13,7.99,66.03c1.53,2.56,5.03,2.01,6.5,0.08c0,0,0.01,0.01,0.01,0.01
    c0.03-0.04,0.06-0.09,0.09-0.13c0.03-0.05,0.07-0.1,0.1-0.15c0.09-0.15,0.17-0.3,0.23-0.45c0.01-0.03,0.03-0.06,0.04-0.1
    c0.07-0.2,0.13-0.4,0.16-0.6c0.01-0.04,0.01-0.09,0.01-0.13c0.02-0.17,0.03-0.35,0.02-0.53c0-0.05,0-0.1-0.01-0.15
    c-0.02-0.21-0.07-0.43-0.13-0.64c-0.02-0.05-0.03-0.1-0.05-0.16c-0.08-0.24-0.18-0.47-0.31-0.7c0,0,0,0,0,0l0,0
    c-1.42-2.54-2.69-5.12-3.81-7.73c-0.44-1.02-0.84-2.04-1.23-3.06c-0.11-0.29-0.24-0.57-0.35-0.86c-0.3-0.8-0.56-1.61-0.83-2.42
    c-0.17-0.51-0.37-1.02-0.53-1.54c-0.24-0.77-0.45-1.54-0.67-2.31c-0.16-0.56-0.34-1.11-0.48-1.67c-0.22-0.85-0.41-1.71-0.6-2.57
    c-0.11-0.48-0.24-0.95-0.33-1.43c-0.15-0.72-0.26-1.43-0.39-2.15c-0.11-0.62-0.24-1.24-0.34-1.86c-0.08-0.52-0.13-1.05-0.2-1.57
    c-0.11-0.82-0.23-1.63-0.31-2.45c-0.06-0.54-0.08-1.09-0.12-1.63c-0.06-0.8-0.14-1.59-0.18-2.39c-0.03-0.6-0.03-1.2-0.05-1.81
    c-0.02-0.74-0.06-1.47-0.06-2.21c0-0.45,0.03-0.89,0.03-1.34c0.02-0.89,0.02-1.78,0.07-2.67c0.04-0.7,0.11-1.39,0.16-2.09
    c0.05-0.63,0.08-1.26,0.14-1.89c0.13-1.29,0.3-2.57,0.49-3.85c0.01-0.04,0.01-0.07,0.01-0.11c0.6-3.94,1.51-7.84,2.7-11.66
    c0.17-0.54,0.21-1.05,0.16-1.52C195.48,81.17,195.46,81.11,195.44,81.04z"/>
        </g>
    );
}

function RodentNut() {
    return (
        <g id="Rodent-Nut">
            <path className="stem-stroke" d="M206.78,99.54c-0.43,0-0.84-0.16-1.17-0.45c-0.35-0.31-0.56-0.74-0.59-1.21c-0.08-1.42-0.63-5.52-2.12-7.4
    c-0.59-0.77-0.47-1.84,0.27-2.44c0.36-0.3,0.82-0.44,1.29-0.39c0.47,0.04,0.89,0.27,1.19,0.63c0.38,0.48,0.73,1.03,1.04,1.66
    l2.45-0.5c0.46-0.1,0.93-0.01,1.32,0.25c0.39,0.26,0.66,0.65,0.76,1.11l0,0c0.1,0.46,0.01,0.93-0.25,1.32
    c-0.26,0.39-0.66,0.66-1.12,0.76l-1.97,0.4c0.54,2.2,0.67,4.14,0.68,4.39c0.05,0.97-0.69,1.8-1.66,1.86
    C206.85,99.54,206.81,99.54,206.78,99.54z M209.53,91.4L209.53,91.4C209.53,91.4,209.53,91.4,209.53,91.4z"/>
            <path className="stem" d="M210.22,91.01c-0.08-0.41-0.49-0.68-0.9-0.59l-3.23,0.66c-0.33-0.8-0.73-1.54-1.23-2.16
    c-0.27-0.32-0.74-0.37-1.07-0.1c-0.32,0.26-0.37,0.72-0.12,1.05c2.01,2.52,2.34,7.91,2.34,7.96c0.02,0.42,0.38,0.74,0.8,0.71
    c0.42-0.02,0.74-0.38,0.71-0.8c-0.01-0.16-0.16-2.68-0.93-5.21l3.02-0.62C210.04,91.82,210.3,91.42,210.22,91.01z"/>
            <path className="nut" d="M224.38,115.26h0.02c-0.01-0.15-0.03-0.3-0.04-0.45c-0.02-0.26-0.04-0.51-0.06-0.77
    c-0.04-0.36-0.08-0.73-0.13-1.09c-0.03-0.24-0.07-0.48-0.11-0.72c-0.07-0.39-0.15-0.78-0.24-1.16c-0.04-0.2-0.08-0.4-0.13-0.59
    c-0.14-0.56-0.3-1.1-0.47-1.64c-0.01-0.02-0.01-0.04-0.02-0.06h0c0,0,0,0,0,0h-32.63c0,0,0,0,0,0c-0.19,0.56-0.35,1.13-0.49,1.7
    c-0.05,0.19-0.09,0.39-0.13,0.59c-0.09,0.39-0.17,0.77-0.24,1.17c-0.04,0.24-0.07,0.48-0.11,0.71c-0.05,0.36-0.1,0.72-0.13,1.09
    c-0.02,0.25-0.05,0.51-0.06,0.76c-0.01,0.15-0.03,0.3-0.04,0.45h0.02c-0.02,0.38-0.05,0.76-0.05,1.15
    c0,10.29,6.42,19.07,15.47,22.57c0,0,0,0,0,0c0.01,0,0.02,0.01,0.03,0.01c0.6,0.23,1.21,0.44,1.83,0.62
    c0.03,0.01,0.06,0.02,0.08,0.03c0.09,0.03,0.19,0.03,0.29,0c3.77-1.1,7.16-3.1,9.92-5.74c4.61-4.41,7.48-10.61,7.48-17.49
    C224.42,116.02,224.39,115.64,224.38,115.26z"/>
            <g id="topo">
                <path className="nut-top" d="M224.64,112.6h-35.9c-0.68,0-1.22-0.55-1.22-1.22v-6.13c0-4.12,3.34-7.47,7.47-7.47h23.41
        c4.12,0,7.47,3.34,7.47,7.47v6.13C225.87,112.05,225.32,112.6,224.64,112.6z"/>
                <g>
                    <path className="nut-details" d="M218.62,105.2c-0.03,0-0.05,0.01-0.08,0.01c-0.39,0-0.71-0.29-0.75-0.68c-0.38-3.52-3.09-6.26-6.5-6.75
            h4.08c2.14,1.47,3.64,3.82,3.93,6.59C219.34,104.78,219.04,105.15,218.62,105.2C218.62,105.2,218.62,105.2,218.62,105.2z
             M211.31,105.2c-0.41,0.03-0.76-0.3-0.81-0.71c-0.25-2.24-1.64-5.1-3.55-6.27c-0.16-0.1-0.36-0.1-0.52,0
            c-1.92,1.17-3.31,4.06-3.55,6.31c-0.04,0.39-0.37,0.68-0.75,0.68c-0.03,0-0.05,0-0.08-0.01c-0.42-0.04-0.72-0.42-0.67-0.83
            c0.24-2.22,1.37-4.9,3.16-6.59h4.33c1.78,1.68,2.92,4.37,3.16,6.59c0.04,0.42-0.26,0.79-0.67,0.83
            C211.33,105.2,211.32,105.2,211.31,105.2L211.31,105.2z"/>
                    <path className="nut-top-details" d="M202.1,97.78c-3.41,0.49-6.12,3.23-6.5,6.75c-0.04,0.39-0.37,0.68-0.75,0.68c-0.03,0-0.05,0-0.08-0.01
            c-0.42-0.04-0.72-0.42-0.67-0.83c0,0,0,0,0,0c0.29-2.76,1.79-5.12,3.93-6.59H202.1z"/>
                </g>
                <path className="nut-top-stroke" d="M224.64,112.6h-35.9c-0.68,0-1.22-0.55-1.22-1.22v-6.13c0-4.12,3.34-7.47,7.47-7.47h23.41
        c4.12,0,7.47,3.34,7.47,7.47v6.13C225.87,112.05,225.32,112.6,224.64,112.6z"/>
            </g>
            <path className="nut-details" d="M201.58,131.07c-0.64,0-1.17-0.5-1.38-1.32c-0.11-0.41,0.14-0.82,0.54-0.93c0,0,0,0,0,0
    c0.33-0.08,0.67,0.05,0.84,0.34c0.22-0.36,0.68-0.47,1.04-0.26c0.29,0.17,0.43,0.52,0.34,0.84
    C202.75,130.57,202.22,131.07,201.58,131.07L201.58,131.07z M205.11,134.08c-0.64,0-1.17-0.5-1.38-1.32
    c-0.11-0.41,0.14-0.82,0.54-0.93c0.33-0.08,0.67,0.05,0.84,0.34c0.22-0.36,0.68-0.47,1.04-0.26c0.29,0.17,0.43,0.52,0.34,0.84
    C206.28,133.57,205.75,134.08,205.11,134.08z M217.35,118.37c-0.64,0-1.17-0.5-1.38-1.32c-0.11-0.41,0.14-0.82,0.54-0.93
    c0.33-0.08,0.67,0.05,0.84,0.34c0.22-0.36,0.68-0.47,1.04-0.26c0.29,0.17,0.43,0.52,0.34,0.84
    C218.52,117.86,217.99,118.37,217.35,118.37z M212.29,121.12c-0.64,0-1.17-0.5-1.38-1.32c-0.11-0.41,0.14-0.82,0.54-0.93
    c0,0,0,0,0,0c0.33-0.09,0.67,0.06,0.84,0.34c0.22-0.36,0.68-0.47,1.04-0.26c0.29,0.17,0.43,0.52,0.34,0.84
    C213.46,120.61,212.93,121.12,212.29,121.12z M196.14,121.41c-0.64,0-1.17-0.5-1.38-1.32c-0.11-0.41,0.14-0.82,0.54-0.93
    c0.33-0.08,0.67,0.05,0.84,0.34c0.22-0.36,0.68-0.47,1.04-0.26c0.29,0.17,0.43,0.52,0.34,0.84
    C197.32,120.9,196.79,121.41,196.14,121.41z"/>
        </g>
    );
}

function FishFin() {
    return (
        <g id="Fish-Fin">
            <path className="fin" d="M161.79,124.08c-5.93-2.85-5.93-9.96,0-12.81l14.08-6.76l14.08-6.76c5.93-2.85,13.33,0.71,13.33,6.4v13.52
    v13.52c0,5.69-7.41,9.25-13.33,6.4l-14.08-6.76L161.79,124.08z"/>
            <path className="fin-details" d="M161.79,120.73c-5.93-1.36-5.93-4.75,0-6.11l14.08-3.23l14.08-3.23c5.93-1.36,13.33,0.34,13.33,3.06v6.46
    v6.46c0,2.72-7.41,4.42-13.33,3.06l-14.08-3.23L161.79,120.73z"/>
            <path className="fin-stroke" d="M161.79,124.08c-5.93-2.85-5.93-9.96,0-12.81l14.08-6.76l14.08-6.76c5.93-2.85,13.33,0.71,13.33,6.4v13.52
    v13.52c0,5.69-7.41,9.25-13.33,6.4l-14.08-6.76L161.79,124.08z"/>
        </g>
    );
}

function BirdWing() {
    return (
        <g id="Bird-Wing">
            <path className="wing-1" d="M224.94,75.28l-29.18,18.27c-4.06,2.54-7.5,5.97-10.05,10.02c-3.22,5.11-3.23,11.62-0.03,16.74
    c2.43,3.88,6.42,6.5,10.94,7.2c11.23,1.72,22.03-5.31,24.8-16.32c1.7-6.76,1.05-14.1-2.25-20.7l6.63-4.15
    c3.5-2.19,4.56-6.81,2.37-10.31C227.49,74.92,226.04,74.59,224.94,75.28L224.94,75.28z"/>
            <g>
                <path className="wing-3" d="M226.58,97.45l-17.61,11.03c-0.81,0.5-1.87,0.26-2.37-0.55l-0.56-0.89c-2.07-3.3-1.07-7.66,2.23-9.73
        l17.44-10.92c1.1-0.69,2.55-0.36,3.23,0.74C231.14,90.64,230.08,95.25,226.58,97.45L226.58,97.45z"/>
                <path className="wing-2" d="M226.12,92.58l-6.34,3.97c-0.84,0.53-1.96,0.27-2.48-0.57c-0.53-0.84-0.27-1.96,0.57-2.48l6.34-3.97
        c0.84-0.53,1.96-0.27,2.48,0.57C227.22,90.94,226.96,92.05,226.12,92.58z"/>
            </g>
            <g>
                <path className="wing-4" d="M223.63,110.89l-14.9,9.33c-0.81,0.5-1.87,0.26-2.37-0.55l-0.56-0.89c-2.07-3.3-1.07-7.66,2.23-9.73
        l14.73-9.23c1.1-0.69,2.55-0.36,3.23,0.74C228.19,104.08,227.13,108.7,223.63,110.89L223.63,110.89z"/>
                <path className="wing-3" d="M222.93,106.22l-6.34,3.97c-0.84,0.53-1.96,0.27-2.48-0.57c-0.53-0.84-0.27-1.96,0.57-2.48l6.34-3.97
        c0.84-0.53,1.96-0.27,2.48,0.57C224.03,104.58,223.77,105.69,222.93,106.22z"/>
            </g>
            <path className="stroke" d="M228.95,87.13c-0.69-1.1-2.14-1.43-3.23-0.74l-6.54,4.1c0,0,0,0,0,0l6.63-4.15
    c3.5-2.19,4.56-6.81,2.37-10.31c-0.69-1.1-2.14-1.43-3.23-0.74l-29.18,18.27c-4.06,2.54-7.5,5.97-10.05,10.02
    c-3.22,5.11-3.23,11.62-0.03,16.74c2.43,3.88,6.42,6.5,10.94,7.2c10.76,1.65,21.11-4.75,24.39-14.98l2.61-1.64h0
    c3.5-2.19,4.56-6.81,2.37-10.31c-0.69-1.1-2.14-1.43-3.23-0.74l3.81-2.39C230.08,95.25,231.14,90.64,228.95,87.13z"/>
        </g>
    );
}

export default function Back({ back }: BackProps) {
    return (
        <g id="Back">
            {
                back === 'Bug Fly' && <BugFly />
            }
            {
                back === 'Plant Flower' && <PlantFlower />
            }
            {
                back === 'Reptile Turtle' && <ReptileTurtle />
            }
            {
                back === 'Rodent Nut' && <RodentNut />
            }
            {
                back === 'Fish Fin' && <FishFin />
            }
            {
                back === 'Bird Wing' && <BirdWing />
            }
        </g>
    );
}
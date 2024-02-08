import React from 'react';

import { IconProps } from './interface';

export default function BirdIcon({ color = '#fff', size = 512 }: IconProps) {
    return (
        <svg width={size} height={size} x="0" y="0" viewBox="0 0 64 64">
            <g>
                <path d="M57.1 4.99A1.015 1.015 0 0 0 56.02 4C19.98 6.69 13.23 33.27 11.97 44.21c3.95-5.87 14.518-16.533 14.71-16.47a1.001 1.001 0 0 1 1.36 1.47c-.12.11-16.169 18.077-16.34 19.41a34.419 34.419 0 0 0-4.77 10.15.997.997 0 1 0 1.94.46 31.863 31.863 0 0 1 4.43-9.4c28.21-.91 38.15-23.57 38.25-23.8a1.004 1.004 0 0 0-.92-1.39h-4.52l7.9-4.26a.944.944 0 0 0 .42-.44c2.75-5.61 2.67-14.57 2.67-14.95z" fill={color} opacity="1">
                </path>
            </g>
        </svg>
    );
}
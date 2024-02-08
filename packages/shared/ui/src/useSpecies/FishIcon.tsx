import React from 'react';

import { IconProps } from './interface';

export default function FishIcon({ color = '#fff', size = 512 }: IconProps) {
    return (
        <svg width={size} height={size} x="0" y="0" viewBox="0 0 512 512">
            <g>
                <path d="M326.484 110.477C272.34 64.676 175.488 62.596 175.488 62.596s16.591 33.888 18.093 83.262c-28.993 17.097-58.743 40.855-88.747 72.419 0 0-44.309-53.89-104.186-47.902 0 0-7.186 44.309 26.346 87.421C-6.538 300.908.648 345.217.648 345.217c59.877 5.988 104.186-47.902 104.186-47.902 42.066 44.251 83.633 73.169 123.31 89.878-2.288 17.467-2.751 37.806.038 62.21 0 0 45.643-4.986 81.662-43.961 96.78 2.222 172.994-66.719 202.158-147.646-27.473-76.227-96.691-141.816-185.518-147.319zm68.553 117.543c-9.864 0-17.861-7.996-17.861-17.861s7.996-17.861 17.861-17.861 17.861 7.996 17.861 17.861-7.997 17.861-17.861 17.861z" fill={color} opacity="1">
                </path>
            </g>
        </svg>
    );
}
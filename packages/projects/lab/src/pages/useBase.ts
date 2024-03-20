import { useContext } from 'react';

import { BaseContext } from './BaseProvider';

export default function useBase() {
    return useContext(BaseContext);
}
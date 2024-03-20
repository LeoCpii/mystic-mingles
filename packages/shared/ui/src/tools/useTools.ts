import { useContext } from 'react';

import { BaseContext } from './ToolsProvider';

export default function useTools() {
    return useContext(BaseContext);
}
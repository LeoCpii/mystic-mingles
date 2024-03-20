import { useContext } from 'react';

import { ResourcesContext } from './ResourcesProvider';

export default function useResources() {
    return useContext(ResourcesContext);
}
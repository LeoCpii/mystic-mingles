import type { Species } from '@mingles/business';

import Config from './config';

export default function useSpecies(species: Species) {
    return Config[species];
}
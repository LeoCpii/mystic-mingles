import { useState } from 'react';

import { Mingle, type Species, type MingleBasicOptions, colors } from '@mingles/business';
import { getRandom } from '@mingles/services';

export default function useMingle(mingle: MingleBasicOptions<Species>) {
    const [_mingle, setMingle] = useState<Mingle<Species>>(new Mingle(mingle));

    const update = (data: Partial<Mingle<Species>>) => {
        data.createAt = new Date();

        if (data.species) { data.color = getRandom(colors[data.species] as any); };

        setMingle(new Mingle({ ..._mingle, ...data } as any));
    };

    const updateGenes = (genes: Mingle<Species>['genes']) => {
        update({ genes: { ..._mingle.genes, ...genes } } as any);
    };

    return { mingle: _mingle, update, updateGenes };
}
import type { Species, SpeciesParts, SpeciesOptions, SpeciesCards, Bug, Fish } from "@/species";

type GetPart<Options extends SpeciesOptions<SpeciesParts, string, SpeciesCards>, Part extends keyof Options['parts']> = Options['parts'][Part];

export type Mingle<MingleSpecies extends Species> = {
    name: string;
    life: number;
    speed: number;
    parts: MinglePart;
    species: MingleSpecies;
    color: MingleColors<MingleSpecies>;
}

interface MinglePart {
    eye: GetPart<Bug | Fish, 'eye'>;
    body: GetPart<Bug | Fish, 'body'>;
    horn: GetPart<Bug | Fish, 'horn'>;
    tail: GetPart<Bug | Fish, 'tail'>;
    mouth: GetPart<Bug | Fish, 'mouth'>;
}

type MingleColors<MingleSpecies extends Species> =
    MingleSpecies extends 'bug' ? Bug['colors'] :
    MingleSpecies extends 'fish' ? Fish['colors'] :
    never;
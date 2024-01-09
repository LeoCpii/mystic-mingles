import type { Species, ChooseSpecies, SpeciesCards } from "@/species";
import type { ActionParts } from "@/parts";

type GetCardInfo<SpeciesCard extends Species, PartCard extends ActionParts, Info extends keyof SpeciesCards[PartCard][0]> = ChooseSpecies<SpeciesCard>['cards'][PartCard][0][Info];

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>

export type Passive = 'heal' | 'damage' | 'speed';

export type Card<SpeciesCard extends Species> = {
    [Part in ActionParts]: {
        part: Part;
        attack: number;
        shield: number;
        passive: Passive;
        cost: IntRange<0, 3>;
        species: SpeciesCard;
        name: GetCardInfo<SpeciesCard, Part, 'name'>;
        description: GetCardInfo<SpeciesCard, Part, 'description'>;
    };
}[ActionParts];
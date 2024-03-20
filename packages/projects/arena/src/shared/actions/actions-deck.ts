import Team from '@mingles/business/team';
import type Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';

export function getCardsToBuy(teamAlly: Team) {
    const MAX_CARDS = 12;
    const CARDS_PER_ROUND = 3;

    const numberOfCardsInTheDeck = Object.values(teamAlly.deck).reduce((acc, current) => { return acc += current.length; }, 0);

    if (numberOfCardsInTheDeck >= MAX_CARDS) { return teamAlly.deck; }

    const diff = MAX_CARDS - numberOfCardsInTheDeck;

    const cardPiecesToBuy = diff > CARDS_PER_ROUND ? CARDS_PER_ROUND : diff;

    teamAlly.buyCard(cardPiecesToBuy);

    return teamAlly.deck;
};

interface ChooseCards { teamAlly: Team; fighter: Ally<Species>; card: Card<Species, ActiveParts>; fighterCards: Card<Species, ActiveParts>[]; }
export function chooseCards({ teamAlly, fighter, fighterCards, card }: ChooseCards) {
    const energies = teamAlly.energy - card.cost;

    if (energies < 0 || fighterCards.length + 1 > 4) { return { newTeam: teamAlly, newChosenCards: fighterCards }; }

    const newChosenCards = fighterCards
        ? [...fighterCards, card]
        : [card];

    const index = teamAlly.deck[fighter.id].findIndex(c => c.name === card.name);

    fighter.shield += card.shield;

    teamAlly.deck[fighter.id].splice(index, 1);

    const newTeam = new Team({
        ...teamAlly,
        energy: energies,
        deck: teamAlly.deck,
        allies: [...teamAlly.allies.filter(a => a.id !== fighter.id), fighter]
    });

    return { newTeam, newChosenCards };
}

export function rollbackChooseCards(teamAlly: Team, fighter: Ally<Species>, fighterCards: Card<Species, ActiveParts>[]) {
    fighter.shield = 0;

    const energySpent = fighterCards.reduce((acc, c) => acc += c.cost, 0);

    return new Team({
        ...teamAlly,
        energy: teamAlly.energy + energySpent,
        allies: [...teamAlly.allies.filter(a => a.id !== fighter.id), fighter],
        deck: { ...teamAlly.deck, [fighter.id]: [...teamAlly.deck[fighter.id], ...fighterCards] },
    });
}
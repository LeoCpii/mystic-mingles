import { useState, createContext, useMemo, useEffect } from 'react';

import Team from '@mingles/business/team';
import type Card from '@mingles/business/card';
import type { Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import { isEmpty } from '@mingles/services/object';

export type ChosenCards = { [id: string]: Card<Species, ActiveParts>[]; }
export type Teams = { teamAlly: Team, teamEnemy: Team };

interface HudData {
    round: number;
    chosenCards: ChosenCards;
    currentCards: Card<Species, ActiveParts>[];
}

interface BattleFieldOnlineContextData {
    hud: HudData;
    teams: Teams;

    updateTeamAlly: (team: Team) => void;
    updateTeamEnemy: (team: Team) => void;
    updateCards: (fighterId: string, cards: Card<Species, ActiveParts>[]) => void;

    populateTeams: (teamAlly: Team, teamEnemy: Team) => void;
}

export const BattleFieldOnlineContext = createContext<BattleFieldOnlineContextData>({
    hud: { round: 0, chosenCards: {}, currentCards: [] },
    teams: {
        teamAlly: new Team({ name: 'Team 1', allies: [] }),
        teamEnemy: new Team({ name: 'Team 2', allies: [] }),
    },

    updateCards: () => { },
    updateTeamAlly: () => { },
    updateTeamEnemy: () => { },

    populateTeams: () => { },
});

interface BattleFieldProviderProps { children: React.JSX.Element; }
export default function BattleFieldOnlineProvider({ children }: BattleFieldProviderProps) {
    const [teams, setTeams] = useState<Teams>({
        teamAlly: new Team({ name: 'Team 1', allies: [] }),
        teamEnemy: new Team({ name: 'Team 2', allies: [] }),
    });

    const [hud, setHud] = useState({
        round: 1,
        currentCards: [],
        chosenCards: {
            ...teams.teamAlly.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
            ...teams.teamEnemy.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
        },
    });

    useEffect(() => {
        if (hud.round === 1 && isEmpty(hud.chosenCards)) {
            setHud({
                ...hud, chosenCards: {
                    ...teams.teamAlly.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
                    ...teams.teamEnemy.allies.reduce((acc, ally) => ({ ...acc, [ally.id]: [] }), {}),
                },
            });
        }

    }, [teams]);

    const context = useMemo<BattleFieldOnlineContextData>(() => ({
        hud,
        teams,

        updateTeamAlly: (team: Team) => setTeams({ ...teams, teamAlly: team }),
        updateTeamEnemy: (team: Team) => setTeams({ ...teams, teamEnemy: team }),

        populateTeams: (teamAlly: Team, teamEnemy: Team) => setTeams({ teamAlly, teamEnemy }),

        updateCards: (fighterId: string, cards: Card<Species, ActiveParts>[]) => { updateCards(fighterId, cards); },
    }), [teams, hud]);

    const updateCards = (fighterId: string, cards: Card<Species, ActiveParts>[]) => {
        setHud({ ...hud, chosenCards: { ...hud.chosenCards, [fighterId]: cards } });
    };

    return (
        <BattleFieldOnlineContext.Provider value={context}>
            {children}
        </BattleFieldOnlineContext.Provider>
    );
}
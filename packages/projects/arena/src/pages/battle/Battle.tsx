
import { useEffect } from 'react';

import Game from '@mingles/business/game';
import Team from '@mingles/business/team';
import Ally from '@mingles/business/ally';
import Player from '@mingles/business/player';
import Mingle, { generateRandomMingle } from '@mingles/business/mingle';

import BattleField from '@/components/BattleField';
import { simpleAmbient } from '@/shared/actions/actions-sound';

const team1 = new Team({
    name: 'Team 1',
    allies: [
        new Ally({
            coordinates: { x: 1, y: 2 }, mingle: new Mingle({
                name: 'aaa',
                body: 'square',
                species: 'bird',
                color: '#ff78b4',
                genes: {
                    back: { name: 'Bird Wing', species: 'bird' },
                    eye: { name: 'Fish Crazy', species: 'fish' },
                    horn: { name: 'Plant Fall', species: 'plant' },
                    mouth: { name: 'Bug Termite', species: 'bug' },
                    tail: { name: 'Rodent Beaver', species: 'rodent' },
                }
            }),
        }),
        new Ally({ coordinates: { x: 3, y: 2 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'bbb' }), }),
        new Ally({ coordinates: { x: 4, y: 1 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'ccc' }), }),
    ]
});

const team2 = new Team({
    name: 'Team 2',
    allies: [
        new Ally({ coordinates: { x: 3, y: 0 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'ddd' }), }),
        new Ally({ coordinates: { x: 4, y: 1 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'eee' }), }),
        new Ally({ coordinates: { x: 1, y: 0 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'fff' }), }),
    ]
});

export default function Battle() {
    const game = new Game({
        id: '',
        players: [
            new Player({
                name: 'Player 1',
                teams: [team1],
                selectedTeamId: team1.id,
            }),
            new Player({
                name: 'Player 2',
                teams: [team2],
                selectedTeamId: team2.id,
            })
        ],
    });

    useEffect(() => {
        setTimeout(() => {
            simpleAmbient();
        }, 0);
    }, []);

    return (
        <BattleField
            teamAlly={game.players[0].teams.find(team => team.id === game.players[0].selectedTeamId) as Team}
            teamEnemy={game.players[1].teams.find(team => team.id === game.players[1].selectedTeamId) as Team}
        />
    );
}
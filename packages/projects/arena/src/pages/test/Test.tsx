import Game from '@mingles/business/game';
import Team from '@mingles/business/team';
import Ally from '@mingles/business/ally';
import Player from '@mingles/business/player';
import { Species } from '@mingles/business/species';
import Mingle, { generateRandomMingle } from '@mingles/business/mingle';
import MingleParts, { type Direction } from '@mingles/ui/mingle-parts';

import { Canvas, useCanvas } from '@/components/Canvas';

import './Test.scss';

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
        new Ally({ coordinates: { x: 3, y: 2 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'bbb', species: 'fish', color: '#00b8ff' }), }),
        new Ally({ coordinates: { x: 4, y: 1 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'ccc', species: 'rodent', color: '#f5a037' }), }),
    ]
});

const team2 = new Team({
    name: 'Team 2',
    allies: [
        new Ally({ coordinates: { x: 3, y: 0 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'ddd', species: 'bug', color: '#ff433e' }), }),
        new Ally({ coordinates: { x: 4, y: 1 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'eee', species: 'plant', color: '#99ff73' }), }),
        new Ally({ coordinates: { x: 1, y: 0 }, mingle: new Mingle({ ...generateRandomMingle(), name: 'fff', species: 'reptile', color: '#c569cf' }), }),
    ]
});

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

interface WarriorProps { direction: Direction; ally: Ally<Species>; }
function Warrior({ ally, direction }: WarriorProps) {
    const x = `${ally.coordinates.x * 100}px `;
    const y = `${ally.coordinates.y * 50}px`;

    return (
        <div id={ally.id} className="warrior" style={{ transform: `translate(${x}, ${y})` }}>
            <MingleParts mingle={ally} size={1} direction={direction} />
        </div>
    );
}

export default function Test() {
    const { ctx } = useCanvas();

    const teamAlly = game.players[0].teams.find(team => team.id === game.players[0].selectedTeamId) as Team;
    const teamEnemy = game.players[1].teams.find(team => team.id === game.players[1].selectedTeamId) as Team;

    const handleAttack = (ally: Ally<Species>, enemy: Ally<Species>) => {
        const attacker = document.getElementById(ally.id) as HTMLElement;
        const defender = document.getElementById(enemy.id) as HTMLElement;

        if (attacker && defender) {
            const attackerRect = attacker.getBoundingClientRect();
            const defenderRect = defender.getBoundingClientRect();

            console.log(attackerRect, defenderRect);


            const x = defenderRect.x - attackerRect.x;
            const y = defenderRect.y - attackerRect.y;

            attacker.style.transform = `translate(${x}px, ${y}px)`;
            attacker.style.zIndex = '100';
        }
    };

    return (
        <div className="container">
            <div className="content">
                <div className="battle-field">
                    <Canvas width={1056} height={594} />
                    <div className="teams">
                        <div className="ally-team">
                            {
                                teamAlly.allies.map((ally) => (
                                    <div key={ally.id} className="ally">
                                        <Warrior ally={ally} direction="right" />
                                    </div>
                                ))
                            }
                        </div>
                        <div className="enemy-team">
                            {
                                teamEnemy.allies.map((enemy) => (
                                    <div key={enemy.id} className="enemy">
                                        <Warrior ally={enemy} direction="left" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <button onClick={() => handleAttack(teamAlly.allies[2], teamEnemy.allies[0])}>ATTACK</button>
                </div>
            </div>
        </div>
    );
}
import type DB from '@mingles/middleware/db';

import Mingle from '@/mingle';
import type { Species } from '@/species';
import Ally from '@/ally';

import Team from './team';
import type { TeamDataBase } from './interface';

interface PopulateTeam {
    teams: TeamDataBase[];
    mingles: Mingle<Species>[];
}

export class TeamServices {
    constructor(private db: DB) { }

    public async getTeams(userId: string) {
        return this.db.getAllCollectionItem<TeamDataBase>({
            path: 'player',
            pathSegments: [userId, 'teams']
        });
    }

    public async addTeam(userId: string, team: Team) {
        return this.db.addCollectionItem<TeamDataBase>({
            path: 'player',
            pathSegments: [userId, 'teams', team.id],
            data: {
                id: team.id,
                name: team.name,
                allies: team.allies.map(ally => ({ id: ally.id, coordinates: ally.coordinates })),
            }
        });
    }

    public async updateTeam(userId: string, team: Team) {
        return this.db.updateDoc<TeamDataBase>({
            id: team.id,
            path: 'player',
            pathSegments: [userId, 'teams', team.id],
            data: {
                id: team.id,
                name: team.name,
                allies: team.allies.map(ally => ({ id: ally.id, coordinates: ally.coordinates })),
            },
        });
    }

    public populateTeam({ teams, mingles }: PopulateTeam): Team[] {
        return teams.map(team => {
            return new Team({
                id: team.id,
                name: team.name,
                allies: team.allies.map(ally => {
                    const mingle = mingles.find(mingle => mingle.id === ally.id);
                    return new Ally({ mingle, coordinates: ally.coordinates });
                })
            });
        });
    }
}
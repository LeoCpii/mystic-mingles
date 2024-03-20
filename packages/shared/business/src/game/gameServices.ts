import type DB from '@mingles/middleware/db';
import type { Subscribe } from '@mingles/middleware/realtimeDB';

import type { TeamServices } from '@/team/teamServices';
import type { MingleServices } from '@/mingle/mingleServices';

export default class GameServices {
    private subscription: Subscribe;

    constructor(private db: DB, private mingleServices: MingleServices, private teamServices: TeamServices) { }

    public async populateRoom(userId: string, enemyId: string) {
        return Promise.all([
            this.mingleServices.getMingles(userId),
            this.teamServices.getTeams(userId),
            this.mingleServices.getMingles(enemyId),
            this.teamServices.getTeams(enemyId)
        ]).then(([myMingles, myTeams, enemyMingles, enemyTeams]) => {
            const populatedAllyTeam = this.teamServices.populateTeam({ teams: myTeams, mingles: myMingles });
            const populatedEnemyTeam = this.teamServices.populateTeam({ teams: enemyTeams, mingles: enemyMingles });

            return { myTeams: populatedAllyTeam, enemyTeams: populatedEnemyTeam };
        });
    }
}
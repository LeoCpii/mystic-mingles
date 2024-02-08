import type Team from '@/team';

import type { PlayerOptions } from './interface';

export default class Player implements PlayerOptions {
    public name: string;
    public teams: Team[] = [];
    public selectedTeamId: string;

    constructor({ name, teams, selectedTeamId }: PlayerOptions) {
        this.name = name;
        this.teams = teams;
        this.selectedTeamId = selectedTeamId;
    }
}
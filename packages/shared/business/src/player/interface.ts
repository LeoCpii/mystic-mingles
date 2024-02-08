import type Team from '@/team';

export interface PlayerOptions {
    name: string;
    teams: Team[];
    selectedTeamId: string;
}
import { useState } from 'react';

import Player from '@mingles/business/player';

export default function usePlayer(player: Player) {
    const [_player, setPlayer] = useState<Player>(player);

    const removeTeam = (id: string) => {
        const teams = _player.teams.filter(team => team.id !== id);
        setPlayer({ ..._player, teams });
    };

    const selectTeam = (id: string) => {
        const selectedTeamId = id;
        setPlayer({ ..._player, selectedTeamId });
    };

    return {
        player: _player,
        removeTeam,
        selectTeam
    };
}
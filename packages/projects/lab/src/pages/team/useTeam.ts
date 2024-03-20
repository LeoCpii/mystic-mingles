import { useEffect, useState } from 'react';

import Ally from '@mingles/business/ally';
import Team from '@mingles/business/team';
import type Mingle from '@mingles/business/mingle';
import type { Coordinates } from '@mingles/business/ally';
import type { Species } from '@mingles/business/species';

export function useTeam(team: Team) {
    const [_team, setTeam] = useState<Team>(team);

    useEffect(() => { setTeam(team); }, [team]);

    const updateName = (name: string) => {
        const newTeam = new Team({ allies: _team.allies, name });
        setTeam(newTeam);
    };

    const addAlly = (coordinates: Coordinates, mingle: Mingle<Species>) => {
        const newTeam = new Team({ allies: [..._team.allies, new Ally({ coordinates, mingle })], name: _team.name });
        setTeam(newTeam);
    };

    const removeAlly = (id: string) => {
        const newTeam = new Team({ allies: _team.allies.filter(a => a.id !== id), name: _team.name });
        setTeam(newTeam);
    };

    return { team: _team, addAlly, removeAlly, updateName };
}
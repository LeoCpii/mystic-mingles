export type Buff = 'damage' | 'heal' | 'speed' | 'speed';
export type Debuff = 'poison' | 'stun';
export type Backdoor = 'faster_backdoor' | 'less_life_backdoor';

export type BuffAndDebuff = Buff | Debuff;

export type Effect = Buff | Debuff | Backdoor;
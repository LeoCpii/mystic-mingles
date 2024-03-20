import { useState } from 'react';
// import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import Button from '@mui/material/Button';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

import DeckCard from '@mingles/ui/card';
import Effects from '@mingles/ui/effects';
import MiniCard from '@mingles/ui/mini-card';
import { joinClass } from '@mingles/ui/utils';
import type Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import useSpecies from '@mingles/ui/useSpecies';
import type { Species } from '@mingles/business/species';
import type { CardOptions } from '@mingles/business/card';
// import type { GameDataBase } from '@mingles/business/game';
import type { ActiveParts } from '@mingles/business/parts';
import MingleParts, { type Direction } from '@mingles/ui/mingle-parts';
import type { Buff, BuffAndDebuff, Debuff } from '@mingles/business/effect';

import { Canvas } from '@/components/Canvas';
import BaseMap from '@/assets/map/base-map.png';
// import { gameServices } from '@/shared/core';
import { useBattle } from '@/components/BattleFieldOnline';

import './Test.scss';

function Shield() {
    return (
        <svg width="34" height="34" x="0" y="0" viewBox="0 0 512 512">
            <g>
                <path d="M461.143 60.883 260.313.633a14.996 14.996 0 0 0-8.622 0L50.857 60.883A15 15 0 0 0 40.168 75.25v220.916c0 28.734 11.633 58.148 34.574 87.425 17.521 22.36 41.762 44.813 72.047 66.736 50.877 36.828 100.976 59.42 103.084 60.363a14.99 14.99 0 0 0 12.258 0c2.107-.943 52.205-23.535 103.082-60.363 30.285-21.923 54.525-44.376 72.047-66.736 22.941-29.276 34.572-58.69 34.572-87.425V75.25a14.997 14.997 0 0 0-10.689-14.367z" fill="#0465a4" opacity="1">
                </path>
            </g>
        </svg>
    );
}

interface WarriorProps { ally: Ally<Species>; direction: Direction; }
function Warrior({ ally, direction }: WarriorProps) {
    const { color, icon } = useSpecies(ally.species);

    const buffs = Object.keys(ally.buffs).map(key => ({ key, value: ally.buffs[key as Buff] })).filter(({ value }) => value);
    const debuffs = Object.keys(ally.debuffs).map(key => ({ key, value: ally.debuffs[key as Debuff] }));

    return (
        <div id={ally.id} className="warrior">
            <div className="warrior-hud">
                <div className="effects">
                    {
                        [...buffs, ...debuffs]
                            .filter(effect => effect.value)
                            .map((effect, index) => {
                                return (
                                    <Zoom key={index} in>
                                        <div className="effect">
                                            {
                                                effect.value && effect.value > 1 && <span>{effect.value}</span>
                                            }
                                            <Effects effect={effect.key as BuffAndDebuff} />
                                        </div>
                                    </Zoom>
                                );
                            })
                    }
                    <p style={{ color: '#333' }}>{ally.isAlive ? '' : 'mortin'}</p>
                </div>
                <div className="life-hud">
                    <Zoom in={!!ally.shield}>
                        <div className="shield">
                            <Shield />
                            <span className="value">{ally.shield}</span>
                        </div>
                    </Zoom>
                    <div className="info-bar">
                        <div className="warrior-class" style={{ background: color }}>
                            {icon({ color: 'white', size: 16 })}
                        </div>
                        <div className="warrior-life">{ally.life}</div>
                        <div className="life-bar-container">
                            <div
                                className="life-bar-content"
                                style={{
                                    width: `${(ally.life / (ally.totalLife)) * 100}%`,
                                    backgroundColor: ally.life > ally.totalLife / 2 ? '#31c957' : '#f73434'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div onClick={() => console.log('ally', ally)}>
                <MingleParts direction={direction} mingle={ally} />
            </div>
        </div>
    );
}

function CardEl({ onClick, ...card }: CardOptions<Species, ActiveParts> & { onClick: () => void }) {
    return (
        <div className="card" onClick={onClick}  >
            <div className="big">
                <DeckCard {...card} />
            </div>
            <DeckCard {...card} />
        </div>
    );
}

interface WarriorsProps { id: string; cards: Card<Species, ActiveParts>[]; order: number; }
function WarriorsCards({ id, cards, order }: WarriorsProps) {
    const { allies, addCard } = useBattle();

    const ally = allies.find(ally => ally.id === id) as Ally<Species>;

    return (
        <div className="group-cards">
            <div className="list-cards">
                {
                    cards.map((card, index) => {
                        return (
                            <CardEl
                                key={`${card.name}_${index}`}
                                name={card.name}
                                cost={card.cost}
                                part={card.part}
                                type={card.type}
                                effect={card.effect}
                                attack={card.attack}
                                shield={card.shield}
                                species={card.species}
                                description={card.description}
                                assets={card.assets}
                                onClick={() => addCard(ally, card)}
                            />
                        );
                    })
                }
            </div>
            <div className="identificator">
                <div className="identificator-order">
                    {order}
                </div>
                <div className="identificator-image">
                    <MingleParts direction="right" mingle={ally} isStatic />
                </div>
            </div>
        </div>
    );
}

interface PositionsProps { ally: Ally<Species>; index: number; }
function OrdemPriorityItem({ ally, index }: PositionsProps) {
    const { allies, hud, rollbackCards } = useBattle();

    const isAlly = allies.find(a => a.id === ally.id);

    const handleRollbackCards = () => { rollbackCards(ally); };

    return (
        <div className="order-priority-item">
            <div key={ally.id} className={joinClass(['fighter', isAlly ? 'ally' : 'enemy'])}>
                <div className="order">
                    <span className={joinClass([isAlly ? 'ally' : 'enemy'])}>{index + 1}</span>
                </div>
                <div className={joinClass(['fighter-image', isAlly ? 'ally' : 'enemy'])}>
                    <MingleParts direction={isAlly ? 'right' : 'left'} mingle={ally} isStatic />
                </div>
            </div>
            <div className="fighter-cards">
                {
                    hud.chosenCards[ally.id]?.map((card, i) => {
                        return (
                            <Zoom
                                in={true}
                                key={i}
                                style={{ transitionDelay: `${i * 100}ms` }}
                            >
                                <div
                                    key={i}
                                    className="card"
                                    style={{ zIndex: index + 1 }}
                                    onClick={handleRollbackCards}
                                >
                                    <MiniCard
                                        name={card.name}
                                        assets={card.assets}
                                        attack={card.attack}
                                        species={card.species}
                                    />
                                </div>
                            </Zoom>
                        );
                    })
                }
            </div>
        </div>
    );
}

function Header() {
    const { alive, hud } = useBattle();

    return (
        <div className="header">
            <div className="round">
                Round {hud.round}
            </div>
            <div className={joinClass(['order-priority', hud.currentCards.length ? '_opacity' : ''])}>
                {
                    alive.map((ally, index) =>
                        <OrdemPriorityItem key={ally.id} ally={ally} index={index} />)
                }
            </div>
            <div className={joinClass(['current-used-cards'])}>
                {
                    hud.currentCards.map((card, index) =>
                        <Zoom in key={`${card.name}-${index}`}>
                            <div style={{ width: 150 }}>
                                <MiniCard
                                    name={card.name}
                                    assets={card.assets}
                                    attack={card.attack}
                                    species={card.species}
                                />
                            </div>
                        </Zoom>
                    )
                }
            </div>
            <div className="enemy-deck">
                enemy deck
            </div>
        </div>
    );
}

function Footer() {
    const { teams, deck, energy } = useBattle();
    return (
        <div className="footer">
            <div>
                <div className="energy">
                    {energy}/10
                </div>
                <div className="purchasable-deck">

                </div>
            </div>
            <div className="cards-container">
                {
                    teams.teamAlly.allies.map((ally, index) =>
                        <WarriorsCards
                            key={ally.id}
                            id={ally.id}
                            order={index + 1}
                            cards={deck[ally.id]}
                        />
                    )
                }
            </div>
            <div className="death-deck">

            </div>
        </div>
    );
}

interface HUDProps { children: React.JSX.Element; }
function HUD({ children }: HUDProps) {

    return (
        <div className="HUD">
            <Header />
            {children}
            <Footer />
        </div>
    );
}

function Arena() {
    const { teams } = useBattle();

    const board = [
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
    ];

    return (
        <div className="arena-container">
            {
                board.map((row, y) => {
                    return row.map((_, x) => (
                        <div key={`y${y}x${x}`} className="arena-slot">
                            <div className="arena-slot-content">
                                {
                                    teams.teamAlly.allies.map(ally => {
                                        const exist = ally.coordinates.x === x && ally.coordinates.y === Math.abs(y - 2);
                                        return exist ? <Warrior key={ally.id} direction="right" ally={ally} /> : '';
                                    })
                                }
                                {
                                    teams.teamEnemy.allies.map(ally => {
                                        const exist = (10 - ally.coordinates.x) === x && ally.coordinates.y === Math.abs(y - 2);
                                        return exist ? <Warrior key={ally.id} direction="left" ally={ally} /> : '';
                                    })
                                }
                            </div>
                        </div>
                    ));
                })
            }
        </div>
    );
}

function Content() {
    // const { id } = useParams() as { id: string };
    const [end] = useState(false);

    const { teams } = useBattle();

    const handleEndTurn = () => {
        // const actions = endTurn();

        // Promise.all(Object.keys(actions).map(allyId => {
        //     return gameServices.sendActions({
        //         allyId,
        //         roomId: id,
        //         actions: actions[allyId],
        //         teamId: teams.teamAlly.id,
        //         roundId: `round-${hud.round}`,
        //     });
        // })).then(() => {
        //     gameServices.sayImReady({ roomId: id, roundId: `round-${hud.round}`, allyId: teams.teamAlly.id });
        // });

        // setEnd(true);
        // endTurn()
        //     .then(() => { setEnd(false); });
    };

    return (
        <>
            <Canvas width={1280} height={720} style={{ zIndex: end ? 100 : 1, position: 'relative' }} />
            <Box sx={{
                p: 2,
                top: 0,
                position: 'absolute',
                backgroundSize: 'cover',
                backgroundImage: `url(${BaseMap})`,
                zIndex: 2
            }}>
                <HUD>
                    <Arena />
                </HUD>
                <Box sx={{ position: 'absolute', bottom: 30, right: 30 }}>
                    <button onClick={() => console.log('team', teams)}>teste</button>
                    <Button
                        onClick={handleEndTurn}
                        variant="contained"
                        color="secondary"
                        disabled={end}
                    >
                        Próximo turno
                    </Button>
                </Box>
            </Box>
        </>
    );
}

export default function Room() {
    const [loading] = useState(true);
    // const { populateTeams, hud, playAnimations } = useBattle();
    // const { id } = useParams() as { id: string };

    return (
        loading
            ? <Backdrop
                open
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            : <Zoom in>
                <div className="screen">
                    <div className="screen-content">
                        <Content />
                    </div>
                </div>
            </Zoom>
    );
}
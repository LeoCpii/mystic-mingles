import Box from '@mui/material/Box';

import DeckCard from '@mingles/ui/card';
import { joinClass } from '@mingles/ui/utils';
import type Team from '@mingles/business/team';
import type Ally from '@mingles/business/ally';
import type Card from '@mingles/business/card';
import { shuffle } from '@mingles/services/array';
import useSpecies from '@mingles/ui/useSpecies';
import { type Species } from '@mingles/business/species';
import type { ActiveParts } from '@mingles/business/parts';
import MingleParts, { type Direction } from '@mingles/ui/mingle-parts';

import { BattleProvider } from '@/components/BattleField';

import useBattle from './useBattle';

import './BattleField.scss';

interface BattleFieldProps {
    teamAlly: Team;
    teamEnemy: Team;
}

interface WarriorProps { ally: Ally<Species>; direction: Direction; }
function Warrior({ ally, direction }: WarriorProps) {
    const { color, icon } = useSpecies(ally.species);

    return (
        <div className="warrior">
            <div className="warrior-hud">
                <div className="warrior-class" style={{ background: color }}>
                    {icon({ color: 'white', size: 16 })}
                </div>
                <div className="warrior-life">{ally.life}</div>
                <div className="life-bar-container">
                    <div
                        className="life-bar-content"
                        style={{
                            width: `${(ally.life / (ally.totalLife)) * 100}%`,
                            backgroundColor: ally.life > ally.totalLife / 2 ? '#31c957' : 'red'
                        }}
                    />
                </div>
            </div>
            <div>
                <MingleParts
                    direction={direction}
                    body={ally.body}
                    color={ally.color}
                    eye={ally.genes.eye.name}
                    horn={ally.genes.horn.name}
                    back={ally.genes.back.name}
                    tail={ally.genes.tail.name}
                    mouth={ally.genes.mouth.name}
                />
                {ally.stats.speed}
            </div>
        </div>
    );
}

interface AllyCardProps { id: string; cards: Card<Species, ActiveParts>[]; order: number; }
function AllyCard({ id, cards, order }: AllyCardProps) {
    const { allies } = useBattle();

    const ally = allies.find(ally => ally.id === id) as Ally<Species>;

    return (
        <div className="group-cards">
            <div className="list-cards">
                {
                    cards.map((card, index) => {
                        return (
                            <div className="card" key={`${card.name}_${index}`}>
                                <DeckCard
                                    key={index}
                                    part={card.part}
                                    cost={card.cost}
                                    name={card.name}
                                    attack={card.attack}
                                    effect={card.effect}
                                    shield={card.shield}
                                    species={card.species}
                                    description={card.description}
                                />
                            </div>
                        );
                    })
                }
            </div>
            <div className="identificator">
                <div className="identificator-order">
                    {order}
                </div>
                <div className="identificator-image">
                    <MingleParts
                        direction="right"
                        body={ally.body}
                        color={ally.color}
                        eye={ally.genes.eye.name}
                        horn={ally.genes.horn.name}
                        back={ally.genes.back.name}
                        tail={ally.genes.tail.name}
                        mouth={ally.genes.mouth.name}
                    />
                </div>
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

function Header() {
    const { allies, alive } = useBattle();
    // const shuffleAllies = shuffle(allies.concat(enemies));

    // const order = shuffleAllies.sort((a, b) => a.stats.speed - b.stats.speed ? 1 : -1);

    return (
        <div className="header">
            <div>
                Round 1
            </div>
            <div className="order-priority">
                {

                    alive
                        .map((ally, index) => {
                            const isAlly = allies.find(a => a.id === ally.id);

                            return <div key={ally.id} className={joinClass(['order-priority-item', isAlly ? 'ally' : 'enemy'])}>
                                <div className="order">
                                    <span className={joinClass([isAlly ? 'ally' : 'enemy'])}>{index + 1}</span>
                                </div>
                                <div className={joinClass(['order-priority-item-image', isAlly ? 'ally' : 'enemy'])}>
                                    <MingleParts
                                        direction={isAlly ? 'right' : 'left'}
                                        body={ally.body}
                                        color={ally.color}
                                        eye={ally.genes.eye.name}
                                        horn={ally.genes.horn.name}
                                        back={ally.genes.back.name}
                                        tail={ally.genes.tail.name}
                                        mouth={ally.genes.mouth.name}
                                    />
                                </div>
                            </div>;
                        })
                }
            </div>
            <div>
                enemy deck
            </div>
        </div>
    );
}

function Footer() {
    const { allies, deck, energy } = useBattle();
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
                    allies.map((ally, index) =>
                        <AllyCard
                            key={ally.id}
                            id={ally.id}
                            order={index + 1}
                            cards={deck[ally.id]} />
                    )
                }
            </div>
            <div className="death-deck">

            </div>
        </div>
    );
}

function Content() {
    const { allies, enemies, attack, buyCard } = useBattle();

    const board = [
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
        Array.from(Array(11), () => ''),
    ];

    const handleTakeDamage = () => {
        console.log('allies', allies);
        attack(allies[0]);
    };

    const handleBuyCard = () => {
        buyCard();
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            sx={{ p: 2, height: '100vh' }}
        >
            <HUD>
                <div className="arena-container">
                    {
                        board.map((row, y) => {
                            return row.map((_, x) => (
                                <div key={`y${y}x${x}`} className="arena-slot">
                                    <div className="arena-slot-content">
                                        {
                                            allies.map(ally => {
                                                const exist = ally.coordinates.x === x && ally.coordinates.y === Math.abs(y - 2);
                                                return exist ? <Warrior key={ally.id} direction="right" ally={ally} /> : '';
                                            })
                                        }
                                        {
                                            enemies.map(ally => {
                                                const exist = (10 - ally.coordinates.x) === x && ally.coordinates.y === Math.abs(y - 2);
                                                return exist ? <Warrior key={ally.id} direction="left" ally={ally} /> : '';
                                            })
                                        }
                                        x{x} y{Math.abs(y - 2)}
                                    </div>
                                </div>
                            ));
                        })
                    }
                    {/* <button onClick={handleTakeDamage}>Take Damage</button> */}
                </div>
            </HUD>
        </Box>
    );
}

export default function BattleField({ teamAlly, teamEnemy }: BattleFieldProps) {
    return (
        <BattleProvider teamAlly={teamAlly} teamEnemy={teamEnemy}>
            <Content />
        </BattleProvider>
    );
}
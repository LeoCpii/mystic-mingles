import { useEffect, useState } from 'react';

import { joinClass } from '@mingles/ui/utils';
import type Team from '@mingles/business/team';
import type Ally from '@mingles/business/ally';
import MingleParts from '@mingles/ui/mingle-parts';
import type { Species } from '@mingles/business/species';
import type { Coordinates } from '@mingles/business/ally';

import './ArenaEdit.scss';

interface ButtonSlotProps { onChooseMingle: () => void; }
function ButtonSlot({ onChooseMingle }: ButtonSlotProps) {
    return (
        <button className="btn-slot" onClick={onChooseMingle}>+</button>
    );
}

interface ContentProps extends Coordinates {
    allies: Ally<Species>[];
    shouldHighlight: boolean;
    onChooseAlly: (ally: Ally<Species>) => void;
    onChooseCoordinate: (coordinates: Coordinates) => void;
}
function Content({ x, y, allies, shouldHighlight, onChooseCoordinate, onChooseAlly }: ContentProps) {
    const yIsEven = y % 2 === 0;
    const xIsEvent = x % 2 === 0;

    const handleChooseCoordinate = () => { onChooseCoordinate({ x, y }); };

    const getClss = () => {
        if (yIsEven) { return joinClass(['slot', !xIsEvent ? '_mark' : '', shouldHighlight ? '_highlight' : '']); }

        return joinClass(['slot', xIsEvent ? '_mark' : '', shouldHighlight ? '_highlight' : '']);
    };

    const getContent = () => {
        const ally = allies.find(ally => ally.coordinates.x === x && ally.coordinates.y === y);

        const button = <ButtonSlot onChooseMingle={handleChooseCoordinate} />;

        if (ally) {
            return <div style={{ width: '100%' }} onClick={() => onChooseAlly(ally)}>
                <MingleParts
                    direction='right'
                    body={ally.body}
                    color={ally.color}
                    eye={ally.genes.eye.name}
                    horn={ally.genes.horn.name}
                    back={ally.genes.back.name}
                    tail={ally.genes.tail.name}
                    mouth={ally.genes.mouth.name}
                />
            </div>;
        }

        if (yIsEven) { return xIsEvent ? '' : button; }

        return xIsEvent ? button : '';
    };

    return (
        <div className="arena-slot" key={`y${y}x${x}`}>
            <div className={getClss()}>
                {getContent()}
            </div>
        </div>
    );

}

interface ArenaEditProps { team: Team; onChooseCoordinate: (coordinates: Coordinates) => void; onChooseAlly: (Ally: Ally<Species>) => void; };
export default function ArenaEdit({ team, onChooseCoordinate, onChooseAlly }: ArenaEditProps) {
    const [selectedSlot, setSelectedSlot] = useState<Coordinates>();

    const board = [
        Array.from(Array(5), () => ''),
        Array.from(Array(5), () => ''),
        Array.from(Array(5), () => ''),
    ];

    useEffect(() => { setSelectedSlot(undefined); }, [team]);

    const handleChooseCoordinate = (coordinates: Coordinates) => {
        if (team.allies.length < 3) {
            setSelectedSlot(coordinates);
            onChooseCoordinate(coordinates);
        }
    };

    return (
        <div className="arena-container">
            {
                board.map((row, y) => {
                    return row.map((_, x) => (
                        <Content
                            key={`y${y}x${x}`}
                            allies={team.allies}
                            x={x as Coordinates['x']}
                            y={Math.abs(y - 2) as Coordinates['y']}
                            onChooseAlly={onChooseAlly}
                            onChooseCoordinate={handleChooseCoordinate}
                            shouldHighlight={selectedSlot?.x === x && selectedSlot?.y === Math.abs(y - 2)}
                        />
                    ));
                })
            }
        </div>
    );
}
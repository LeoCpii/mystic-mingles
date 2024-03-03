import { wait } from '@mingles/services/promise';

type Color = keyof typeof _color;
type Reaction = 'attack' | 'took-damage';
export type Coordinates = { x: number, y: number };

const FPS = 60;
const TIMER = 1000 / FPS;

const PADDING = 16;
const SLOT_DIMENSIONS = { width: 100, height: 100 };
const CANVAS_DIMENSIONS = { width: 1280, height: 720 };
const MARGIN_OF_DIFFERENCE = {
    width: (window.innerWidth - (CANVAS_DIMENSIONS.width + (PADDING + SLOT_DIMENSIONS.width))) / 2,
    height: (window.innerHeight - CANVAS_DIMENSIONS.height) / 2
};

const _fontSize = 30;
const _font = `${_fontSize}px riffic`;
const _color = { danger: '#F73434', poison: '#A361C3', contrast: '#FFF', emphasis: '#FE8D34' };

function loopDrawer(callback: () => void) {
    return window.setInterval(() => { callback(); }, TIMER);
}

function drawText(canvas: HTMLCanvasElement, coordinates: Coordinates, text: string, color: Color, opacity = 1) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    const measure = ctx.measureText(text);

    const { x, y } = coordinates;

    ctx.clearRect(x - 5, y - 50, measure.width + 10, 100);

    ctx.font = _font;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = _color[color];
    ctx.strokeStyle = _color.contrast;

    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

export function messageAnimation(canvas: HTMLCanvasElement, coordinates: Coordinates, message: string) {
    return new Promise((resolve) => {
        let opacity = 1;

        let y = coordinates.y - 100;
        const x = coordinates.x - MARGIN_OF_DIFFERENCE.width;

        const timer = loopDrawer(() => {
            y -= 1;
            const newOpacity = opacity - .02;
            opacity = newOpacity > 0 ? newOpacity : 0;

            drawText(canvas, { x, y }, message, 'emphasis', opacity);

            if (!opacity) {
                clearInterval(timer);
                resolve('');
            }
        });
    });
}

export function damageAnimation(canvas: HTMLCanvasElement, coordinates: Coordinates, damage: number, critical: boolean) {
    return new Promise((resolve) => {
        let opacity = 1;

        let y = coordinates.y - 100;
        const x = coordinates.x - MARGIN_OF_DIFFERENCE.width;

        const timer = loopDrawer(() => {
            y -= 1;
            const newOpacity = opacity - .02;
            opacity = newOpacity > 0 ? newOpacity : 0;

            drawDamage(canvas, x, y, damage, critical, opacity);

            if (!opacity) {
                clearInterval(timer);
                resolve('');
            }
        });
    });
}

export function drawDamage(canvas: HTMLCanvasElement, x: number, y: number, damage: number, critical: boolean, opacity = 1) {
    const text = critical ? `critical ${damage}` : String(damage);

    drawText(canvas, { x, y }, text, 'danger', opacity);
}

export function damageMultipleAnimation(canvas: HTMLCanvasElement, data: { coordinates: Coordinates, damage: number, critical: boolean }[]) {
    return new Promise((resolve) => {
        let opacity = 1;

        const mappedData = data.map((i) => {
            i.coordinates.y -= 100;
            i.coordinates.x -= MARGIN_OF_DIFFERENCE.width;
            return i;
        });

        const timer = loopDrawer(() => {
            const newOpacity = opacity - .02;
            opacity = newOpacity > 0 ? newOpacity : 0;

            const newData = mappedData.map((i) => {
                i.coordinates.y -= 1;
                return i;
            });

            drawMultipleDamage(canvas, newData, opacity);

            if (!opacity) {
                clearInterval(timer);
                resolve('');
            }
        });
    });
};

export function drawMultipleDamage(canvas: HTMLCanvasElement, data: { coordinates: Coordinates, damage: number }[], opacity = 1) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.map(({ coordinates, damage }) => {
        drawText(canvas, coordinates, String(damage), 'poison', opacity);
    });
}

function drawThrowing(canvas: HTMLCanvasElement, x: number, y: number, opacity: number) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const image = new Image();
    image.src = 'https://freepngimg.com/download/fire/136946-mario-fireball-bros-free-hq-image.png';
    ctx.globalAlpha = opacity;

    ctx.drawImage(image, x, y, 50, 100);
}

export function throwingAnimation(canvas: HTMLCanvasElement, initial: Coordinates, final: Coordinates) {
    return new Promise((resolve) => {
        let x = initial.x - MARGIN_OF_DIFFERENCE.width;
        let y = initial.y;

        const timer = loopDrawer(() => {
            x += (final.x - initial.x) / 30;
            y += (final.y - initial.y) / 30;

            drawThrowing(canvas, x, y - 50, 1);

            if (Math.ceil(x) >= Math.ceil(final.x - MARGIN_OF_DIFFERENCE.width)) {
                drawThrowing(canvas, x, y, 0);
                clearInterval(timer);
                resolve('');
            }
        });
    });
};

// CSS ANIMATIONS
export function impactAnimation(id: string, reaction: Reaction) {
    const mingleBody = document.getElementById(`${id}-body-false`);
    mingleBody?.classList.add(reaction);

    return wait(() => { mingleBody?.classList.remove(reaction); }, 600);
}

export function goTo(el: HTMLElement, x: number, y: number) {
    return new Promise((resolve) => {
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.zIndex = '100';

        setTimeout(() => { resolve(''); }, 500);
    });
}
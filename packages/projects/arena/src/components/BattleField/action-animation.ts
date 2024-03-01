export type Coordinates = { x: number, y: number };
type Reaction = 'attack' | 'took-damage';

const FPS = 60;
const TIMER = 1000 / FPS;

const fontSize = 30;
const font = `${fontSize}px riffic`;
const color = { danger: '#f73434', contrast: '#fff' };

export function loopDrawer(callback: () => void) {
    return window.setInterval(() => { callback(); }, TIMER);
}

export function damageAnimation(canvas: HTMLCanvasElement, coordinates: Coordinates, damage: number, critical: boolean) {
    return new Promise((resolve) => {
        let opacity = 1;

        let y = coordinates.y - 100;

        const timer = loopDrawer(() => {
            y -= 1;
            const newOpacity = opacity - .02;
            opacity = newOpacity > 0 ? newOpacity : 0;

            drawDamage(canvas, coordinates.x - 20, y, damage, critical, opacity);

            if (!opacity) {
                clearInterval(timer);
                resolve('');
            }
        });
    });
}

export function drawDamage(canvas: HTMLCanvasElement, x: number, y: number, damage: number, critical: boolean, opacity = 1) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    const text = critical ? `critical ${damage}` : String(damage);

    const measure = ctx.measureText(text);

    ctx.clearRect(x - 5, y - 50, measure.width + 10, 100);

    ctx.font = font;
    ctx.globalAlpha = opacity;
    ctx.fillStyle = color.danger;
    ctx.strokeStyle = color.contrast;

    ctx.fillText(text, x, y);
    ctx.strokeText(text, x, y);
}

export function damageMultipleAnimation(canvas: HTMLCanvasElement, data: { coordinates: Coordinates, damage: number, critical: boolean }[]) {
    return new Promise((resolve) => {
        let opacity = 1;

        const mappedData = data.map((i) => {
            i.coordinates.y -= 100;
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

export function goTo(el: HTMLElement, x: number, y: number) {
    return new Promise((resolve) => {
        el.style.transform = `translate(${x}px, ${y}px)`;
        el.style.zIndex = '100';

        setTimeout(() => { resolve(''); }, 500);
    });
}

export function drawMultipleDamage(canvas: HTMLCanvasElement, data: { coordinates: Coordinates, damage: number }[], opacity = 1) {
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    data.map(({ coordinates, damage }) => {
        ctx.font = font;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = color.danger;
        ctx.strokeStyle = color.contrast;

        ctx.fillText(String(damage), coordinates.x, coordinates.y);
        ctx.strokeText(String(damage), coordinates.x, coordinates.y);
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
        let x = initial.x;
        let y = initial.y;

        const timer = loopDrawer(() => {

            x += (final.x - initial.x) / 30;
            y += (final.y - initial.y) / 30;

            drawThrowing(canvas, x, y - 50, 1);

            if (Math.ceil(x) >= Math.ceil(final.x)) {
                drawThrowing(canvas, x, y, 0);
                clearInterval(timer);
                resolve('');
            }
        });
    });
};

export function impactAnimation(id: string, reaction: Reaction) {
    const mingleBody = document.getElementById(`${id}-body-false`);
    mingleBody?.classList.add(reaction);

    setTimeout(() => { mingleBody?.classList.remove(reaction); }, 600);
}
import SimpleAttack from '@/assets/audio/simple-attack.mp3';
import SimpleAmbient from '@/assets/audio/simple-ambient.mp3';

export function simpleAttack() {
    const audio = new Audio(SimpleAttack);
    audio.play();
}

export function simpleAmbient() {
    const audio = new Audio(SimpleAmbient);
    audio.muted = true;
    audio.loop = true;

    document.body.addEventListener('mouseover', () => {
        audio.muted = false;
        // audio.play();
    });
}
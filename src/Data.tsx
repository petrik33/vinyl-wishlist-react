const AUTHORS_NAMES = [
    'Bowie',
    'АукцЫон',
    'Led Zeppelin',
    'Мумий Тролль',
    'Cure',
    'Doors',
    'Iggy Pop',
    'Lou Reed',
    'Tom Waits',
    'Talking Heads'
];

const ALBUMS_NAMES = [
    'Scary Monsters and Super Creeps',
    'Low',
    'The Next Day',
    'Птица',
    'Бодун',
    'II',
    'Морская',
    'Икра',
    'Three Imaginary Boys',
    'Seventeen Seconds',
    'Strange Days',
    'Lust for Life',
    'Transformer',
    'Bone Machine',
    'Talking Heads 77'
];

const ALBUMS_COVER_SRC = [
    './Covers/R-423056-1479638131-8059.jpg',
    './Covers/R-216166-1275625649.jpg',
    './Covers/TheNextDay.jpg',
    './Covers/Ptiza.jpg',
    './Covers/Bodun.jpg',
    './Covers/LedII.jpg',
    './Covers/Morskaya.jpg',
    './Covers/Ikra.jpg',
    './Covers/TIB.jpg',
    './Covers/SecondsCure.jpg',
    './Covers/StrangeDays.jpg',
    './Covers/LustForLife.jpg',
    './Covers/Transformer.jpg',
    './Covers/BoneMachine.jpg',
    './Covers/TalkingHeads.jpg'
];

export interface AuthorData {
    id: number;
    name: string;
}

export interface AlbumData {
    id: number;
    name: string;
    src: string;
}

export const DATA_ALBUMS: AlbumData[] = ALBUMS_NAMES.map((a, idx) => {
    return {
        name: ALBUMS_NAMES[idx],
        src: ALBUMS_COVER_SRC[idx],
        id: idx
    };
})

export const DATA_AUTHORS: AuthorData[] = AUTHORS_NAMES.map((name, idx) => {
    return {
        name: AUTHORS_NAMES[idx],
        id: idx
    };
})
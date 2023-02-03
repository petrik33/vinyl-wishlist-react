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

class Author {
    id: number;
    name: string;
    static nextId: number;

    constructor(name: string) {
        this.id = Author.nextId++;
        this.name = name;
    }
}

class Album {
    id: number;
    name: string;
    coverSrc: string;
    static nextId: number;

    constructor(name: string, coverSrc: string) {
        this.name = name;
        this.coverSrc = coverSrc;
        this.id = Album.nextId++;
    }
}

export const DATA_ALBUMS = ALBUMS_NAMES.map((name, idx) => {
    return new Album(name, ALBUMS_COVER_SRC[idx]);
})

export const DATA_AUTHORS = AUTHORS_NAMES.map((name, idx) => {
    return new Author(name);
})
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
    'https://upload.wikimedia.org/wikipedia/ru/0/0e/DavidBowieScaryMonstersCover.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/f/fc/David_Bowie_Low_cover.jpg/411px-David_Bowie_Low_cover.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/b/b0/David_Bowie_The_Next_Day.jpg/411px-David_Bowie_The_Next_Day.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/3/3d/%D0%90%D1%83%D0%BA%D1%86%D0%AB%D0%BE%D0%BD_%D0%9F%D1%82%D0%B8%D1%86%D0%B0.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/2/20/Bodun1.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/8/8c/Led_Zeppelin_II.jpg/411px-Led_Zeppelin_II.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/b/b6/%D0%9C%D1%83%D0%BC%D0%B8%D0%B9_%D0%A2%D1%80%D0%BE%D0%BB%D0%BB%D1%8C_-_%D0%9C%D0%BE%D1%80%D1%81%D0%BA%D0%B0%D1%8F.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/b/b3/MT_Ikra.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/3/37/Three_Imaginary_Boys.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/a/a5/Seventeen_Seconds.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/e/e5/TheDoorsStrangeDaysalbumcover.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/IggyPopLustForLife.jpg/411px-IggyPopLustForLife.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/Loureedtransformer.jpeg/411px-Loureedtransformer.jpeg',
    'https://upload.wikimedia.org/wikipedia/ru/c/cc/Bone_Machine.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/7/7f/Talking_heads_77.jpg/411px-Talking_heads_77.jpg'
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
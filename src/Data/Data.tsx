export interface IAlbum {
    id: string;
    name: string;
    src: string;
    authorId: string;
}

export interface IAlbumsData {
    [key: string] : IAlbum;
}

export const AlbumsData : IAlbumsData = {
    'album-1123123': {
        id: 'album-1123123',
        name: 'Scary Monsters and Super Creeps',
        src: 'https://upload.wikimedia.org/wikipedia/ru/0/0e/DavidBowieScaryMonstersCover.jpg',
        authorId: 'author-1'
    },
    'album-212312': {
        id: 'album-212312',
        name: 'The Next Day',
        src: 'https://upload.wikimedia.org/wikipedia/ru/0/0e/DavidBowieScaryMonstersCover.jpg',
        authorId: 'author-1'
    },
    'album-3123123': {
        id: 'album-3123123',
        name: 'Low',
        src: 'https://upload.wikimedia.org/wikipedia/ru/0/0e/DavidBowieScaryMonstersCover.jpg',
        authorId: 'author-1'
    },
    'album-41231293': {
        id: 'album-41231293',
        name: 'Lust for Life',
        src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/IggyPopLustForLife.jpg/411px-IggyPopLustForLife.jpg',
        authorId: 'author-2'
    },
    'album-51230123': {
        id: 'album-51230123',
        name: 'Post Pop Depression',
        src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/IggyPopLustForLife.jpg/411px-IggyPopLustForLife.jpg',
        authorId: 'author-2'
    },
    'album-6123123': {
        id: 'album-6123123',
        name: 'The Idiot',
        src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/IggyPopLustForLife.jpg/411px-IggyPopLustForLife.jpg',
        authorId: 'author-2'
    },
    'album-7777777': {
        id: 'album-7777777',
        name: 'Transformer',
        src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/Loureedtransformer.jpeg/411px-Loureedtransformer.jpeg',
        authorId: 'author-3'
    },
    'album-8123123': {
        id: 'album-8123123',
        name: 'Berlin',
        src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/Loureedtransformer.jpeg/411px-Loureedtransformer.jpeg',
        authorId: 'author-3'
    },
    'album-9123123': {
        id: 'album-9123123',
        name: 'New York',
        src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/Loureedtransformer.jpeg/411px-Loureedtransformer.jpeg',
        authorId: 'author-3'
    },
    'album-100012301203': {
        id: 'album-100012301203',
        name: '45',
        src: 'https://avatars.yandex.net/get-music-content/98892/985319cc.a.10562-3/m1000x1000',
        authorId: 'author-4'
    },
    'album-11123123': {
        id: 'album-11123123',
        name: '46',
        src: 'https://avatars.yandex.net/get-music-content/98892/985319cc.a.10562-3/m1000x1000',
        authorId: 'author-4'
    },
    'album-12121212': {
        id: 'album-12121212',
        name: 'Черный Альбом',
        src: 'https://avatars.yandex.net/get-music-content/98892/985319cc.a.10562-3/m1000x1000',
        authorId: 'author-4'
    }
}

export interface IAuthor {
    id: string;
    name: string;
    albums: string[];
}

export interface IAuthorsData {
    [key: string]: IAuthor;
}

export const AuthorsData : IAuthorsData = {
    'author-1': {
        id: 'author-1',
        name: 'David Bowie',
        albums: ['album-1', 'album-2', 'album-3']
    },
    'author-2': {
        id: 'author-2',
        name: 'Iggy Pop',
        albums: ['album-4', 'album-5', 'album-6']
    },
    'author-3': {
        id: 'author-3',
        name: 'Lou Reed',
        albums: ['album-7', 'album-8', 'album-9']
    },
    'author-4': {
        id: 'author-4',
        name: 'Кино',
        albums: ['album-10', 'album-11', 'album-12']
    }
}

const ALBUMS_NAMES = [
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
    '',
    'Bone Machine',
    'Talking Heads 77',
    ''
];

const ALBUMS_COVER_SRC = [
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
    'https://upload.wikimedia.org/wikipedia/ru/c/cc/Bone_Machine.jpg',
    'https://upload.wikimedia.org/wikipedia/ru/thumb/7/7f/Talking_heads_77.jpg/411px-Talking_heads_77.jpg',
];

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
export const TierNames = ['S', 'A', 'B', 'C', 'D'] as const;
export type TierName = typeof TierNames[number];

export const NoTierId = 'No Tier' as const;
export type TierGroupId = TierName | typeof NoTierId;

export const NoTierName = 'Unranked' as const;

export const getTierId = 
  (tier: Tier) => tier ? tier : NoTierId;
export const getTierById = 
  (tierId: TierGroupId) => tierId === NoTierId
    ? null 
    : tierId;

export type Tier = TierName | null | undefined;

export interface IAlbumData {
  name: string;
  src: string;
  alt?: string;
  tier?: Tier;
  author?: string;
  size?: number | string;
  width?: number | string;
  height?: number | string;
}

export interface IAlbum extends IAlbumData {
  id: string;
}

export interface IAuthorData {
  name: string;
}

export interface IAuthor extends IAuthorData {
  id: string;
}

export interface IAlbumsCollectionData {
  [key: string] : IAlbum;
}

export const AlbumsDebugData : IAlbumsCollectionData = {
  'album-1123123': {
      id: 'album-1123123',
      name: 'Scary Monsters and Super Creeps',
      src: 'https://upload.wikimedia.org/wikipedia/ru/0/0e/DavidBowieScaryMonstersCover.jpg',
  },
  'album-212312': {
      id: 'album-212312',
      name: 'The Next Day',
      src: 'https://upload.wikimedia.org/wikipedia/ru/0/0e/DavidBowieScaryMonstersCover.jpg',
  },
  'album-3123123': {
      id: 'album-3123123',
      name: 'Low',
      src: 'https://upload.wikimedia.org/wikipedia/ru/0/0e/DavidBowieScaryMonstersCover.jpg',
  },
  'album-41231293': {
      id: 'album-41231293',
      name: 'Lust for Life',
      src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/IggyPopLustForLife.jpg/411px-IggyPopLustForLife.jpg',
  },
  'album-51230123': {
      id: 'album-51230123',
      name: 'Post Pop Depression',
      src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/IggyPopLustForLife.jpg/411px-IggyPopLustForLife.jpg',
  },
  'album-6123123': {
      id: 'album-6123123',
      name: 'The Idiot',
      src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/7/72/IggyPopLustForLife.jpg/411px-IggyPopLustForLife.jpg',
  },
  'album-7777777': {
      id: 'album-7777777',
      name: 'Transformer',
      src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/Loureedtransformer.jpeg/411px-Loureedtransformer.jpeg',
  },
  'album-8123123': {
      id: 'album-8123123',
      name: 'Berlin',
      src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/Loureedtransformer.jpeg/411px-Loureedtransformer.jpeg',
  },
  'album-9123123': {
      id: 'album-9123123',
      name: 'New York',
      src: 'https://upload.wikimedia.org/wikipedia/ru/thumb/f/f1/Loureedtransformer.jpeg/411px-Loureedtransformer.jpeg',
  },
  'album-100012301203': {
      id: 'album-100012301203',
      name: '45',
      src: 'https://avatars.yandex.net/get-music-content/98892/985319cc.a.10562-3/m1000x1000',
  },
  'album-11123123': {
      id: 'album-11123123',
      name: '46',
      src: 'https://avatars.yandex.net/get-music-content/98892/985319cc.a.10562-3/m1000x1000',
  },
  'album-12121212': {
      id: 'album-12121212',
      name: 'Черный Альбом',
      src: 'https://avatars.yandex.net/get-music-content/98892/985319cc.a.10562-3/m1000x1000',
  }
}
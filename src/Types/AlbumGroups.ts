import { IAlbum, Tier, TierGroupId } from "../Data/Data";

export interface IAlbumGroup {
  albums: readonly IAlbum[],
  name: string
}

export type AlbumGroupsMap = {
  [key: string]: IAlbumGroup
}

export interface ITierGroup extends IAlbumGroup {
  id: TierGroupId,
  tier: Tier
}

export type TierGroupsMap = {
  [key in TierGroupId]: ITierGroup
}

export type AlbumsMap = {
  [key: string]: IAlbum[];
}

export type AlbumsMapTiers = {
  [key in TierGroupId]: IAlbum[];
}
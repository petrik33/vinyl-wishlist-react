import * as React from 'react';
import { IAlbum, TierGroupId, getTierId } from '../../Data/Data';
import AlbumGroup from '../AlbumGroup/AlbumGroup';
import './AlbumsView.css'
import AlbumInfo from '../AlbumInfo/AlbumInfo';
import { AlbumsSnapshot } from '../../Context/AlbumsContext';
import { Immutable } from 'immer';
import { AlbumsMap } from '../../Types/AlbumGroups';

export interface IAlbumsViewProps {
  albumsSnap: Immutable<AlbumsSnapshot>;
  groupsKind: AlbumGroupsKind;
}

export enum AlbumGroupsKind {
  TIERS = 'tiers',
  AUTHORS = 'authors'
}

const AlbumsView : React.FC<IAlbumsViewProps> = (props) => {
  const [modalAlbumId, setModalAlbumId] = 
    React.useState("");

  const onAlbumClick = (id: string) => {
    setModalAlbumId(id);
  }

  const { data: albums, tiersOrder: order} 
    = {...props.albumsSnap};

  const groups = mapGroupElements(
    props.groupsKind, props.albumsSnap, onAlbumClick
  );

  return (
    <div className='album-groups-container'>
      {groups}
      {modalAlbumId.length > 0 && 
        <AlbumInfo 
          onClose={() => {setModalAlbumId("")}} 
          albumData={albums[modalAlbumId].data}
        />
      }
    </div>
  );
}

const mapGroupElements = (
  type: AlbumGroupsKind,
  albumsSnap: Immutable<AlbumsSnapshot>,
  onAlbumClick: (id: string) => void
) => {
  const groups = mapGroups(type, albumsSnap);
  return groups.map((group) => {
    return (
      <AlbumGroup
        {...group}
        onAlbumClick={onAlbumClick}
        key={group.name}
      />
    )
  })
}

const mapGroups = (
  type: AlbumGroupsKind,
  albumsSnap: Immutable<AlbumsSnapshot>
) => {
  const distributor = getGroupDistributor(type);
  const { data: albums, tiersOrder: order} 
    = {...albumsSnap};

  const albumsMap: AlbumsMap = Object.create({});
  if(type === AlbumGroupsKind.TIERS) {
    for(const tierId in order) {
      const orderGroup = order[tierId as TierGroupId];
      albumsMap[tierId] = orderGroup.map((id) => {
        const album = albums[id];
        return album;
      })
    }
  }
  else {
    for(const id in albums) {
      const album = albums[id];
      const groupId = distributor(album);
      if(!albumsMap[groupId]) {
        albumsMap[groupId] = [];
      }
      albumsMap[groupId].push(album);
    }
  }

  const groups = Object.keys(albumsMap).map((id) => {
    return {
      name: id,
      albums: albumsMap[id]
    }
  });

  return groups;
}

const getGroupDistributor = (type: AlbumGroupsKind) 
  : GroupDistributor => {
  switch(type) {
    case AlbumGroupsKind.TIERS: {
      return (album: IAlbum) => getTierId(album.data.tier);
    }
    case AlbumGroupsKind.AUTHORS: {
      return (album: IAlbum) => {
        if(album.data.author) {
          return album.data.author;
        }
        return 'Unknown';
      }
    }
    default: {
      return (album: IAlbum) => {
        return album.id;
      };
    }
  }
}

export type GroupDistributor = (album: IAlbum) => string;

export default AlbumsView;
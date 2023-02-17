import * as React from 'react';
import { TierName, TierGroupsState, TierNames, useTierGroups } from '../../Context/TierGroupsContext';
import { AlbumsData, AuthorsData, IAlbum } from '../../Data/Data';
import AlbumGroup, { IAlbumGroupProps } from '../AlbumGroup/AlbumGroup';
import { Immutable } from 'immer';
import './AlbumsView.css'
import AlbumInfo from '../AlbumInfo/AlbumInfo';

export interface IAlbumsViewProps {

}
export enum AlbumGroupsKind {
  TIERS = 'tiers',
  AUTHORS = 'authors'
}

const AlbumsView : React.FC<IAlbumsViewProps> = (props) => {
  const [groupsKind, setGroupsKind] = React.useState(AlbumGroupsKind.AUTHORS);
  const [modalAlbumId, setModalAlbumId] = React.useState("");
  const tierGroups = useTierGroups();

  const onAlbumClick = (id: string) => {
    setModalAlbumId(id);
  }

  const albumGroupsMap = getGroupsMap(groupsKind, tierGroups);
  const albumGroups = mapGroupKeys(albumGroupsMap, onAlbumClick);

  return (
    <div >
      {albumGroups}
      {modalAlbumId.length > 0 && 
        <AlbumInfo 
          onClose={() => {setModalAlbumId("")}} 
          albumId={modalAlbumId}
        />
      }
    </div>
  );
}

const mapGroupKeys = (albumGroupsMap: GroupsMap,
  onAlbumClick: (id: string) => void) => {
    const groupKeys = Object.keys(albumGroupsMap);
    return groupKeys.map((key) => {
      if(albumGroupsMap[key].rankedAlbums.length === 0) {
        return null;
      }
      
      return (
        <AlbumGroup
          {...albumGroupsMap[key]}
          onAlbumClick={onAlbumClick}
          key={key}
        />
      )
    })
}

export type GroupsMap = Immutable<{
  [id: string]: IAlbumGroupProps;
}>;
export type GroupDistributor = (album: IAlbum) => string;//id
export type RankedAlbum = {
  id: string,
  tier: TierName;
}

const getGroupsMap = (type: AlbumGroupsKind, tierGroups: TierGroupsState)
  : GroupsMap => {
  switch(type) {
    case AlbumGroupsKind.TIERS: {
      const groupsMap = Object.create({});

      const rankedGroups = TierNames.map((tier) => {
          const tierGroup = tierGroups[tier];
          return {
            name: tierGroup.name,
            id: tierGroup.id,
            rankedAlbums: tierGroup.albums.map((id) => {
              return {
                id: id,
                tier: tier
              }
            })
          }
      });

      Object.keys(tierGroups).forEach((tier, idx) => {
        groupsMap[tier] = rankedGroups[idx];
      });

      return groupsMap;
    }

    default: {
      const groupDistributor = getGroupDistributor(type);
      const groupNames = getGroupNames(type);
      const groupIds = getGroupIds(type);

      let rankedAlbumsMap : {[key:string]: RankedAlbum[]} = {};

      groupIds.forEach((groupId, idx) => {
        rankedAlbumsMap[groupId] = [];
      })

      TierNames.forEach((tier) => {
        const tierGroup = tierGroups[tier];
        tierGroup.albums.forEach((id) => {
          const distributedGroupId = groupDistributor(AlbumsData[id]);
          rankedAlbumsMap[distributedGroupId].push({
            id: id,
            tier: tier
          });
        })
      })

      const groupsMap = Object.create({});

      groupIds.forEach((groupId, idx) => {
        groupsMap[groupId] = {
          name: groupNames[idx],
          id: groupId,
          rankedAlbums: rankedAlbumsMap[groupId]
        }
      })

      return groupsMap;
    }
  }
}

const getGroupDistributor = (type: AlbumGroupsKind) 
  : GroupDistributor => {
  switch(type) {
    case AlbumGroupsKind.AUTHORS: {
      return (album: IAlbum) => {
        return album.authorId;
      }
    }
    default: {
      return (album: IAlbum) => {
        return album.id;
      };
    }
  }
}

const getGroupNames = (type: AlbumGroupsKind) : readonly string[] => {
  switch(type) {
    case AlbumGroupsKind.AUTHORS: {
      let authorNames: string[] = [];
      for(const id in AuthorsData) {
        const author = AuthorsData[id];
        authorNames.push(author.name);
      }
      return authorNames;
    }
    default: {
      return Object.keys(AlbumsData).map(key => AlbumsData[key].name);
    }
  }
}

const getGroupIds = (type: AlbumGroupsKind) : readonly string[] => {
  switch(type) {
    case AlbumGroupsKind.AUTHORS: {
      let authorIds: string[] = [];
      for(const id in AuthorsData) {
        const author = AuthorsData[id];
        authorIds.push(author.id);
      }
      return authorIds;
    }
    default: {
      return Object.keys(AlbumsData);
    }
  }
}

export default AlbumsView;
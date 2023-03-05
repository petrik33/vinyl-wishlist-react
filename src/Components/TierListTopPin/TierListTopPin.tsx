import * as React from 'react';
import TopPin from '../TopPin/TopPin';
import TierListHeader from '../TierListHeader/TierListHeader';
import Toolbar from '../Toolbar/Toolbar';
import RadioButtonGroup from '../RadioButtonGroup/RadioButtonGroup';
import { AlbumGroupsKind } from '../AlbumsView/AlbumsView';
import PushButton from '../PushButton/PushButton';
import { AlbumsActionKind, AlbumsDispatch, AlbumsDispatchRedo, AlbumsDispatchUndo } from '../../Context/AlbumsContext';
import TierListViewEditButtonLine from '../TierListViewEditButtonLine/TierListViewEditButtonLine';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import {ReactComponent as AuthorsIcon} from '../../Icons/free-icon-font-user-3917688.svg';
import {ReactComponent as TiersIcon} from '../../Icons/free-icon-font-heart-3916585.svg';
import {ReactComponent as UndoIcon} from '../../Icons/free-icon-font-rotate-left-7434925.svg';
import {ReactComponent as DoAgainIcon} from '../../Icons/free-icon-font-rotate-right-3917289.svg';
import { ReactComponent as SaveIcon } from '../../Icons/disk.svg';
import { postAlbums } from '../AlbumsEdit/AlbumsEdit';
import { IAlbumsCollectionData } from '../../Data/Data';
import { useLoggedIn, useSetLoggedIn } from '../../Context/LoginContext';
// import {ReactComponent as ResetIcon} from '../../Icons/free-icon-font-refresh-3917293.svg';

export interface ITierListTopPinProps {
  editing: boolean;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  viewGroupsKind: AlbumGroupsKind;
  setViewGroupsKind: React.Dispatch<React.SetStateAction<AlbumGroupsKind>>;
  albumsDispatch: AlbumsDispatch;
  albums: IAlbumsCollectionData;
}

const minLandWidth = 768;

const TierListTopPin : React.FC<ITierListTopPinProps> = (props) => {
  const albumsDispatch = props.albumsDispatch;
  const loggedIn = useLoggedIn();
  const setLoggedIn = useSetLoggedIn();

  const [buttonsActive, setButtonsActive] = React.useState(true);
  const [screenSize, setScreenSize] 
    = React.useState({} as number);

  React.useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  React.useEffect(() => {
    setButtonsActive(screenSize >= minLandWidth);
  }, [screenSize])

  return (
    <TopPin>
      <TierListHeader>TierList</TierListHeader>
      <TierListViewEditButtonLine 
          editing={props.editing}
          setEditing={props.setEditing}
      />
      <Toolbar>
        {!props.editing &&
          <RadioButtonGroup
            state={props.viewGroupsKind}
            setState={props.setViewGroupsKind}
            buttons={[
              {
                icon: (<TiersIcon />),
                value: AlbumGroupsKind.TIERS
              },
              {
                icon: (<AuthorsIcon />),
                value: AlbumGroupsKind.AUTHORS
              }
            ]}
        />}
        {props.editing &&
        <ButtonGroup>
          {buttonsActive && (
            <>
              <PushButton
                icon={<UndoIcon />}
                onClick={() => {
                  AlbumsDispatchUndo(albumsDispatch)
                }}
              />
              <PushButton
                icon={<DoAgainIcon />}
                onClick={() => {
                  AlbumsDispatchRedo(albumsDispatch)
                }}
              />
            </>
          )}
          <PushButton
            icon={<SaveIcon />}
            onClick={async () => {
              await postAlbums(
                props.albums,
                loggedIn,
                setLoggedIn
              )
            }}
          />
        </ButtonGroup>
        }
      </Toolbar>
    </TopPin>
  );
}

export const dispatchDebugGroups = (dispatch: AlbumsDispatch) => {
  dispatch({
    type: AlbumsActionKind.RESET_TO_DEBUG,
    load: { parts: 4 }
  });
}

export default TierListTopPin;
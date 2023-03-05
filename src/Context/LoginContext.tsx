import { SetStateAction, createContext, useContext } from "react";
import { useImmer } from "use-immer";
import { IProviderProps } from "./AlbumsContext";

export type SetStateBoolean = 
  React.Dispatch<SetStateAction<boolean>>;

const LoggedInContext = createContext(false);
const SetLoggedInContext = createContext({} as SetStateBoolean);

export const LoggedInProvider : React.FC<IProviderProps> = (
  { children }
) => {
  const [loggedIn, setLoggedIn] = useImmer(false);

  return (
    <LoggedInContext.Provider value={loggedIn}>
      <SetLoggedInContext.Provider value={setLoggedIn}>
        {children}
      </SetLoggedInContext.Provider>
    </LoggedInContext.Provider>
  );
}

export const useLoggedIn = () => {
  useContext(LoggedInContext);
}

export const useSetLoggedIn = () => {
  useContext(SetLoggedInContext);
}

export default LoggedInProvider;

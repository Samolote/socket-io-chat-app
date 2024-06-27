import { Dispatch, ReactNode, SetStateAction, createContext, useState } from 'react';

type UserContextType = {
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);

type UserProviderPropsType = { children: ReactNode };

export const UserProvider = ({ children }: UserProviderPropsType) => {
  const [username, setUsername] = useState<string | null>(null);

  return <UserContext.Provider value={{ username, setUsername }}>{children}</UserContext.Provider>;
};

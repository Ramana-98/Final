import React, { createContext, useContext, useState } from "react";

type UserProfile = {
  name: string;
  email: string;
  avatar: string;
};

const defaultUser: UserProfile = {
  name: "Your Name",
  email: "your.email@example.com",
  avatar: "/avatars/default.png",
};

const UserContext = createContext<{
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
}>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);

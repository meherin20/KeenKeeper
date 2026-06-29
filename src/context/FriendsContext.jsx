import { createContext, useContext, useState, useEffect } from 'react';
import friendsData from '../data/friends.json';

const FriendsContext = createContext(null);

export function FriendsProvider({ children }) {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFriends(friendsData);
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const getFriendById = (id) => friends.find((f) => f.id === Number(id));

  return (
    <FriendsContext.Provider value={{ friends, loading, getFriendById }}>
      {children}
    </FriendsContext.Provider>
  );
}

export function useFriends() {
  const ctx = useContext(FriendsContext);
  if (!ctx) throw new Error('useFriends must be used within FriendsProvider');
  return ctx;
}
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FriendsProvider } from './context/FriendsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import FriendDetail from './pages/FriendDetail';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter>
      <FriendsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="friend/:id" element={<FriendDetail />} />
            <Route path="timeline" element={<Timeline />} />
            <Route path="stats" element={<Stats />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </FriendsProvider>
    </BrowserRouter>
  );
}

import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import { Header } from "../components/Header";
import { useMatchStore } from "../store/useMatchStore";
import SwipeArea from "../components/SwipeArea";
import SwipeFeedback from "../components/SwipeFeedback";
import { useAuthStore } from "../store/useAuthStore";

const HomePage = () => {
  const {
    isLoadingUserProfiles,
    getUserProfiles,
    subscribeToNewMatches,
    unsubscribeFromNewMatches,
  } = useMatchStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    getUserProfiles();
  }, [getUserProfiles]);

  // FIX 2: Subscribe to real-time newMatch socket events on the HomePage
  // Previously subscribeToNewMatches() was never called, so matches from
  // swiping never appeared in the sidebar until a full page refresh
  useEffect(() => {
    if (authUser) {
      subscribeToNewMatches();
    }
    return () => {
      unsubscribeFromNewMatches();
    };
  }, [authUser, subscribeToNewMatches, unsubscribeFromNewMatches]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-pink-100 to-purple-100">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 flex flex-col items-center justify-center overflow-hidden relative">
          <SwipeFeedback />
          {isLoadingUserProfiles ? (
            <div className="flex items-center justify-center w-full h-full">
              <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-pink-500"></div>
            </div>
          ) : (
            <SwipeArea />
          )}
        </main>
      </div>
    </div>
  );
};
export default HomePage;

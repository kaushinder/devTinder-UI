import { useRef } from "react";
import TinderCard from "react-tinder-card";
import { useMatchStore } from "../store/useMatchStore";
import { X, Heart } from "lucide-react";

const SwipeArea = () => {
  const { userProfiles, swipeRight, swipeLeft } = useMatchStore();
  // Keep refs for each card so buttons can trigger programmatic swipe
  const cardRefs = useRef({});

  const handleSwipe = (dir, user) => {
    if (dir === "right") swipeRight(user);
    else if (dir === "left") swipeLeft(user);
  };

  const handleButtonSwipe = async (dir) => {
    const topUser = userProfiles[0];
    if (!topUser) return;
    const cardRef = cardRefs.current[topUser._id];
    if (cardRef) {
      await cardRef.swipe(dir);
    }
  };

  return (
    <div className='flex flex-col items-center gap-6'>
      {/* Card stack */}
      <div className='relative w-96 h-[28rem]'>
        {userProfiles.map((user) => (
          <TinderCard
            ref={(el) => (cardRefs.current[user._id] = el)}
            className='absolute shadow-none'
            key={user._id}
            onSwipe={(dir) => handleSwipe(dir, user)}
            swipeRequirementType='position'
            swipeThreshold={100}
            preventSwipe={["up", "down"]}
          >
            <div className='card bg-white w-96 h-[28rem] select-none rounded-lg overflow-hidden border border-gray-200 shadow-md'>
              <figure className='px-4 pt-4 h-3/4'>
                <img
                  src={user.image || "/avatar.png"}
                  alt={user.name}
                  className='rounded-lg object-cover h-full w-full pointer-events-none'
                />
              </figure>
              <div className='card-body bg-gradient-to-b from-white to-pink-50 p-4'>
                <h2 className='card-title text-2xl text-gray-800'>
                  {user.name}, {user.age}
                </h2>
                <p className='text-gray-600 text-sm'>{user.bio}</p>
              </div>
            </div>
          </TinderCard>
        ))}
      </div>

      {/* Action buttons — outside the card so they're always visible */}
      <div className='flex gap-8 justify-center'>
        <button
          onClick={() => handleButtonSwipe("left")}
          className='w-16 h-16 flex items-center justify-center rounded-full bg-white border-2 border-red-300 shadow-md hover:bg-red-50 hover:border-red-500 hover:scale-110 transition-all duration-200'
          title='Pass'
        >
          <X size={30} className='text-red-400' />
        </button>

        <button
          onClick={() => handleButtonSwipe("right")}
          className='w-16 h-16 flex items-center justify-center rounded-full bg-white border-2 border-pink-300 shadow-md hover:bg-pink-50 hover:border-pink-500 hover:scale-110 transition-all duration-200'
          title='Like'
        >
          <Heart size={30} className='text-pink-400' />
        </button>
      </div>
    </div>
  );
};
export default SwipeArea;

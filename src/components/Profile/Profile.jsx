import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import "./Profile.css";

function Profile({
  clothingItems,
  isLoggedIn,
  onAddClick,
  onCardClick,
  onCardLike,
  onEditProfileClick,
  onSignOut,
}) {
  const currentUser = useContext(CurrentUserContext);
  const currentUserItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <main className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        clothingItems={currentUserItems}
        isLoggedIn={isLoggedIn}
        onAddClick={onAddClick}
        onCardClick={onCardClick}
        onCardLike={onCardLike}
      />
    </main>
  );
}

export default Profile;

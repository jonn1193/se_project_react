import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import Profile from "../Profile/Profile";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { defaultWeather } from "../../utils/constants";
import { getWeather } from "../../utils/weatherApi";
import { CurrentTemperatureUnitContext } from "../../contexts/CurrentTemperatureUnitContext";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import {
  addCardLike,
  addItem,
  deleteItem,
  getItems,
  removeCardLike,
  updateUser,
} from "../../utils/api";
import { authorize, checkToken, register } from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  const [weatherData, setWeatherData] = useState(defaultWeather);
  const [clothingItems, setClothingItems] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    setActiveModal("");
    setSelectedCard(null);
  };

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((unit) => (unit === "F" ? "C" : "F"));
  };

  const handleLogin = ({ email, password }, resetForm) => {
    authorize({ email, password })
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleRegister = ({ name, avatar, email, password }, resetForm) => {
    register({ name, avatar, email, password })
      .then(() => authorize({ email, password }))
      .then((res) => {
        localStorage.setItem("jwt", res.token);
        return checkToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setCurrentUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleUpdateUser = (userData) => {
    const token = localStorage.getItem("jwt");

    updateUser(userData, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddItemSubmit = (item, resetForm) => {
    const token = localStorage.getItem("jwt");

    addItem(item, token)
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        resetForm();
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardDelete = (card) => {
    const token = localStorage.getItem("jwt");

    deleteItem(card._id, token)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== card._id),
        );
        handleCloseModal();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCardLike = (item) => {
    const token = localStorage.getItem("jwt");
    const isLiked = item.likes.some((id) => id === currentUser?._id);
    const likeRequest = isLiked ? removeCardLike : addCardLike;

    likeRequest(item._id, token)
      .then((updatedItem) => {
        setClothingItems((items) =>
          items.map((card) => (card._id === item._id ? updatedItem : card)),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");

    if (!token) {
      return;
    }

    checkToken(token)
      .then((user) => {
        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("jwt");
      });
  }, []);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        getWeather(coordinates)
          .then(setWeatherData)
          .catch((err) => {
            console.error(err);
          });
      },
      (err) => {
        console.error("Error getting geolocation:", err);
      },
    );
  }, []);

  useEffect(() => {
    getItems()
      .then(setClothingItems)
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        handleCloseModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  return (
    <div className="page">
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <CurrentUserContext.Provider value={currentUser}>
          <div className="page__content">
            <Header
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
              onAddClick={handleAddClick}
              onLoginClick={handleLoginClick}
              onRegisterClick={handleRegisterClick}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      onAddClick={handleAddClick}
                      onCardClick={handleCardClick}
                      onCardLike={handleCardLike}
                      onEditProfileClick={handleEditProfileClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
              <Route
                path="*"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    isLoggedIn={isLoggedIn}
                    onCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
            </Routes>
            <Footer />
          </div>
          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={handleCloseModal}
          />
          <LoginModal
            isOpen={activeModal === "login"}
            onCloseModal={handleCloseModal}
            onLogin={handleLogin}
          />
          <RegisterModal
            isOpen={activeModal === "register"}
            onCloseModal={handleCloseModal}
            onRegister={handleRegister}
          />
          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onCloseModal={handleCloseModal}
            onUpdateUser={handleUpdateUser}
          />
          <ItemModal
            card={selectedCard}
            isOpen={activeModal === "preview"}
            onClose={handleCloseModal}
            onCardDelete={handleCardDelete}
          />
        </CurrentUserContext.Provider>
      </CurrentTemperatureUnitContext.Provider>
    </div>
  );
}

export default App;

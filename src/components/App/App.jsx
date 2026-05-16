import { useEffect, useState } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { defaultClothingItems } from "../../utils/clothingItems";
import { defaultWeather } from "../../utils/constants";
import { getWeather } from "../../utils/weatherApi";

function App() {
  const [weatherData, setWeatherData] = useState(defaultWeather);
  const [clothingItems] = useState(defaultClothingItems);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    getWeather()
      .then(setWeatherData)
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
      <div className="page__content">
        <Header weatherData={weatherData} onAddClick={handleAddClick} />
        <Main
          weatherData={weatherData}
          clothingItems={clothingItems}
          onCardClick={handleCardClick}
        />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        name="add-garment"
        buttonText="Add garment"
        isOpen={activeModal === "add-garment"}
        onClose={handleCloseModal}
      >
        <label className="modal__label">
          Name
          <input
            className="modal__input"
            type="text"
            name="name"
            placeholder="Name"
            required
          />
        </label>
        <label className="modal__label">
          Image
          <input
            className="modal__input"
            type="url"
            name="imageUrl"
            placeholder="Image URL"
            required
          />
        </label>
        <fieldset className="modal__fieldset">
          <legend className="modal__legend">Select the weather type:</legend>
          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="hot"
            />
            Hot
          </label>
          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="warm"
            />
            Warm
          </label>
          <label className="modal__radio-label">
            <input
              className="modal__radio-input"
              type="radio"
              name="weather"
              value="cold"
            />
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
      <ItemModal
        card={selectedCard}
        isOpen={activeModal === "preview"}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App;

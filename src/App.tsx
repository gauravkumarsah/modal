import { useState } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleConfirm = () => {
    alert("Confirmed!");
    setIsModalOpen(false); // Close the modal after confirming
  };

  const handleCancel = () => {
    alert("Cancelled!");
    setIsModalOpen(false); // Close the modal after cancelling
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div>
      <button onClick={openModal}>Open Modal</button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        header="Header Title"
        primaryButtonText="Primary"
        secondaryButtonText="Secondary"
        ghostButtonText="Ghost"
        onPrimaryButtonClick={handleConfirm}
        onSecondaryButtonClick={handleCancel}
        eyebrowText="Eyebrow Text"
        slotComponent={<div className="slot-component">Slot component</div>}
        slotVariant="withMargin"
        buttonCount={1}
      />
    </div>
  );
}

export default App;

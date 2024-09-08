import { useEffect, ReactNode, FC } from "react";
import "./Modal.css";
import { ReactComponent as CloseIcon } from "../../close.svg";

export type ModalProps = {
  isOpen: boolean;
  buttonCount?: number;
  slotComponent: ReactNode;
  slotVariant: string;
  onClose: () => void;
  eyebrowText?: string;
  header?: string;
  children?: ReactNode;
  ghostButtonText?: string;
  secondaryButtonText?: string;
  primaryButtonText?: string;
  onPrimaryButtonClick?: () => void;
  onSecondaryButtonClick?: () => void;
  onGhostButtonClick?: () => void;
};

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  eyebrowText,
  header,
  slotComponent,
  slotVariant = "",
  ghostButtonText = "Ghost",
  primaryButtonText = "Primary",
  secondaryButtonText = "Secondary",
  onPrimaryButtonClick,
  onSecondaryButtonClick,
  onGhostButtonClick,
  buttonCount = 0,
}) => {
  const getButtonClasses = (currentButton: string) => {
    if (buttonCount === 1 && currentButton === ghostButtonText) {
      return "ghost-button ghost-button-1";
    }

    if (buttonCount === 2 && currentButton === ghostButtonText) {
      return "ghost-button ghost-button-2";
    }
    if (buttonCount === 2 && currentButton === primaryButtonText) {
      return "primary-button primary-button-2";
    }
    if (buttonCount === 3 && currentButton === ghostButtonText) {
      return "ghost-button ghost-button-3";
    }
    if (buttonCount === 3 && currentButton === primaryButtonText) {
      return "primary-button primary-button-3";
    }
    if (buttonCount === 3 && currentButton === secondaryButtonText) {
      return "secondary-button secondary-button-3";
    }

    return "hidden";
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Cleanup: Remove the event listener when the component is unmounted or when isOpen changes
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content">
        <CloseIcon
          className="close-button"
          onClick={onClose}
          aria-label="Close"
          width="32"
          height="32"
        />
        <div className="title-container">
          {eyebrowText && <p className="modal-eyebrow">{eyebrowText}</p>}
          {header && <h2 className="modal-header">{header}</h2>}
        </div>
        <div className={`modal-body ${slotVariant}`}>{slotComponent}</div>
        <div className={buttonCount === 3 ? "modal-footer-3" : "modal-footer"}>
          <button
            className={getButtonClasses(primaryButtonText)}
            onClick={onPrimaryButtonClick}
          >
            {primaryButtonText}
          </button>
          <button
            className={getButtonClasses(ghostButtonText)}
            onClick={onGhostButtonClick}
          >
            {ghostButtonText}
          </button>
          {
            <button
              onClick={onSecondaryButtonClick}
              className={getButtonClasses(secondaryButtonText)}
            >
              {secondaryButtonText}
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Modal;

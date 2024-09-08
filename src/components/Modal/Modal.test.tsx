import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import Modal from "./Modal";

describe("Modal Component", () => {
  const onClose = jest.fn();
  const onConfirm = jest.fn();
  const onCancel = jest.fn();
  const onGhostClick = jest.fn();

  const renderModal = (props = {}) => {
    return render(
      <Modal
        slotComponent={<p>This is the modal content</p>}
        slotVariant={""}
        isOpen={true}
        onClose={onClose}
        onPrimaryButtonClick={onConfirm}
        onSecondaryButtonClick={onCancel}
        onGhostButtonClick={onGhostClick}
        buttonCount={3}
        {...props}
      />
    );
  };

  it("should render the modal with the correct content", () => {
    renderModal();
    expect(screen.getByText("This is the modal content")).toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", () => {
    renderModal();
    fireEvent.click(screen.getByLabelText("Close"));
    expect(onClose).toHaveBeenCalled();
  });

  it("should call onConfirm when the primary button is clicked", () => {
    renderModal({ primaryButtonText: "Confirm" });
    fireEvent.click(screen.getByText("Confirm"));
    expect(onConfirm).toHaveBeenCalled();
  });

  it("should call onCancel when the secondary button is clicked", () => {
    renderModal({ secondaryButtonText: "Cancel" });
    fireEvent.click(screen.getByText("Cancel"));
    expect(onCancel).toHaveBeenCalled();
  });

  it("should call onGhostButtonClick when the ghost button is clicked", () => {
    renderModal({ ghostButtonText: "Ghost" });
    fireEvent.click(screen.getByText("Ghost"));
    expect(onGhostClick).toHaveBeenCalled();
  });

  it("should not render the modal when isOpen is false", () => {
    render(
      <Modal
        isOpen={false}
        onClose={onClose}
        slotComponent={undefined}
        slotVariant={""}
        buttonCount={0}
      />
    );
    expect(screen.queryByText("This is the modal content")).not.toBeInTheDocument();
  });

  it("should render the header when provided", () => {
    renderModal({ header: "Modal Header" });
    expect(screen.getByText("Modal Header")).toBeInTheDocument();
  });

  it("should render the eyebrow text when provided", () => {
    renderModal({ eyebrowText: "Eyebrow Text" });
    expect(screen.getByText("Eyebrow Text")).toBeInTheDocument();
  });

  it("should be accessible by keyboard", () => {
    renderModal();
    const primaryButton = screen.getByText("Primary");
    primaryButton.focus();
    expect(primaryButton).toHaveFocus();
  });

  it("should close when the Escape key is pressed", () => {
    renderModal();
    act(() => {
      fireEvent.keyDown(document, { key: "Escape", code: "Escape" });
    });
    expect(onClose).toHaveBeenCalled();
  });

});
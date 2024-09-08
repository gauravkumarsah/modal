import { useState } from "react";
import Modal, { ModalProps } from "./Modal";
import { Meta, StoryFn } from "@storybook/react/*";

export default {
  title: "Components/Modal",
  component: Modal,
  argTypes: {
    onClose: { action: "closed" },
    onPrimaryButtonClick: { action: "primary button clicked" },
    onSecondaryButtonClick: { action: "secondary button clicked" },
    onGhostButtonClick: { action: "ghost button clicked" },
  },
} as Meta<ModalProps>;

const Template: StoryFn<ModalProps> = (args) => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleClose = () => {
    setIsOpen(false);
    if (args.onClose) args.onClose();
  };

  return <Modal {...args} isOpen={isOpen} onClose={handleClose} />;
};

export const Default = Template.bind({});
Default.args = {
  isOpen: true,
  eyebrowText: "Eyebrow Text",
  header: "Modal Header",
  slotComponent: <p>This is the modal content</p>,
  ghostButtonText: "Ghost",
  primaryButtonText: "Confirm",
  secondaryButtonText: "Cancel",
  buttonCount: 3,
};

export const OneButtonModal = Template.bind({});
OneButtonModal.args = {
  isOpen: true,
  header: "Modal with One Button",
  slotComponent: <p>This is the modal content</p>,
  ghostButtonText: "Ghost",
  buttonCount: 1,
};

export const TwoButtonModal = Template.bind({});
TwoButtonModal.args = {
  isOpen: true,
  header: "Modal with Two Buttons",
  slotComponent: <p>This is the modal content</p>,
  ghostButtonText: "Ghost",
  primaryButtonText: "Confirm",
  buttonCount: 2,
};

export const ThreeButtonModal = Template.bind({});
ThreeButtonModal.args = {
  isOpen: true,
  eyebrowText: "Important Notice",
  header: "Confirmation",
  slotComponent: <p>Are you sure you want to proceed?</p>,
  ghostButtonText: "Ghost",
  primaryButtonText: "Confirm",
  secondaryButtonText: "Cancel",
  buttonCount: 3,
};

export const NoEyebrowText = Template.bind({});
NoEyebrowText.args = {
  isOpen: true,
  header: "Modal Without Eyebrow",
  slotComponent: <p>This is the modal content without eyebrow text</p>,
  ghostButtonText: "Ghost",
  primaryButtonText: "Confirm",
  secondaryButtonText: "Cancel",
  buttonCount: 3,
};

export const CustomSlotComponent = Template.bind({});
CustomSlotComponent.args = {
  isOpen: true,
  header: "Modal with Custom Slot",
  slotComponent: (
    <div>
      <h3>Custom Content</h3>
      <p>You can place any content here!</p>
    </div>
  ),
  ghostButtonText: "Ghost",
  primaryButtonText: "Confirm",
  secondaryButtonText: "Cancel",
  buttonCount: 3,
};

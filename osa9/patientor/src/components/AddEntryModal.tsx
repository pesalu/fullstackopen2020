import React from "react";
import { Dropdown, DropdownProps, Modal } from "semantic-ui-react";
import AddEntryForm, { EntryFormValues } from "../AddPatientModal/AddEntryFrom";
import AddHospitalEntryFrom from "../AddPatientModal/AddHospitalEntryFrom";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
}

export const AddEntryModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  const [entryType, setEntryType] = React.useState<string>("HealthCheck");

  const entryTypes: any = [
    {
      key: 1,
      text: "HealthCheck",
      value: "HealthCheck",
    },
    {
      key: 2,
      text: "Hospital",
      value: "Hospital",
    },
  ];

  return (
    <Modal open={modalOpen} onClose={onClose} centered={false} closeIcon>
      <Modal.Header>Add a new entry</Modal.Header>
      <Modal.Content>
        <Dropdown
          placeholder="Select entry type"
          fluid
          selection
          onChange={(
            e: React.SyntheticEvent<HTMLElement, Event>,
            data: DropdownProps
          ) => {
            console.log(data.value);
            const entryTypeName: string = data.value as string;
            setEntryType(entryTypeName);
          }}
          options={entryTypes}
        />
      </Modal.Content>
      <Modal.Content>
        {entryType === "HealthCheck" && (
          <AddEntryForm
            entryType={entryType}
            onSubmit={onSubmit}
            onCancel={onClose}
          />
        )}

        {entryType === "Hospital" && (
          <AddHospitalEntryFrom onSubmit={onSubmit} onCancel={onClose} />
        )}
      </Modal.Content>
    </Modal>
  );
};

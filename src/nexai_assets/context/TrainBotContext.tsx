import React from "react";

export const TrainBotContext = React.createContext<{
  trainMode: boolean;
  setTrainMode: any;
  handleChangeTrainMode: any;
  docUploaded: boolean;
  setDocUploaded: any;
  uploadError: boolean;
  setUploadError: any;
  uploading: boolean;
  setUploading: any;
}>({
  trainMode: true,
  setTrainMode: undefined,
  handleChangeTrainMode: undefined,
  docUploaded: false,
  setDocUploaded: undefined,
  uploadError: false,
  setUploadError: undefined,
  uploading: false,
  setUploading: undefined,
});

export function TrainBotProvider({ children }) {
  const [trainMode, setTrainMode] = React.useState(true);
  const [docUploaded, setDocUploaded] = React.useState(false);
  const [uploadError, setUploadError] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);

  const handleChangeTrainMode = (e: any) => {
    setTrainMode(e.target.checked);
  };

  return (
    <TrainBotContext.Provider
      value={{
        trainMode,
        setTrainMode,
        handleChangeTrainMode,
        docUploaded,
        setDocUploaded,
        uploadError,
        setUploadError,
        uploading,
        setUploading,
      }}
    >
      {children}
    </TrainBotContext.Provider>
  );
}

import React from 'react';
import { Assistant } from "nexai-assistant";
import './AssistantWrapper.css'; // Make sure to import your CSS

const AssistantWrapper = ({ actor, color, companyName, companyId, companyPrincipal }) => {
  return (
    <div className="assistant-icon">
      <Assistant
        actor={actor}
        color={color}
        companyName={companyName}
        companyId={companyId}
        companyPrincipal={companyPrincipal}
      />
    </div>
  );
};

export default AssistantWrapper;

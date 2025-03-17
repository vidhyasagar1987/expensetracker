import React from "react";
import "../css/modal.css";
import GlobalButton from "./GlobalButton";
import { cancel } from "../utils/constants";
import { AddIcon, CancelIcon, LightDeleteIcon } from "../utils/icons";

const NewModal = ({
  children,
  title,
  buttonText,
  addButtonOnclick,
  loading,
  cancelButonOnclick,
  deleteType,
}) => {
  return (
    <div className="modal-background">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">{title || ""}</h2>
        </div>

        <div className="modal-body">
          {children}

          <div className="modal-footer">
            <GlobalButton
              buttonType={deleteType ? "delete" : "primary"}
              onClick={addButtonOnclick}
              disabled={loading}
              icon={deleteType ? LightDeleteIcon : AddIcon}
              type="submit"
              loading={loading}
            >
              {buttonText || ""}
            </GlobalButton>
            <GlobalButton
              buttonType="secondary"
              icon={CancelIcon}
              onClick={cancelButonOnclick}
              disabled={loading}
            >
              {cancel}
            </GlobalButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewModal;

import { IoMdAdd } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaDownload } from "react-icons/fa6";

export const HamburgerIcon = (
  <GiHamburgerMenu
    style={{ fontSize: "1rem", paddingRight: "4px", paddingTop: "2px" }}
  />
);

export const CloseIcon = (
  <IoCloseSharp
    style={{ fontSize: "1rem", paddingRight: "4px", paddingTop: "2px" }}
  />
);

export const DownloadIcon = (
  <FaDownload
    style={{ fontSize: "1rem", paddingRight: "4px", paddingTop: "2px" }}
  />
);

export const AddIcon = (
  <IoMdAdd
    style={{ fontSize: "1rem", paddingRight: "4px", paddingTop: "2px" }}
  />
);

export const CancelIcon = (
  <IoMdClose
    style={{ fontSize: "1rem", paddingRight: "4px", paddingTop: "2px" }}
  />
);

export const LoginIcon = (
  <IoLogIn
    style={{ fontSize: "1rem", paddingRight: "4px", paddingTop: "2px" }}
  />
);

export const LoginOut = (
  <IoLogOut
    style={{ fontSize: "1rem", paddingRight: "4px", paddingTop: "2px" }}
  />
);

export const EditIcon = (
  <CiEdit
    style={{
      fontSize: "1rem",
      paddingRight: "4px",
      paddingTop: "2px",
      cursor: "pointer",
    }}
  />
);

export const DeleteIcon = (
  <MdOutlineDelete
    style={{
      fontSize: "1rem",
      paddingRight: "4px",
      paddingTop: "2px",
      color: "red",
      cursor: "pointer",
    }}
  />
);

export const LightDeleteIcon = (
  <MdOutlineDelete
    style={{
      fontSize: "1rem",
      paddingRight: "4px",
      paddingTop: "2px",
    }}
  />
);

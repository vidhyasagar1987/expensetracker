import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  addIncome,
  getincome,
  getIncomeById,
  setIncomeEditMode,
  setIncomeOpenModal,
  setIncomeRecordId,
  updateIncome,
} from "../redux/slices/incomeSlice";
import NewModal from "./NewModal";
import { toast } from "react-toastify";
import InputField from "./InputFiled";
import { month, year } from "../utils/cuurentDate";
import Loader from "./Loader";

const AddIncome = () => {
  const {
    addIncomeLoading,
    addIncomeError,
    editMode,
    recordId,
    getIncomeByIdLoading,
    getIncomeByIdError,
    editData,
    updateIncomeLoading,
    updateIncomeError,
  } = useSelector((state) => state.income);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addIncomeError) {
      toast.error(addIncomeError);
    }
  }, [addIncomeError]);

  useEffect(() => {
    if (getIncomeByIdError) {
      toast.error(getIncomeByIdError);
    }
  }, [getIncomeByIdError]);

  useEffect(() => {
    if (updateIncomeError) {
      toast.error(updateIncomeError);
    }
  }, [updateIncomeError]);

  const validationSchema = yup.object({
    incomeAmt: yup.string().required("Required"),
    incomeDate: yup.string().required("Required"),
    incomeSouce: yup.string().required("Required"),
  });

  const formik = useFormik({
    enableReinitialize: !!recordId,
    validationSchema,
    initialValues: {
      incomeAmt: "",
      incomeDate: "",
      incomeSouce: "",
    },
    onSubmit: async (values) => {
      if (editMode && recordId) {
        const payload = { ...values };
        const resultAction = await dispatch(
          updateIncome({ payload, recordId })
        );
        if (updateIncome.fulfilled.match(resultAction)) {
          dispatch(getincome({ month, year }));
          formik.resetForm();
          dispatch(setIncomeOpenModal(false));
          dispatch(setIncomeEditMode(false));
          dispatch(setIncomeRecordId(null));

          toast.success("Income Updated successfully");
        }
      } else {
        const payload = { ...values, createdBy: user?.id };
        const resultAction = await dispatch(addIncome(payload));
        if (addIncome.fulfilled.match(resultAction)) {
          dispatch(getincome({ month, year }));
          formik.resetForm();
          dispatch(setIncomeOpenModal(false));
          dispatch(setIncomeEditMode(false));
          dispatch(setIncomeRecordId(null));

          toast.success("Income added successfully");
        }
      }
    },
  });

  useEffect(() => {
    if (editMode && editData) {
      formik.setValues({
        incomeAmt: editData?.incomeAmt || "",
        incomeDate: editData?.incomeDate || "",
        incomeSouce: editData?.incomeSouce || "",
        id: editData?.id || 0,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (editMode && recordId) {
      dispatch(getIncomeById(recordId));
    }
  }, []);

  let buttonText = "";

  if (updateIncomeLoading) {
    buttonText = "Updating";
  } else if (addIncomeLoading) {
    buttonText = "Adding";
  } else if (editMode) {
    buttonText = "Update";
  } else {
    buttonText = "Add";
  }

  return (
    <NewModal
      title={editMode ? "Edit Income" : "Add Income"}
      buttonText={buttonText}
      addButtonOnclick={formik.handleSubmit}
      cancelButonOnclick={() => {
        dispatch(setIncomeOpenModal(false));
        dispatch(setIncomeEditMode(false));
        dispatch(setIncomeRecordId(null));
      }}
      loading={addIncomeLoading || updateIncomeLoading}
    >
      {getIncomeByIdLoading ? (
        <Loader />
      ) : (
        <form>
          <InputField
            type="number"
            name="incomeAmt"
            label="Income Amount"
            value={formik.values.incomeAmt || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="100.00"
            required
            errorMessage={formik.touched.incomeAmt && formik.errors.incomeAmt}
          />

          <InputField
            label="Income Date"
            type="date"
            name="incomeDate"
            value={formik.values.incomeDate || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Income date"
            errorMessage={formik.touched.incomeDate && formik.errors.incomeDate}
            required
          />

          <InputField
            label="Income Source"
            type="text"
            name="incomeSouce"
            value={formik.values.incomeSouce || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter Income source"
            errorMessage={
              formik.touched.incomeSouce && formik.errors.incomeSouce
            }
            required
          />
        </form>
      )}
      {(addIncomeError || updateIncomeError) && (
        <p className="error">{addIncomeError || updateIncomeError}</p>
      )}
    </NewModal>
  );
};

export default AddIncome;

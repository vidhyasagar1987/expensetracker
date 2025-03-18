import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import {
  addExpense,
  getExpenseById,
  getExpenses,
  setEditMode,
  setOpenModal,
  setRecordId,
  updateExpense,
} from "../redux/slices/expensesSlice";
import "../css/modal.css";
import InputField from "./InputFiled";
import GlobalButton from "./GlobalButton";
import { cancel } from "../utils/constants";
import { AddIcon, CancelIcon } from "../utils/icons";
import { toast } from "react-toastify";
import Loader from "./Loader";
import NewModal from "./NewModal";

const AddExpense = () => {
  const {
    addExpenseLoading,
    addExpenseError,
    editMode,
    recordId,
    getExpenseByIdLoading,
    getExpenseByIdError,
    editData,
    updateExpenseLoading,
    updateExpenseError,
  } = useSelector((state) => state.expenses);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    expenseAmount: yup.string().required("Required"),
    expenseDate: yup.string().required("Required"),
    expenseComment: yup.string().required("Required"),
    expenseCategory: yup.string().required("Required"),
  });

  useEffect(() => {
    if (addExpenseError) {
      toast.error(addExpenseError);
    }
  }, [addExpenseError]);

  useEffect(() => {
    if (getExpenseByIdError) {
      toast.error(getExpenseByIdError);
    }
  }, [getExpenseByIdError]);

  useEffect(() => {
    if (updateExpenseError) {
      toast.error(updateExpenseError);
    }
  }, [updateExpenseError]);

  const formik = useFormik({
    enableReinitialize: !!recordId,
    validationSchema,
    initialValues: {
      expenseAmount: "",
      expenseDate: "",
      expenseComment: "",
      expenseCategory: "",
    },
    onSubmit: async (values) => {
      if (editMode && recordId) {
        const payload = { ...values };
        const resultAction = await dispatch(
          updateExpense({ payload, recordId })
        );
        if (updateExpense.fulfilled.match(resultAction)) {
          const currentDate = new Date();
          const month = currentDate.getMonth() + 1;
          const year = currentDate.getFullYear();
          dispatch(getExpenses({ month, year }));
          formik.resetForm();
          dispatch(setOpenModal(false));
          dispatch(setEditMode(false));
          dispatch(setRecordId(null));

          toast.success("Expense Updated successfully");
        }
      } else {
        const payload = { ...values, createdBy: user?.id };
        const resultAction = await dispatch(addExpense(payload));
        if (addExpense.fulfilled.match(resultAction)) {
          const currentDate = new Date();
          const month = currentDate.getMonth() + 1;
          const year = currentDate.getFullYear();
          dispatch(getExpenses({ month, year }));
          formik.resetForm();
          dispatch(setOpenModal(false));
          dispatch(setEditMode(false));
          dispatch(setRecordId(null));

          toast.success("Expense added successfully");
        }
      }
    },
  });

  useEffect(() => {
    if (editMode && editData) {
      formik.setValues({
        expenseAmount: editData?.expenseAmount || "",
        expenseDate: editData?.expenseDate || "",
        expenseComment: editData?.expenseComment || "",
        expenseCategory: editData?.expenseCategory || "",
        id: editData?.id || 0,
      });
    }
  }, [editData]);

  useEffect(() => {
    if (editMode && recordId) {
      dispatch(getExpenseById(recordId));
    }
  }, []);

  let buttonText = "";

  if (updateExpenseLoading) {
    buttonText = "Updating";
  } else if (addExpenseLoading) {
    buttonText = "Adding";
  } else if (editMode) {
    buttonText = "Update";
  } else {
    buttonText = "Add";
  }
  return (
    <NewModal
      title={editMode ? "Edit Expense" : "Add Expense"}
      buttonText={buttonText}
      addButtonOnclick={formik.handleSubmit}
      cancelButonOnclick={() => {
        dispatch(setOpenModal(false));
        dispatch(setEditMode(false));
        dispatch(setRecordId(null));
      }}
      loading={addExpenseLoading || updateExpenseLoading}
    >
      {getExpenseByIdLoading ? (
        <Loader />
      ) : (
        <form>
          <InputField
            label="Expense Amount"
            type="number"
            name="expenseAmount"
            value={formik.values.expenseAmount || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="100.00"
            required
            errorMessage={
              formik.touched.expenseAmount && formik.errors.expenseAmount
            }
          />

          <InputField
            label="Expense Date"
            type="date"
            name="expenseDate"
            value={formik.values.expenseDate || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Enter expense date"
            errorMessage={
              formik.touched.expenseDate && formik.errors.expenseDate
            }
            required
          />

          <InputField
            label="Expense Category"
            name="expenseCategory"
            value={formik.values.expenseCategory || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            select
            options={[
              { label: "Rent", value: "Rent" },
              { label: "Savings", value: "Savings" },
              { label: "Shopping", value: "Shopping" },
              { label: "Household", value: "Household" },
              { label: "Dine Out", value: "Dineout" },
              { label: "Loan", value: "Loan" },
              { label: "Travel", value: "Travel" },
              { label: "Others", value: "Others" },
            ]}
            errorMessage={
              formik.touched.expenseCategory && formik.errors.expenseCategory
            }
          />

          <InputField
            type="text"
            label="Expense Comment"
            name="expenseComment"
            value={formik.values.expenseComment || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder="Shopping..."
            required
            errorMessage={
              formik.touched.expenseComment && formik.errors.expenseComment
            }
          />
        </form>
      )}
      {(addExpenseError || updateExpenseError) && (
        <p className="error">{addExpenseError || updateExpenseError}</p>
      )}
    </NewModal>
  );
};

export default AddExpense;

import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addExpense, getExpenses } from "../redux/slices/expensesSlice";
import "../css/modal.css";
import InputField from "./InputFiled";
import SelectField from "./SelectInputField";

const AddExpense = ({ setOpenModal }) => {
  const { addExpenseLoading, addExpenseError } = useSelector(
    (state) => state.expenses
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    expenseAmount: yup.string().required("Required"),
    expenseDate: yup.string().required("Required"),
    expenseComment: yup.string().required("Required"),
    expenseCategory: yup.string().required("Required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      expenseAmount: "",
      expenseDate: "",
      expenseComment: "",
      expenseCategory: "",
    },
    onSubmit: async (values) => {
      const payload = { ...values, createdBy: user?.id };
      const resultAction = await dispatch(addExpense(payload));
      if (addExpense.fulfilled.match(resultAction)) {
        dispatch(getExpenses());
        formik.resetForm();
        setOpenModal(false);
      }
    },
  });
  return (
    <div className="modal-background">
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">Add Expense</h2>
        </div>
        <div className="modal-body">
          <form onSubmit={formik.handleSubmit}>
            <InputField
              label="Expense Amount"
              type="number"
              name="expenseAmount"
              value={formik.values.expenseAmount}
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
              value={formik.values.expenseDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter expense date"
              errorMessage={
                formik.touched.expenseDate && formik.errors.expenseDate
              }
              required
            />

            <SelectField
              label="Expense Category"
              name="expenseCategory"
              value={formik.values.expenseCategory}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              required
              options={[
                { label: "Rent", value: "Rent" },
                { label: "Savings", value: "Savings" },
                { label: "Groceries", value: "Groceries" },
              ]}
              errorMessage={
                formik.touched.expenseCategory && formik.errors.expenseCategory
              }
            />

            <InputField
              type="text"
              label="Expense Comment"
              name="expenseComment"
              value={formik.values.expenseComment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Shopping..."
              required
              errorMessage={
                formik.touched.expenseComment && formik.errors.expenseComment
              }
            />

            <button type="submit" disabled={addExpenseLoading}>
              {addExpenseLoading ? "Adding" : "Add"}
            </button>
            <button
              type="button"
              onClick={() => {
                setOpenModal(false);
              }}
              disabled={addExpenseLoading}
            >
              Cancel
            </button>
          </form>
          {addExpenseError && <p>{addExpenseError}</p>}
        </div>
      </div>
    </div>
  );
};

export default AddExpense;

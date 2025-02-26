import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addExpense, getExpenses } from "../redux/slices/expensesSlice";

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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="number"
          name="expenseAmount"
          value={formik.values.expenseAmount}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter expenseAmount"
        />
        {formik.touched.expenseAmount && formik.errors.expenseAmount && (
          <p>{formik.errors.expenseAmount}</p>
        )}
        <input
          type="date"
          name="expenseDate"
          value={formik.values.expenseDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter expenseDate"
        />
        {formik.touched.expenseDate && formik.errors.expenseDate && (
          <p>{formik.errors.expenseDate}</p>
        )}
        <select
          name="expenseCategory"
          value={formik.values.expenseCategory}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          <option disabled value="">
            Select a Category
          </option>
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
        </select>
        {formik.touched.expenseCategory && formik.errors.expenseCategory && (
          <p>{formik.errors.expenseCategory}</p>
        )}
        <input
          type="text"
          name="expenseComment"
          value={formik.values.expenseComment}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter expenseComment"
        />
        {formik.touched.expenseComment && formik.errors.expenseComment && (
          <p>{formik.errors.expenseComment}</p>
        )}

        <button type="submit" disabled={addExpenseLoading}>
          {addExpenseLoading ? "Adding" : "Add"}
        </button>
        <button
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
  );
};

export default AddExpense;

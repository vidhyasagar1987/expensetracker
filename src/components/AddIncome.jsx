import { useFormik } from "formik";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addIncome, getincome } from "../redux/slices/incomeSlice";

const AddIncome = ({ setOpenModal }) => {
  const { addIncomeLoading, addIncomeError } = useSelector(
    (state) => state.income
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    incomeAmt: yup.string().required("Required"),
    incomeDate: yup.string().required("Required"),
    incomeSouce: yup.string().required("Required"),
  });

  const formik = useFormik({
    validationSchema,
    initialValues: {
      incomeAmt: "",
      incomeDate: "",
      incomeSouce: "",
    },
    onSubmit: async (values) => {
      const payload = { ...values, createdBy: user?.id };
      const resultAction = await dispatch(addIncome(payload));
      if (addIncome.fulfilled.match(resultAction)) {
        dispatch(getincome());
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
          name="incomeAmt"
          value={formik.values.incomeAmt}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter incomeAmt"
        />
        {formik.touched.incomeAmt && formik.errors.incomeAmt && (
          <p>{formik.errors.incomeAmt}</p>
        )}
        <input
          type="date"
          name="incomeDate"
          value={formik.values.incomeDate}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter incomeDate"
        />
        {formik.touched.incomeDate && formik.errors.incomeDate && (
          <p>{formik.errors.incomeDate}</p>
        )}

        <input
          type="incomeSouce"
          name="incomeSouce"
          value={formik.values.incomeSouce}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder="Enter incomeSouce"
        />
        {formik.touched.incomeSouce && formik.errors.incomeSouce && (
          <p>{formik.errors.incomeSouce}</p>
        )}

        <button type="submit" disabled={addIncomeLoading}>
          {addIncomeLoading ? "Adding" : "Add"}
        </button>
        <button
          onClick={() => {
            setOpenModal(false);
          }}
          disabled={addIncomeLoading}
        >
          Cancel
        </button>
      </form>
      {addIncomeError && <p>{addIncomeError}</p>}
    </div>
  );
};

export default AddIncome;

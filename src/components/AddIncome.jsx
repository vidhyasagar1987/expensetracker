import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { addIncome, getincome, setIncomeOpenModal } from "../redux/slices/incomeSlice";
import NewModal from "./NewModal";
import { toast } from "react-toastify";
import InputField from "./InputFiled";
import { month, year } from "../utils/cuurentDate";

const AddIncome = () => {
  const { addIncomeLoading, addIncomeError } = useSelector(
    (state) => state.income
  );
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (addIncomeError) {
      toast.error(addIncomeError);
    }
  }, [addIncomeError]);

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
        dispatch(getincome({ month, year }));
        formik.resetForm();
        dispatch(setIncomeOpenModal(false));
        toast.success("Income added successfully");
      }
    },
  });
  return (
    <NewModal
      title={"Add Income"}
      buttonText={addIncomeLoading ? "Adding" : "Add"}
      addButtonOnclick={formik.handleSubmit}
      cancelButonOnclick={() => {
        dispatch(setIncomeOpenModal(false));
      }}
      loading={addIncomeLoading}
    >
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
          errorMessage={formik.touched.incomeSouce && formik.errors.incomeSouce}
          required
        />
      </form>
      {addIncomeError && <p className="error">{addIncomeError}</p>}
    </NewModal>
  );
};

export default AddIncome;

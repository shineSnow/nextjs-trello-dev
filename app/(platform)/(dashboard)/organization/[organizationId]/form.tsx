"use client";

import { create } from "@/actions/create-board/create-board";
import { useFormState } from "react-dom";
import { FormInput } from "./form-input";
import FormButton from "./form-button";

export const Form = () => {
  const initialState = {
    message: null,
    errors: {},
  };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch} className="flex gap-x-2 align-middle">
      <FormInput errors={state?.errors} />
      <FormButton />
    </form>
  );
};

export default Form;

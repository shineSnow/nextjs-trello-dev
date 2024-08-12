"use client";

import { create } from "@/actions/create-board";
import { Button } from "@/components/ui/button";
import { useFormState } from "react-dom";

export const Form = () => {
  const initialState = {
    message: null,
    errors: {},
  };
  const [state, dispatch] = useFormState(create, initialState);

  return (
    <form action={dispatch} className="flex gap-x-2 align-middle">
      <div className="flex flex-col gap-y-2">
        <input
          id="title"
          name="title"
          required
          placeholder="Enter a board title"
          className="border-black border p-1"
        />
        {state?.errors?.title?.map((error: string) => (
          <p key={error} className="text-red-500">
            {error}
          </p>
        ))}
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default Form;

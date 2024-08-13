import { Input } from "@/components/ui/input";

interface FormInputProps {
  errors?: {
    title?: string[];
  };
}

export const FormInput = ({ errors }: FormInputProps) => {
  return (
    <div className="flex flex-col gap-y-2">
      <Input
        id="title"
        name="title"
        required
        placeholder="Enter a board title"
      />
      {errors?.title?.map((error: string) => (
        <p key={error} className="text-red-500">
          {error}
        </p>
      ))}
    </div>
  );
};

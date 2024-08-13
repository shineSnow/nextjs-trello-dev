/*
 * @Author: user
 * @Date: 2024-08-13 14:19:03
 * @LastEditTime: 2024-08-13 14:34:04
 * @LastEditors: user
 * @Description:
 * @FilePath: /nextjs-trello-dev/lib/create-safe.action.ts
 * 你也总是天亮了才睡!
 */
import { z } from "zod";

export type FieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type ActionState<TInput, TOutput> = {
  fieldErrors?: FieldErrors<TInput>;
  error?: string | null;
  data?: TOutput;
};

export const createSafeAction = <TInput, TOutput>(
  schema: z.Schema<TInput>,
  handler: (validateData: TInput) => Promise<ActionState<TInput, TOutput>>
) => {
  return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
    const validationResult = schema.safeParse(data);
    if (!validationResult.success) {
      return {
        fieldErrors: validationResult.error.flatten()
          .fieldErrors as FieldErrors<TInput>,
      };
    }
    return handler(validationResult.data);
  };
};

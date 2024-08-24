import { z } from 'zod';

export const UpdateCard = z.object({
	boardId: z.string(),
    description:z.optional(
		z.string({
			required_error:"Description is required",
			invalid_type_error:'Description is required'
		}).min(3,{message:'Description is too short'})
	),
	title: z.optional(z
		.string({
			required_error: 'Title is required',
			invalid_type_error: 'Title must be a string',
		}).min(3, {
			message: 'Minimum length of 3 letters is required',
		})),
	id: z.string(),
});

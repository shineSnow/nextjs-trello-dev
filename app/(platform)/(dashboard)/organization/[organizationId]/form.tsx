'use client';

import { createBoard } from '@/actions/create-board';
import { useAction } from '@/hooks/use-action';
import { FormInput } from '@/components/ui/form/form-input';
import { FormSubmit } from '@/components/ui/form/form-submit';

export const Form = () => {
	const { excute, fieldErrors } = useAction(createBoard, {
		onSuccess(data) {
			console.log('success', data);
		},
		onError(error) {
			console.log('error', error);
		},
	});

	console.log('fieldErrors', fieldErrors);

	const submit = (formData: FormData) => {
		const title = formData.get('title') as string;
		excute({ title });
	};
	return (
		<form
			action={submit}
			className="flex gap-x-2"
		>
			<FormInput
				label="Board Title"
				id="title"
				errors={fieldErrors}
			/>
			<FormSubmit>save</FormSubmit>
		</form>
	);
};

export default Form;

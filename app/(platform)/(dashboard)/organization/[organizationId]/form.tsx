'use client';

import { createBoard } from '@/actions/create-board';
import { useFormState } from 'react-dom';
import { FormInput } from './form-input';
import FormButton from './form-button';
import { useAction } from '@/hooks/use-action';

export const Form = () => {
	const { excute, fieldErrors } = useAction(createBoard, {
		onSuccess(data) {
			console.log('success', data);
		},
		onError(error) {
			console.log('error', error);
		},
	});

	const submit = (formData: FormData) => {
		const title = formData.get('title') as string;
		excute({ title });
	};
	return (
		<form action={submit} className="flex gap-x-2 align-middle">
			<FormInput errors={fieldErrors} />
			<FormButton />
		</form>
	);
};

export default Form;

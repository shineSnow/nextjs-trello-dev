'use client';

import { updateBoard } from '@/actions/update-board';
import { Button } from '@/components/ui/button';
import { FormInput } from '@/components/ui/form/form-input';
import { useAction } from '@/hooks/use-action';
import { Board } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';

interface BoardTitleFormProps {
	data: Board;
}

export const BoardTitleForm = ({ data }: BoardTitleFormProps) => {
	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);
	const [title, setTitle] = useState(data.title);
	const [isEditing, setIsEditing] = useState(false);
	const { excute } = useAction(updateBoard, {
		onSuccess: (data) => {
			toast.success(`Board ${data.title} updated successfully!`);
			setTitle(data.title);
		},
		onError: (error) => {
			toast.error(error);
		},
	});
	const enableEditing = () => {
		setIsEditing(true);

		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const onSubmit = (formData: FormData) => {
		const title = formData.get('title') as string;
		excute({ title, id: data.id });
	};

	const onBlur = () => {
		formRef.current?.requestSubmit();
	};

	if (isEditing) {
		return (
			<form
				ref={formRef}
				action={onSubmit}
				className="flex items-center gap-x-2"
			>
				<FormInput
					ref={inputRef}
					id="title"
					onBlur={onBlur}
					defaultValue={title}
					className="text-lg font-bold px-[7px] py-1 h-7 bg-transparent focus-visible:outline-none focus-visible:ring-transparent border-none"
				/>
			</form>
		);
	}
	return (
		<Button
			onClick={enableEditing}
			className="font-bold text-lg h-auto p-1 px-2"
			variant="transparent"
		>
			{title}
		</Button>
	);
};

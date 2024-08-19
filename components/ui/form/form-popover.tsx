'use client';

import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';

import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import { Button } from '../button';
import { X } from 'lucide-react';
import { createBoard } from '@/actions/create-board';
import { toast } from 'sonner';
import { FormPicker } from './form-picker';
import { useProModal } from '@/hooks/use-pro-model';
import { useRouter } from 'next/navigation';
import { ElementRef, useRef } from 'react';

interface FormPopoverProps {
	children: React.ReactNode;
	side?: 'left' | 'right' | 'top' | 'bottom';
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
}
export const FormPopover = ({
	children,
	side = 'bottom',
	align,
	sideOffset = 0,
}: FormPopoverProps) => {
	const proModal = useProModal();
	const router = useRouter();
	const closeRef = useRef<ElementRef<'button'>>(null);
	const { excute, fieldErrors } = useAction(createBoard, {
		onSuccess: (data) => {
			console.log(data);
			toast.success('Board created successfully');
			closeRef.current?.click();
			router.push(`/board/${data.id}`);
		},
		onError: (error) => {
			console.log({ error });
			toast.error(error);
			proModal.onOpen();
		},
	});

	const submit = (formdata: FormData) => {
		const title = formdata.get('title') as string;
		const image = formdata.get('image') as string;
		excute({ title, image });
	};
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				className="w-80 pt-3"
				side={side}
				sideOffset={sideOffset}
			>
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					Create board
				</div>
				<PopoverClose>
					<Button
						className="w-auto h-auto p-4 absolute top-2 right-2 text-neutral-600"
						variant="ghost"
					>
						<X className="h-4 w-4" />
					</Button>
				</PopoverClose>
				<form
					className="space-y-4"
					action={submit}
				>
					<div className="space-y-4">
						<FormPicker
							id="image"
							errors={fieldErrors}
						/>
						<FormInput
							id="title"
							label="Board title"
							type="text"
							errors={fieldErrors}
						/>
					</div>
					<FormSubmit className="w-full">Create</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	);
};

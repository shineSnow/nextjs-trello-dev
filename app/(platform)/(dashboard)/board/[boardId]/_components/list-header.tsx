import { updateList } from '@/actions/update-list-order/update-list';
import { useAction } from '@/hooks/use-action';
import { List } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener } from 'usehooks-ts';

interface ListHeaderProps {
	data: List;
	onAddCard: () => void;
}

export const ListHeader = ({ data, onAddCard }: ListHeaderProps) => {
	const [title, setTitle] = useState(data.title);
	const [isEditing, setIsEditing] = useState(false);

	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
			inputRef.current?.select();
		}, 0);
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const { excute } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`Rename list to ${data.title}`);
			setTitle(data.title);
			disableEditing();
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	const handleSubmit = (formData: FormData) => {};

	const onBlur = () => {};

	const onKeyDown = () => {};
	useEventListener('keydown', onKeyDown);

	return <div className="">list header</div>;
};

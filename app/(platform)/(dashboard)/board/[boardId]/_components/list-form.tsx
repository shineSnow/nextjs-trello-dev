import { createList } from '@/actions/update-list-order/create-list';
import { useAction } from '@/hooks/use-action';
import { useParams, useRouter } from 'next/navigation';
import { ElementRef, useRef, useState } from 'react';

export const ListForm = () => {
	const router = useRouter();
	const params = useParams();
	const formRef = useRef<ElementRef<'form'>>(null);
	const inputRef = useRef<ElementRef<'input'>>(null);

	const [isEditing, setIsEditing] = useState(false);

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			inputRef.current?.focus();
		});
	};

	const disableEditing = () => {
		setIsEditing(false);
	};

	const {} = useAction(createList, {
		onSuccess: (data) => {},
		onError: (error) => {},
	});

	return <div className=""></div>;
};

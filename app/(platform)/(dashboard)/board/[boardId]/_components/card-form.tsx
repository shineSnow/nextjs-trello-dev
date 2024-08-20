import { useAction } from '@/hooks/use-action';
import { useParams } from 'next/navigation';
import { ElementRef, forwardRef, useRef } from 'react';

interface CardFormProps {
	listId: string;
	enableEditing: () => void;
	disableEditing: () => void;
	isEditing: boolean;
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ listId, enableEditing, disableEditing, isEditing }, ref) => {
		const params = useParams();
		const formRef = useRef<ElementRef<'form'>>(null);

		const {} = useAction(createCard);
	}
);

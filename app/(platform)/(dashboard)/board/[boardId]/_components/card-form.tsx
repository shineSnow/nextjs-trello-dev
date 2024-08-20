import { createCard } from '@/actions/create-card';
import { Button } from '@/components/ui/button';
import { FormSubmit } from '@/components/ui/form/form-submit';
import { FormTextarea } from '@/components/ui/form/form-textarea';
import { useAction } from '@/hooks/use-action';
import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import { ElementRef, forwardRef, KeyboardEventHandler, useRef } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

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

		const { excute, fieldErrors } = useAction(createCard, {
			onSuccess: (data) => {
				toast.success(`Card "${data.title}" created`);
				formRef.current?.reset();
			},
			onError: (error) => {
				toast.error(error);
			},
		});
		const onKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				disableEditing();
			}
		};

		useOnClickOutside(formRef, disableEditing);
		useEventListener('keydown', onKeyDown);

		const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
			e
		) => {
			if (e.key === 'Enter' && !e.shiftKey) {
				e.preventDefault();
				formRef.current?.requestSubmit();
			}
		};

		const onSubmit = (formData: FormData) => {
			const title = formData.get('title') as string;
			const listId = formData.get('listId') as string;
			const boardId = params.boardId as string;
			excute({ title, listId, boardId });
		};

		if (isEditing) {
			return (
				<form
					ref={formRef}
					action={onSubmit}
					className="m-1 py-0.5 px-1 space-y-4"
				>
					<FormTextarea
						id="title"
						onKeyDown={onTextareaKeyDown}
						ref={ref}
						placeholder="Enter a title for this card..."
						errors={fieldErrors}
					/>
					<input
						hidden
						id="listId"
						name="listId"
						value={listId}
						type="text"
					/>
					<div className="flex items-center gap-x-1">
						<FormSubmit>Add Card</FormSubmit>
						<Button
							onClick={disableEditing}
							size="sm"
							variant="ghost"
						>
							<X className="h-5 w-5" />
						</Button>
					</div>
				</form>
			);
		}
		return (
			<div className="pt-2 px-2">
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					Add a card
				</Button>
			</div>
		);
	}
);

CardForm.displayName = 'CardForm';

import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { List } from '@prisma/client';
import { MoreHorizontal, X } from 'lucide-react';
import { ElementRef, useRef } from 'react';
import { FormSubmit } from '../../../../../../components/ui/form/form-submit';

interface ListOptionsProps {
	data: List;
	onAddCard: () => void;
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
    const closeRef = useRef<ElementRef<'button'>>(null);
    
    

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					className="h-auto w-auto"
					variant="ghost"
					size="sm"
				>
					<MoreHorizontal className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="px-0 pt-3 pb-3"
				side="bottom"
				align="start"
			>
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					List actions
				</div>
				<PopoverClose
					ref={closeRef}
					asChild
				>
					<Button
						variant="ghost"
						className="h-auto w-auto p-2 absolute top-2 right-2 text-neutral-600"
					>
						<X className="h-4 w-4" />
					</Button>
				</PopoverClose>
				<Button
					variant="ghost"
					onClick={onAddCard}
					className="rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm"
				>
					Add card...
				</Button>

				<form action={''}>
					<input
						hidden
						name="id"
						id="id"
						value={data.id}
					/>
					<input
						hidden
						name="boardId"
						id="boardId"
						value={data.boardId}
					/>
					<FormSubmit variant='ghost' className='rounded-none w-full h-auto p-2 px-5 justify-start font-normal text-sm'>Delete this list</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	);
};

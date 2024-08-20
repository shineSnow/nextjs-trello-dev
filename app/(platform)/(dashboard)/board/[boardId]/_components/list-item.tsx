import { ListWithCards } from '@/types';
import { Draggable } from '@hello-pangea/dnd';
import { ElementRef, useRef, useState } from 'react';
import { ListHeader } from './list-header';

interface ListItemProps {
	data: ListWithCards;
	index: number;
}

export const ListItem = ({ data, index }: ListItemProps) => {
	const textareaRef = useRef<ElementRef<'textarea'>>(null);

	const [isEditing, setIsEditing] = useState(false);

	const disableEditing = () => {
		setIsEditing(false);
	};

	const enableEditing = () => {
		setIsEditing(true);
		setTimeout(() => {
			textareaRef.current?.focus();
		});
	};

	return (
		<Draggable
			draggableId="data.id"
			index={index}
		>
			{(provided) => (
				<li
					{...provided.draggableProps}
					ref={provided.innerRef}
					className="shrink-0 h-full w-[272px] select-none"
				>
					<div
						{...provided.dragHandleProps}
						className="w-full rounded-md bg-[#f1f2f4] shadow-md pb-2"
					>
						<ListHeader
							data={data}
							onAddCard={enableEditing}
						/>
					</div>
				</li>
			)}
		</Draggable>
	);
};

import { useCardModal } from '@/hooks/use-card-modal';
import { Draggable } from '@hello-pangea/dnd';
import { Card } from '@prisma/client';

interface CardItemProps {
	data: Card;
	index: number;
}

export const CardItem = ({ data, index }: CardItemProps) => {
	const cardModal = useCardModal();

	return (
		<Draggable
			draggableId={data.id}
			index={index}
		>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role="button"
					onClick={() => cardModal.onOpen(data.id)}
					className="truncate boarder-2 boarder-transparent hover:border-black py-2 px-3 text-sm bg-white rounded-md shadow-sm"
				>
					{data.title}
				</div>
			)}
		</Draggable>
	);
};

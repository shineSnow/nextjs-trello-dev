'use client';

import { updateCardOrder } from '@/actions/update-card-order';
import { updateListOrder } from '@/actions/update-list-order';
import { useAction } from '@/hooks/use-action';
import { ListWithCards } from '@/types';
import {
	DragDropContext,
	Draggable,
	DraggableProvided,
	DraggableRubric,
	DraggableStateSnapshot,
	Droppable,
	DroppableProvided,
	DroppableStateSnapshot,
	DropResult,
	ResponderProvided,
} from '@hello-pangea/dnd';
import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { type } from '../../../../../../lib/create-safe-action';
import { ListItem } from './list-item';
import { ListForm } from './list-form';

interface ListContainerProps {
	data: ListWithCards[];
	boardId: string;
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list);
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
}

export const ListContainer = ({ data, boardId }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data);
	const { excute: excuteUpdateListOrder, fieldErrors } = useAction(
		updateListOrder,
		{
			onSuccess: (data) => {
				toast.success('List order updated');
			},
			onError: (error) => {
				toast.error(error);
			},
		}
	);

	const { excute: excuteUpdateCardOrder } = useAction(updateCardOrder, {
		onSuccess: (data) => {
			toast.success('Card order updated');
		},
		onError: (error) => {
			toast.error(error);
		},
	});

	useEffect(() => {
		setOrderedData(data);
	}, [data]);

	const onDragEnd = (result: any) => {
		const { destination, source, type } = result;
		if (!destination) return;
	};
	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable
				droppableId="lists"
				type="list"
				direction="horizontal"
			>
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex gap-x-3 h-full"
					>
						{orderedData.map((list, index) => (
							<ListItem
								key={list.id}
								index={index}
								data={list}
							/>
						))}
						{provided.placeholder}
						<ListForm />
						<div className="flex-shrink-0 w-1"></div>
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	);
};

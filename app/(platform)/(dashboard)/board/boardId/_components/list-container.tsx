import { updateListOrder } from '@/actions/update-list-order';
import { useAction } from '@/hooks/use-action';
import { ListWithCards } from '@/types';
import {
	DragDropContext,
	Draggable,
	DropResult,
	ResponderProvided,
} from '@hello-pangea/dnd';
import { useState } from 'react';
import { toast } from 'sonner';

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
	return <div className=""></div>;
};

'use server';

import { db } from '@/lib/db';
import { InputType, ReturnType } from './types';
import { auth } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { DeleteList } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	console.log('unathorized',userId, orgId)

	if (!userId || !orgId) {
		return {
			error: 'Unauthorized',
		};
	}

	const { id, boardId } = data;

	let list;

	try {
		list = await db.list.delete({
			where: {
				id,
				boardId,
				board: { orgId },
			},
		});
		console.log('list',list)

	} catch (error) {
		return {
			error: 'Failed to delete list',
		};
	}

	revalidatePath(`/board/${boardId}`);
	return {
		data: list,
	};
};

export const deleteList = createSafeAction(DeleteList, handler);

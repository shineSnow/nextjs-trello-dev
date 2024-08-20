'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { UpdateList } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return {
			error: 'Unathorized',
		};
	}

	const { title, id, boardId } = data;

	let list;

	try {
		list = await db.list.update({
			where: {
				id,
				boardId,
				board: { orgId },
			},
			data: {
				title,
			},
		});

		// await createAuditLog({

		// })
	} catch (error) {
		return {
			error: 'Fialed to update',
		};
	}
	revalidatePath(`/board/${boardId}`);
	return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);

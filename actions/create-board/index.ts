'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateBoard } from './schema';

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return { error: 'Unauthorized' };
	}

	const canCreate = await hasAvaliableCount();
	const isPro = await checkSubscription();

	const { title } = data;
	let board;

	try {
		board = await db.board.create({ data: { title } });
	} catch (error) {
		return { error: 'Failed to create board' };
	}

	revalidatePath(`/board/${board.id}`);
	return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

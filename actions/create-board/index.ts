'use server';

import { auth } from '@clerk/nextjs/server';
import { InputType, ReturnType } from './types';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { createSafeAction } from '@/lib/create-safe-action';
import { CreateBoard } from './schema';
import { hasAvailableCount, incrementAvaliableCount } from '@/lib/org-limit';
import { checkSubscriptions } from '@/lib/subscription';
import { ACTION, Board, ENTITY_TYPE } from '@prisma/client';
import { createAuditLog } from '@/lib/create-audit-log';

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth();

	if (!userId || !orgId) {
		return { error: 'Unauthorized' };
	}

	const canCreate = await hasAvailableCount();
	const isPro = await checkSubscriptions();

	if (!canCreate && !isPro)
		return {
			error:
				'You hava reached your limit of free boards.Please upgrate your plan',
		};

	const { title, image } = data;
	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
		image.split('|');
	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHTML ||
		!imageUserName
	) {
		return {
			error: 'Invalid image',
		};
	}
	let board;

	try {
		board = await db.board.create({
			data: {
				title,
				orgId,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageLinkHTML,
				imageUserName,
			},
		});
		if (!isPro) {
			await incrementAvaliableCount();
		}
		await createAuditLog({
			entityTitle:board.title,
			entityId:board.id,
			entityType:ENTITY_TYPE.BOARD,
			action:ACTION.CREATE
		})
	} catch (error) {
		return { error: 'Failed to create board' };
	}

	revalidatePath(`/board/${board.id}`);
	return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

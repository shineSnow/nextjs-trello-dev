import { auth } from '@clerk/nextjs/server';
import { db } from './db';

export const incrementAvaliableCount = async () => {
	const { orgId } = auth();

	if (!orgId) throw new Error('Unauthorized');
};

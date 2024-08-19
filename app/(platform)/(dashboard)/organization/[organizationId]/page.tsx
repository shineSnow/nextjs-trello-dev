import { Separator } from '@/components/ui/separator';
import { Info } from './_components/info';
import { BoardList } from './_components/board-list';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { create } from 'zustand';

const OrganizationIdPage = async () => {
	const { orgId } = auth();

	if (!orgId) {
		return redirect('/select-org');
	}

	const boards = await db.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});
	return (
		<div className="w-full mb-20">
			<Info />
			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<BoardList />
			</div>
		</div>
	);
};

export default OrganizationIdPage;

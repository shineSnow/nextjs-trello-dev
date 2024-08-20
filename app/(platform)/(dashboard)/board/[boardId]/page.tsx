import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { ListContainer } from './_components/list-container';

interface BoardIdProps {
	params: {
		boardId: string;
	};
}

const BoardIdPage = async ({ params }: BoardIdProps) => {
	const { orgId } = auth();

	if (!orgId) return redirect('/select-org');

	const lists = await db.list.findMany({
		where: {
			boardId: params.boardId,
			board: {
				orgId,
			},
		},
		include: {
			cards: {
				orderBy: {
					order: 'asc',
				},
			},
		},
		orderBy: {
			order: 'asc',
		},
	});
	console.log('lists', lists);
	return (
		<div className="p-4 h-full overflow-x-auto">
			<ListContainer
				data={lists}
				boardId={params.boardId}
			/>
		</div>
	);
};

export default BoardIdPage;

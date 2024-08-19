import { Separator } from '@/components/ui/separator';
import { Info } from './_components/info';
import { BoardList } from './_components/board-list';
import { checkSubscriptions } from '@/lib/subscription';

const OrganizationIdPage = async () => {
	const isPro = await checkSubscriptions();
	return (
		<div className="w-full mb-20">
			<Info isPro={!!isPro} />

			<Separator className="my-4" />
			<div className="px-2 md:px-4">
				<BoardList />
			</div>
		</div>
	);
};

export default OrganizationIdPage;

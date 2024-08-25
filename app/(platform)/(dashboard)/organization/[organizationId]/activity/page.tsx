import { Separator } from '@/components/ui/separator';
import { Suspense } from 'react';
import { ActivityList } from './_components/activity-list';

const ActivityPage = () => {
	return (
		<div className="w-full">
			<Separator />
			<Suspense fallback={<ActivityList.Skeleton />}>
				<ActivityList />
			</Suspense>
		</div>
	);
};

export default ActivityPage;

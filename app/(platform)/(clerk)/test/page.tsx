import { Button } from '@/components/ui/button';
import { SignedOut } from '@clerk/nextjs';

export default function TextPage() {
	return (
		<div>
			<Button>sign out</Button>
			<SignedOut>
				<div>You are signed Out</div>
			</SignedOut>
		</div>
	);
}

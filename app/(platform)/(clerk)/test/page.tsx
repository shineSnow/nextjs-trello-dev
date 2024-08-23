import { SignedOut } from "@clerk/nextjs";

export default function TextPage() {
	return (
		<div>
			<SignedOut>
				sign out
			</SignedOut>
		</div>
	);
}

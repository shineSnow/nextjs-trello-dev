'use client';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAction } from '@/hooks/use-action';
import { CreateBoard } from '@/actions/create-board/schema';

import { FormInput } from './form-input';
import { FormSubmit } from './form-submit';
import Form from '../../../app/(platform)/(dashboard)/organization/[organizationId]/form';

interface FormPopoverProps {
	children: React.ReactNode;
	side?: 'left' | 'right' | 'top' | 'bottom';
	align?: 'start' | 'center' | 'end';
	sideOffset?: number;
}
export const FormPopover = ({
	children,
	side = 'bottom',
	align,
	sideOffset = 0,
}: FormPopoverProps) => {
	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				align={align}
				className="w-80 pt-3"
				side={side}
				sideOffset={sideOffset}
			>
				<div className="text-sm font-medium text-center text-neutral-600 pb-4">
					Create board
				</div>
			</PopoverContent>
		</Popover>
	);
};

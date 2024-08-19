'use client';

import { unsplash } from '@/lib/unsplash';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { set } from 'zod';

interface FormPickerProps {
	id: string;
	errors?: Record<string, string[] | undefined>;
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
	const { pending } = useFormStatus();
	const [images, setImages] = useState<Array<Record<string, any>>>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedImageId, setSelectedImageId] = useState(null);

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const res = await unsplash.photos.getRandom({
					collectionIds: ['317099'],
					count: 9,
				});

				if (res && res.response) {
					const imgs = res.response as Array<Record<string, any>>;
					setImages(imgs);
				} else {
					console.log('Failed to fetch images');
				}
			} catch (error) {
				console.log(error);
				setImages([]);
			} finally {
				setIsLoading(false);
			}
		};
		fetchImages();
	}, []);

	if (isLoading) {
		return (
			<div className="p-6 flex justify-center items-center">
				<Loader2 className="w-6 h-6 text-sky-700 animate-spin" />
			</div>
		);
	}
	return (
		<div className="relative">
			<div className="grid grid-cols-3 gap-2 mb-2">
				{images.map((image) => (
					<div
						key={image.id}
						className={cn(
							'cursor-pointer relative aspect-video group hover:opacity-75 transition bg-muted',
							pending && 'opacity-50 hover:opacity-50 cursor-auto'
						)}
						onClick={() => {
							setSelectedImageId(image.id);
						}}
					>
						<Image
							alt="unsplash images"
							src={image.urls.thumb}
							fill
							className="object-cover rounded-sm"
						/>
					</div>
				))}
			</div>
		</div>
	);
};

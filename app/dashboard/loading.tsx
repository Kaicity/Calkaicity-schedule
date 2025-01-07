import Image from 'next/image';
import LoadingAnimate from '../../public/loading-animate.gif';

export default function Loading() {
  return (
    <div className="w-full h-full flex flex-1 items-center justify-center">
      <div className="flex flex-col">
        <Image
          src={LoadingAnimate}
          alt="loading..."
          width={64}
          height={64}
          className="size-16"
        />
        <p className="text-sm text-muted-foreground font-medium">
          Chờ xử lý...
        </p>
      </div>
    </div>
  );
}
'use client';

import ResponsiveContainer from '@/components/common/ResponsiveContainer';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="relative w-full h-screen">
      <ResponsiveContainer className="pt-64">
        <ResponsiveContainer>
          <hgroup className="flex flex-col sm:flex-row sm:items-center gap-4">
            <Image
              width="32"
              height="32"
              src="/assets/coding-apps-websites-programming-bug.svg"
              alt="Old computer vector illustration."
            />
            <div className="leading-tight">
              <h1 className="inline">The requested page doesn&apos;t exist.</h1>
              <br className="hidden sm:block" />
              <button
                onClick={() => router.back()}
                className="inline text-neutral-lighter w-fit hover:bg-black-lighter px-1.5 py-0.5"
              >
                Go back{' <-'}
              </button>
            </div>
          </hgroup>
        </ResponsiveContainer>
      </ResponsiveContainer>

      <div className="absolute bottom-0 px-6 pb-6 w-full flex justify-end">
        <div>
          <Unhappy404 className="w-full h-auto max-h-[50vh]" />
        </div>
      </div>
    </main>
  );
}

const Unhappy404 = ({ className }: { className: string }) => {
  return (
    <svg
      className={cn(className)}
      width="799"
      height="282"
      viewBox="0 0 799 282"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M233 183.6V228.4H199.771V282H148.528V228.4H0V135.2C33.6289 126.4 61.2526 110.4 82.0705 87.2C102.888 64 115.299 35.2 118.502 0H169.746C166.143 44.4 151.33 82 125.308 112.4C99.2852 142.8 62.0533 165.2 13.6117 179.6V193.2L46.8402 183.6H148.528V105.2H199.771V183.6H233Z"
        fill="white"
        opacity="0.25"
      />
      <path
        d="M799 183.6V228.4H765.771V282H714.528V228.4H566V135.2C599.629 126.4 627.253 110.4 648.07 87.2C668.888 64 681.299 35.2 684.502 0H735.746C732.143 44.4 717.33 82 691.308 112.4C665.285 142.8 628.053 165.2 579.612 179.6V193.2L612.84 183.6H714.528V105.2H765.771V183.6H799Z"
        fill="white"
        opacity="0.25"
      />
      <path
        d="M369.5 0H516V282H283V81L369.5 0Z"
        mask="url(#myMask)"
        fill="white"
      />
      <mask id="myMask">
        <rect x="0" y="0" width="799" height="282" fill="white" />
        <path d="M458 124H430V134H458V124Z" fill="black" />
        <path d="M466 114H448V124H466V114Z" fill="black" />
        <path d="M420 144L438 144L438 134L420 134L420 144Z" fill="black" />
        <path d="M466 144H448V134H466V144Z" fill="black" />
        <path d="M420 114L438 114L438 124L420 124L420 114Z" fill="black" />
        <path d="M466 106H458V114H466V106Z" fill="black" />
        <path d="M420 152L428 152L428 144L420 144L420 152Z" fill="black" />
        <path d="M466 152H458V144H466V152Z" fill="black" />
        <path d="M420 106L428 106L428 114L420 114L420 106Z" fill="black" />
        <path d="M371 124H343V134H371V124Z" fill="black" />
        <path d="M379 114H361V124H379V114Z" fill="black" />
        <path d="M333 144L351 144L351 134L333 134L333 144Z" fill="black" />
        <path d="M379 144H361V134H379V144Z" fill="black" />
        <path d="M333 114L351 114L351 124L333 124L333 114Z" fill="black" />
        <path d="M379 106H371V114H379V106Z" fill="black" />
        <path d="M333 152L341 152L341 144L333 144L333 152Z" fill="black" />
        <path d="M379 152H371V144H379V152Z" fill="black" />
        <path d="M333 106L341 106L341 114L333 114L333 106Z" fill="black" />
        <path d="M366 198L434 198L434 188L366 188L366 198Z" fill="black" />
        <path d="M434 198L443 198L443 188L434 188L434 198Z" fill="black" />
        <path d="M366 198L357 198L357 188L366 188L366 198Z" fill="black" />
        <path d="M444 218L463 218L463 208L444 208L444 218Z" fill="black" />
        <path d="M356 218L337 218L337 208L356 208L356 218Z" fill="black" />
        <path d="M434 208L453 208L453 198L434 198L434 208Z" fill="black" />
        <path d="M366 208L347 208L347 198L366 198L366 208Z" fill="black" />
      </mask>
    </svg>
  );
};

'use server';

import React from 'react';
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const srcExists = (src: string) => {
  return fs.existsSync(path.join(process.cwd(), '/public/websites', src));
};

interface WebsiteDisplayProps {
  path: string;
  zoom: number;
  isInteractable?: boolean;
}

const WebsiteDisplay: React.FC<WebsiteDisplayProps> = ({
  path,
  zoom,
  isInteractable = false,
}) => {
  if (srcExists(path)) {
    return (
      <div>
        <iframe
          className={cn(
            'z-10 absolute origin-top-left',
            !isInteractable && 'pointer-events-none'
          )}
          style={{
            scale: 1 / zoom,
            width: `${100 * zoom}%`,
            height: `${100 * zoom}%`,
          }}
          src={`/websites/${path}/index.html`}
          loading="lazy"
          allowFullScreen={false}
          sandbox={
            'allow-scripts' + (isInteractable ? ' allow-same-origin' : '')
          }
        />
        <div className="absolute inset-0 bg-neutral-lighter animate-pulse" />
      </div>
    );
  } else
    return (
      <div className="bg-error h-full flex flex-col justify-center items-center gap-4">
        <Image
          className="h-16 w-auto animate-bounce"
          width="123"
          height="112"
          src="/assets/ghost-scary.svg"
          alt="A scary ghost vector illustration."
        />
        <small className="text-white">Whoops, source code missing…</small>
      </div>
    );
};

export default WebsiteDisplay;

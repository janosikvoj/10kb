import React from 'react';
import Image from 'next/image';
import ResponsiveContainer from '../common/ResponsiveContainer';

const Footer = () => {
  return (
    <footer className="relative z-20 mt-48 pt-8 sm:pt-24 pb-24 bg-black-lighter">
      <div className="absolute bg-gradient-to-t from-black h-48 -mt-48 w-full top-0 pointer-events-none" />
      <ResponsiveContainer>
        <hgroup className="flex flex-row items-center gap-4 mb-32">
          <Image
            width="26"
            height="33"
            src="/assets/hand-heart.svg"
            alt="Hand with a heart above vector illustration."
          />
          <h2 className="leading-tight">
            Made with love
            <br />
            by the students{' '}
            <span className="text-nowrap">
              of
              <Image
                className="align-baseline ml-2 -mb-[1px] inline"
                src="/assets/digital_logo.svg"
                alt="Logo of the Digital design studio"
                width={73}
                height={17}
              />
              .
            </span>
          </h2>
        </hgroup>
        <div className="flex gap-6 flex-col md:flex-row justify-between md:items-center">
          <p className="text-neutral-lighter text-sm">
            Wanna see more cool&nbsp;stuff&nbsp;from&nbsp;us?
          </p>
          <div className="hidden lg:flex flex-row items-center grow mx-16">
            <Image
              className="h-6 w-auto rotate-90 -scale-x-100"
              width="27"
              height="33"
              src="/assets/hand-cursor-pointer-reverse.svg"
              alt="A vector illustration if a pointing hand"
            />
            <div className="bg-neutral-lighter w-8 h-px mx-3 grow min-w-8" />
            <Image
              className="h-6 w-auto rotate-90 -scale-x-100"
              width="27"
              height="33"
              src="/assets/hand-cursor-pointer-reverse.svg"
              alt="A vector illustration if a pointing hand"
            />
          </div>
          <div className="flex flex-row items-center flex-wrap sm:flex-nowrap gap-4">
            <Image
              className="hidden sm:block lg:hidden h-6 w-auto rotate-90 -scale-x-100 mr-4"
              width="27"
              height="33"
              src="/assets/hand-cursor-pointer-reverse.svg"
              alt="A vector illustration if a pointing hand"
            />
            <a
              href="https://showcase.fmk.utb.cz/atelier-digitalni-design/"
              target="_blank"
              className="bg-info hover:bg-white text-black px-1.5 py-0.5 transition-all"
            >
              Showcase
            </a>
            <a
              href="https://www.instagram.com/digital.utb/"
              target="_blank"
              className="bg-info hover:bg-white text-black px-1.5 py-0.5 transition-all"
            >
              Instagram
            </a>
            <a
              href="https://www.facebook.com/DigitalniDesign"
              target="_blank"
              className="bg-info hover:bg-white text-black px-1.5 py-0.5 transition-all"
            >
              Facebook
            </a>
          </div>
        </div>
      </ResponsiveContainer>
    </footer>
  );
};

export default Footer;

"use client";

import React, { useEffect, useState } from 'react'
import WaveSeparator from './WaveSeparator'
import { CircleChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Footer = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    const scrollToTop = (): void => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const toggleVisibility = (): void => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

  return (
    <div>
        <div className="relative w-full mt-30">
                <WaveSeparator waveColor="lime" />
                {/* <div className="absolute inset-x-0 bottom-0 top-0">
                </div> */}

                <div className="relative z-10 py-4 px-6 lg:px-8 bg-lime-400 text-neutral-700 flex justify-between items-center text-sm md:text-base">
                    <p>© {new Date().getFullYear()} Bocah Teknik. All rights reserved.</p>

                    {isVisible && (
                        <div className="" title='Scroll to top'>
                            <CircleChevronUp
                                onClick={scrollToTop}
                                className={cn(
                                    "bg-transparent text-white/70 hover:text-white",
                                    "fixed bottom-3 right-4 md:bottom-7 md:right-8",
                                    "transition-opacity duration-300",
                                    "h-7 w-7",
                                    isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
                                )} />
                        </div>
                    )}
                </div>
            </div>
    </div>
  )
}

export default Footer
"use client"
import React from 'react';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const router = useRouter();
    return (
        <>
        <div className='h-[8vh] w-full bg-black flex items-center justify-between px-16 fixed z-50'>
            <a href="/dashboard"><p className='text-white text-2xl font-black'>TuniTextAI</p></a>
            <div className='flex flex-row gap-14'>
                <div className='cursor-pointer' onClick={()=> router.push('/dashboard/ai')} >
                    <p className='text-white font-semibold transition-all duration-500 hover:scale-125'> Create new ✨ </p>
                </div>
                <div className='cursor-pointer' onClick={()=> router.push('/dashboard/collections')}>
                    <p className='text-white font-semibold transition-all duration-500 hover:scale-125'> My Collections 📚 </p>
                </div>
                <div className='cursor-pointer' onClick={()=> router.push('/about')}>
                    <p className='text-white font-semibold transition-all duration-500 hover:scale-125'> About 📙 </p>
                </div>
            </div>
            <div className='cursor-pointer flex flex-row gap-3 items-center justify-center transition-all duration-300 hover:scale-110' onClick={() => {
                    localStorage.removeItem('token');
                    router.push('/auth/login');
                }} >
            </div>
        </div>
        <div className='py-32 px-96'>
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Welcome to TuniTextAI
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                TuniTextAI is an innovative platform that empowers you to create collections of text that have been summarized, corrected, or paraphrased by AI. Whether you need concise summaries, error-free content, or rephrased text, TuniTextAI has got you covered.
            </p>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                About TuniTextAI
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Created by Seif Ddine Ben Amara, TuniTextAI leverages advanced AI technology to provide exceptional text processing services. Our backend is developed using Symfony, ensuring a robust and reliable platform.
            </p>
            <blockquote className="mt-6 border-l-2 pl-6 italic">
                "At TuniTextAI, we believe in the power of AI to enhance your writing experience. Whether you're summarizing, correcting, or paraphrasing, our platform delivers superior results."
            </blockquote>
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Key Features
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Our platform uses LLaMA 3 8B to perform the following operations on your texts:
            </p>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>AI-Powered Text Summarization</li>
                <li>AI-Driven Text Correction</li>
                <li>AI-Based Text Paraphrasing</li>
            </ul>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                With TuniTextAI, you can effortlessly manage and improve your text collections, making your content more impactful and error-free.
            </p>
            <h3 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
                Why Choose TuniTextAI?
            </h3>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                TuniTextAI is designed to provide an intuitive and efficient user experience. Here’s how we stand out:
            </p>
            <div className="my-6 w-full overflow-y-auto">
                <table className="w-full">
                <thead>
                    <tr className="m-0 border-t p-0 even:bg-muted">
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                        Feature
                    </th>
                    <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                        Benefit
                    </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Advanced AI Technology
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        High-quality text processing
                    </td>
                    </tr>
                    <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        User-Friendly Interface
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Easy to navigate and use
                    </td>
                    </tr>
                    <tr className="m-0 border-t p-0 even:bg-muted">
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Secure and Reliable
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        Safe and trustworthy service
                    </td>
                    </tr>
                </tbody>
                </table>
            </div>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Join us at TuniTextAI and experience the future of text processing. Discover how our AI-powered solutions can transform the way you handle your text collections.
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                The moral of the story is: with TuniTextAI, your text processing tasks become more efficient, accurate, and impactful.
            </p>
        </div>
        </>
    );
};

export default Page;
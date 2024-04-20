import React from 'react'
import { Skeleton } from '../../@/components/ui/skeleton';

const Test = () => {
    return (
        <section className='grid gap-8 container sm:max-xl:bg-blue-200 pt-5 text-center pb-3 tablet:grid-cols-2 tablet:items-center md:text-left'>
            <div>
                <img className='w-full rounded-lg' src="https://rukminim2.flixcart.com/image/850/1000/kffq2kw0-0/poster/z/o/q/medium-poster-death-note-30-death-note-anime-poster-angry-kira-original-imafvvsftt3rgz6e.jpeg?q=90&crop=false" alt="" />
            </div>
            <Skeleton className="w-full h-[100px] rounded-full" />

            <div>
                <h1 className='mb-2 text-4xl font-medium'>Headline</h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic debitis ullam quos! Adipisci facilis commodi, molestiae repudiandae odio expedita, optio ipsam iure dolorem et neque voluptatem fugiat a nemo tempora.</p>
            </div>
        </section>
    )
}

export default Test

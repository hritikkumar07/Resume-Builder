import React from 'react'
import Title from './Title'
import { BookOpen } from 'lucide-react'

const Testimonial = () => {
  const cardsData = [
    {
      image: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200',
      name: 'Briar Martin',
      handle: '@briarmar',
      text: 'This AI resume builder helped me land interviews at top tech startups. The professional summary generator is magic!',
      date: 'April 20, 2026'
    },
    {
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
      name: 'Avery Johnson',
      handle: '@averyj_dev',
      text: 'The ATS checker gave me immediate action points to optimize my structure. Reached my target score of 95% in minutes.',
      date: 'May 10, 2026'
    },
    {
      image: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60',
      name: 'Jordan Lee',
      handle: '@jordan_leads',
      text: 'Stunning design templates. I upgraded my old standard PDF to the Minimalist template and got a callback the next morning.',
      date: 'May 18, 2026'
    },
    {
      image: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60',
      name: 'Sarah Chen',
      handle: '@schen_pm',
      text: 'Being able to reorder sections instantly without copying and pasting was a huge lifesaver. Extremely clean product.',
      date: 'June 2, 2026'
    },
  ];

  const CreateCard = ({ card }) => (
    <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 mx-4 shadow-sm hover:shadow-md transition-all duration-300 w-72 shrink-0 relative overflow-hidden">
      <div className="flex gap-3">
        <img className="size-10 rounded-full object-cover border border-slate-100 dark:border-slate-800" src={card.image} alt="User avatar" />
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1.5">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{card.name}</p>
            <svg className="mt-0.5 text-indigo-500" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M4.555.72a4 4 0 0 1-.297.24c-.179.12-.38.202-.59.244a4 4 0 0 1-.38.041c-.48.039-.721.058-.922.129a1.63 1.63 0 0 0-.992.992c-.071.2-.09.441-.129.922a4 4 0 0 1-.041.38 1.6 1.6 0 0 1-.245.59 3 3 0 0 1-.239.297c-.313.368-.47.551-.56.743-.213.444-.213.96 0 1.404.09.192.247.375.56.743.125.146.187.219.24.297.12.179.202.38.244.59.018.093.026.189.041.38.039.48.058.721.129.922.163.464.528.829.992.992.2.071.441.09.922.129.191.015.287.023.38.041.21.042.411.125.59.245.078.052.151.114.297.239.368.313.551.47.743.56.444.213.96.213 1.404 0 .192-.09.375-.247.743-.56.146-.125.219-.187.297-.24.179-.12.38-.202.59-.244a4 4 0 0 1 .38-.041c.48-.039.721-.058.922-.129.464-.163.829-.528.992-.992.071-.2.09-.441.129-.922a4 4 0 0 1 .041-.38c.042-.21.125-.411.245-.59.052-.078.114-.151.239-.297.313-.368.47-.551.56-.743.213-.444.213-.96 0-1.404-.09-.192-.247-.375-.56-.743a4 4 0 0 1-.24-.297 1.6 1.6 0 0 1-.244-.59 3 3 0 0 1-.041-.38c-.039-.48-.058-.721-.129-.922a1.63 1.63 0 0 0-.992-.992c-.2-.071-.441-.09-.922-.129a4 4 0 0 1-.38-.041 1.6 1.6 0 0 1-.59-.245A3 3 0 0 1 7.445.72C7.077.407 6.894.25 6.702.16a1.63 1.63 0 0 0-1.404 0c-.192.09-.375.247-.743.56m4.07 3.998a.488.488 0 0 0-.691-.69l-2.91 2.91-.958-.957a.488.488 0 0 0-.69.69l1.302 1.302c.19.191.5.191.69 0z" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xs text-slate-400 font-semibold">{card.handle}</span>
        </div>
      </div>
      <p className="text-sm py-4 text-slate-600 dark:text-slate-300 leading-relaxed text-left">
        "{card.text}"
      </p>
      <div className="flex items-center justify-between text-slate-400 dark:text-slate-500 text-xs pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-1.5">
          <span>Posted on</span>
          <a href="https://x.com" target="_blank" rel="noreferrer" className="hover:text-sky-500">
            <svg width="10" height="9" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="m.027 0 4.247 5.516L0 10h.962l3.742-3.926L7.727 10H11L6.514 4.174 10.492 0H9.53L6.084 3.616 3.3 0zM1.44.688h1.504l6.64 8.624H8.082z" fill="currentColor" />
            </svg>
          </a>
        </div>
        <p>{card.date}</p>
      </div>
    </div>
  );

  return (
    <div id='testimonials' className='bg-slate-50 dark:bg-slate-950 py-20 transition-colors duration-300 overflow-hidden'>
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-green-400 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-full px-4 py-1.5 mb-4">
          <BookOpen className='size-3.5' />
          <span>Real Testimonials</span>
        </div>
        <Title 
          title="Loved by thousands of job seekers" 
          description="Read through success stories from engineers, marketers, and products leaders who successfully redesigned their resumes."
        />
      </div>

      {/* Marquee Row 1 */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent"></div>
        <div className="marquee-inner flex transform-gpu min-w-[200%] py-4">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent"></div>
      </div>

      {/* Marquee Row 2 (Reverse) */}
      <div className="marquee-row w-full mx-auto max-w-5xl overflow-hidden relative mt-4">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-slate-50 dark:from-slate-950 to-transparent"></div>
        <div className="marquee-inner marquee-reverse flex transform-gpu min-w-[200%] py-4">
          {[...cardsData, ...cardsData].map((card, index) => (
            <CreateCard key={index} card={card} />
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-slate-50 dark:from-slate-950 to-transparent"></div>
      </div>

      <style>{`
        @keyframes marqueeScroll {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }

        .marquee-inner {
          animation: marqueeScroll 30s linear infinite;
        }

        .marquee-reverse {
          animation-direction: reverse;
        }
      `}</style>
    </div>
  )
}

export default Testimonial
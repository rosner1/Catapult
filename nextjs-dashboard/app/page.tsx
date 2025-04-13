import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

export default function Page() {
  return (
      <main
          /*className="flex min-h-screen bg-[rgb(255,215,120)] flex-col p-6"*/
            className="flex min-h-screen bg-cover bg-center flex-col p-6"
            style={{backgroundImage: "url('/Corec.jpg')"}} // Replace with your image path
              >
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
            <div className="flex flex-col justify-center gap-6 rounded-lg bg-black px-6 py-10 md:w-2/5 md:px-20">
                <Image
                    src="/Purdue.jpg" // Change this to your actual image path
                    width={800}
                    height={800}
                    alt="Workout Logo"
                    className="self-start"
                />
                <div className={`${lusitana.className} text-xl text-white md:text-3xl md:leading-normal text-center`}>
                    Welcome to the
                </div>
                <div className={`${lusitana.className} text-9xl text-white md:text-7xl md:leading-normal text-center`}
                     style={{lineHeight: '.8'}}>
                    Train Station
                </div>
                <div className="flex justify-center">
                    <Link
                        href="/dashboard/generator"
                        className="flex items-center gap-5 self-start rounded-lg bg-[rgb(245,214,144)]  px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[rgb(213,187,126)] md:text-base"
                    >
                        <span className="text-black">Continue</span>
                        <ArrowRightIcon className="w-5 md:w-6 text-black"/>
                    </Link>
                </div>
            </div>
            <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
                {/* Add Hero Images Here */}


            </div>
        </div>
      </main>
  );
}

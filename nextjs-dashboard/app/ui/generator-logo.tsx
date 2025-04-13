import { lusitana } from '@/app/ui/fonts';

export default function GeneratorLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <p className="text-[60px]">Train Station</p>
    </div>
  );
}

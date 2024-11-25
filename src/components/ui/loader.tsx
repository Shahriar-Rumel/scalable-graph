import { FC } from 'react';
import { SvgSpinnersBlocksWave } from '../icons/spinner-blocks-wave';

interface LoaderProps {
  label: string;
}
const Loader: FC<LoaderProps> = ({ label }) => {
  return (
    <div className="w-[90%] h-full flex flex-col items-center justify-center py-[100px] relative lg:w-[90%] lg:h-full mx-auto">
      <SvgSpinnersBlocksWave className="text-[100px] text-violet-500" />
      <p className="text-[14px] mt-[24px]">{label}</p>
    </div>
  );
};

export default Loader;

import { FaUserAlt } from "react-icons/fa";
interface CardsProps {
  bgColor: string;
  BorderColor: string;
  title: string;
  number: number;
  iconColor: string;
}
const Cards = ({
  bgColor,
  BorderColor,
  title,
  number,
  iconColor,
}: CardsProps) => {
  return (
    <div
      className={`${bgColor} w-[90vw] md:w-[26%] h-4/5  border-l-[5px] ${BorderColor}     border-r-[0.5px]  border-t-[0.5px]  border-b-[0.5px]  rounded-r-xl rounded--xl md:rounded-l-none  `}
    >
      <div className="py-5 px-10 flex justify-between">
        <div>
          <FaUserAlt className={` text-[60px] ${iconColor}`} />
        </div>
        <div className="space-y-2 ">
          <p className={` font-light text-base`}>{title}</p>
          <div className="w-full flex justify-end">
            <p className={`font-bold text-lg `}>{number}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cards;

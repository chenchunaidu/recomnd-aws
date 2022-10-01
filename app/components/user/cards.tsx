import type { FC } from "react";
import type { CardProps } from "./card";
import Card from "./card";

interface CardsProps {
  cards: CardProps[];
}

const Cards: FC<CardsProps> = ({ cards }) => {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4 lg:gap-4 ">
      {cards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </div>
  );
};

export default Cards;
export type { CardsProps };

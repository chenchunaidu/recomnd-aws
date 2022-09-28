import type { FC } from "react";
import type { CardProps } from "./card";
import Card from "./card";

interface CardsProps {
  cards: CardProps[];
}

const Cards: FC<CardsProps> = ({ cards }) => {
  return (
    <>
      {cards?.map((card) => (
        <Card key={card.id} {...card} />
      ))}
    </>
  );
};

export default Cards;
export type { CardsProps };

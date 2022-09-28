import type { Recommendations } from "~/models/recommendation.server";
import type { FC } from "react";

interface CardProps extends Recommendations {}

const Card: FC<CardProps> = (recommendation) => {
  const fallback = !recommendation.media;

  return (
    <div
      key={recommendation.id}
      className="relative aspect-video w-full snap-center md:h-36 md:w-auto"
    >
      <a href={recommendation.url} target="_blank" rel="noreferrer">
        {fallback ? (
          <div className="h-full rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600"></div>
        ) : (
          <img
            src={recommendation.media}
            alt={recommendation.title}
            height="100%"
            width="100%"
            className="h-full rounded-md object-cover object-top"
          />
        )}
        {!recommendation.title && !recommendation.description ? (
          <div className="line-clamp-2 absolute top-1/4 break-all p-4 text-xs text-gray-50">
            {recommendation.url}
          </div>
        ) : (
          <div
            className={`absolute bottom-0 w-full rounded-md bg-gradient-to-b from-transparent to-black px-2 pb-2 pt-16`}
          >
            <div className="line-clamp-1 text-sm font-bold text-white">
              {recommendation.title}
            </div>
            <div className="line-clamp-3 text-xs text-white text-opacity-60">
              {recommendation.description}
            </div>
          </div>
        )}
      </a>
    </div>
  );
};

export default Card;
export type { CardProps };

'use client'

import { Star } from "lucide-react";

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} fill={i <= Math.round(rating) ? "#c4954a" : "transparent"} color={i <= Math.round(rating) ? "#c4954a" : "#6b6052"} strokeWidth={1.5} />
      ))}
    </div>
  );
}

export default StarRating;
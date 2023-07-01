import {
  IconStarHalfFilled,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react";

export default function GenerateStar({ rating }) {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<IconStarFilled className="text-yellow-300" key={i} />);
    } else {
      stars.push(<IconStar className="text-yellow-300" key={i} />);
    }
  }

  if (rating % 1 != 0) {
    stars[Math.ceil(rating - 1)] = (
      <IconStarHalfFilled className="text-yellow-300" key={10} />
    );
  }

  return stars;
}

export const STAR_ARRAY = [1, 2, 3, 4, 5];

export function isStarFilled(rating: number, starNumber: number): boolean {
  return starNumber <= rating;
}

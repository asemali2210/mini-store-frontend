import Skeleton from "react-loading-skeleton";
export default function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden">
      <Skeleton height={150} width={250} />
      <Skeleton height={10} width={100} />
      <Skeleton height={20} width={200} />
      <Skeleton height={10} width={150} />
    </div>
  );
}

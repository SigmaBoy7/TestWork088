import { Suspense } from "react";
import FavoritesList from "./ui/FavoriteList";

export default async function FavoritesPage() {
  return (
    <div className="">
      <Suspense fallback={<div>adadjsaodjsadhsauhd</div>}>
        <FavoritesList />
      </Suspense>
    </div>
  );
}

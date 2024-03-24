/*
  Warnings:

  - You are about to drop the `_ProductToWishListItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ProductToWishListItem" DROP CONSTRAINT "_ProductToWishListItem_A_fkey";

-- DropForeignKey
ALTER TABLE "_ProductToWishListItem" DROP CONSTRAINT "_ProductToWishListItem_B_fkey";

-- DropTable
DROP TABLE "_ProductToWishListItem";

-- AddForeignKey
ALTER TABLE "WishListItem" ADD CONSTRAINT "WishListItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

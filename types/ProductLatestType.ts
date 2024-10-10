import { ProductDetailsType } from "./ProductDetailsType";
import { Pagination } from "./ProductRatingType";

export interface ProductLatestType {
	data: ProductDetailsType[],
	pagination: Pagination
}
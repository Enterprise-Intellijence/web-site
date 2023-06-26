import { ProductCategory } from "../services/api-service";

export class FilterOptions {

    title?: string;
    description?: string;
    minProductCost?: number;
    maxProductCost?: number;
    brands?: Array<string>;
    condition?: string;
    views?: number;
    userId?: string;
    uploadDate?: Date;
    availability?: string;
    productCategory?: ProductCategory;
    primaryCat?: string;
    secondaryCat?: string;
    tertiaryCat?: string;
    likesNumber?: number;
    productGender?: string;
    sizes?: Array<string>;
    colour?: string;
    entertainmentLanguage?: string;
    homeMaterial?: string;
    page?: number;
    sizePage?: number;
    sortBy?: string;
    sortDirection?: string;    
}
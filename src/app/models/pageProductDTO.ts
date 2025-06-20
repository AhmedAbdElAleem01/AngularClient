/**
 * OpenAPI definition
 *
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { PageableObject } from './pageableObject';
import { SortObject } from './sortObject';
import { ProductDTO } from './productDTO';


export interface PageProductDTO {
    totalPages?: number;
    totalElements?: number;
    first?: boolean;
    last?: boolean;
    numberOfElements?: number;
    size?: number;
    content?: ProductDTO[];
    number?: number;
    sort?: SortObject;
    pageable?: PageableObject;
    empty?: boolean;
}


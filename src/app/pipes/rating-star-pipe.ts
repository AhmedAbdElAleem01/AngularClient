import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ratingStar'
})
export class RatingStarsPipe implements PipeTransform {
  transform(value: number, maxStars: number = 5): string {
    if (value == null) return '';

    const fullStars = Math.floor(value);
    const halfStar = value % 1 >= 0.5 ? 1 : 0;

    return '★'.repeat(fullStars) + (halfStar ? '½' : '');
  }
}

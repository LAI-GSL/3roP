import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByUser'
})
export class FilterByUserPipe implements PipeTransform {
  transform(posts: any[], userId: string): any[] {
    if (!userId) {
      return posts; 
    }
    return posts.filter(post => post.userId === userId);
  }
}
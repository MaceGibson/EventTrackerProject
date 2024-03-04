import { Pipe, PipeTransform } from '@angular/core';
import { Habit } from '../models/habit';

@Pipe({
  name: 'incomplete',
  standalone: true
})
export class IncompletePipe implements PipeTransform {

  transform(habits: Habit[], showComplete: boolean): Habit[] {
    const result: Habit[] = [];

    if(showComplete){
      return habits;
    }

    for (let habit of habits) {
      if (!habit.completed) {
        result.push(habit);
      }
    }

    return result;
  }

}

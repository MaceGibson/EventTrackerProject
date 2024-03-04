import { Component, OnInit } from '@angular/core';
import { Habit } from '../../models/habit';
import { HabitService } from '../../services/habit.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IncompletePipe } from '../../pipes/incomplete.pipe';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-habit-list',
  standalone: true,
  imports: [CommonModule, FormsModule, IncompletePipe],
  templateUrl: './habit-list.component.html',
  styleUrl: './habit-list.component.css'
})
export class HabitListComponent implements OnInit {
  title = 'ngHabit';
  selected: Habit | null = null;
  newHabit: Habit = new Habit();
  editHabit: Habit | null = null;
  showComplete: boolean = false;

  habits: Habit[] = [];

  constructor(
    private habitService: HabitService,
    private incompletePipe: IncompletePipe,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadHabits();
    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        let habitIdStr = params.get('habitId');
        if (habitIdStr) {
          let habitId = parseInt(habitIdStr);
          if (isNaN(habitId)) {
            this.router.navigateByUrl('invalidHabit');
          } else {
            this.getHabit(habitId);
          }
        }
      },
      error: (oopsie) => {
        console.log(oopsie);
      }
    });
  }
  getHabit(habitId: number) {
    this.habitService.show(habitId).subscribe( {
      next: (habit) => {
        this.selected = habit;
      },
      error: (oops) => {
        console.error('HabitListComponent.getHabit: error getting habit');
        console.error(oops);
        this.router.navigateByUrl('habitNotFound');
      }
    });
  }

  loadHabits(): void {
    this.habitService.index().subscribe({
      next: (habits) => {
        this.habits = habits;
      },
      error: (error) => {
        console.error('Error loading habits:', error);
      },
    });
  }

  getHabitCount(): number {
    return this.incompletePipe.transform(this.habits, false).length;
  }

  displayHabit(habit: Habit): void {
    this.selected = habit;
  }

  displayTable(): void {
    this.selected = null;
  }

  addHabit(): void {
    this.habitService.create(this.newHabit).subscribe({
      next: () => {
        this.loadHabits();
        this.newHabit = new Habit();
      },
      error: (error) => {
        console.error('Error creating habit:', error);
      },
    });
  }

  setEditHabit(): void {
    if (this.selected) {
      this.editHabit = Object.assign({}, this.selected);
    }
  }

  cancelEdit(): void {
    this.editHabit = null;
  }

  updateHabit(): void {
    if (this.editHabit) {
      this.habitService.update(this.editHabit.id, this.editHabit).subscribe({
        next: () => {
          const index = this.habits.findIndex(
            (habit) => habit.id === this.editHabit!.id
          );
          if (index !== -1) {
            this.habits[index] = Object.assign({}, this.editHabit);
          }
          this.editHabit = null;
        },
        error: (error) => {
          console.error('Failed to update habit. Habit not found.', error);
        },
      });
    }
  }

  deleteHabit(habit: Habit): void {
    this.habitService.delete(habit.id).subscribe({
      next: () => {
        this.habits = this.habits.filter((t) => t.id !== habit.id);
        this.selected = null;
      },
      error: (error: any) => {
        console.error('Failed to delete habit:', error);
      },
    });
  }

}

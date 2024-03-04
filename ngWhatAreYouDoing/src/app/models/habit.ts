export class Habit {
  id: number;
  userId: number;
  name: string;
  description: string;
  date: string;
  completed: boolean;
  completeDate: string | null;

  constructor(
    id: number = 0,
    userId: number = 0,
    name: string = '',
    description: string = '',
    date: string = '',
    completed: boolean = false,
    completeDate: string | null = ''
  ) {
    this.id = id;
    this.userId = userId;
    this.name = name;
    this.description = description;
    this.date = date;
    this.completed = completed;
    this.completeDate = completeDate;
  }
}

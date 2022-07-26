import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastMessageService {

  constructor(private snackBar: MatSnackBar) { }

  public showSuccessMessage(message: string){
    this.snackBar.open(message, undefined, { duration: 2000 });
  }

  public showErrorMessage(message: string){
    this.snackBar.open("Unable to perform operation: " + message, 'Close');
  }
}

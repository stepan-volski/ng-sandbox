import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Boardgame } from 'src/app/models/boardgame';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { BoardgamesService } from 'src/app/services/boardgames.service';
import { ToastMessageService } from 'src/app/services/toast-message.service';

@Component({
  selector: 'app-lend-boardgame-form',
  templateUrl: './lend-boardgame-form.component.html',
  styleUrls: ['./lend-boardgame-form.component.scss'],
})
export class LendBoardgameFormComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { game: Boardgame; currentUser: User },
    private authService: AuthService,
    private toastServ: ToastMessageService,
    private gameServ: BoardgamesService,
  ) {}

  game!: Boardgame;
  users!: User[];

  ngOnInit(): void {
    this.game = { ...this.data.game };
    this.authService.getUserListFromApi().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (error) => {
        this.toastServ.showErrorMessage(error.message);
      },
    });
  }

  onSubmit(form: NgForm) {
    const lentGame = {
      ...this.game,
      lentFromUser: this.data.currentUser,
      lentToUser: form.value.user,
    };
    this.gameServ.lendGame(lentGame, form.value.user.id);
  }
}

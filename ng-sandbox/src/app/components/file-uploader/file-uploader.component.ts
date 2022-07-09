import { Component } from '@angular/core';
import { BoardgamesService } from 'src/app/services/boardgames.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  file: File | null = null;
  fileName = '';

  constructor(private bgServ: BoardgamesService) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    this.file = target.files![0];
    this.fileName = this.file.name;
  }

  upload(){
    if (this.file) {
      const reader = new FileReader();
      reader.addEventListener('load', (event) => {
        const payload = event.target!.result as string;
        this.bgServ.importGames(JSON.parse(payload));
        this.file = null;
        this.fileName = '';
      });
      reader.readAsText(this.file);
    }
  }
}

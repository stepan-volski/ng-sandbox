import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { boardgames } from 'src/app/data/boardgames';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.scss'],
})
export class FileUploaderComponent {
  fileName = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const file: File = target.files![0];
    const uploadUrl = 'https://angular-test-987db-default-rtdb.firebaseio.com/games.json'

    if (file) {
      console.log(file);
      this.fileName = file.name;
      // const payload = JSON.stringify(boardgames);
      // this.http.put(uploadUrl, payload).subscribe(
      //   response => {
      //     console.log(response);
      //   }
      // );
    }


    // if (file) {
    //   this.fileName = file.name;
    //   const formData = new FormData();
    //   formData.append(this.fileName, file);
    //   const upload$ = this.http.post(uploadUrl, formData).subscribe(
    //     response => {
    //       console.log(response);
    //     }
    //   );
    // }
  }
}

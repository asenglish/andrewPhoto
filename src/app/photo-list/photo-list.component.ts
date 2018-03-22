import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Photo } from './photo';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { fadeInAnimation } from '../_animations/fade-in.animation'

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css'],
  animations: [fadeInAnimation]
})
export class PhotoListComponent implements OnInit {
  public photos: Photo[];
  public isLoading = true;

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.isLoading = true;
    this.photos = []
    this.httpService.get('/photos/all')
      .subscribe(result => {
        this.instantiatePhotos(result.json());
    });

    // Easy quick solution for "reactive" likes... I should do gRPC...
    TimerObservable.create(0, 1000)
      .subscribe(() => {
          this.httpService.get('/photos/likes')
            .subscribe(result => {
              this.updateLikes(new Map(JSON.parse(result.json())));
            });
      });
  }

  public likePhoto(id: string, event): void {
    this.httpService.put('/photos/like/' + id)
      .then(result => {
        event.target.classList.add('liked');
    });
  }

  public getTransparency(): string {
    return this.isLoading ? 'transparent' : 'opaque';
  }

  private instantiatePhotos(jsonPhotos: any): void {
    this.photos = jsonPhotos.map(function(jsonPhoto) {
      const {id, url, created_at, likes, collection_name, name} = jsonPhoto;
      return new Photo(id, url, created_at, likes, collection_name, name);
    });
    this.isLoading = false;
  }

  private updateLikes(likes: any) {
    this.photos.forEach(photo => {
      photo.likes = likes.get(photo.id);
    });
  }
}

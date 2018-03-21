import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Photo } from './photo';
import { Observable } from "rxjs";
import { TimerObservable } from "rxjs/observable/TimerObservable";

@Component({
  selector: 'photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  public photos: Photo[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
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

  public likePhoto(id: string): void {
    this.httpService.put('/photos/like/' + id)
      .then(result => {
        //on success event?
    });
  }

  private instantiatePhotos(jsonPhotos: any): void {
    this.photos = jsonPhotos.map(function(jsonPhoto) {
      const {id, url, created_at, likes, collection_name, name} = jsonPhoto;
      return new Photo(id, url, created_at, likes, collection_name, name);
    });
  }

// TS does not support maps?
  private updateLikes(likes: any) {
    this.photos.forEach(photo => {
      photo.likes = likes.get(photo.id);
    });
  }
}

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
    TimerObservable.create(0, 1000)
      .subscribe(() => {
        this.httpService.get('/photos/all')
          .subscribe(result => {
            this.insantiatePhotos(result);
          })
      })
  }

  public likePhoto(id: string): void {
    this.httpService.put('/photos/like/' + id)
      .then(result => {

    })
  }

  private insantiatePhotos(jsonPhotos: any): void {
    this.photos = jsonPhotos.json().map(function(jsonPhoto) {
      const {id, url, created_at, likes, collection_name, name} = jsonPhoto;
      return new Photo(id, url, created_at, likes, collection_name, name);
    });
  }
}

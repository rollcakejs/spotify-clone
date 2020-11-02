import { Component, OnInit } from '@angular/core';
import SpotifyWebApi from "spotify-web-api-node";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public winVar = (<any>window).RollCake;
  public items = new Array();

  constructor() { }

  ngOnInit() {
    if (this.winVar && this.winVar.store){
      const authorizedUser = this.winVar.store.getState('authentication');
      const spotifyApi = new SpotifyWebApi({});
      spotifyApi.setAccessToken(authorizedUser.accessToken);
      spotifyApi.getUserPlaylists(null, {
        limit: 20
      })
      .then(
      (data: any) => {
        this.items = data.body.items.map(
          (i) => {
              return {
                  name: i.name,
                  context_uri: i.uri
              }
          }
        );
      }, 
      (err) => {
        console.log(err);
      });
      }
  }

  public onClickHome(): void {}

  public onClickPlaylistItem(item: any): void {
    if (this.winVar)
      this.winVar.bus.publish('play-user-playback', item.context_uri);
  }

}

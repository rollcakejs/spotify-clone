<script>
	import SpotifyWebApi from "spotify-web-api-node";

	const winVar =  window.RollCake;

	const spotifyApi = new SpotifyWebApi({});

	// Screen variables
	let token = '';
	let currentTrack = {
		imgSrc: '', 
		name: '',
		artistName: ''
	};
	let isPlaying = false;
	let isSuffle = false;
	let isRepeat = false;
	let isMute = false;

	let deviceId = null;

	const notifyUserActionDenied = () => {
		window.top.alert('User need`s to have a Spotify Premium account to rock with this application!')	
	}

	const requestMyCurrentTrack = () => {
		spotifyApi
		.getMyCurrentPlayingTrack()
		.then(
			(data) => {
				const bodyData = data.body;

				if (bodyData) {
					isPlaying = bodyData.is_playing;

					const track = bodyData.item;

					currentTrack = {
						...currentTrack,
						name: track.name,
						artistName: track.album.artists.map(a => a.name).join(", "),
						imgSrc: track.album.images[0].url
					}
				}
				else {
					requestMyRecentlyPlayedTracks()
				}
			},
			(err) => {
				
			}
		)
	};

	const requestMyRecentlyPlayedTracks = () => {
		spotifyApi
		.getMyRecentlyPlayedTracks()
		.then(
			(data) => {
				const track = data.body.items[0].track;

				if (track) 
					currentTrack = {
						...currentTrack,
						name: track.name,
						artistName: track.album.artists.map(a => a.name).join(", "),
						imgSrc: track.album.images[0].url
					}
			}, 
			(err) => {
				
			}
		);
	}

	const requestTransferMyPlayback = () => {
		spotifyApi
			.transferMyPlayback({
				device_ids: [
					deviceId
				]
			});
	}

	const onClickSuffle = () => {
		if (token)
			spotifyApi
			.setShuffle({
				state: (!isSuffle).toString(),
				device_id: deviceId
			});
	}

	const onClickPrevious = () => {
		if (token)
			spotifyApi
			.skipToPrevious({
				device_id: deviceId
			});
	}

	const onClickPauseOrPlay = () => {
		if (token) {
			if (isPlaying) {
				spotifyApi
				.pause({
					device_id: deviceId
				});
			}
			else {
				spotifyApi
				.play({
					device_id: deviceId
				}, {});
			}
		}
	}

	const onClickNext = () => {
		if (token)
			spotifyApi
			.skipToNext({
				device_id: deviceId
			});
	}

	const onClickRepeat = () => {
		if (token)
			spotifyApi
			.setRepeat({
				state: isRepeat ? 'off' : 'track',
				device_id: deviceId
			});
	}

	const onClickVolume = () => {
		if (token) {
			spotifyApi
			.setVolume({
				volume_percent: isMute ? 100 : 0,
				device_id: deviceId
			});

			isMute = !isMute;
		}
	}
		
	window.onSpotifyWebPlaybackSDKReady = () => {
		
		const player = new Spotify.Player({ name: "Web Player", getOAuthToken: cb => { cb(token); }});

		// Playback status updates
		player.addListener('player_state_changed', state => {
			isSuffle = state.shuffle;
			isPlaying = !state.paused;
			isRepeat = state.repeat_mode > 0;

			if (isPlaying)
				requestMyCurrentTrack()
		});

		// Ready
		player.addListener('ready', ({ device_id }) => {
			deviceId = device_id;
			requestTransferMyPlayback(deviceId);
			requestMyCurrentTrack();
		});

		// Not Ready
		player.addListener('not_ready', ({ device_id }) => {
			deviceId = null;
		});

		// Connect to the player!
		player.connect();

		const authorizedUser = winVar.store.getState('authentication');

		if (authorizedUser) {
			token = authorizedUser.accessToken;
			spotifyApi.setAccessToken(token);
			
			winVar.bus.subscribe('play-user-playback', (context_uri) => {
				spotifyApi.play({device_id: deviceId, context_uri: context_uri});
			});
		}
	}
</script>

<main>
	<div class="player">
		<div class="player__track">
			<div class="track__img">
				{#if currentTrack.imgSrc}
					<img src={currentTrack.imgSrc} alt="" />
				{:else}
					<div>
					</div>
				{/if}
			</div>
			<div class="track__info">
				<span class="track__text track__text--primary"> {currentTrack.name} </span>
				<span class="track__text"> {currentTrack.artistName} </span>
			</div>
		</div>
		<div class="player__control">
			<div class="control__container">
				<i class="{
					isSuffle ? 
					'material-icons control__icon control__icon--active control__icon--small' 
					: 'material-icons control__icon control__icon--small'
					}"
					on:click={onClickSuffle}
				>
					shuffle
				</i>
				<i class="material-icons control__icon control__icon--small" on:click={onClickPrevious}>skip_previous</i>
				{#if !isPlaying}
					<i class="material-icons control__icon" on:click={onClickPauseOrPlay}>play_circle_outline</i>
				{:else}
					<i class="material-icons control__icon" on:click={onClickPauseOrPlay}>pause_circle_outline</i>
				{/if}
				<i class="material-icons control__icon control__icon--small" on:click={onClickNext}>skip_next</i>
				<i class="{
					isRepeat ? 
					'material-icons control__icon control__icon--active control__icon--small'
					: 'material-icons control__icon control__icon--small'
					}"
					on:click={onClickRepeat}
				>
					repeat
				</i>
			</div>
		</div>
		<div class="control__container">
			{#if !isMute}
				<i class="material-icons control__icon control__icon--small" on:click={onClickVolume}>volume_up</i>
			{:else}
				<i class="material-icons control__icon control__icon--small" on:click={onClickVolume}>volume_off</i>
			{/if}
		</div>
	</div>
</main>

<style>
.player {
	display: flex;
	justify-content: space-between;
    align-items: center;
    padding: 0px 8px 0px 8px;
    height: 100%;
	background-color: #282828;
}

.player__track {
	display: flex;
	justify-content: center;
	align-items: center;
}

.track__img img {
    width: 50px;
    height: 50px;
}

.track__img div {
	width: 50px;
	height: 50px;
	background-color: rgba(179, 179, 179, 0.4);
	display: flex;
	justify-content: center;
	align-items: center;
	color: #fff;
}

.track__info {
	display: flex;
	flex-direction: column;
	margin-left: 5px;
}

.track__text {
	font-family: 'Circular Std Book' !important;
	font-size: 10px;
	color: #b3b3b3;
	max-width: 100px;
    text-transform: unset;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.track__text--primary {
	font-size: 12px;
	color: #ffffff;
	margin-bottom: 5px;
}

.player__control {
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.control__container {
	display: flex;
	justify-content: center;
	align-items: center;
}

.control__icon {
	cursor: pointer;
    color: #b3b3b3;
	margin: 5px 15px 5px 15px;
	font-size: 2rem;
	-webkit-transition-property: color;
    transition-property: color;
    -webkit-transition-duration: .2s;
    transition-duration: .2s;
    -webkit-transition-timing-function: linear;
    transition-timing-function: linear;
}

.control__icon--active, .control__icon:hover {
    color: #fff;
}

.control__icon--small {
	font-size: 1rem;
}

</style>
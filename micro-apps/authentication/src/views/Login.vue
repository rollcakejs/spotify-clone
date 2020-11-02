<template>
  <div class="login">
    <notifications position="top right" />
    <div class="login__header">
      <a href="#">
        <img class="header__logo" src="../assets/logo.png" />
      </a>
    </div>
    <div class="login__content">
      <div class="content__container" v-on:click="onClickContinueWithSpotify">
        <RoundedButton
          :text="'continue with spotify'"
          class="content__btn btn--green"
        />
      </div>
      <div class="content__container" v-on:click="onClickMethodNotAvailable">
        <RoundedButton
          :text="'continue with phone number'"
          class="content__btn"
        />
      </div>
      <div class="content__container container__divider">
        <span class="divider__text">OR</span>
      </div>
      <div class="content__container" style="margin-top: 0px;">
        <BaseInput :type="'text'" :placeholder="'Email address or username'" />
      </div>
      <div class="content__container">
        <BaseInput :type="'password'" :placeholder="'Password'" />
      </div>
      <div class="content__container" style="justity-content: space-between;">
        <div style="width: 140%">
          <BaseCheckbox />
        </div>
        <div v-on:click="onClickMethodNotAvailable">
          <RoundedButton :text="'Log in'" class="btn--green" />
        </div>
      </div>
      <div class="content__container" style="margin-top: 20px;">
        <a
          class="container__text container__text--green"
          href="#"
          v-on:click="onClickMethodNotAvailable"
        >
          Forgot your password?
        </a>
      </div>
      <div class="content__container container__divider"></div>
      <div class="content__container">
        <span class="container__text">Don't have an account?</span>
      </div>
      <div class="content__container" v-on:click="onClickMethodNotAvailable">
        <RoundedButton :text="'sign up for spotify'" class="content__btn" />
      </div>
      <div class="content__container container__divider"></div>
      <div class="content__container">
        <span class="container__text container__text--small">
          If you click "Log in with Spotify" and are not a Spotify user, you
          will be registered and you agree to Spotify"s Terms & Conditions.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import SpotifyWebApi from "spotify-web-api-node";
import RoundedButton from "@/components/RoundedButton.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseCheckbox from "@/components/BaseCheckbox.vue";

export default {
  name: "Login",
  components: {
    RoundedButton,
    BaseInput,
    BaseCheckbox
  },
  methods: {
    onClickContinueWithSpotify: function() {
      const spotifyApi = new SpotifyWebApi({
        clientId: process.env.VUE_APP_CLIENT_ID,
        clientSecret: process.env.VUE_APP_CLIENT_SECRET,
        redirectUri: process.env.VUE_APP_REDIRECT_URI
      });

      const authorizeURL = spotifyApi.createAuthorizeURL(
        [
          "streaming", 
          "user-read-email", 
          "user-read-private", 
          "playlist-read-private",
          "user-read-currently-playing",
          "user-modify-playback-state"
        ],
        "authorize-micro-frontend-state",
        true,
        true
      ).replace('response_type=code', 'response_type=token');

      window.open(authorizeURL, "Continue With Spotify", "height=600,width=450");

      window.addEventListener("message", (message) => {
        const messageData = message.data;
        if (messageData.event && messageData.event === "authorized-user-callback") {
          if (window.RollCake) {
            window.RollCake.bus.publish("authorized-user-callback", messageData.data);
          }
          else {
            sessionStorage.setItem("authorizedUser", messageData.data);
          }
        }
      })
    },
    onClickMethodNotAvailable: function() {
      this.$notify({
        type: "error",
        title: "Error!",
        text: "You cannot execute this action, because it was not implemented."
      });
    }
  }
};
</script>

<style scoped>
.login {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login__header {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px;
  width: 100%;
  border-bottom: 1px solid #d9dadc;
}

.header__logo {
  width: 220px;
}

.login__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  margin-top: 20px;
}

.content__container {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.container__text {
  font-size: 14px;
  font-weight: bold;
  text-decoration: none;
}

.container__text--green {
  font-size: 12px;
  color: #1db954;
}

.container__text--green:hover {
  color: #1ed760;
}

.container__text--small {
  font-size: 10px;
  color: #c1c3c6;
  text-align: center;
}

.container__divider {
  border-top: 1px solid #d9dadc;
  display: block;
  line-height: 1px;
  margin: 20px;
  position: relative;
  text-align: center;
}

.divider__text {
  background: #fff;
  font-size: 12px;
  letter-spacing: 1px;
  padding: 0 20px;
  text-transform: uppercase;
}

.btn--green {
  color: #fff;
  background-color: #1db954;
  box-shadow: none;
}

.btn--green:hover {
  background-color: #1ed760;
}
</style>

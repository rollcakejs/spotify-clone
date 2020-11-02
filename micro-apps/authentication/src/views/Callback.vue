<template>
    <div></div>
</template>

<script>
export default {
  name: "Callback",
  mounted(){
    const URLParser = new URL(window.location.href);
    const URLSearchParamsParser =  new URLSearchParams(URLParser.hash.substring(1));

    const postMessageData = {
        event: "authorized-user-callback",
        data: {
            accessToken: URLSearchParamsParser.get("access_token"),
            expiresIn: URLSearchParamsParser.get("expires_in")
        }
    }

    window.opener.postMessage(postMessageData, "*");

    if (window.opener)
      window.close();
  }
};
</script>
import {
  appendEpisodeAudioDataToDOM,
  appendMovieAudioDataToDOM
} from './utils/appendAudioDataToDOM.js';

console.info('Disney+ UI Extension loaded');

(function(xhr) {

  const XHR = XMLHttpRequest.prototype;

  const open = XHR.open;
  const send = XHR.send;

  XHR.open = function(method, url) {
    this._method = method;
    this._url = url;
    this._requestHeaders = {};
    this._startTime = (new Date()).toISOString();

    return open.apply(this, arguments);
  };

  XHR.send = function() {

    this.addEventListener('load', function() {
      if(this._url) {
        if (
          this.responseType != 'blob' &&
          this.responseType != 'arraybuffer' &&
          this.responseText
        ) {
          try {
            if (this._url.indexOf("DmcEpisodes") > -1) {
              // handle episode metadata request
              const responseData = JSON.parse(this.responseText);
              const { videos: episodesResponseMetadata } = responseData?.data?.DmcEpisodes;

              if (episodesResponseMetadata.length > 0) {
                const episodesAudioData = episodesResponseMetadata.map((episode) => ({
                  'contentId': episode.contentId,
                  'audioTracks': episode?.mediaMetadata?.audioTracks
                }));

                appendEpisodeAudioDataToDOM(episodesAudioData);
              }
            } else if (this._url.indexOf("DmcVideoBundle") > -1) {
              // handle movie metadata request
              const responseData = JSON.parse(this.responseText);
              const { video: movieMetaData } = responseData?.data?.DmcVideoBundle;

              const movieAudioData = {
                'contentId': movieMetaData.contentId,
                'audioTracks': movieMetaData?.mediaMetadata?.audioTracks
              };

              appendMovieAudioDataToDOM(movieAudioData);
            }
          } catch(err) {
            console.log("Error in responseType try catch");
            console.log(err);
          }
        }

      }
    });
    return send.apply(this, arguments);
  };
})(XMLHttpRequest);

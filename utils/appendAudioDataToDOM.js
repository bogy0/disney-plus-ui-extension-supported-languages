import { waitForElement } from "./waitForElement.js";

export const appendEpisodeAudioDataToDOM = (episodesAudioData) => (
  episodesAudioData.forEach((videoAudioData) => {
    const availableAudioTracksForEpisode = videoAudioData.audioTracks.map(audioTrack => (
      audioTrack?.renditionName
    ));

    const node = document.createElement("div");
    node.className = 'text-color--secondary text--left';
    node.style.paddingTop = '10px';
    const textnode = document.createTextNode(`Audio: ${availableAudioTracksForEpisode.join(', ')}`);
    node.appendChild(textnode);

    waitForElement(`[data-gv2elementvalue="${videoAudioData.contentId}"] .metadata`).then((element) => {
      element.appendChild(node);
    });

  })
);

export const appendMovieAudioDataToDOM = (movieAudioData) => {
  const availableAudioTracksForMovie = movieAudioData.audioTracks.map(audioTrack => (
    audioTrack?.renditionName
  ));

  const node = document.createElement("div");
  node.className = 'text-color--secondary text--left body-copy';
  node.style.paddingTop = '10px';
  const textnode = document.createTextNode(`Audio: ${availableAudioTracksForMovie.join(', ')}`);
  node.appendChild(textnode);

  waitForElement('[data-gv2containerkey="contentMeta"]').then((element) => {
    element.appendChild(node);
  });
};

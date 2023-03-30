import React, { Component } from 'react';
import Hls from 'hls.js';

export default class HLSSource extends Component {
  constructor(props, context) {
    super(props, context);
    this.hls = new Hls();
  }

  componentDidMount() {
    const { src, video } = this.props;
    console.log("SRC", this.props);
    this.loadVideo(src, video);
  }

  componentDidUpdate(prevProps) {
    const { src, video } = this.props;
    if (src !== prevProps.src) {
        console.log("SRC", this.props);
        this.loadVideo(src, video);
    }
  }

  componentWillUnmount() {
    // destroy hls video source
    if (this.hls) {
      this.hls.destroy();
    }
  }

  loadVideo(src, video) {
    if (Hls.isSupported()) {
        this.hls.loadSource(src);
        this.hls.attachMedia(video);
        this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.play();
        });
    }
  }

  render() {
    return (
      <source
        src={this.props.src}
        type={this.props.type || 'application/x-mpegURL'}
      />
    );
  }
}

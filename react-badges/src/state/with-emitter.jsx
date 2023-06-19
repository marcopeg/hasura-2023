import { createContext, useContext } from "react";

const EmitterContext = createContext();

class Emitter {
  constructor() {
    this.listeners = {};
  }

  sub(channel, fn) {
    // Upsert the channel
    if (!this.listeners[channel]) {
      this.listeners[channel] = [];
    }

    // Subscribe
    const _channel = this.listeners[channel];
    _channel.push(fn);
    return () => _channel.splice(_channel.indexOf(fn), 1);
  }

  pub(channel, ...args) {
    const _channel = this.listeners[channel];
    if (!_channel) return;
    _channel.forEach((fn) => fn(...args));
  }
}

const withEmitter = (Component) => (props) => {
  return (
    <EmitterContext.Provider value={new Emitter()}>
      <Component {...props} />
    </EmitterContext.Provider>
  );
};

export const useEmitter = () => useContext(EmitterContext);

export default withEmitter;

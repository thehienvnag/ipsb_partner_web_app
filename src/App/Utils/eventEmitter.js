import EventEmitter from "events";

var eventEmitter = new EventEmitter();

const Emitter = {
  // Event listener
  on: (event, fn) => eventEmitter.on(event, fn),
  // One time event listener
  once: (event, fn) => eventEmitter.once(event, fn),
  // Remove event
  off: (event, fn) => eventEmitter.off(event, fn),
  // Emit event
  emit: (event, payload) => eventEmitter.emit(event, payload),
};
Object.freeze(Emitter);

export default Emitter;

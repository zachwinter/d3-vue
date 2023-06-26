import * as ease from 'd3-ease';

export function pause(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let _instances: Timer[] = [];
let _running = false;

export class Timer {
  duration: number;
  method: (params: { progress: number; stop: () => void }) => void;
  easing: (normalizedTime: number) => number;
  start: number;
  complete: boolean;
  resolve?: () => void;

  constructor(
    duration: number,
    method: (params: { progress: number; stop: () => void }) => void,
    easing = ease.easeQuadOut,
    resolve?: () => void
  ) {
    this.duration = duration;
    this.method = method;
    this.easing = easing;
    this.start = performance.now();
    this.complete = false;
    this.resolve = resolve;
  }

  tick() {
    if (this.complete) return;
    const elapsed = performance.now() - this.start;
    const progress = this.easing(
      Math.max(Math.min(elapsed / this.duration, 1), 0)
    );
    this.method({ progress, stop: this.stop.bind(this) });
    if (progress === 1 && typeof this.resolve === 'function') this.stop();
  }

  stop() {
    this.complete = true;
    if (this.resolve) this.resolve();
  }
}

function _tick() {
  _instances.forEach(instance => instance.tick());
  _instances = _instances.filter(instance => instance.complete === false);
  if (_instances.length) {
    requestAnimationFrame(_tick);
  } else {
    _running = false;
  }
}

export function timer(
  duration: number,
  method: (params: { progress: number; stop: () => void }) => void,
  easing = ease.easeQuadOut
): Promise<void> {
  if (!_running) {
    requestAnimationFrame(_tick);
    _running = true;
  }

  return new Promise(resolve => {
    const tween = new Timer(duration, method, easing, resolve);
    _instances.push(tween);
  });
}

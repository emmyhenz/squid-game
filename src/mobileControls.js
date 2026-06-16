/**
 * On-screen touch controls for mobile devices: an analog joystick that drives
 * movement direction and a dedicated RUN button that triggers the sprint
 * (shift) input. The joystick writes directly into the shared controls input
 * object that ThirdPersonControls reads every frame.
 */

const DEAD_ZONE = 0.25; // ignore tiny joystick nudges
const RUN_THRESHOLD = 0.85; // push the stick this far to auto-run

class MobileControls {
  constructor(controls) {
    this.controls = controls;
    this.input = controls.input;

    this.base = document.getElementById('joystick');
    this.thumb = document.getElementById('joystick-thumb');
    this.runBtn = document.getElementById('run-btn');
    this.container = document.getElementById('mobile-controls');

    this.pointerId = null;
    this.center = { x: 0, y: 0 };
    this.radius = 60;
    this.joystickRun = false;
    this.buttonRun = false;

    if (this.base && this.thumb && this.runBtn) {
      this.show();
      this.bindJoystick();
      this.bindRunButton();
    }
  }

  show() {
    if (this.container) this.container.classList.add('visible');
  }

  bindJoystick() {
    this.base.addEventListener('pointerdown', (e) => this.onStart(e));
    this.base.addEventListener('pointermove', (e) => this.onMove(e));
    this.base.addEventListener('pointerup', (e) => this.onEnd(e));
    this.base.addEventListener('pointercancel', (e) => this.onEnd(e));
    this.base.addEventListener('lostpointercapture', (e) => this.onEnd(e));
  }

  bindRunButton() {
    const press = (e) => {
      e.preventDefault();
      this.buttonRun = true;
      this.runBtn.classList.add('active');
      this.applyRun();
    };
    const release = (e) => {
      e.preventDefault();
      this.buttonRun = false;
      this.runBtn.classList.remove('active');
      this.applyRun();
    };
    this.runBtn.addEventListener('pointerdown', press);
    this.runBtn.addEventListener('pointerup', release);
    this.runBtn.addEventListener('pointercancel', release);
    this.runBtn.addEventListener('pointerleave', release);
  }

  onStart(event) {
    event.preventDefault();
    this.pointerId = event.pointerId;
    this.base.setPointerCapture(event.pointerId);
    const rect = this.base.getBoundingClientRect();
    this.center = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    this.radius = rect.width / 2;
    this.onMove(event);
  }

  onMove(event) {
    if (this.pointerId !== event.pointerId) return;
    event.preventDefault();

    let dx = event.clientX - this.center.x;
    let dy = event.clientY - this.center.y;
    const distance = Math.hypot(dx, dy);

    if (distance > this.radius) {
      dx = (dx / distance) * this.radius;
      dy = (dy / distance) * this.radius;
    }

    this.thumb.style.transform = `translate(${dx}px, ${dy}px)`;

    const nx = dx / this.radius;
    const ny = dy / this.radius;
    const magnitude = Math.min(distance / this.radius, 1);

    this.input.forward = ny < -DEAD_ZONE;
    this.input.backward = ny > DEAD_ZONE;
    this.input.left = nx < -DEAD_ZONE;
    this.input.right = nx > DEAD_ZONE;

    this.joystickRun = magnitude > RUN_THRESHOLD;
    this.applyRun();
  }

  onEnd(event) {
    if (this.pointerId !== event.pointerId) return;
    this.pointerId = null;
    this.thumb.style.transform = 'translate(0px, 0px)';
    this.input.forward = false;
    this.input.backward = false;
    this.input.left = false;
    this.input.right = false;
    this.joystickRun = false;
    this.applyRun();
  }

  applyRun() {
    this.input.shift = this.buttonRun || this.joystickRun;
  }
}

export { MobileControls };

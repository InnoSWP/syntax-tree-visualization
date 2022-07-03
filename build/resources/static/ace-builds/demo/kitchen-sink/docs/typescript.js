"use strict";
class Greeter {
    greeting;
    constructor(message) {
        this.greeting = message;
    }
    greet() {
        return "Hello, " + this.greeting;
    }
}
var greeter = new Greeter("world");
var button = document.createElement('button');
button.innerText = "Say Hello";
button.onclick = function () {
    alert(greeter.greet());
};
document.body.appendChild(button);
class Snake extends Animal {
    move() {
        alert("Slithering...");
        super(5);
    }
}
class Horse extends Animal {
    move() {
        alert("Galloping...");
        super.move(45);
    }
}
var Sayings;
(function (Sayings) {
    class Greeter {
        greeting;
        constructor(message) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }
    Sayings.Greeter = Greeter;
})(Sayings || (Sayings = {}));
var Mankala;
(function (Mankala) {
    class Features {
        turnContinues = false;
        seedStoredCount = 0;
        capturedCount = 0;
        spaceCaptured = NoSpace;
        clear() {
            this.turnContinues = false;
            this.seedStoredCount = 0;
            this.capturedCount = 0;
            this.spaceCaptured = NoSpace;
        }
        toString() {
            var stringBuilder = "";
            if (this.turnContinues) {
                stringBuilder += " turn continues,";
            }
            stringBuilder += " stores " + this.seedStoredCount;
            if (this.capturedCount > 0) {
                stringBuilder += " captures " + this.capturedCount + " from space " + this.spaceCaptured;
            }
            return stringBuilder;
        }
    }
    Mankala.Features = Features;
})(Mankala || (Mankala = {}));

var SparkTypeRacer =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
/**
 * Created by Grimbode on 21/11/2017.
 */
var app_1 = __webpack_require__(1);
var module;
/**
 * Created by kfaulhaber on 30/06/2017.
 */
/**
 * Binding library to exports
 * @type {App}
 */
module.exports = app_1.App;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var game_service_1 = __webpack_require__(2);
var config_1 = __webpack_require__(4);
var App = /** @class */ (function () {
    function App(options) {
        for (var prop in config_1.CONFIG) {
            if (!config_1.CONFIG.hasOwnProperty(prop) || !options.hasOwnProperty(prop) || options.hasOwnProperty(prop) === null) {
                console.warn("Required parameteres missing.");
                return;
            }
        }
        this.gameService = new game_service_1.GameService("let's make this a super long text and see if it works any better! :D let's make this a super long text and see if it works any better! :D let's make this a super long text and see if it works any better! :D", options.canvas);
    }
    return App;
}());
exports.App = App;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
var key_time_entity_1 = __webpack_require__(3);
/**
 * Created by Grimbode on 22/11/2017.
 */
var GameService = /** @class */ (function () {
    function GameService(text, canvas) {
        var _this = this;
        this.text = text;
        this.canvas = canvas;
        this.position = 0;
        this.error = false;
        this.proof = [];
        this.gameKeyHandler = function (e) {
            //Get date of keypressed
            var time = new Date();
            var charCode = e.which;
            //TODO: Might need to handle special character codes. For now, no one cares.
            switch (true) {
                case charCode === 8 || charCode === 46:
                    //todo: delete a key
                    console.warn("Delete key detected");
                    break;
                case (charCode >= 48 && charCode <= 90) ||
                    (charCode >= 106 && charCode <= 111) ||
                    (charCode >= 187 || charCode <= 222):
                    _this.gameLogic(e.which, time);
                    break;
                default:
                    console.warn(charCode + " not accepted.");
            }
        };
        this.ctx = canvas.getContext("2d");
        //TODO: Make size dynamic
        this.ctx.font = "30px Arial";
        this.bindKeys();
    }
    GameService.prototype.bindKeys = function () {
        //Capturing event at the start for maximal precision
        window.addEventListener("keypress", this.gameKeyHandler, true);
    };
    GameService.prototype.unbindKeys = function () {
        //Removing key events in case of cheating or game done.
        window.removeEventListener("keydown", this.gameKeyHandler, true);
    };
    GameService.prototype.gameLogic = function (charCode, time) {
        //COnvert code to character.
        var char = String.fromCharCode(charCode);
        //reset any previous variables
        this.error = false;
        //If the position isn't somewhere within the text.
        if (this.position > this.text.length - 1 || this.position < 0) {
            //TODO: Throw error.
            return;
        }
        //If the character pressed is not the character expected.
        if (this.text[this.position] !== char) {
            //TODO: Throw error.
            this.proof.push(new key_time_entity_1.KeyTime(char, time, false));
            this.error = true;
            this.predraw(10, 30, 30);
            console.log("Error detected", this.text[this.position], char);
            return;
        }
        //Here we assume the key pressed was correct.
        this.proof.push(new key_time_entity_1.KeyTime(char, time, true));
        this.position++;
        this.predraw(10, 30, 30);
        if (this.isDone()) {
            //TODO: Done with game, save results.
            console.log("Congratulations game is done");
            this.unbindKeys();
        }
    };
    GameService.prototype.draw = function (line, x, y) {
        //Calculate what has already been written.
        var done = line.slice(0, this.position);
        //Calculate what is left to write
        var todo = line.slice(this.position);
        this.ctx.fillStyle = "green";
        this.ctx.fillText(done, x, y);
        if (this.error === true) {
            this.ctx.fillStyle = "red";
            var wrongChar = line.slice(this.position, this.position + 1);
            this.ctx.fillText(wrongChar, x + this.ctx.measureText(done).width, y);
            //recalculating todo
            todo = line.slice(this.position + 1);
            done += wrongChar;
        }
        x += this.ctx.measureText(done).width;
        this.ctx.fillStyle = "black";
        this.ctx.fillText(todo, x, y);
    };
    GameService.prototype.predraw = function (x, y, lineHeight) {
        var _this = this;
        //Clear whole rect.
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        var line = "";
        this.text.split(' ').forEach(function (value, index) {
            var temp = (line + " " + value).trim();
            //If the size of the text is bigger than the width of the canvas.
            if (_this.ctx.measureText(temp).width >= _this.canvas.width) {
                _this.draw(line, x, y);
                line = "";
                //Update y
                y += lineHeight;
            }
            else {
                line = temp;
            }
        });
        //When done, check to see if there isn't a few words left.
        if (line != "") {
            this.draw(line, x, y);
        }
    };
    GameService.prototype.isDone = function () {
        return this.position === this.text.length;
    };
    return GameService;
}());
exports.GameService = GameService;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by Grimbode on 22/11/2017.
 */
exports.__esModule = true;
var KeyTime = /** @class */ (function () {
    function KeyTime(key, time, correct) {
        this.key = key;
        this.time = time;
        this.correct = correct;
    }
    return KeyTime;
}());
exports.KeyTime = KeyTime;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Created by Grimbode on 22/11/2017.
 */
exports.__esModule = true;
//All configurations possible for the game.
exports.CONFIG = {
    canvas: null
};


/***/ })
/******/ ]);
//# sourceMappingURL=spark_type_racer.js.map
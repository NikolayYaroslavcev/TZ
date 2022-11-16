!function (s) {
    var i = {};

    function r(t) {
        if (i[t]) return i[t].exports;
        var e = i[t] = {i: t, l: !1, exports: {}};
        return s[t].call(e.exports, e, e.exports, r), e.l = !0, e.exports
    }

    r.m = s, r.c = i, r.d = function (t, e, s) {
        r.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: s})
    }, r.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, r.t = function (e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var s = Object.create(null);
        if (r.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) r.d(s, i, function (t) {
            return e[t]
        }.bind(null, i));
        return s
    }, r.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return r.d(e, "a", e), e
    }, r.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, r.p = "", r(r.s = 0)
}([function (t, e, s) {
    "use strict";
    s.r(e);

    function r() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2)
    }

    function n(t, e = "", s) {
        let i = t.split(e).map(t => t.trim()).filter(t => !!t);
        return s && (i = [i.shift(), i.join(e)].filter(t => !!t)), i
    }

    function o(t, e = "", s = "") {
        let i = t.trim();
        return i.startsWith(e) || (i = e + i), i.endsWith(s) || (i += s), i
    }

    class h {
        constructor(...t) {
            this.available = {}, t.forEach(t => this.available[t] = [])
        }

        addEvents(...t) {
            t.forEach(t => this.available[t] = [])
        }

        addListener(t, e) {
            if (!this.available[t]) return console.error(`event: ${t} is not available`);
            this.available[t].push(e)
        }

        removeListener(e, s) {
            if (!this.available[e]) return console.error(`event: ${e} is not available`);
            for (let t = this.available[e].length - 1; 0 <= t; t--) this.available[e][t] === s && this.available[e].splice(t, 1)
        }

        notifyListeners(t, ...e) {
            this.available[t].forEach(t => t(...e))
        }
    }

    function a(t, e) {
        (t = Array.isArray(t) ? t : [t]).forEach(t => {
            e[t] = e[t].bind(e)
        })
    }

    function u(t, e, s, i, r) {
        "string" == typeof s && i ? (a(s, i), t[e] = i[s]) : t[e] = s, r && t[e]()
    }

    class i {
        constructor() {
            this.resizableElements = {}
        }

        callAfterResize(t, e, s, i) {
            u(this.resizableElements, t, e, s, i)
        }

        stopCallingAfterResize(t) {
            delete this.resizableElements[t]
        }

        resize() {
            for (const t in this.resizableElements) this.resizableElements[t]()
        }
    }

    class c {
        constructor() {
            this.window = new i, this.supports = {
                webp: function () {
                    const t = document.createElement("canvas");
                    return !(!t.getContext || !t.getContext("2d")) && 0 == t.toDataURL("image/webp").indexOf("data:image/webp")
                }(), mobile: /Mobi|Android/i.test(navigator.userAgent)
            }, this.pixelRatio = window.devicePixelRatio, addEventListener("resize", function (e) {
                let s;
                return (...t) => {
                    clearTimeout(s), s = setTimeout(() => e(t), 300)
                }
            }(this.resize.bind(this))), this.resize()
        }

        resize() {
            this.window.resize()
        }
    }

    function l(t, e) {
        let s = 0;
        for (; s += t.offsetTop || 0, (t = t.offsetParent) && t !== e;) ;
        return s
    }

    function g(t, e) {
        let s = 0;
        for (; s += t.offsetLeft || 0, (t = t.offsetParent) && t !== e;) ;
        return s
    }

    var p = new c;

    class d {
        constructor(t) {
            this.html = t, this.size = {x: 0, y: 0}
        }

        resize() {
            this.size.x = this.html.offsetWidth, this.size.y = this.html.offsetHeight
        }
    }

    class S extends d {
        constructor(t) {
            super(t), this.position = {x: 0, y: 0}
        }

        resize() {
            super.resize(), this.position.x = g(this.html), this.position.y = l(this.html)
        }
    }

    function b(t, e = ["top", "bottom"], s) {
        const i = t.getBoundingClientRect()[s], r = window.getComputedStyle(t);
        return e.map(t => parseInt(r["margin-" + t]), 10).reduce((t, e) => t + e, i)
    }

    class f extends d {
        constructor(t) {
            super(t)
        }

        resize() {
            var t;
            this.size.x = (t = this.html, b(t, ["left", "right"], "width")), this.size.y = (t = this.html, b(t, ["top", "bottom"], "height"))
        }
    }

    var m = {
        AbsoluteBox: S, AbsoluteBoxWithMargins: class extends f {
            constructor(t) {
                super(t), this.position = {x: 0, y: 0}
            }

            resize() {
                super.resize(), this.position.x = g(this.html), this.position.y = l(this.html)
            }
        }, RelativeBox: class extends d {
            constructor(t) {
                super(t), this.position = {x: 0, y: 0}
            }

            resize() {
                super.resize(), this.position.x = this.html.offsetLeft, this.position.y = this.html.offsetTop
            }
        }, ScreenBox: class extends d {
            constructor(t) {
                super(t), this.position = {x: 0, y: 0}
            }

            resize() {
                var t = this.html.getBoundingClientRect();
                this.size.x = t.width, this.size.y = t.height, this.position.x = t.left, this.position.y = t.top
            }
        }, SizeBox: d, SizeBoxWithMargins: f
    };

    class v {
        constructor(t, e, s = {}, i = {}) {
            this.id = r(), this.html = t, this.name = e, this.box = null, this.events = new h, this.defaultSettings = {resizeObserver: !1, ...s}, this.possibleSettings = i, this.currentSettings = null, this.previousSettings = null, this.prepareSettings(), this.resize = this.resize.bind(this)
        }

        listenResize() {
            p.window.callAfterResize(this.id, this.resize, null, !0)
        }

        resize() {
            this.checkMedias(), this.box && (this.box.resize(), this.currentSettings.showXSize && this.currentSettings.target.style.setProperty("--x-size", this.box.size.x + "px"), this.currentSettings.showYSize && this.currentSettings.target.style.setProperty("--y-size", this.box.size.y + "px"), this.currentSettings.showXPosition && this.box.position && this.currentSettings.target.style.setProperty("--y-position", this.box.position.y + "px"), this.currentSettings.showYPosition && this.box.position && this.currentSettings.target.style.setProperty("--x-position", this.box.position.x + "px"))
        }

        onMediaChange() {
            !this.currentSettings.box || !m[this.currentSettings.box] || this.box instanceof m[this.currentSettings.box] || (this.box = new m[this.currentSettings.box](this.html)), this.currentSettings.resizeObserver && !this.resizeObserver ? (this.resizeObserver = new ResizeObserver(this.resize), this.resizeObserver.observe(this.html)) : this.currentSettings.disabled && this.previousSettings.resizeObserver && this.resizeObserver && (this.resizeObserver.unobserve(this.html), this.resizeObserver = null)
        }

        prepareSettings() {
            if (this.html.hasAttribute("data-settings")) {
                var t = v.parseOptions(this.html);
                for (const s in t) {
                    var e = t[s];
                    this.possibleSettings[s] ? this.possibleSettings[s] = {...this.defaultSettings, ...this.possibleSettings[s], ...e} : this.possibleSettings[s] = {...this.defaultSettings, ...e}
                }
            } else if (Object.keys(this.possibleSettings).length) for (const i in this.possibleSettings) this.possibleSettings[o(i, "(", ")")] = {...this.defaultSettings, ...this.possibleSettings[i]}; else this.possibleSettings = {"(min-width: 0px)": {...this.defaultSettings}}
        }

        checkMedias() {
            let t;
            for (const e in this.possibleSettings) window.matchMedia(e).matches && (t = {mediaString: e, ...this.possibleSettings[e]});
            t ? this.previousSettings && this.previousSettings.mediaString === t.mediaString || (this.currentSettings = t, this.onMediaChange()) : (this.currentSettings = {mediaString: "(min-width: 0px)", ...this.defaultSettings}, this.onMediaChange()), this.previousSettings = this.currentSettings
        }

        static parseOptions(s) {
            if (s.hasAttribute("data-settings")) {
                const t = s.getAttribute("data-settings"), i = {};
                return n(t, "}").forEach(t => {
                    const e = t.split("{").map(t => t.trim());
                    2 === e.length && (e[0] = e[0] && o(e[0], "(", ")") || "(min-width: 0px)", i[e[0]] = {}, n(e[1], ",").forEach(t => {
                        t = n(t, ":=");
                        1 !== t.length ? isNaN(t[1]) ? "false" !== t[1] ? "target" !== t[0] ? isNaN(t[1]) && (i[e[0]][t[0]] = t[1]) : i[e[0]][t[0]] = document.querySelector(t[1]) || s : i[e[0]][t[0]] = !1 : i[e[0]][t[0]] = +t[1] : i[e[0]][t[0]] = !0
                    }), i[e[0]].target = i[e[0]].target || s)
                }), i
            }
        }
    }

    function w(t, e = 1, s = 0) {
        return Math.max(s, Math.min(t, e))
    }

    var x = new class {
        constructor() {
            this.frameId = null, this.updatable = {}, this.removeTimeouts = {}, this.length = 0, this.update = this.update.bind(this)
        }

        update(t) {
            for (const e in this.updatable) this.updatable[e](t);
            0 < this.length && (this.frameId = requestAnimationFrame(this.update))
        }

        add(t, e, s, i) {
            if (!i || !this.updatable[t]) {
                if (u(this.updatable, t, e, s), this.removeTimeouts[t] && clearTimeout(this.removeTimeouts[t]), 0 === this.length) return this.length++, void this.run();
                this.length++
            }
        }

        remove(t) {
            this.updatable[t] && (delete this.updatable[t], this.length = Math.max(0, this.length - 1), 0 === this.length && this.stop())
        }

        removeAfterDelay(t, e, s = 2e3) {
            this.updatable[t] && (this.removeTimeouts[t] = setTimeout(() => {
                this.remove(t), e && e(), delete this.removeTimeouts[t]
            }, s))
        }

        run() {
            this.stop(), this.frameId = requestAnimationFrame(this.update)
        }

        stop() {
            cancelAnimationFrame(this.frameId)
        }
    };

    function y(t, e, s) {
        return (1 - s) * t + s * e
    }

    class L {
        constructor(t, e, s) {
            this.pageId = t, this.root = e, this.structure = s, this.currentSettings = null, this.scrollValue = {
                current: 0,
                currentL: 0,
                stopsDependent: 0,
                stopsDependentL: 0
            }, this.progress = {
                current: 0,
                currentL: 0,
                stopsDependent: 0,
                stopsDependentL: 0
            }, this.passedStopsLength = 0, x.add("force" + this.pageId, "tick", this)
        }

        updateSettings(t) {
            this.currentSettings = t
        }

        resize() {
            this.set(this.progress.current * this.structure.scrollLength.withStops)
        }

        push(t, e = this.currentSettings.speed) {
            this.updateValues(t * e)
        }

        set(t) {
            this.scrollValue.current = 0, this.push(t, 1)
        }

        updateValues(t) {
            this.scrollValue.current = w(this.scrollValue.current + t, this.structure.scrollLength.withStops || 0);
            t = this.structure.checkStops(this.scrollValue);
            this.passedStopsLength = this.currentSettings.smooth ? this.structure.getStopsPassedLength() : 0, this.scrollValue.stopsDependent = t ? t.track.start - this.passedStopsLength : this.scrollValue.current - this.passedStopsLength, this.progress.current = this.scrollValue.current / this.structure.scrollLength.withStops, this.progress.stopsDependent = this.scrollValue.stopsDependent / this.structure.scrollLength.withStops
        }

        lerpValues() {
            this.scrollValue.currentL = +y(this.scrollValue.currentL, this.scrollValue.current, this.currentSettings.ease).toFixed(5), this.progress.currentL = +(this.scrollValue.currentL / this.structure.scrollLength.withStops).toFixed(5), this.scrollValue.stopsDependentL = +y(this.scrollValue.stopsDependentL, this.scrollValue.stopsDependent, this.currentSettings.ease).toFixed(5), this.progress.stopsDependentL = +(this.scrollValue.stopsDependentL / this.structure.scrollLength.withStops).toFixed(5)
        }

        tick() {
            this.lerpValues(), this.currentSettings.smooth ? (this.currentSettings.progress && this.structure.showProgress(this.progress.currentL), this.structure.moveSections(this.currentSettings.axis, this.scrollValue.stopsDependentL, this.structure.viewportSize)) : (this.progress.current = +this.progress.current.toFixed(5), this.currentSettings.progress && this.structure.showProgress(this.progress.current)), this.structure.checkParts(this.structure.paths, this.scrollValue), this.structure.checkParts(this.structure.imageTriggers, this.scrollValue), this.structure.checkParts(this.structure.classTriggers, this.scrollValue), this.structure.checkParts(this.structure.attributeTriggers, this.scrollValue), this.structure.checkParts(this.structure.styleTriggers, this.scrollValue), this.structure.checkParts(this.structure.toggleTriggers, this.scrollValue)
        }
    }

    class k extends v {
        constructor(t, e) {
            super(t, e, {box: "AbsoluteBoxWithMargins"}), this.inView = !1, this.events.addEvents("inView", "outOfView")
        }

        clear() {
            this.html.style.transform = ""
        }

        calculateTranslation(t, e, s) {
            var i = this.box.position[t], t = this.box.position[t] + this.box.size[t];
            let r = 0;
            return t < e ? r = t : i - s < e && (r = i + (e - i)), Math.floor(e) > i - s && Math.floor(e) < t ? this.in() : this.out(), r
        }

        in() {
            this.name && !this.inView && (this.inView = !0, this.events.notifyListeners("inView"))
        }

        out() {
            this.name && this.inView && (this.inView = !1, this.events.notifyListeners("outOfView"))
        }

        move(t, e, s) {
            s = -1 * this.calculateTranslation(t, e, s);
            this.html.style.transform = "y" === t ? `translate3d(0px, ${s}px, 0px)` : `translate3d(${s}px, 0px, 0px)`
        }
    }

    class z extends v {
        constructor(t, e, s, i = {}) {
            super(t, e, {
                box: "AbsoluteBox",
                length: 1,
                offset: 0,
                align: 0,
                scrollValueType: "stopsDependentL",
                target: t, ...i
            }), this.structure = s, this.track = {
                start: 0,
                length: 0,
                finish: 0
            }, this.active = !1, this.elementInView = !1, this.loaded = !1, this.scrollValue = 0, this.events.addEvents("start", "finish")
        }

        onDisable(t) {
        }

        onLoad() {
        }

        onMediaChange() {
            super.onMediaChange(), this.currentSettings.disabled && this.previousSettings ? this.onDisable(this.previousSettings) : !this.currentSettings.disabled && this.previousSettings && this.previousSettings.disabled && this.onLoad()
        }

        resize() {
            super.resize(), this.currentSettings.disabled || (this.track.start = this.getTrackStart(), this.track.length = this.getTrackLength(), this.track.finish = this.getTrackFinish(), this.loaded || (this.onLoad(), this.loaded = !0))
        }

        getStartOffset() {
            return {
                screenOffset: this.currentSettings.offset * this.structure.viewportSize,
                screenAlign: this.currentSettings.align ? (this.structure.viewportSize - this.box.size[this.structure.currentSettings.axis]) * this.currentSettings.align * -1 : 0
            }
        }

        getTrackStart() {
            var {screenOffset: t, screenAlign: e} = this.getStartOffset();
            return this.box.position[this.structure.currentSettings.axis] + t + e - this.structure.viewportSize
        }

        getTrackLength() {
            return this.currentSettings.length * this.structure.viewportSize + this.box.size[this.structure.currentSettings.axis]
        }

        getTrackFinish() {
            return this.track.start + this.track.length
        }

        check(t) {
            if (!this.currentSettings.disabled) {
                this.scrollValue = t[this.currentSettings.scrollValueType];
                var {start: e, finish: t} = this.track;
                return this.scrollValue < e ? this.onStart() : this.scrollValue >= t && this.onFinish(), this.scrollValue > e && this.scrollValue < t ? this.onProcess() : void 0
            }
        }

        onStart() {
            this.active && this.onStartOnce()
        }

        onFinish() {
            this.active && this.onFinishOnce()
        }

        onStartOnce() {
            this.onEnd(), this.events.notifyListeners("finish")
        }

        onFinishOnce() {
            this.onEnd(), this.events.notifyListeners("finish")
        }

        onEnd() {
            this.active = !1
        }

        onProcess() {
            this.active || this.onProcessOnce()
        }

        onProcessOnce() {
            this.active = !0, this.events.notifyListeners("start")
        }
    }

    class V extends z {
        constructor(t, e, s, i = {}) {
            super(t, e, s, {
                progress: !1,
                progressChunks: !1,
                breakpoints: !1,
                variable: !1,
                variableName: "--progress",
                ease: 0, ...i
            }), this.progress = {current: 0, lerped: 0, currentN: 0, lerpedN: 0}, this.breakpoints = {
                previous: null,
                current: null
            }, this.events.addEvents("progress", "breakpoints")
        }

        onLoad() {
            this.lerpProgress()
        }

        onEnd() {
            super.onEnd(), x.removeAfterDelay(this.id, null, 4e3)
        }

        onProcessOnce() {
            super.onProcessOnce(), this.currentSettings.progress && x.add(this.id, "lerpProgress", this)
        }

        lerpProgress() {
            var t;
            if (this.progress.current = w(this.scrollValue - this.track.start, this.track.length), this.progress.currentN = this.progress.current / this.track.length, this.progress.lerped = +y(this.progress.lerped, this.progress.current, this.currentSettings.ease || this.structure.currentSettings.ease).toFixed(5), this.progress.lerpedN = +(this.progress.lerped / this.track.length).toFixed(5), this.currentSettings.variable && this.currentSettings.target.style.setProperty(this.currentSettings.variableName, this.progress.lerpedN), this.currentSettings.breakpoints && (t = Math.round(+(this.progress.current / (this.track.length / this.currentSettings.breakpoints)).toFixed(6)), this.currentSettings.target.setAttribute("data-breakpoint", t), this.currentSettings.target.setAttribute("data-breakpointp1", t + 1), this.currentSettings.target.style.setProperty("--breakpoint", t), this.currentSettings.target.style.setProperty("--breakpointp1", t + 1), t === this.currentSettings.breakpoints ? (this.currentSettings.target.style.setProperty("--last-breakpoint", 1), this.currentSettings.target.setAttribute("data-last-breakpoint", !0)) : (this.currentSettings.target.style.setProperty("--last-breakpoint", 0), this.currentSettings.target.setAttribute("data-last-breakpoint", !1)), this.events.available.breakpoints.length && (this.breakpoints.current = t, this.breakpoints.current !== this.breakpoints.previous && this.events.notifyListeners("breakpoints", {breakpoints: this.breakpoints}), this.breakpoints.previous = this.breakpoints.current)), this.currentSettings.progressChunks) for (let t = 0; t < this.currentSettings.progressChunks; t++) {
                var e = 1 / this.currentSettings.progressChunks, s = e * t, e = w((this.progress.lerpedN - s) / e);
                this.currentSettings.target.style.setProperty("--progress-" + (t + 1), e)
            }
            this.events.notifyListeners("progress", {progress: this.progress})
        }

        onDisable(t) {
            x.remove(this.id), t.target.style.removeProperty(t.variableName)
        }
    }

    class P extends V {
        constructor(t, e, s) {
            super(t, e, s, {length: 0, scrollValueType: "current"}), this.passed = 0, this.previousStopsLength = 0
        }

        getTrackStart() {
            var {screenOffset: t, screenAlign: e} = this.getStartOffset();
            return this.box.position[this.structure.currentSettings.axis] + this.previousStopsLength + t + e
        }

        getTrackLength() {
            return this.currentSettings.length ? this.currentSettings.length * this.structure.viewportSize : this.box.size[this.structure.currentSettings.axis]
        }

        resize(t) {
            this.previousStopsLength = t, super.resize(), this.passed = this.passed ? this.track.length : 0
        }

        onStartOnce() {
            super.onStartOnce(), this.passed = 0
        }

        onFinishOnce() {
            super.onFinishOnce(), this.passed = this.track.length
        }

        onProcessOnce() {
            super.onProcessOnce(), this.passed = 0
        }

        onProcess() {
            return super.onProcess(), this
        }
    }

    class O extends V {
        constructor(t, e, s) {
            super(t, e, s, {variable: !0, progress: !0})
        }

        getTrackStart() {
            var {screenOffset: t, screenAlign: e} = this.getStartOffset();
            return this.box.position[this.structure.currentSettings.axis] + t + e - this.structure.viewportSize
        }

        getTrackLength() {
            return this.currentSettings.length * this.structure.viewportSize + this.box.size[this.structure.currentSettings.axis]
        }
    }

    class T extends z {
        constructor(t, e, s) {
            super(t, e, s, {
                image: null,
                x: null,
                webp: !1,
                offset: -1
            }), this.events.addEvents("loadImage"), this.prepare()
        }

        prepare() {
            var i = this.possibleSettings, r = e => {
                if (e.image && (e.x || e.webp)) {
                    const s = e.image.lastIndexOf("."), i = e.image.slice(s + 1);
                    let t = e.image.slice(0, s);
                    if (e.x) {
                        const s = splitTrimFilter(e.x, "/"), i = s.find(t => t == c.pixelRatio);
                        t += i ? "@" + i + "x" : "@" + s[s.length - 1] + "x"
                    }
                    e.webp && c.supports.webp ? e.image = t + ".webp" : e.image = `${t}.${i}`
                }
            };
            "object" != typeof i ? console.error(i + ": not iterable") : Array.isArray(i) ? i.forEach((t, e, s) => r(t)) : Object.keys(i).map((t, e, s) => r(i[t]))
        }

        check(t) {
            var e, s;
            this.disabled || this.active || (e = t[this.currentSettings.scrollValueType], {
                start: s,
                finish: t
            } = this.track, s < e && e < t && (this.loadImage(), this.active = !0))
        }

        onMediaChange() {
            super.onMediaChange(), this.previousSettings && this.currentSettings.image !== this.previousSettings.image && this.active && this.loadImage()
        }

        loadImage() {
            "IMG" === this.currentSettings.target.tagName ? this.currentSettings.target.src = this.currentSettings.image : this.currentSettings.target.style.backgroundImage = `url(${this.currentSettings.image})`, this.events.notifyListeners("loadImage", {image: this.currentSettings.image})
        }

        onDisable(t) {
            "IMG" === t.target.tagName ? t.target.src = "#" : t.target.style.backgroundImage = ""
        }
    }

    class I extends z {
        constructor(t, e, s, i) {
            super(t, e, s, {keep: !1, permanent: !1, ...i}), this.events.addEvents("in", "out")
        }

        onLoad() {
            this.toggleOut()
        }

        onStartOnce() {
            this.currentSettings.permanent || (this.active = !1, this.toggleOut())
        }

        onFinishOnce() {
            this.currentSettings.permanent || this.currentSettings.keep || (this.active = !1, this.toggleOut())
        }

        onProcessOnce() {
            super.onProcessOnce(), this.toggleIn()
        }

        toggleIn() {
            this.events.notifyListeners("in")
        }

        toggleOut() {
            this.events.notifyListeners("out")
        }
    }

    class D extends I {
        constructor(t, e, s) {
            super(t, e, s, {inClass: "in-view", outClass: "out-view"})
        }

        toggleIn() {
            super.toggleIn(), this.currentSettings.target.classList.add(this.currentSettings.inClass), this.currentSettings.outClass && this.currentSettings.target.classList.remove(this.currentSettings.outClass)
        }

        toggleOut() {
            super.toggleOut(), this.currentSettings.target.classList.remove(this.currentSettings.inClass), this.currentSettings.outClass && this.currentSettings.target.classList.add(this.currentSettings.outClass)
        }

        onDisable(t) {
            t.target.classList.remove(t.inClass), t.target.classList.remove(t.outClass)
        }
    }

    class E extends I {
        constructor(t, e, s) {
            super(t, e, s, {attribute: "data-in-view", inData: !0, outData: !1})
        }

        toggleIn() {
            super.toggleIn(), this.currentSettings.target.setAttribute(this.currentSettings.attribute, this.currentSettings.inData)
        }

        toggleOut() {
            super.toggleOut(), this.currentSettings.target.setAttribute(this.currentSettings.attribute, this.currentSettings.outData)
        }

        onDisable(t) {
            t.target.removeAttribute(t.attribute)
        }
    }

    class M extends I {
        constructor(t, e, s) {
            super(t, e, s, {property: "--in-view", inValue: 1, outValue: 0})
        }

        toggleIn() {
            super.toggleIn(), this.currentSettings.target.style.setProperty(this.currentSettings.property, this.currentSettings.inValue)
        }

        toggleOut() {
            super.toggleIn(), this.currentSettings.target.style.setProperty(this.currentSettings.property, this.currentSettings.outValue)
        }

        onDisable(t) {
            t.target.style.removeProperty(t.property)
        }
    }

    class A {
        constructor(t, e) {
            this.pageId = t, this.root = e, this.currentSettings = null, this.scrollLength = {
                withStops: 0,
                withoutStops: 0
            }, this.viewportSize = 0, this.findParts()
        }

        findPart(t, e, s) {
            const i = [...this.root.querySelectorAll(`[${e}]`)];
            this[t] = s ? i.map(t => new s(t, t.getAttribute(e), this)) : i
        }

        findParts() {
            this.findPart("sections", "data-section", k), this.findPart("stops", "data-stop", P), this.findPart("paths", "data-path", O), this.findPart("imageTriggers", "data-image-trigger", T), this.findPart("classTriggers", "data-class-trigger", D), this.findPart("attributeTriggers", "data-attribute-trigger", E), this.findPart("styleTriggers", "data-style-trigger", M), this.findPart("toggleTriggers", "data-toggle-trigger", I), this.findPart("elements", "data-element", v), this.findPart("wheelDeadZones", "data-wheel-dead-zone"), this.findPart("dragDeadZones", "data-drag-dead-zone"), this.sections.length || console.error("page must have at least one section")
        }

        updateSettings(t) {
            this.currentSettings = t
        }

        updateScrollLength() {
            this.scrollLength.withoutStops = this.sections.reduce((t, e) => "y" === this.currentSettings.axis ? t + e.box.size.y : t + e.box.size.x, 0) - this.viewportSize, this.scrollLength.withStops = this.stops.reduce((t, e) => t + e.track.length, 0) + this.scrollLength.withoutStops
        }

        updateViewportSize() {
            "y" === this.currentSettings.axis ? this.viewportSize = this.root.offsetHeight : this.viewportSize = this.root.offsetWidth
        }

        resizeStops() {
            let i = 0;
            this.stops.forEach((t, e, s) => {
                i += s[e - 1] ? s[e - 1].track.length : 0, t.resize(i)
            })
        }

        resizeParts(t) {
            t.forEach(t => t.resize())
        }

        checkParts(t, e) {
            t.forEach(t => t.check(e))
        }

        checkStops(e) {
            return this.stops.find(t => t.check(e))
        }

        getStopsPassedLength() {
            return this.stops.reduce((t, e) => t + e.passed, 0)
        }

        resize() {
            this.updateViewportSize(), this.resizeParts(this.sections), this.resizeStops(), this.resizeParts(this.imageTriggers), this.resizeParts(this.classTriggers), this.resizeParts(this.attributeTriggers), this.resizeParts(this.styleTriggers), this.resizeParts(this.toggleTriggers), this.resizeParts(this.paths), this.resizeParts(this.elements), this.updateScrollLength()
        }

        clearSections() {
            this.sections.forEach(t => t.clear())
        }

        moveSections(...e) {
            this.sections.forEach(t => t.move(...e))
        }

        showProgress(t) {
            this.root.style.setProperty("--page-progress", t)
        }

        checkWheelDeadZone(e) {
            return this.wheelDeadZones.find(t => t.contains(e))
        }

        checkDragDeadZone(e) {
            return this.dragDeadZones.find(t => t.contains(e))
        }
    }

    function C(e, t, s, i = {}) {
        const r = n(t, " ").map(t => (e.addEventListener(t, s, i), () => e.removeEventListener(t, s, i)));
        return () => r.forEach(t => t())
    }

    class F {
        constructor(t, e, s, i, r) {
            this.root = e, this.force = i, this.structure = s, this.currentSettings = r, a(["onWheel"], this)
        }

        listen() {
            this.removeWheelListeners = C(this.root, "wheel", this.onWheel)
        }

        unlisten() {
            this.removeWheelListeners()
        }

        onWheel(t) {
            this.structure.checkWheelDeadZone(t.target) || this.force.push(t.deltaY * this.currentSettings.direction)
        }
    }

    class W {
        constructor(t, e, s, i, r) {
            a(["wheel", "updateWheel"], this), this.pageId = t, this.root = e, this.structure = s, this.force = i, this.currentSettings = r, this.wheelValue = {
                current: 0,
                currentL: 0,
                delta: 0
            }
        }

        listen() {
            this.root.addEventListener("wheel", this.wheel)
        }

        unlisten() {
            this.root.removeEventListener("wheel", this.wheel), x.remove("wheel" + this.pageId)
        }

        wheel(t) {
            this.structure.checkWheelDeadZone(t.target) || (x.add("wheel" + this.pageId, this.updateWheel, null, !0), this.wheelValue.delta = Math.abs(Math.min(t.deltaY, 100)), this.wheelValue.current = w(t.deltaY, 1, -1) * this.currentSettings.direction)
        }

        updateWheel() {
            this.wheelValue.current *= .7, this.wheelValue.current = this.wheelValue.current, this.wheelValue.currentL = y(this.wheelValue.currentL, this.wheelValue.current, .1);
            var t = Math.abs(this.wheelValue.currentL) * (this.wheelValue.delta * this.wheelValue.currentL);
            this.force.push(t), this.wheelValue.current.toFixed(5) === this.wheelValue.currentL.toFixed(5) && (x.remove("wheel" + this.pageId), this.wheelValue.current = this.wheelValue.currentL = 0)
        }
    }

    class N {
        constructor(t, e, s, i) {
            this.root = e, this.force = i, this.structure = s, this.bar = null, this.knob = null, this.findParts(), this.partsFound && (a("grab", this), this.isVertical = !1, this.length = 0)
        }

        findParts() {
            return this.bar = document.querySelector("[data-scrollbar]"), this.knob = document.querySelector("[data-scrollbar-knob]"), this.bar ? this.knob ? (this.partsFound = !0, void this.structure.dragDeadZones.push(this.knob)) : console.error("scrollbar: knob not found") : console.error("scrollbar: bar not found")
        }

        listen() {
            this.partsFound && (this.removeGrabListeners = C(this.knob, "mousedown touchstart", this.grab, {passive: !1}), p.window.callAfterResize("scrollbar", "resize", this, !0))
        }

        unlisten() {
            this.partsFound && this.removeGrabListeners && (this.removeGrabListeners(), p.window.stopCallingAfterResize("scrollbar"))
        }

        grab(t) {
            t.preventDefault();
            const s = "touchstart" === t.type,
                i = this.force.scrollValue.current / this.structure.scrollLength.withStops * this.length;
            let r;
            this.root.classList.add("grabbing"), r = this.isVertical ? (s ? t.touches[0] : t).clientY : (s ? t.touches[0] : t).clientX;
            const e = C(this.root, "mousemove touchmove", t => {
                var e = this.isVertical ? (s ? t.touches[0] : t).clientY : (s ? t.touches[0] : t).clientX,
                    e = w(i + (e - r), this.length);
                this.force.set(e / this.length * this.structure.scrollLength.withStops)
            }), n = C(this.root, "mouseup touchend", () => {
                e(), n(), this.root.classList.remove("grabbing")
            })
        }

        resize() {
            var t, e;
            this.partsFound && (this.isVertical = this.bar.offsetHeight > this.bar.offsetWidth, t = Math.max(this.bar.offsetHeight, this.bar.offsetWidth), e = Math.max(this.knob.offsetHeight, this.knob.offsetWidth), this.length = t === e ? t : t - e)
        }
    }

    class R {
        constructor(t, e, s, i, r) {
            this.root = e, this.force = i, this.structure = s, this.currentSettings = r, a(["keys"], this)
        }

        listen() {
            addEventListener("keydown", this.keys)
        }

        unlisten() {
            removeEventListener("keydown", this.keys)
        }

        keys(t) {
            " " === t.key ? t.shiftKey ? this.force.push(-this.currentSettings.spaceValue) : this.force.push(this.currentSettings.spaceValue) : "ArrowDown" === t.key || "ArrowRight" === t.key || "PageDown" === t.key ? this.force.push(this.currentSettings.arrowsValue * this.currentSettings.direction) : "ArrowUp" === t.key || "ArrowLeft" === t.key || "PageUp" === t.key ? this.force.push(-this.currentSettings.arrowsValue * this.currentSettings.direction) : "Home" === t.key ? this.force.set(0) : "End" === t.key && this.force.set(this.structure.scrollLength.withStops)
        }
    }

    class B {
        constructor(t, e, s, i, r) {
            this.root = e, this.force = i, this.structure = s, this.currentSettings = r, this.grab = this.grab.bind(this), this.manipulators = {
                mouse: !1,
                touch: !1
            }
        }

        listen() {
            this.listenTouch(), this.currentSettings.mouseDrag && this.listenMouse()
        }

        unlisten() {
            this.unlistenTouch(), this.unlistenMouse()
        }

        listenMouse() {
            this.root.addEventListener("mousedown", this.grab), this.manipulators.mouse = !0
        }

        unlistenMouse() {
            this.root.removeEventListener("mousedown", this.grab), this.manipulators.mouse = !1
        }

        listenTouch() {
            this.root.addEventListener("touchstart", this.grab), this.manipulators.touch = !0
        }

        unlistenTouch() {
            this.root.removeEventListener("touchstart", this.grab), this.manipulators.touch = !1
        }

        onNewSettings(t) {
            !t.mouseDrag && this.manipulators.mouse ? this.unlistenMouse() : t.mouseDrag && !this.manipulators.mouse && this.listenMouse()
        }

        grab(t) {
            if (!this.structure.checkDragDeadZone(t.target)) {
                const n = "touchstart" === t.type;
                "IMG" === t.target.tagName && t.preventDefault(), this.root.classList.add("grabbing");
                const o = this.force.scrollValue.current;
                let i = (n ? t.touches[0] : t).clientX, r = (n ? t.touches[0] : t).clientY;
                const e = C(this.root, "mousemove touchmove", t => {
                    t.cancelable && t.preventDefault();
                    var e = (n ? t.touches[0] : t).clientX, s = (n ? t.touches[0] : t).clientY, t = i - e, e = r - s,
                        s = Math.abs(t) > Math.abs(e) ? t : e, s = Math.sign(s),
                        e = Math.sqrt(t * t + e * e) * s * this.currentSettings.direction,
                        s = 1 + Math.abs(e) / this.structure.viewportSize * this.currentSettings.dragAcceleration,
                        s = o + e * this.currentSettings.speed * s;
                    this.force.set(s)
                }, {passive: !1}), s = C(this.root, "mouseup touchend", () => {
                    e(), s(), this.root.classList.remove("grabbing")
                })
            }
        }
    }

    var j = {
        // linear: t => t,
        // easeInQuad: t => t * t,
        // easeOutQuad: t => t * (2 - t),
        // easeInOutQuad: t => t < .5 ? 2 * t * t : (4 - 2 * t) * t - 1,
        // easeInCubic: t => t * t * t,
        // easeOutCubic: t => --t * t * t + 1,
        // easeInOutCubic: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
        // easeInQuart: t => t * t * t * t,
        // easeOutQuart: t => 1 - --t * t * t * t,
        // easeInOutQuart: t => t < .5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
        // easeInQuint: t => t * t * t * t * t,
        // easeOutQuint: t => 1 + --t * t * t * t * t,
        // easeInOutQuint: t => t < .5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
        // easeInExpo: t => 0 === t ? 0 : 2 ** (10 * (t - 1)),
        // easeOutExpo: t => 1 === t ? 1 : 1 - 2 ** (-10 * t),
        easeInOutExpo: t => 0 === t || 1 === t ? t : t < .5 ? .5 * 2 ** (20 * (t - .5)) : .5 * (2 - Math.abs(2 ** (-20 * (t - .5))))
    };

    class $ extends v {
        constructor(t, e, s, i, r) {
            super(e, null, {
                offset: 0,
                align: 0,
                duration: 1e3,
                easing: "easeInOutExpo",
                target: s
            }), this.pageId = t, this.root = s, this.structure = i, this.force = r, this.moveTo = 0, this.html.addEventListener("click", this.onClick.bind(this))
        }

        onMediaChange() {
            this.previousSettings && this.currentSettings.target === this.previousSettings.target || (this.currentSettings.target = new S(this.currentSettings.target))
        }

        resize() {
            super.resize(), this.currentSettings.target.resize();
            const e = this.currentSettings.target.position[this.structure.currentSettings.axis];
            this.moveTo = e, this.structure.stops.forEach(t => {
                t.box.position[[this.structure.currentSettings.axis]] < e && (this.moveTo += t.track.length)
            }), this.moveTo += this.currentSettings.offset * this.structure.viewportSize
        }

        scrollPage(t) {
            this.root.scrollTo("x" === this.structure.currentSettings.axis ? t : 0, "y" === this.structure.currentSettings.axis ? t : 0)
        }

        onClick() {
            const e = Date.now(), s = this.force.scrollValue.current,
                i = (this.currentSettings.distance ? s + this.currentSettings.distance * this.structure.viewportSize : this.moveTo) - s,
                r = t => {
                    x.remove("nav-button" + this.pageId), n()
                }, n = C(window, "wheel mousedown touchstart", r);
            x.add("nav-button" + this.pageId, () => {
                var t = (Date.now() - e) / this.currentSettings.duration;
                if (1 <= (t = j[this.currentSettings.easing](t))) {
                    r();
                    const e = s + i;
                    return this.force.set(e), void (this.structure.currentSettings.smooth || this.scrollPage(e))
                }
                t = s + t * i;
                this.force.set(t), this.structure.currentSettings.smooth || this.scrollPage(t)
            })
        }
    }

    class Z {
        constructor(t, e, s, i) {
            this.root = e, this.force = i, this.scroll = this.scroll.bind(this)
        }

        listen() {
            this.root.addEventListener("scroll", this.scroll)
        }

        unlisten() {
            this.root.removeEventListener("scroll", this.scroll)
        }

        scroll() {
            this.force.set(this.root.scrollTop)
        }
    }

    class q {
        constructor(t, e, s, i) {
            this.pageId = t, this.root = e, this.structure = s, this.force = i, this.currentSettings = null, this.wheel = null, this.smoothWheel = null, this.scrollbar = null, this.keys = null, this.drag = null, this.buttons = null, this.default = !1, this.findButtons()
        }

        findButtons() {
            this.buttons = [...document.querySelectorAll("[data-nav-button]")].map(t => new $(this.pageId, t, this.root, this.structure, this.force, this.currentSettings))
        }

        toggle(t, e) {
            this.currentSettings[t] && !this[t] ? (this[t] = new e(this.pageId, this.root, this.structure, this.force, this.currentSettings), this[t].listen()) : !this.currentSettings[t] && this[t] ? (this[t].unlisten(), this[t] = null) : this.currentSettings[t] && this[t] && (this[t].currentSettings = this.currentSettings, this[t].onNewSettings && this[t].onNewSettings(this.currentSettings))
        }

        resize() {
            this.buttons && this.buttons.forEach(t => t.resize())
        }

        updateSettings(t) {
            t && (this.currentSettings = t, this.currentSettings.default = !this.currentSettings.smooth, this.toggle("smoothWheel", W), this.toggle("wheel", F), this.toggle("scrollbar", N), this.toggle("keys", R), this.toggle("drag", B), this.toggle("default", Z))
        }
    }

    var Q = class extends v {
        constructor(t, e = {}, s = {}) {
            super(t, null, {
                axis: "y",
                smooth: !0,
                ease: .2,
                speed: 1,
                dragAcceleration: 1,
                progress: e.progress || e.scrollbar,
                wheel: !1,
                smoothWheel: !1,
                scrollbar: !1,
                keys: !1,
                direction: 1,
                arrowsValue: 50,
                spaceValue: 100,
                drag: !0,
                mouseDrag: !1, ...e
            }, s), this.pageId = r(), this.structure = new A(this.pageId, this.html), this.force = new L(this.pageId, this.html, this.structure), this.controls = new q(this.pageId, this.html, this.structure, this.force), this.listenResize()
        }

        onMediaChange() {
            super.onMediaChange(), this.currentSettings.smooth || this.structure.clearSections(), this.structure.updateSettings(this.currentSettings), this.force.updateSettings(this.currentSettings), this.controls.updateSettings(this.currentSettings)
        }

        resize() {
            super.resize(), this.structure.resize(), this.controls.resize(), this.force.resize()
        }

        addListener(t, e, s, i) {
            e || console.error("fail to add listener: no name"), s || console.error(`addListener ${e}: no event name`), i || console.error(`addListener ${e}: no callback`);
            const r = this.structure[t].find(t => t.name === e);
            r || console.error(`addListener ${e}: part not found`), r && r.events.addListener(s, i)
        }

        // addClassTriggerListener(t, e, s) {
        //     this.addListener("classTriggers", t, e, s)
        // }
        //
        // addImageTriggerListener(t, e, s) {
        //     this.addListener("imageTriggers", t, e, s)
        // }
        //
        // addStyleTriggerListener(t, e, s) {
        //     this.addListener("styleTriggers", t, e, s)
        // }
        //
        // addAttributeTriggerListener(t, e, s) {
        //     this.addListener("attributeTriggers", t, e, s)
        // }
        //
        // addToggleTriggerListener(t, e, s) {
        //     this.addListener("toggleTriggers", t, e, s)
        // }
        //
        // addStopListener(t, e, s) {
        //     this.addListener("stops", t, e, s)
        // }
        //
        // addPathListener(t, e, s) {
        //     this.addListener("paths", t, e, s)
        // }
        //
        // addSectionListener(t, e, s) {
        //     this.addListener("sections", t, e, s)
        // }
    };
    addEventListener("DOMContentLoaded", () => {
        new Q(document.querySelector(".page"), {
            smoothWheel: !0,
            speed: 3,
            ease: .1,
            keys: !0,
            mouseDrag: !0,
            progress: !1
        })
    })
}]);
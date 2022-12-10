// blaze-slider v1.9.0 by Manan Tank
var BlazeSlider = (function () {
  "use strict";
  const t = "start";
  function e(t, e, n) {
    (t.stateIndex = 0),
      (function (t) {
        const { slidesToScroll: e, slidesToShow: n } = t.config,
          { totalSlides: i, config: s } = t;
        if (
          (i < n && (s.slidesToShow = i),
          !(i <= n) && (e > n && (s.slidesToScroll = n), i < e + n))
        ) {
          const t = i - n;
          s.slidesToScroll = t;
        }
      })(t),
      (t.isStatic = e <= n.slidesToShow),
      (t.states = (function (t) {
        const { totalSlides: e } = t,
          { loop: n } = t.config,
          i = (function (t) {
            const { slidesToShow: e, slidesToScroll: n, loop: i } = t.config,
              { isStatic: s, totalSlides: o } = t,
              r = [],
              a = o - 1;
            for (let t = 0; t < o; t += n) {
              const n = t + e - 1;
              if (n > a) {
                if (!i) {
                  const t = a - e + 1,
                    n = r.length - 1;
                  (0 === r.length || (r.length > 0 && r[n][0] !== t)) &&
                    r.push([t, a]);
                  break;
                }
                {
                  const e = n - o;
                  r.push([t, e]);
                }
              } else r.push([t, n]);
              if (s) break;
            }
            return r;
          })(t),
          s = [],
          o = i.length - 1;
        for (let t = 0; t < i.length; t++) {
          let r, a;
          n
            ? ((r = t === o ? 0 : t + 1), (a = 0 === t ? o : t - 1))
            : ((r = t === o ? o : t + 1), (a = 0 === t ? 0 : t - 1));
          const l = i[t][0],
            c = i[r][0],
            d = i[a][0];
          let u = c - l;
          c < l && (u += e);
          let f = l - d;
          d > l && (f += e),
            s.push({
              page: i[t],
              next: { stateIndex: r, moveSlides: u },
              prev: { stateIndex: a, moveSlides: f },
            });
        }
        return s;
      })(t));
  }
  function n(t) {
    (t.offset = -1 * t.states[t.stateIndex].page[0]), i(t);
  }
  function i(t) {
    const { track: e, offset: n, dragged: i } = t;
    e.style.transform =
      0 === n
        ? `translate3d(${i}px,0px,0px)`
        : `translate3d(  calc( ${i}px + ${n} * (var(--slide-width) + ${t.config.slideGap})),0px,0px)`;
  }
  function s(t) {
    t.track.style.transitionDuration = `${t.config.transitionDuration}ms`;
  }
  function o(t) {
    t.track.style.transitionDuration = "0ms";
  }
  const r = () => "ontouchstart" in window;
  function a(t) {
    const e = this,
      n = e.slider;
    if (!n.isTransitioning) {
      if (
        ((n.dragged = 0),
        (e.isScrolled = !1),
        (e.startMouseClientX =
          "touches" in t ? t.touches[0].clientX : t.clientX),
        !("touches" in t))
      ) {
        (t.target || e).setPointerCapture(t.pointerId);
      }
      o(n), u(e, "addEventListener");
    }
  }
  function l(t) {
    const e = this,
      n = "touches" in t ? t.touches[0].clientX : t.clientX,
      s = (e.slider.dragged = n - e.startMouseClientX),
      o = Math.abs(s);
    o > 5 && (e.slider.isDragging = !0),
      o > 15 && t.preventDefault(),
      (e.slider.dragged = s),
      i(e.slider),
      !e.isScrolled &&
        e.slider.config.loop &&
        s > 10 &&
        ((e.isScrolled = !0), e.slider.prev());
  }
  function c() {
    const t = this,
      e = t.slider.dragged;
    (t.slider.isDragging = !1),
      u(t, "removeEventListener"),
      (t.slider.dragged = 0),
      i(t.slider),
      s(t.slider),
      t.isScrolled || (e < -10 ? t.slider.next() : e > 10 && t.slider.prev());
  }
  const d = (t) => t.preventDefault();
  function u(t, e) {
    t[e]("contextmenu", c),
      r()
        ? (t[e]("touchend", c), t[e]("touchmove", l))
        : (t[e]("pointerup", c), t[e]("pointermove", l));
  }
  const f = {
    slideGap: "20px",
    slidesToScroll: 1,
    slidesToShow: 1,
    loop: !0,
    enableAutoplay: !1,
    stopAutoplayOnInteraction: !0,
    autoplayInterval: 3e3,
    autoplayDirection: "to left",
    enablePagination: !0,
    transitionDuration: 300,
    transitionTimingFunction: "ease",
    draggable: !0,
  };
  function h(t) {
    const e = { ...f };
    for (const n in t)
      if (window.matchMedia(n).matches) {
        const i = t[n];
        for (const t in i) e[t] = i[t];
      }
    return e;
  }
  function g() {
    const t = this.index,
      e = this.slider,
      n = e.stateIndex,
      i = e.config.loop,
      s = Math.abs(t - n),
      o = e.states.length - s,
      r = s > e.states.length / 2 && i;
    t > n ? (r ? e.prev(o) : e.next(s)) : r ? e.next(o) : e.prev(s);
  }
  function p(t) {
    if (t.onSlideCbs) {
      const e = t.states[t.stateIndex],
        [n, i] = e.page;
      t.onSlideCbs.forEach((e) => e(t.stateIndex, n, i));
    }
  }
  function v(t, e = t.config.transitionDuration) {
    (t.isTransitioning = !0),
      setTimeout(() => {
        t.isTransitioning = !1;
      }, e);
  }
  function S(e, n) {
    const i = e.el.classList,
      s = e.stateIndex,
      o = e.paginationButtons;
    e.config.loop ||
      (0 === s ? i.add(t) : i.remove(t),
      s === e.states.length - 1 ? i.add("end") : i.remove("end")),
      o &&
        e.config.enablePagination &&
        (o[n].classList.remove("active"), o[s].classList.add("active"));
  }
  function m(n, s) {
    const o = s.track;
    (s.slides = o.children),
      (s.offset = 0),
      (s.config = n),
      e(s, s.totalSlides, n),
      n.loop || s.el.classList.add(t),
      n.enableAutoplay && !n.loop && (n.enableAutoplay = !1),
      (o.style.transitionProperty = "transform"),
      (o.style.transitionTimingFunction = s.config.transitionTimingFunction),
      (o.style.transitionDuration = `${s.config.transitionDuration}ms`);
    const { slidesToShow: l, slideGap: c } = s.config;
    s.el.style.setProperty("--slides-to-show", l + ""),
      s.el.style.setProperty("--slide-gap", c),
      s.isStatic
        ? s.el.classList.add("static")
        : n.draggable &&
          (function (t) {
            const e = t.track;
            e.slider = t;
            const n = r() ? "touchstart" : "pointerdown";
            e.addEventListener(n, a),
              e.addEventListener("click", (e) => {
                (t.isTransitioning || t.isDragging) && e.preventDefault();
              }),
              e.addEventListener("dragstart", d);
          })(s),
      (function (t) {
        if (!t.config.enablePagination || t.isStatic) return;
        const e = t.el.querySelector(".blaze-pagination");
        if (!e) return;
        t.paginationButtons = [];
        const n = t.states.length;
        for (let i = 0; i < n; i++) {
          const s = document.createElement("button");
          t.paginationButtons.push(s),
            (s.textContent = 1 + i + ""),
            (s.ariaLabel = `${i + 1} of ${n}`),
            e.append(s),
            (s.slider = t),
            (s.index = i),
            (s.onclick = g);
        }
        t.paginationButtons[0].classList.add("active");
      })(s),
      (function (t) {
        const e = t.config;
        if (!e.enableAutoplay) return;
        const n = "to left" === e.autoplayDirection ? "next" : "prev";
        (t.autoplayTimer = setInterval(() => {
          t[n]();
        }, e.autoplayInterval)),
          e.stopAutoplayOnInteraction &&
            t.el.addEventListener(
              r() ? "touchstart" : "mousedown",
              () => {
                clearInterval(t.autoplayTimer);
              },
              { once: !0 }
            );
      })(s),
      (function (t) {
        const e = t.el.querySelector(".blaze-prev"),
          n = t.el.querySelector(".blaze-next");
        e &&
          (e.onclick = () => {
            t.prev();
          }),
          n &&
            (n.onclick = () => {
              t.next();
            });
      })(s),
      i(s);
  }
  return class extends class {
    constructor(t, n) {
      (this.config = n),
        (this.totalSlides = t),
        (this.isTransitioning = !1),
        e(this, t, n);
    }
    next(t = 1) {
      if (this.isTransitioning || this.isStatic) return;
      const { stateIndex: e } = this;
      let n = 0,
        i = e;
      for (let e = 0; e < t; e++) {
        const t = this.states[i];
        (n += t.next.moveSlides), (i = t.next.stateIndex);
      }
      return i !== e ? ((this.stateIndex = i), [e, n]) : void 0;
    }
    prev(t = 1) {
      if (this.isTransitioning || this.isStatic) return;
      const { stateIndex: e } = this;
      let n = 0,
        i = e;
      for (let e = 0; e < t; e++) {
        const t = this.states[i];
        (n += t.prev.moveSlides), (i = t.prev.stateIndex);
      }
      return i !== e ? ((this.stateIndex = i), [e, n]) : void 0;
    }
  } {
    constructor(t, e) {
      const n = t.querySelector(".blaze-track"),
        i = n.children,
        s = e ? h(e) : { ...f };
      super(i.length, s),
        (this.config = s),
        (this.el = t),
        (this.track = n),
        (this.slides = i),
        (this.offset = 0),
        (this.dragged = 0),
        (this.isDragging = !1),
        (this.el.blazeSlider = this),
        (this.passedConfig = e);
      const o = this;
      (n.slider = o), m(s, o);
      let r = !1,
        a = 0;
      window.addEventListener("resize", () => {
        if (0 === a) return void (a = window.innerWidth);
        const t = window.innerWidth;
        a !== t &&
          ((a = t),
          r ||
            ((r = !0),
            setTimeout(() => {
              o.refresh(), (r = !1);
            }, 200)));
      });
    }
    next(t) {
      if (this.isTransitioning) return;
      const e = super.next(t);
      if (!e) return;
      const [r, a] = e;
      S(this, r),
        v(this),
        (function (t, e) {
          const r = requestAnimationFrame;
          t.config.loop
            ? ((t.offset = -1 * e),
              i(t),
              setTimeout(() => {
                !(function (t, e) {
                  for (let n = 0; n < e; n++) t.track.append(t.slides[0]);
                })(t, e),
                  o(t),
                  (t.offset = 0),
                  i(t),
                  r(() => {
                    r(() => {
                      s(t), p(t);
                    });
                  });
              }, t.config.transitionDuration))
            : n(t);
        })(this, a);
    }
    prev(t) {
      if (this.isTransitioning) return;
      const e = super.prev(t);
      if (!e) return;
      const [a, l] = e;
      S(this, a),
        v(this),
        (function (t, e) {
          const a = requestAnimationFrame;
          if (t.config.loop) {
            o(t),
              (t.offset = -1 * e),
              i(t),
              (function (t, e) {
                const n = t.slides.length;
                for (let i = 0; i < e; i++) {
                  const e = t.slides[n - 1];
                  t.track.prepend(e);
                }
              })(t, e);
            const n = () => {
              a(() => {
                s(t),
                  a(() => {
                    (t.offset = 0), i(t), p(t);
                  });
              });
            };
            t.isDragging
              ? r()
                ? t.track.addEventListener("touchend", n, { once: !0 })
                : t.track.addEventListener("pointerup", n, { once: !0 })
              : a(n);
          } else n(t);
        })(this, l);
    }
    stopAutoplay() {
      clearInterval(this.autoplayTimer);
    }
    destroy() {
      this.track.removeEventListener(r() ? "touchstart" : "pointerdown", a),
        this.stopAutoplay(),
        this.paginationButtons?.forEach((t) => t.remove()),
        this.el.classList.remove("static"),
        this.el.classList.remove(t);
    }
    refresh() {
      const t = this.passedConfig ? h(this.passedConfig) : { ...f };
      this.destroy(), m(t, this);
    }
    onSlide(t) {
      return (
        this.onSlideCbs || (this.onSlideCbs = new Set()),
        this.onSlideCbs.add(t),
        () => this.onSlideCbs.delete(t)
      );
    }
  };
})();

const el = document.querySelector(".blaze-slider");
new BlazeSlider(el, {
  all: {
    enablePagination: true,
    enableAutoplay: true,
    autoplayInterval: 3000,
    transitionDuration: 500,
  },
});

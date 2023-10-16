import {
  d as S,
  r as W,
  o as he,
  a as j,
  c as pe,
  b as v,
  w as Ie,
  t as Ae,
  F as Ce,
  e as Te,
  __tla as Be,
} from "./index-3e11ce89.js";
let O,
  xe = Promise.all([
    (() => {
      try {
        return Be;
      } catch { }
    })(),
  ]).then(async () => {
    const Y = "/mandelbrot/assets/wasm_mandelbrot_bg-65dc9887.wasm",
      X = async (l = {}, a) => {
        let d;
        if (a.startsWith("data:")) {
          const o = a.replace(/^data:.*?base64,/, "");
          let f;
          if (typeof Buffer == "function" && typeof Buffer.from == "function")
            f = Buffer.from(o, "base64");
          else if (typeof atob == "function") {
            const r = atob(o);
            f = new Uint8Array(r.length);
            for (let _ = 0; _ < r.length; _++) f[_] = r.charCodeAt(_);
          } else throw new Error("Cannot decode base64-encoded data URL");
          d = await WebAssembly.instantiate(f, l);
        } else {
          const o = await fetch(a),
            f = o.headers.get("Content-Type") || "";
          if (
            "instantiateStreaming" in WebAssembly &&
            f.startsWith("application/wasm")
          )
            d = await WebAssembly.instantiateStreaming(o, l);
          else {
            const r = await o.arrayBuffer();
            d = await WebAssembly.instantiate(r, l);
          }
        }
        return d.instance.exports;
      };
    let b;
    function q(l) {
      b = l;
    }
    const z =
      typeof TextDecoder > "u"
        ? (0, module.require)("util").TextDecoder
        : TextDecoder;
    let k = new z("utf-8", { ignoreBOM: !0, fatal: !0 });
    k.decode();
    let I = null;
    function E() {
      return (
        (I === null || I.byteLength === 0) &&
        (I = new Uint8Array(b.memory.buffer)),
        I
      );
    }
    function F(l, a) {
      return (l = l >>> 0), k.decode(E().subarray(l, l + a));
    }
    let A = null;
    function M() {
      return (
        (A === null || A.byteLength === 0) &&
        (A = new Int32Array(b.memory.buffer)),
        A
      );
    }
    function H(l, a) {
      return (l = l >>> 0), E().subarray(l / 1, l / 1 + a);
    }
    function V(l, a, d, o, f, r, _, h) {
      try {
        const y = b.__wbindgen_add_to_stack_pointer(-16);
        b.calculate_array(y, l, a, d, o, f, r, _, h);
        var C = M()[y / 4 + 0],
          w = M()[y / 4 + 1],
          L = H(C, w).slice();
        return b.__wbindgen_free(C, w * 1), L;
      } finally {
        b.__wbindgen_add_to_stack_pointer(16);
      }
    }
    function G(l, a) {
      alert(F(l, a));
    }
    URL = globalThis.URL;
    const g = await X(
      { "./wasm_mandelbrot_bg.js": { __wbg_alert_e99cde255edfe1a8: G } },
      Y,
    ),
      J = g.memory,
      K = g.test_array,
      N = g.calculate_array,
      Q = g.is_mandelbrot,
      Z = g.greet,
      $ = g.__wbindgen_add_to_stack_pointer,
      ee = g.__wbindgen_free,
      te = Object.freeze(
        Object.defineProperty(
          {
            __proto__: null,
            __wbindgen_add_to_stack_pointer: $,
            __wbindgen_free: ee,
            calculate_array: N,
            greet: Z,
            is_mandelbrot: Q,
            memory: J,
            test_array: K,
          },
          Symbol.toStringTag,
          { value: "Module" },
        ),
      );
    q(te);
    const ne = { id: "container" },
      ae = ["onMousedown"],
      le = { class: "controls-container" },
      re = { id: "ui-controls" },
      s = 2e3,
      c = 1e3,
      oe = S({
        __name: "Mandelbrot",
        setup(l) {
          const a = W(null),
            d = W(null);
          let o = [0, 0],
            f = [0, 0],
            r = [s / c, 1],
            _ = [s / c, 1];
          const h = W(100),
            C = new ImageData(new Uint8ClampedArray(s * c * 4), s, c);
          let w = null;
          function L() {
            return a.value === null
              ? [0, 0]
              : [a.value.width / 2, a.value.height / 2];
          }
          function y(e) {
            if (a.value === null) return [0, 0];
            let t = L(),
              n = [(e[0] - t[0]) / s, (-e[1] + t[1]) / c],
              i = r,
              u = o;
            return [n[0] * i[0] + u[0], n[1] * i[1] + u[1]];
          }
          function P() {
            if (a.value === null) return null;
            let e = a.value.getContext("2d");
            return e === null ? null : e;
          }
          function T() {
            w !== null && w.abort(), (w = new AbortController());
            function e(n) {
              return new Promise((i) => {
                setTimeout(i, n);
              });
            }
            async function t(n) {
              await ue(n), await e(500), !n.aborted && (await se(n));
            }
            t(w.signal);
          }
          function ie() {
            let e = P();
            if (e === null || d.value === null) return;
            let t = _[0] / r[0],
              n = _[1] / r[1],
              i = -f[0] + o[0],
              u = -f[1] + o[1],
              m = (-(i + (_[0] - r[0]) / 2) / r[0]) * s,
              p = (-(u - (_[1] - r[1]) / 2) / r[1]) * c;
            e.setTransform(1, 0, 0, 1, 0, 0),
              e.putImageData(C, 0, 0),
              e.scale(t, n),
              e.drawImage(d.value, m / t, -p / n),
              e.setTransform(1, 0, 0, 1, 0, 0);
          }
          async function ue(e) {
            return new Promise((t) => {
              e.aborted && t(null),
                e.addEventListener("abort", () => {
                  t(null);
                }),
                t(ie());
            });
          }
          async function se(e) {
            return new Promise((t) => {
              var x, R;
              let n = P();
              if (
                (e.aborted && t(null),
                  e.addEventListener("abort", () => {
                    t(null);
                  }),
                  n === null)
              )
                return;
              let [i, u] = y([0, 0]),
                [m, p] = y([s, c]),
                U = ye(i, u, m, p, s, c, h.value),
                B = new ImageData(new Uint8ClampedArray(U), s, c);
              n.putImageData(B, 0, 0),
                (R = (x = d.value) == null ? void 0 : x.getContext("2d")) ==
                null || R.putImageData(B, 0, 0),
                (f = o),
                (_ = r),
                t(null);
            });
          }
          function ce(e, t) {
            let n = y(e),
              i = o,
              u = r,
              m = [u[0] * t, u[1] * t];
            (o = [
              n[0] - ((n[0] - i[0]) / u[0]) * m[0],
              n[1] - ((n[1] - i[1]) / u[1]) * m[1],
            ]),
              (r = m);
          }
          function de(e) {
            if (a.value === null) return [0, 0];
            let t = a.value.getBoundingClientRect();
            return [
              ((e[0] - t.left) * s) / t.width,
              ((e[1] - t.top) * c) / t.height,
            ];
          }
          function fe(e) {
            let t = de([e.clientX, e.clientY]),
              n = 1;
            e.deltaY < 0 ? (n *= 0.9) : (n /= 0.9), ce(t, n), T();
          }
          function _e(e, t) {
            if ((e == 0 && t == 0) || a.value === null) return;
            let n = a.value.getBoundingClientRect(),
              i = o,
              u = (-e / n.width) * r[0],
              m = (t / n.height) * r[1];
            (o = [i[0] + u, i[1] + m]), T();
          }
          let D = !1;
          function me(e) {
            D = !0;
          }
          function be(e) {
            D && _e(e.movementX, e.movementY);
          }
          function ge(e) {
            D = !1;
          }
          function we(e, t, n, i, u, m, p) {
            let U = BigInt(u),
              B = BigInt(m),
              x = BigInt(p);
            return V(e, t, n, i, U, B, x, 2.1);
          }
          let ye = we;
          async function ve(e) {
            (h.value = e.target.value), T();
          }
          return (
            he(() => {
              document.addEventListener("mousemove", be),
                document.addEventListener("mouseup", ge),
                T();
            }),
            (e, t) => (
              j(),
              pe(
                Ce,
                null,
                [
                  v("div", ne, [
                    v(
                      "canvas",
                      {
                        ref_key: "canvas",
                        ref: a,
                        class: "fit-width",
                        width: s,
                        height: c,
                        id: "canvas",
                        onWheel: fe,
                        onMousedown: Ie(me, ["left"]),
                      },
                      null,
                      40,
                      ae,
                    ),
                    v(
                      "canvas",
                      {
                        ref_key: "hiddenCanvas",
                        ref: d,
                        width: s,
                        height: c,
                        class: "hidden",
                      },
                      null,
                      512,
                    ),
                  ]),
                  v("div", le, [
                    v("div", re, [
                      v("p", null, "Iteration threshold: " + Ae(h.value), 1),
                      v(
                        "input",
                        {
                          type: "range",
                          onInput: ve,
                          min: "10",
                          max: "1000",
                          step: "10",
                        },
                        null,
                        32,
                      ),
                    ]),
                  ]),
                ],
                64,
              )
            )
          );
        },
      });
    O = S({
      __name: "HomeView",
      setup(l) {
        return (a, d) => (j(), Te(oe));
      },
    });
  });
export { xe as __tla, O as default };

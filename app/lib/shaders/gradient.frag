precision highp float;
        
        uniform vec3 iResolution;
        uniform float iTime;
        
        #define TILE_SIZE 80.0
        #define STROKE 0.08
        #define MARGIN (STROKE*0.5)
        #define D_EDGE 0.04

        #define UNI2BI(x) (x * 2.0 - 1.0)
        #define BI2UNI(x) ((x + 1.0) * 0.5)
        #define NOISE3D psrdnoise_wrapper

        #define TAU 6.283185307179586

        #define PETALS(n, scale, squeeze_scale, angle, hole_size, r) { for(float i = 0.0; i < (n); i++) { (r) = max((r), petal(BI2UNI(rotate(UNI2BI(uv), i*TAU/(n) + (angle))), (scale), (squeeze_scale)))} (r).x *= smoothstep(hole_size-D_EDGE*scale, hole_size, length(UNI2BI(uv) * 2.0))}

        vec2 polar(vec2 p) {
            if(p.x == 0.0 && p.y == 0.0) {
                return vec2(0.0, 0.0);
            } else {
                return vec2(atan(p.y, p.x), length(p));
            }
        }

        vec2 cartesian(vec2 p) {
            return vec2(p.y * cos(p.x), p.y * sin(p.x));
        }

        float linlin(float x, float l0, float r0, float l1, float r1) {
            return (x - l0) / (r0 - l0) * (r1 - l1) + l1;
        }

        vec2 rotate(vec2 p, float angle) {
            return cartesian(polar(p) + vec2(angle, 0.0));
        }

        vec4 permute(vec4 x) {
             vec4 xm = mod(x, 289.0);
             return mod(((xm*34.0)+10.0)*xm, 289.0);
        }

        float psrdnoise(vec3 x, vec3 period, float alpha, out vec3 gradient) {
            const mat3 M = mat3(0.0, 1.0, 1.0,
                                1.0, 0.0, 1.0,
                                1.0, 1.0, 0.0);
            const mat3 Mi = mat3(-0.5, 0.5, 0.5,
                                  0.5,-0.5, 0.5,
                                  0.5, 0.5,-0.5);

            vec3 uvw = M * x;
            vec3 i0 = floor(uvw);
            vec3 f0 = fract(uvw);

            vec3 g_ = step(f0.xyx, f0.yzz);
            vec3 l_ = 1.0 - g_;
            vec3 g = vec3(l_.z, g_.xy);
            vec3 l = vec3(l_.xy, g_.z);
            vec3 o1 = min(g, l);
            vec3 o2 = max(g, l);

            vec3 i1 = i0 + o1;
            vec3 i2 = i0 + o2;
            vec3 i3 = i0 + vec3(1.0);

            vec3 v0 = Mi * i0;
            vec3 v1 = Mi * i1;
            vec3 v2 = Mi * i2;
            vec3 v3 = Mi * i3;

            vec3 x0 = x - v0;
            vec3 x1 = x - v1;
            vec3 x2 = x - v2;
            vec3 x3 = x - v3;

            vec4 hash = permute(permute(permute(vec4(i0.z, i1.z, i2.z, i3.z))
                                  + vec4(i0.y, i1.y, i2.y, i3.y))
                                  + vec4(i0.x, i1.x, i2.x, i3.x));

            vec4 theta = hash * 3.883222077;
            vec4 sz    = hash * -0.006920415 + 0.996539792;
            vec4 psi   = hash * 0.108705628;

            vec4 Ct = cos(theta);
            vec4 St = sin(theta);
            vec4 sz_prime = sqrt(1.0 - sz*sz);

            vec4 qx = St;
            vec4 qy = -Ct;
            vec4 qz = vec4(0.0);

            vec4 px =  sz * qy;
            vec4 py = -sz * qx;
            vec4 pz = sz_prime;

            psi += alpha;
            vec4 Sa = sin(psi);
            vec4 Ca = cos(psi);

            vec4 gx = Ca * px + Sa * qx;
            vec4 gy = Ca * py + Sa * qy;
            vec4 gz = Ca * pz + Sa * qz;

            vec3 g0 = vec3(gx.x, gy.x, gz.x);
            vec3 g1 = vec3(gx.y, gy.y, gz.y);
            vec3 g2 = vec3(gx.z, gy.z, gz.z);
            vec3 g3 = vec3(gx.w, gy.w, gz.w);

            vec4 w = 0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3));
            w = max(w, 0.0);
            vec4 w2 = w * w;
            vec4 w3 = w2 * w;

            vec4 gdotx = vec4(dot(g0,x0), dot(g1,x1), dot(g2,x2), dot(g3,x3));

            float n = dot(w3, gdotx);

            vec4 dw = -6.0 * w2 * gdotx;
            vec3 dn0 = w3.x * g0 + dw.x * x0;
            vec3 dn1 = w3.y * g1 + dw.y * x1;
            vec3 dn2 = w3.z * g2 + dw.z * x2;
            vec3 dn3 = w3.w * g3 + dw.w * x3;
            gradient = 39.5 * (dn0 + dn1 + dn2 + dn3);

            return 39.5 * n;
        }

        float psrdnoise_wrapper(vec3 x) {
            vec3 grad;
            return psrdnoise(x, vec3(289.0), 0.0, grad);
        }

        float rand(vec2 p){
            return fract(sin(dot(p.xy, vec2(1.3295, 4.12))) * 493022.1);
        }

        vec2 petal(vec2 uv, float scale, float squeeze_scale) {
            vec2 uv1_bi = UNI2BI(uv) * vec2(2.0, 2.0*squeeze_scale) + vec2(-1.0, 0.0);
            float dist = length(uv1_bi);
            float edge_outer = 1.0-MARGIN*scale;
            vec2 r = vec2(smoothstep(edge_outer, edge_outer-D_EDGE*4.0*scale, dist), 0.0);
            return r;
        }

        vec2 flower3(vec2 uv, float scale, bool alt_rot) {
            vec2 r = vec2(0.0);
            PETALS(3.0, scale, 2.0, alt_rot ? TAU/4.0 : 0.0, 0.3, r);
            return r;
        }

        vec2 flower4(vec2 uv, float scale, bool alt_rot) {
            vec2 r = vec2(0.0);
            PETALS(4.0, scale, 2.0, alt_rot ? TAU/8.0 : 0.0, 0.15, r)
            return r;
        }

        vec2 flower8(vec2 uv, float scale, bool alt_rot) {
            vec2 r = vec2(0.0);
            PETALS(8.0, scale, 0.5, alt_rot ? TAU/16.0 : 0.0, 0.05, r);
            return r;
        }

        void mainImage(out vec4 fragColor, in vec2 fragCoord) {
            vec2 uv = fragCoord / iResolution.xy;
            float ratio = iResolution.y/iResolution.x;
            uv = uv * 2.0 - 1.0;
            uv.x *= ratio;

            vec2 uv_tiles = uv * (TILE_SIZE);
            vec2 tile_idx = floor(uv_tiles);
            vec2 uv_tile = fract(uv_tiles);
            uv_tile = BI2UNI(UNI2BI(uv_tile) * vec2(2.0, 1.0));

            vec2 r = vec2(0.0);
            float alt_rot = float(mod(tile_idx.y + tile_idx.x, 2.0) == 0.0);

            float shape_idx = rand(tile_idx);
            if(shape_idx < 0.333) {
                r = max(r, flower3(uv_tile, 1.0, alt_rot));
            } else if(shape_idx < 0.666) {
                r = max(r, flower4(uv_tile, 1.0, alt_rot));
            } else {
                r = max(r, flower8(uv_tile, 1.0, alt_rot));
            }

            float color_edge = 1.0 - STROKE;
            float d2 = smoothstep(0.99, 0.98, 0.3+NOISE3D(vec3(tile_idx * 0.1, iTime*0.2)) * 0.2);

            vec3 c0 = vec3(0.98, 0.69, 0.28);
            vec3 c1 = vec3(0.81, 0.54, 0.36);
            vec3 c2 = vec3(0.75, 0.33, 0.11);
            vec3 c3 = vec3(0.53, 0.23, 0.04);
            vec3 col = mix(c3, c2, smoothstep(0.0, 0.3, r.x));
            col = mix(col, c1, smoothstep(0.3, 0.6, r.x));
            col = mix(col, c0, smoothstep(0.6, 0.9, r.x));
            col = mix(vec3(0.0), col, r.x);
            col = mix(col, vec3(0.0), smoothstep(color_edge, color_edge + MARGIN, r.x));

            fragColor = vec4(col, 1.0);
        }

        void main() {
            mainImage(gl_FragColor, gl_FragCoord.xy);
        }
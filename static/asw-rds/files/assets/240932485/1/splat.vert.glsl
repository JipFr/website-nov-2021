#include "gsplatCommonVS"

varying mediump vec2 gaussianUV;
varying mediump vec4 gaussianColor;

#ifndef DITHER_NONE
    varying float id;
#endif

mediump vec4 discardVec = vec4(0.0, 0.0, 2.0, 1.0);

#ifdef PREPASS_PASS
    varying float vLinearDepth;
#endif

// -- animate start
uniform float time;
uniform float mode;

float scale;
float anim;
vec4 tint;

float PI = 3.14159;

vec3 animate(in vec3 center) {
    vec3 result;
    if (mode == 0.0) {
        // fade in effect
        anim = smoothstep(0.0, 1.0, time * 2.0 / (abs(center.y) + 1.0));
        float mt = fract(anim * 2.0 + fract(center.x * 10000.0) + fract(center.y * 10000.0) + fract(center.z * 10000.0)) * PI * 2.0;
        result = center + vec3(sin(mt) * sin(mt), cos(mt) * sin(mt), sin(mt)) * smoothstep(0.0, 1.0, 1.0 - anim) * 0.2;
        scale = 0.0000005 + smoothstep(0.0, 0.5, anim) * 0.000005;
        tint = vec4(1.0);
    } else {
        // fade out effect
        float fade = smoothstep(0.0, 1.0, abs(center.y) - (2.0 - time * 6.0));
        result = center;
        scale = 1.0;
        anim = 1.0;
        tint = vec4(vec3(1.0), 1.0 - fade);
    }
    return result;
}
// -- animate end

varying vec4 clip;

void main(void) {
    // read gaussian details
    SplatSource source;
    if (!initSource(source)) {
        gl_Position = discardVec;
        return;
    }

    vec3 modelCenter = animate(readCenter(source));

    SplatCenter center;
    if (!initCenter(modelCenter, center)) {
        gl_Position = discardVec;
        return;
    }

    // project center to screen space
    SplatCorner corner;
    if (!initCorner(source, center, corner)) {
        gl_Position = discardVec;
        return;
    }

    // read color
    vec4 clr = readColor(source);

    #if GSPLAT_AA
        // apply AA compensation
        clr.a *= corner.aaFactor;
    #endif

    // evaluate spherical harmonics
    #if SH_BANDS > 0
        // calculate the model-space view direction
        vec3 dir = normalize(center.view * mat3(center.modelView));
        clr.xyz += evalSH(source, dir);
    #endif

    // apply animation scaling
    vec2 a = corner.offset;
    corner.offset = mix(normalize(a) * scale, a, smoothstep(0.0, 1.0, (anim - 0.5) * 2.0));

    // apply animation coloring
    clr = mix(vec4(clr.xyz * 10.0, 1.0), clr, smoothstep(0.0, 1.0, anim)) * tint;

    clipCorner(corner, clr.w);

    // write output
    gl_Position = center.proj + vec4(corner.offset, 0, 0);
    gaussianUV = corner.uv;
    gaussianColor = vec4(prepareOutputFromGamma(max(clr.xyz, 0.0)), clr.w);

    clip = gl_Position;

    #ifndef DITHER_NONE
        id = float(source.id);
    #endif

    #ifdef PREPASS_PASS
        vLinearDepth = -center.view.z;
    #endif
}

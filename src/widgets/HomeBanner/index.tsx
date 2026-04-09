"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { Button } from "@/components/Button";
import "./HomeBanner.extras.scss";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uTextureSize;
  uniform vec2 uMouse;
  uniform float uParallaxStrength;
  uniform float uDistortionMultiplier;
  uniform float uGlassStrength;
  uniform float ustripesFrequency;
  uniform float uglassSmoothness;
  uniform float uEdgePadding;
  varying vec2 vUv;

  vec2 getCoverUV(vec2 uv, vec2 textureSize) {
    if (textureSize.x < 1.0 || textureSize.y < 1.0) return uv;
    vec2 s = uResolution / textureSize;
    float scale = max(s.x, s.y);
    vec2 scaledSize = textureSize * scale;
    vec2 offset = (uResolution - scaledSize) * 0.5;
    return (uv * uResolution - offset) / scaledSize;
  }

  float displacement(float x, float num_stripes, float strength) {
    float modulus = 1.0 / num_stripes;
    return mod(x, modulus) * strength;
  }

  float fractalGlass(float x) {
    float d = 0.0;
    for (int i = -5; i <= 5; i++) {
      d += displacement(x + float(i) * uglassSmoothness, ustripesFrequency, uGlassStrength);
    }
    d = d / 11.0;
    return x + d;
  }

  float smoothEdge(float x, float padding) {
    float edge = padding;
    if (x < edge) return smoothstep(0.0, edge, x);
    else if (x > 1.0 - edge) return smoothstep(1.0, 1.0 - edge, x);
    return 1.0;
  }

  void main() {
    vec2 uv = vUv;
    float originalX = uv.x;
    float edgeFactor = smoothEdge(originalX, uEdgePadding);
    float distortedX = fractalGlass(originalX);
    uv.x = mix(originalX, distortedX, edgeFactor);
    float distortionFactor = uv.x - originalX;
    float parallaxDirection = -sign(0.5 - uMouse.x);
    vec2 parallaxOffset = vec2(
      parallaxDirection * abs(uMouse.x - 0.5) * uParallaxStrength * (1.0 + abs(distortionFactor) * uDistortionMultiplier),
      0.0
    );
    parallaxOffset *= edgeFactor;
    uv += parallaxOffset;
    vec2 coverUV = getCoverUV(uv, uTextureSize);
    coverUV = clamp(coverUV, 0.0, 1.0);
    vec4 color = texture2D(uTexture, coverUV);
    gl_FragColor = color;
  }
`;

export type HomeBannerProps = {
  /** Texture image URL (place `welcome.webp` in `/public` or pass another path) */
  imageSrc?: string;
};

export default function HomeBanner({ imageSrc = "/welcome.webp" }: HomeBannerProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const fractalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-gsap='banner-title']", {
        y: 100,
        opacity: 0,
        stagger: 0.2,
        delay: 0.5,
        duration: 1.5,
        ease: "expo.out",
      });
      gsap.from("[data-gsap='banner-sub']", {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 0.8,
      });
      gsap.from("[data-gsap='banner-ctas']", {
        y: 30,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        delay: 1,
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const container = fractalRef.current;
    if (!container) return;

    let disposed = false;
    let raf = 0;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const config = {
      lerpFactor: 0.035,
      parallaxStrength: 0.1,
      distortionMultiplier: 10.0,
      glassStrength: 2.0,
      glassSmoothness: 0.01,
      stripesFrequency: 15.0,
      edgePadding: 0.1,
    };

    const currentMouse = { x: 0.5, y: 0.5 };
    const targetMouse = { x: 0.5, y: 0.5 };

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const material = new THREE.ShaderMaterial({
      glslVersion: THREE.GLSL1,
      uniforms: {
        uTexture: { value: null },
        uResolution: {
          value: new THREE.Vector2(container.clientWidth, container.clientHeight),
        },
        uTextureSize: { value: new THREE.Vector2(1, 1) },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uParallaxStrength: { value: config.parallaxStrength },
        uDistortionMultiplier: { value: config.distortionMultiplier },
        uGlassStrength: { value: config.glassStrength },
        ustripesFrequency: { value: config.stripesFrequency },
        uglassSmoothness: { value: config.glassSmoothness },
        uEdgePadding: { value: config.edgePadding },
      },
      vertexShader,
      fragmentShader,
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);

    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      if (disposed) return;
      const texture = new THREE.Texture(image);
      texture.needsUpdate = true;
      material.uniforms.uTexture.value = texture;
      material.uniforms.uTextureSize.value.set(image.naturalWidth, image.naturalHeight);
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      targetMouse.y = 1.0 - e.clientY / window.innerHeight;
    };

    const onResize = () => {
      renderer.setSize(container.clientWidth, container.clientHeight);
      material.uniforms.uResolution.value.set(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("resize", onResize);

    const loop = () => {
      if (disposed) return;
      raf = requestAnimationFrame(loop);
      currentMouse.x = lerp(currentMouse.x, targetMouse.x, config.lerpFactor);
      currentMouse.y = lerp(currentMouse.y, targetMouse.y, config.lerpFactor);
      material.uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      const tex = material.uniforms.uTexture.value as THREE.Texture | null;
      if (tex) tex.dispose();
      material.dispose();
      mesh.geometry.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [imageSrc]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Hero"
      className="font-home-banner relative flex h-screen flex-row items-end justify-start overflow-hidden bg-black leading-relaxed text-[#f5f5f7] antialiased"
    >
      <div
        ref={fractalRef}
        className="absolute inset-0 z-[1] [&_canvas]:block [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:grayscale"
        aria-hidden
      />
      <div className="homeBannerGradientOverlay pointer-events-none absolute inset-0 z-[2]" aria-hidden />
      <div className="container relative z-10 w-full min-w-0 pb-24 text-left md:pb-28">
        <div className="max-w-[1040px]">
          <div className="font-home-banner-heading mb-6 flex items-center gap-3 text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-[#f5f5f7]/40 before:block before:h-px before:w-5 before:shrink-0 before:bg-white/45 before:content-['']">
            Defined by design.
          </div>
          <h1
            className="h1 mb-6 font-bold uppercase tracking-[-0.03em]"
            data-gsap="banner-title"
          >
            Your Brand Isn&apos;t
            <br />
            Failing. It&apos;s Just
            <br />
            <span className="text-white">Off Course.</span>
          </h1>
          <p
            className="max-w-[480px] text-[1.05rem] font-light text-[#f5f5f7]/60"
            data-gsap="banner-sub"
          >
            Full-spectrum brand transformation — powered by human expertise, AI intelligence, and
            precision execution.
          </p>
          <div className="mt-10 flex items-center gap-4" data-gsap="banner-ctas">
            <Button variant="primary" size="md">
              Start Mission
            </Button>
            <Button variant="secondary" size="md">
              Request Brand Scan
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useRef, memo } from "react";
import * as THREE from "three";

// Pre-render soft glowing golden point texture onto a canvas
function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, "rgba(255, 248, 220, 1)");
    gradient.addColorStop(0.25, "rgba(235, 195, 75, 0.8)");
    gradient.addColorStop(0.55, "rgba(200, 150, 45, 0.25)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 32, 32);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  return texture;
}

export const Global3DBackground = memo(() => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect user prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.innerWidth < 768;
    const count = isMobile ? 800 : 1800;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 80);
    camera.position.set(0, 0, 6);

    // Highly optimized WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Turn off heavy multisample antialiasing for background
      powerPreference: "high-performance",
      depth: false, // Background doesn't need depth testing
      stencil: false,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.0 : 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Glow Texture
    const glowTexture = createGlowTexture();

    // 1. Primary Gold Cosmic Spiral Points
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    const goldPalette = [
      new THREE.Color(0xFBF0B9),
      new THREE.Color(0xD4AF37),
      new THREE.Color(0xE5B83B),
      new THREE.Color(0xC99A2C),
    ];

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const t = i / count;
      // Spans vertical depth from top to footer
      const y = 3.0 - t * 14.0;
      const angle = t * Math.PI * 12;
      const r = 1.2 + (i % 7) * 0.45;

      positions[i3] = r * Math.cos(angle) + ((i % 11) - 5) * 0.15;
      positions[i3 + 1] = y;
      positions[i3 + 2] = r * Math.sin(angle) + ((i % 13) - 6) * 0.15;

      const col = goldPalette[i % goldPalette.length];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: isMobile ? 0.09 : 0.08,
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // 2. Section 3D Wireframe Landmarks (Hardware GPU Rotated, 0 CPU overhead)
    const landmarkMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.16,
    });

    // Hero Core
    const heroGeo = new THREE.IcosahedronGeometry(0.8, 1);
    const heroMesh = new THREE.Mesh(heroGeo, landmarkMaterial);
    heroMesh.position.set(0, 0.5, 0);
    scene.add(heroMesh);

    // Services Torus
    const torusGeo = new THREE.TorusGeometry(1.2, 0.03, 8, 40);
    const torusMesh = new THREE.Mesh(torusGeo, landmarkMaterial);
    torusMesh.position.set(-1.8, -5.2, -0.5);
    torusMesh.rotation.x = Math.PI / 3;
    scene.add(torusMesh);

    // Booking Star
    const starGeo = new THREE.OctahedronGeometry(0.7, 0);
    const starMesh = new THREE.Mesh(starGeo, landmarkMaterial);
    starMesh.position.set(1.6, -10.5, -0.5);
    scene.add(starMesh);

    // Lightweight scroll and mouse tracking with RAF decoupling
    let currentScrollY = window.scrollY;
    let targetScrollY = window.scrollY;
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth) * 2 - 1;
      targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Smooth 60 FPS Render Loop with Zero CPU Buffer Mutation
    let animId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      animId = requestAnimationFrame(render);

      // Skip render when tab is inactive to save GPU/battery
      if (document.hidden) return;

      const delta = Math.min((time - lastTime) * 0.001, 0.1);
      lastTime = time;

      // Smooth scroll interpolation (damped)
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const docHeight = document.documentElement.scrollHeight - window.innerHeight || 1;
      const scrollProgress = Math.min(Math.max(currentScrollY / docHeight, 0), 1);

      // Camera travels through the 3D space with scroll
      camera.position.y = -scrollProgress * 11.5;
      camera.position.x = mouseX * 0.4;
      camera.rotation.y = mouseX * 0.08;
      camera.rotation.z = Math.sin(time * 0.0005) * 0.02;

      // GPU matrix transformations (essentially 0 CPU cost)
      particles.rotation.y += delta * 0.06;
      heroMesh.rotation.y += delta * 0.3;
      heroMesh.rotation.x += delta * 0.2;
      torusMesh.rotation.z += delta * 0.25;
      starMesh.rotation.y += delta * 0.35;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      geometry.dispose();
      material.dispose();
      glowTexture.dispose();
      heroGeo.dispose();
      torusGeo.dispose();
      starGeo.dispose();
      landmarkMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
    >
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
});

Global3DBackground.displayName = "Global3DBackground";

export default Global3DBackground;

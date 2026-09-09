import { useEffect, useRef, useState, useCallback, memo } from "react";
import * as THREE from "three";

export type AuraMode = "elixir" | "ring" | "ribbon";

interface Hero3DBackgroundProps {
  className?: string;
  mode?: AuraMode;
  onModeChange?: (mode: AuraMode) => void;
  showControls?: boolean;
}

// Generate soft radial gold glow sprite in memory
function createGlowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (ctx) {
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, "rgba(255, 245, 200, 1)");
    gradient.addColorStop(0.2, "rgba(235, 195, 75, 0.9)");
    gradient.addColorStop(0.5, "rgba(200, 150, 45, 0.35)");
    gradient.addColorStop(0.8, "rgba(140, 95, 20, 0.08)");
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

export const Hero3DBackground = memo(({
  className = "",
  mode: controlledMode,
  onModeChange,
  showControls = true,
}: Hero3DBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalMode, setInternalMode] = useState<AuraMode>("elixir");
  const currentMode = controlledMode ?? internalMode;
  const modeRef = useRef<AuraMode>(currentMode);
  modeRef.current = currentMode;

  const [metrics, setMetrics] = useState({
    fps: 60,
    particles: 3600,
    interaction: "Dwell / Idle",
  });

  const handleSetMode = useCallback((newMode: AuraMode) => {
    setInternalMode(newMode);
    if (onModeChange) onModeChange(newMode);
  }, [onModeChange]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Detect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Detect mobile for particle budget
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 1800 : 3600;
    setMetrics((prev) => ({ ...prev, particles: particleCount }));

    // Scene & Camera
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    // High performance WebGL Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: !isMobile,
      powerPreference: "high-performance",
      stencil: false,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particle Texture & Material
    const glowTexture = createGlowTexture();
    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.09 : 0.08,
      map: glowTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
    });

    // Particle Data Initialization
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const baseCoords = new Float32Array(particleCount * 3); // stored base coordinates
    const speeds = new Float32Array(particleCount);

    // Gold luxury color palette (Champagne, Pure Gold, Warm Amber, Rose Gold)
    const goldPalette = [
      new THREE.Color(0xF5E6A3), // Champagne Light
      new THREE.Color(0xD4AF37), // Classic Rich Gold
      new THREE.Color(0xE5B83B), // Radiant Amber Gold
      new THREE.Color(0xCCA030), // Deep Antique Gold
      new THREE.Color(0xE8B896), // Rose Gold Shimmer
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Spherical distribution for base coordinates
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = Math.cbrt(Math.random()) * 1.8 + 0.3;

      baseCoords[i3] = r * Math.sin(phi) * Math.cos(theta);
      baseCoords[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      baseCoords[i3 + 2] = r * Math.cos(phi);

      positions[i3] = baseCoords[i3];
      positions[i3 + 1] = baseCoords[i3 + 1];
      positions[i3 + 2] = baseCoords[i3 + 2];

      // Assign luxury gold tones
      const col = goldPalette[Math.floor(Math.random() * goldPalette.length)];
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      speeds[i] = 0.4 + Math.random() * 0.8;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // Central Morphing Golden Aura Core (Liquid Gold Elixir Core)
    const coreGeometry = new THREE.IcosahedronGeometry(0.7, 3);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xD4AF37,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    // Floating Ribbon Ring Mesh
    const ringGeometry = new THREE.TorusGeometry(1.6, 0.03, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xE5C158,
      transparent: true,
      opacity: 0.25,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    scene.add(ringMesh);

    // Interactive pointer & dwell tracking
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, prevX: 0, prevY: 0, velocity: 0 };
    let lastMouseMoveTime = Date.now();
    let isVisible = true;
    let animationFrameId: number;

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      const rect = container.getBoundingClientRect();
      mouse.targetX = ((clientX - rect.left) / rect.width) * 2 - 1;
      mouse.targetY = -(((clientY - rect.top) / rect.height) * 2 - 1);

      const dx = mouse.targetX - mouse.prevX;
      const dy = mouse.targetY - mouse.prevY;
      mouse.velocity = Math.sqrt(dx * dx + dy * dy);
      mouse.prevX = mouse.targetX;
      mouse.prevY = mouse.targetY;

      lastMouseMoveTime = Date.now();
    };

    window.addEventListener("mousemove", onPointerMove, { passive: true });
    window.addEventListener("touchmove", onPointerMove, { passive: true });

    // Pause rendering when scrolled out of viewport (High Performance optimization)
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // Handle Window Resize
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // FPS Meter & Telemetry
    let frameCount = 0;
    let lastFpsCheck = performance.now();

    // Main 60FPS Render Loop
    let clock = 0;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || document.hidden) return;

      clock += 0.016;

      // Telemetry update every second
      frameCount++;
      const now = performance.now();
      if (now - lastFpsCheck >= 1000) {
        const calculatedFps = Math.round((frameCount * 1000) / (now - lastFpsCheck));
        const idleTime = Date.now() - lastMouseMoveTime;
        const interactionState =
          idleTime > 1800
            ? "Tranquil Dwell"
            : mouse.velocity > 0.04
            ? "Dynamic Swirl"
            : "Gentle Flow";

        setMetrics((prev) => ({
          ...prev,
          fps: Math.min(60, calculatedFps),
          interaction: interactionState,
        }));
        frameCount = 0;
        lastFpsCheck = now;
      }

      // Smooth pointer interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Camera parallax
      camera.position.x += (mouse.x * 0.8 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 0.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Core rotation & gentle breathing pulse
      const activeMode = modeRef.current;
      const breath = 1 + Math.sin(clock * 1.8) * 0.08;
      coreMesh.scale.set(breath, breath, breath);
      coreMesh.rotation.y += 0.005 + mouse.velocity * 0.05;
      coreMesh.rotation.x += 0.003;

      ringMesh.rotation.z += 0.004;
      ringMesh.rotation.y = mouse.x * 0.4;
      ringMesh.rotation.x = Math.PI / 3 + mouse.y * 0.3;

      // Update particle positions based on active mode & pointer physics
      const posAttr = geometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      const idle = Date.now() - lastMouseMoveTime > 1800;
      const waveSpeed = idle ? 1.0 : 1.6;

      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const bx = baseCoords[i3];
        const by = baseCoords[i3 + 1];
        const bz = baseCoords[i3 + 2];
        const spd = speeds[i];

        if (activeMode === "elixir") {
          // Mode 1: Organic Liquid Gold Elixir Sphere (Morphing breathing aura)
          const angle = clock * spd * 0.6 * waveSpeed;
          const cosA = Math.cos(angle);
          const sinA = Math.sin(angle);

          // Rotate around Y axis with wave ripples
          const rx = bx * cosA - bz * sinA;
          const rz = bx * sinA + bz * cosA;
          const ripple = Math.sin(clock * 2 + by * 3) * 0.12;

          // Mouse gravity displacement
          const dx = rx - mouse.x * 1.5;
          const dy = by - mouse.y * 1.5;
          const distSq = dx * dx + dy * dy;
          const force = Math.max(0, 0.4 - distSq * 0.15) * 0.25;

          posArray[i3] = rx * (1 + ripple) + dx * force;
          posArray[i3 + 1] = by * (1 + ripple) + dy * force;
          posArray[i3 + 2] = rz * (1 + ripple);
        } else if (activeMode === "ring") {
          // Mode 2: Celestial Stardust Ring (Cosmic particle disc, matching video reference)
          const radius = Math.sqrt(bx * bx + bz * bz) + 0.5;
          const currentTheta = Math.atan2(bz, bx) + clock * (spd * 0.5 + 0.3);

          const ringTilt = 0.45;
          const rx = radius * Math.cos(currentTheta);
          const rz = radius * Math.sin(currentTheta);
          const ry = by * 0.25 + Math.sin(currentTheta * 3 + clock * 2) * 0.1;

          // Tilted ring transform
          posArray[i3] = rx;
          posArray[i3 + 1] = ry * Math.cos(ringTilt) - rz * Math.sin(ringTilt) + mouse.y * 0.3;
          posArray[i3 + 2] = ry * Math.sin(ringTilt) + rz * Math.cos(ringTilt) + mouse.x * 0.3;
        } else {
          // Mode 3: Silken Hair Waves (Flowing cascading golden ribbons)
          const wave = Math.sin(clock * 2.5 + bx * 2 + by * 1.5) * 0.25;
          const flowY = by + Math.cos(clock + bx) * 0.15;

          posArray[i3] = bx + wave * 0.4 + mouse.x * 0.3;
          posArray[i3 + 1] = flowY + wave * 0.6;
          posArray[i3 + 2] = bz + Math.cos(clock * 1.8 + by * 2) * 0.2;
        }
      }

      posAttr.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup resources
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("resize", onResize);
      observer.disconnect();

      geometry.dispose();
      particleMaterial.dispose();
      glowTexture.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`} aria-hidden="true">
      <div ref={containerRef} className="w-full h-full" />

      {/* Interactive Telemetry & Mode Controls Bar */}
      {showControls && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex flex-col items-center gap-2 max-w-[94vw] sm:max-w-max">
          {/* Mode Switcher Chips */}
          <div className="flex items-center gap-1.5 p-1 rounded-full bg-background/80 backdrop-blur-md border border-primary/20 shadow-lg shadow-black/40">
            <button
              type="button"
              onClick={() => handleSetMode("elixir")}
              className={`px-3 py-1 text-xs font-body tracking-wider rounded-full transition-all duration-300 ${
                currentMode === "elixir"
                  ? "gold-gradient text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
              title="Organic Liquid Gold Aura"
            >
              Liquid Gold
            </button>
            <button
              type="button"
              onClick={() => handleSetMode("ring")}
              className={`px-3 py-1 text-xs font-body tracking-wider rounded-full transition-all duration-300 ${
                currentMode === "ring"
                  ? "gold-gradient text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
              title="Celestial Stardust Galaxy Ring"
            >
              Stardust Ring
            </button>
            <button
              type="button"
              onClick={() => handleSetMode("ribbon")}
              className={`px-3 py-1 text-xs font-body tracking-wider rounded-full transition-all duration-300 ${
                currentMode === "ribbon"
                  ? "gold-gradient text-primary-foreground font-semibold shadow-sm"
                  : "text-muted-foreground hover:text-primary"
              }`}
              title="Silken Hair Waves"
            >
              Silken Waves
            </button>
          </div>

          {/* Living Presence Telemetry Metric (Honor video reference) */}
          <div className="hidden sm:flex items-center gap-3 px-3 py-0.5 rounded-full bg-secondary/60 backdrop-blur-sm border border-primary/10 text-[10px] font-body text-muted-foreground">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              {metrics.fps} FPS
            </span>
            <span className="text-primary/40">•</span>
            <span>{metrics.particles.toLocaleString()} Gold Particles</span>
            <span className="text-primary/40">•</span>
            <span className="text-primary/80 font-medium">{metrics.interaction}</span>
          </div>
        </div>
      )}
    </div>
  );
});

Hero3DBackground.displayName = "Hero3DBackground";

export default Hero3DBackground;

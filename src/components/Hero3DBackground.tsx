"use client";

import { useEffect, useRef, Suspense, lazy } from "react";

const Hero3DBackgroundInner = lazy(async () => {
  const THREE = await import("three");
  const { useEffect, useRef } = await import("react");

  interface Hero3DBackgroundProps {
    className?: string;
  }

  const BackgroundCanvas = ({ className = "" }: Hero3DBackgroundProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const animationFrameRef = useRef<number>();

      useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Renderer
        const renderer = new THREE.WebGLRenderer({
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        container.appendChild(renderer.domElement);

        // Gold color palette
        const goldColors = [
          new THREE.Color(0xC9A84C),
          new THREE.Color(0xD4AF37),
          new THREE.Color(0xE8C547),
          new THREE.Color(0xB8860B),
        ];

        // Create floating geometric shapes
        const geometries = [
          new THREE.IcosahedronGeometry(0.3, 0),
          new THREE.OctahedronGeometry(0.25, 0),
          new THREE.TetrahedronGeometry(0.3, 0),
          new THREE.DodecahedronGeometry(0.2, 0),
        ];

        const particles: THREE.Mesh[] = [];
        const particleCount = 15;

        for (let i = 0; i < particleCount; i++) {
          const geometry = geometries[Math.floor(Math.random() * geometries.length)];
          const material = new THREE.MeshPhysicalMaterial({
            color: goldColors[Math.floor(Math.random() * goldColors.length)],
            metalness: 0.7,
            roughness: 0.3,
            clearcoat: 0.5,
            clearcoatRoughness: 0.1,
            transparent: true,
            opacity: 0.15,
          });

          const mesh = new THREE.Mesh(geometry, material);
          
          const radius = 3 + Math.random() * 2;
          const theta = Math.random() * Math.PI * 2;
          const phi = Math.acos(2 * Math.random() - 1);
          
          mesh.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
          );
          
          mesh.rotation.set(
            Math.random() * Math.PI,
            Math.random() * Math.PI,
            Math.random() * Math.PI
          );
          
          mesh.scale.setScalar(0.5 + Math.random() * 0.5);
          
          mesh.userData = {
            originalPosition: mesh.position.clone(),
            rotationSpeed: {
              x: (Math.random() - 0.5) * 0.002,
              y: (Math.random() - 0.5) * 0.002,
              z: (Math.random() - 0.5) * 0.002,
            },
            floatSpeed: 0.0005 + Math.random() * 0.001,
            floatOffset: Math.random() * Math.PI * 2,
            orbitRadius: radius,
            orbitTheta: theta,
            orbitPhi: phi,
            orbitSpeed: 0.0001 + Math.random() * 0.0003,
          };
          
          scene.add(mesh);
          particles.push(mesh);
        }

        const ambientLight = new THREE.AmbientLight(0xC9A84C, 0.3);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xFFF8DC, 0.5);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        let mouseX = 0;
        let mouseY = 0;
        const targetRotation = { x: 0, y: 0 };

        const handleMouseMove = (event: MouseEvent) => {
          mouseX = (event.clientX / window.innerWidth) * 2 - 1;
          mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
          targetRotation.y = mouseX * 0.1;
          targetRotation.x = mouseY * 0.1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        const animate = (time: number) => {
          animationFrameRef.current = requestAnimationFrame(animate);

          if (!prefersReducedMotion) {
            particles.forEach((mesh) => {
              const data = mesh.userData;
              
              mesh.rotation.x += data.rotationSpeed.x;
              mesh.rotation.y += data.rotationSpeed.y;
              mesh.rotation.z += data.rotationSpeed.z;

              const float = Math.sin(time * data.floatSpeed + data.floatOffset) * 0.1;
              mesh.position.y = data.originalPosition.y + float;

              data.orbitTheta += data.orbitSpeed;
              const orbitX = data.orbitRadius * Math.sin(data.orbitPhi) * Math.cos(data.orbitTheta);
              const orbitZ = data.orbitRadius * Math.sin(data.orbitPhi) * Math.sin(data.orbitTheta);
              mesh.position.x = orbitX;
              mesh.position.z = orbitZ;
            });

            camera.position.x += (targetRotation.y - camera.position.x) * 0.02;
            camera.position.y += (targetRotation.x - camera.position.y) * 0.02;
            camera.lookAt(0, 0, 0);
          }

          renderer.render(scene, camera);
        };

        animate(0);

        const handleResize = () => {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener("resize", handleResize);

        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
          window.removeEventListener("resize", handleResize);
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
          }
          
          particles.forEach((mesh) => {
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((m) => m.dispose());
              } else {
                mesh.material.dispose();
              }
            }
          });
          
          renderer.dispose();
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        };
      }, []);

      return (
        <div
          ref={containerRef}
          className={`fixed inset-0 -z-10 overflow-hidden ${className}`}
          aria-hidden="true"
        />
      );
    };

    return { default: BackgroundCanvas };
  });

export const Hero3DBackground = ({ className = "" }: { className?: string }) => {
  return (
    <Suspense fallback={<div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true" />}>
      <Hero3DBackgroundInner className={className} />
    </Suspense>
  );
};

export default Hero3DBackground;
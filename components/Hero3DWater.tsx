"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function Hero3DWater() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // --- Scene Setup ---
    const scene = new THREE.Scene();

    // --- Camera Setup ---
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 10);

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    // --- Mouse Interaction State ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = window.document.body.getBoundingClientRect();
      // Mouse coordinates normalized from -1 to 1 across the screen
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // --- Lighting ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Deep cyan light from left
    const blueLight = new THREE.DirectionalLight(0x00d8f6, 2.5);
    blueLight.position.set(-6, 4, 3);
    scene.add(blueLight);

    // Soft sky blue light from right
    const skyLight = new THREE.DirectionalLight(0x3b82f6, 1.5);
    skyLight.position.set(6, -4, 3);
    scene.add(skyLight);

    // Interactive point light following mouse
    const mouseLight = new THREE.PointLight(0xffffff, 5.0, 15);
    mouseLight.position.set(0, 0, 3);
    scene.add(mouseLight);

    // Back light to create refractive glow
    const backGlowLight = new THREE.DirectionalLight(0x00f0ff, 1.5);
    backGlowLight.position.set(0, 0, -5);
    scene.add(backGlowLight);

    // --- Morphing Orbs (Water Droplets) ---
    const orbGroup = new THREE.Group();
    scene.add(orbGroup);

    // Material with high transmission and refraction (glassmorphic water look)
    const waterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x00e5ff,
      emissive: 0x002c3d,
      transparent: true,
      opacity: 0.6,
      roughness: 0.05,
      metalness: 0.05,
      transmission: 0.9,
      ior: 1.333, // Water refractive index
      thickness: 0.4,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
      depthWrite: false,
    });

    const orbCount = 3;
    const orbs: {
      mesh: THREE.Mesh;
      geom: THREE.SphereGeometry;
      origPos: THREE.BufferAttribute;
      baseRadius: number;
      speed: number;
      amplitude: number;
      initPos: THREE.Vector3;
      phaseOffset: number;
    }[] = [];

    // Orb configurations: size, position, motion settings
    const orbConfigs = [
      { radius: 1.5, pos: new THREE.Vector3(-1.8, 1.0, -1.5), speed: 0.8, amp: 0.18, phase: 0 },
      { radius: 1.1, pos: new THREE.Vector3(1.9, -1.2, -1.0), speed: 1.2, amp: 0.14, phase: Math.PI / 2 },
      { radius: 0.8, pos: new THREE.Vector3(0.5, 2.2, -2.0), speed: 1.5, amp: 0.1, phase: Math.PI },
    ];

    orbConfigs.forEach((config) => {
      // Create detailed sphere geometry for smooth morphing
      const geom = new THREE.SphereGeometry(config.radius, 48, 48);
      const origPos = geom.attributes.position.clone();
      const mesh = new THREE.Mesh(geom, waterMaterial);
      mesh.position.copy(config.pos);
      orbGroup.add(mesh);

      orbs.push({
        mesh,
        geom,
        origPos,
        baseRadius: config.radius,
        speed: config.speed,
        amplitude: config.amp,
        initPos: config.pos.clone(),
        phaseOffset: config.phase,
      });
    });

    // --- Floating Bubbles Background ---
    const bubbleCount = 30;
    const bubbleGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const bubbleMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.5,
      transmission: 0.95,
      ior: 1.1,
      roughness: 0.1,
    });

    const bubbles: THREE.Mesh[] = [];
    const bubbleData: { speed: number; drift: number; scaleSpeed: number; initPos: THREE.Vector3 }[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      const bubble = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
      const x = (Math.random() - 0.5) * 6;
      const y = (Math.random() - 0.5) * 7;
      const z = -3 - Math.random() * 2;
      bubble.position.set(x, y, z);
      scene.add(bubble);
      bubbles.push(bubble);

      bubbleData.push({
        speed: 0.008 + Math.random() * 0.012,
        drift: Math.random() * Math.PI * 2,
        scaleSpeed: 0.5 + Math.random() * 1.5,
        initPos: bubble.position.clone(),
      });
    }

    setLoading(false);

    // --- Animation Loop ---
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Smoothly interpolate mouse target coordinates (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Make spotlight track cursor position
      mouseLight.position.x = mouse.x * 6;
      mouseLight.position.y = mouse.y * 6;

      // Rotate and tilt the entire backdrop group based on mouse
      orbGroup.rotation.y = time * 0.04 + mouse.x * 0.15;
      orbGroup.rotation.x = mouse.y * 0.1;

      // Animate and morph each orb
      orbs.forEach((orb) => {
        const mesh = orb.mesh;
        const geom = orb.geom;
        const origPos = orb.origPos;
        const posAttr = geom.attributes.position;
        const v = new THREE.Vector3();

        // 1. Position float & mouse reaction (orbs float away from cursor)
        const tOffset = time * orb.speed + orb.phaseOffset;
        const floatY = Math.sin(tOffset * 0.8) * 0.25;
        const floatX = Math.cos(tOffset * 0.6) * 0.2;
        
        // Push slightly away from mouse cursor
        const pushX = -mouse.x * 0.5;
        const pushY = -mouse.y * 0.4;

        mesh.position.set(
          orb.initPos.x + floatX + pushX,
          orb.initPos.y + floatY + pushY,
          orb.initPos.z
        );

        // Slow spin
        mesh.rotation.y = time * 0.08 + orb.phaseOffset;
        mesh.rotation.x = time * 0.05;

        // 2. Vertex deformation (3D liquid morphing effect)
        for (let i = 0; i < posAttr.count; i++) {
          v.fromBufferAttribute(origPos, i);
          
          // Apply organic multi-frequency sine wave displacements
          const waveScale = time * 1.5 + orb.phaseOffset;
          const noise = 
            Math.sin(v.x * 2.0 + waveScale) * 0.15 + 
            Math.cos(v.y * 2.5 - waveScale) * 0.12 + 
            Math.sin(v.z * 1.8 + waveScale * 0.8) * 0.15;

          const currentRadius = orb.baseRadius + noise * orb.amplitude;
          v.normalize().multiplyScalar(currentRadius);
          posAttr.setXYZ(i, v.x, v.y, v.z);
        }
        posAttr.needsUpdate = true;
      });

      // Animate background bubbles
      for (let i = 0; i < bubbleCount; i++) {
        const bubble = bubbles[i];
        const data = bubbleData[i];

        bubble.position.y += data.speed;
        
        // Soft drift
        bubble.position.x = data.initPos.x + Math.sin(time + i) * 0.1;

        // Reset bubble at top boundary
        if (bubble.position.y > 4.5) {
          bubble.position.y = -4.5;
        }

        // Scale fluctuation
        const scale = 0.8 + Math.sin(time * 2 + i) * 0.2;
        bubble.scale.set(scale, scale, scale);
      }

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 500;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // --- Cleanup ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();

      // Dispose ThreeJS resources
      orbs.forEach((orb) => {
        orb.geom.dispose();
      });
      bubbleGeometry.dispose();
      waterMaterial.dispose();
      bubbleMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden rounded-full pointer-events-none">
      {/* Loading state indicator */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-transparent">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-cyan-300 border-t-cyan-500/20" />
        </div>
      )}

      {/* WebGL Canvas Container */}
      <div ref={containerRef} className="h-full w-full opacity-70 transition-opacity duration-700" />
    </div>
  );
}

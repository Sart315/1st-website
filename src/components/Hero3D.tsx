import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown, MessageCircle, Sparkles, ShieldCheck, Wrench, Smartphone, Laptop, CheckCircle, Store, Zap } from 'lucide-react';
import { createWhatsAppGeneralUrl, SHOP_ADDRESS } from '../utils/whatsapp';

interface Hero3DProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero3D: React.FC<Hero3DProps> = ({ onExploreClick, onContactClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setIsWebGLSupported(false);
        return;
      }
    } catch {
      setIsWebGLSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x060812, 0.035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 9);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    container.appendChild(renderer.domElement);

    // Multi-Layered Studio Lighting (Cobalt Sapphire + Warm Titanium Gold + Rim White)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.2);
    keyLight.position.set(-5, 6, 6);
    scene.add(keyLight);

    const goldFill = new THREE.DirectionalLight(0xfbbf24, 2.8);
    goldFill.position.set(6, -2, 5);
    scene.add(goldFill);

    const rimLight = new THREE.DirectionalLight(0xffffff, 4.2);
    rimLight.position.set(0, 8, -4);
    scene.add(rimLight);

    const deviceGroup = new THREE.Group();
    scene.add(deviceGroup);

    // 1. 3D Titanium Smartphone
    const phoneGroup = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(1.6, 3.3, 0.16);
    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e2638,
      metalness: 0.94,
      roughness: 0.2,
    });
    const phoneBody = new THREE.Mesh(bodyGeometry, bodyMaterial);
    phoneGroup.add(phoneBody);

    const bezelGeo = new THREE.BoxGeometry(1.64, 3.34, 0.14);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.98,
      roughness: 0.12,
    });
    const phoneBezel = new THREE.Mesh(bezelGeo, bezelMat);
    phoneGroup.add(phoneBezel);

    const screenGeo = new THREE.PlaneGeometry(1.5, 3.16);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x070b18,
      roughness: 0.04,
      metalness: 0.8,
      emissive: 0x1e3a8a,
      emissiveIntensity: 0.65
    });
    const phoneScreen = new THREE.Mesh(screenGeo, screenMat);
    phoneScreen.position.z = 0.082;
    phoneGroup.add(phoneScreen);

    const notchGeo = new THREE.BoxGeometry(0.35, 0.09, 0.01);
    const notchMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const notch = new THREE.Mesh(notchGeo, notchMat);
    notch.position.set(0, 1.35, 0.084);
    phoneGroup.add(notch);

    // Triple Camera array
    const bumpGeo = new THREE.BoxGeometry(0.7, 0.7, 0.08);
    const bumpMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.9,
      roughness: 0.25
    });
    const cameraBump = new THREE.Mesh(bumpGeo, bumpMat);
    cameraBump.position.set(-0.35, 1.05, -0.1);
    phoneGroup.add(cameraBump);

    for (let i = 0; i < 3; i++) {
      const lensGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24);
      const lensMat = new THREE.MeshStandardMaterial({
        color: 0x000000,
        metalness: 0.95,
        roughness: 0.05
      });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.rotation.x = Math.PI / 2;
      const xOffset = i === 2 ? -0.45 : -0.25;
      const yOffset = i === 0 ? 1.2 : i === 1 ? 0.9 : 1.05;
      lens.position.set(xOffset, yOffset, -0.14);
      phoneGroup.add(lens);

      const ringGeo = new THREE.TorusGeometry(0.13, 0.015, 12, 24);
      const ringMat = new THREE.MeshStandardMaterial({
        color: 0x60a5fa,
        metalness: 1.0,
        roughness: 0.15
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.set(xOffset, yOffset, -0.16);
      phoneGroup.add(ring);
    }

    phoneGroup.position.set(-1.8, 0.2, 0.5);
    phoneGroup.rotation.set(0.18, 0.45, -0.1);
    deviceGroup.add(phoneGroup);

    // 2. 3D Sleek Aluminum Laptop
    const laptopGroup = new THREE.Group();

    const baseGeo = new THREE.BoxGeometry(3.2, 0.12, 2.2);
    const aluminumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.24,
    });
    const laptopBase = new THREE.Mesh(baseGeo, aluminumMat);
    laptopGroup.add(laptopBase);

    const trackpadGeo = new THREE.PlaneGeometry(1.1, 0.7);
    const trackpadMat = new THREE.MeshStandardMaterial({
      color: 0xcfd8e3,
      metalness: 0.75,
      roughness: 0.3,
    });
    const trackpad = new THREE.Mesh(trackpadGeo, trackpadMat);
    trackpad.rotation.x = -Math.PI / 2;
    trackpad.position.set(0, 0.062, 0.55);
    laptopGroup.add(trackpad);

    const kbGeo = new THREE.PlaneGeometry(2.7, 1.05);
    const kbMat = new THREE.MeshStandardMaterial({
      color: 0x090e1c,
      metalness: 0.5,
      roughness: 0.6
    });
    const kb = new THREE.Mesh(kbGeo, kbMat);
    kb.rotation.x = -Math.PI / 2;
    kb.position.set(0, 0.062, -0.35);
    laptopGroup.add(kb);

    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.06, -1.08);

    const lidGeo = new THREE.BoxGeometry(3.2, 2.1, 0.08);
    const laptopLid = new THREE.Mesh(lidGeo, aluminumMat);
    laptopLid.position.set(0, 1.05, 0);
    lidGroup.add(laptopLid);

    const laptopScreenGeo = new THREE.PlaneGeometry(3.04, 1.95);
    const laptopScreenMat = new THREE.MeshStandardMaterial({
      color: 0x060914,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      metalness: 0.85,
      roughness: 0.08
    });
    const laptopScreen = new THREE.Mesh(laptopScreenGeo, laptopScreenMat);
    laptopScreen.position.set(0, 1.05, 0.042);
    lidGroup.add(laptopScreen);

    lidGroup.rotation.x = THREE.MathUtils.degToRad(-22);
    laptopGroup.add(lidGroup);

    laptopGroup.position.set(1.9, -0.4, -0.2);
    laptopGroup.rotation.set(0.2, -0.45, 0.12);
    deviceGroup.add(laptopGroup);

    // 3. Stardust Atmospheric Particles (Cobalt Sapphire & Platinum Gold)
    const particleCount = 130;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const blueColor = new THREE.Color(0x38bdf8);
    const goldColor = new THREE.Color(0xfbbf24);
    const silverColor = new THREE.Color(0xe2e8f0);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 18;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

      const rnd = Math.random();
      const col = rnd > 0.6 ? blueColor : rnd > 0.3 ? goldColor : silverColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.048,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 0.7;
      targetY = (e.clientY / innerHeight - 0.5) * 0.5;
    };

    const handleScroll = () => {
      scrollY = window.scrollY || window.pageYOffset;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      phoneGroup.position.y = 0.2 + Math.sin(elapsedTime * 1.1) * 0.12 - (scrollY * 0.001);
      phoneGroup.rotation.y = 0.45 + Math.sin(elapsedTime * 0.7) * 0.1 + currentX * 0.5;
      phoneGroup.rotation.x = 0.18 + Math.cos(elapsedTime * 0.8) * 0.07 - currentY * 0.3;

      laptopGroup.position.y = -0.4 + Math.cos(elapsedTime * 1.0) * 0.1 - (scrollY * 0.0015);
      laptopGroup.rotation.y = -0.45 + Math.cos(elapsedTime * 0.6) * 0.12 + currentX * 0.4;
      laptopGroup.rotation.x = 0.2 + Math.sin(elapsedTime * 0.7) * 0.06 - currentY * 0.25;

      particles.rotation.y = elapsedTime * 0.015;
      particles.rotation.x = elapsedTime * 0.008;

      deviceGroup.rotation.z = currentX * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <section className="relative min-h-[95vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#04060d] via-[#070b18] to-[#060812] pt-24 pb-14">
      {/* 3D Canvas Layer */}
      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Layered Multi-Color Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[350px] bg-indigo-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Semantic DOM Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* Live Showroom Status Pill */}
        <div className="mb-5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/30 backdrop-blur-md shadow-lg shadow-blue-500/10">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-200">
            Showroom Open Today (10 AM - 9 PM) · Near Narain Tiraha, Shikohabad
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl font-display leading-[1.08] text-balance">
          Gadget Galaxy
          <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-200 to-amber-300">
            Premium Tech. Smarter Prices.
          </span>
        </h1>

        {/* Supporting Line */}
        <div className="mt-5 flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-base md:text-lg font-medium text-slate-300 tracking-wide">
          <span className="text-white font-semibold">New</span>
          <span className="text-blue-400">·</span>
          <span className="text-white font-semibold">Second-Hand</span>
          <span className="text-blue-400">·</span>
          <span className="text-white font-semibold">Refurbished</span>
          <span className="text-blue-400">·</span>
          <span className="text-amber-300 font-semibold">Certified Repairs</span>
        </div>

        <p className="mt-4 text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl text-balance leading-relaxed">
          Explore inspected iPhones, Androids, MacBooks, and high-performance gaming laptops in Shikohabad. 
          Tested with our 50-point diagnostic check, in-store testing, and authentic invoice with warranty.
        </p>

        {/* Action CTAs */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm sm:text-base transition-all duration-200 shadow-xl shadow-blue-600/30 active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 border border-blue-400/40"
          >
            <Smartphone className="w-4 h-4 text-white" />
            <span>Explore Devices</span>
          </button>

          <a
            href={createWhatsAppGeneralUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base border border-slate-700/80 hover:border-blue-400/50 transition-all duration-200 backdrop-blur-md active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>Discuss on WhatsApp</span>
          </a>

          <button
            onClick={onContactClick}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-medium text-sm sm:text-base border border-white/10 transition-colors cursor-pointer"
          >
            Store & Location
          </button>
        </div>

        {/* 4 Feature Badges */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 text-left w-full max-w-5xl">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0b1022]/80 border border-white/5 hover:border-blue-500/30 transition-colors">
            <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white">50-Point Inspection</div>
              <div className="text-[11px] text-slate-400">100% Genuine hardware verified</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0b1022]/80 border border-white/5 hover:border-blue-500/30 transition-colors">
            <Wrench className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white">Certified Lab Repairs</div>
              <div className="text-xs text-slate-400">Micro-soldering & diagnostics</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0b1022]/80 border border-white/5 hover:border-blue-500/30 transition-colors">
            <Store className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white">In-Hand Store Testing</div>
              <div className="text-xs text-slate-400">Inspect device before you pay</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#0b1022]/80 border border-white/5 hover:border-blue-500/30 transition-colors">
            <Laptop className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs sm:text-sm font-semibold text-white">Near Narain Tiraha</div>
              <div className="text-xs text-slate-400">Shikohabad, UP (Store Pickup)</div>
            </div>
          </div>
        </div>

        <button
          onClick={onExploreClick}
          aria-label="Scroll to collection"
          className="mt-8 inline-flex items-center gap-2 text-xs text-slate-400 hover:text-blue-300 transition-colors cursor-pointer group"
        >
          <span>Scroll down to inspect devices</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
        </button>
      </div>
    </section>
  );
};

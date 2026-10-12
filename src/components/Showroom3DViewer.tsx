import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, CheckCircle2, MessageCircle, Sparkles, Smartphone, Laptop } from 'lucide-react';
import { SHOP_WHATSAPP_NUMBER } from '../utils/whatsapp';

type ShowroomDeviceType = 'iphone' | 'samsung' | 'macbook';

interface ColorOption {
  name: string;
  hex: number;
  tailwindBg: string;
}

const DEVICE_CONFIGS: Record<ShowroomDeviceType, {
  name: string;
  tagline: string;
  priceNote: string;
  colors: ColorOption[];
  specs: { label: string; value: string }[];
}> = {
  iphone: {
    name: 'Apple iPhone Pro Titanium Series',
    tagline: 'Grade A+ Pristine & Certified Refurbished',
    priceNote: 'Starting from ₹44,999 in Store',
    colors: [
      { name: 'Natural Titanium', hex: 0xb5afa5, tailwindBg: 'bg-[#b5afa5]' },
      { name: 'Space Black', hex: 0x1c1e21, tailwindBg: 'bg-[#1c1e21]' },
      { name: 'Desert Gold', hex: 0xd9b982, tailwindBg: 'bg-[#d9b982]' },
      { name: 'Silver White', hex: 0xe2e8f0, tailwindBg: 'bg-[#e2e8f0]' },
    ],
    specs: [
      { label: 'Display Panel', value: '100% Original Super Retina XDR' },
      { label: 'Battery Health', value: '88% - 100% Genuine Health' },
      { label: 'Camera Sensor', value: '48MP Pro Photonic Engine' },
      { label: 'Warranty', value: 'Up to 6 Months In-Store Bill' },
    ]
  },
  samsung: {
    name: 'Samsung Galaxy Ultra & Foldables',
    tagline: '200MP Zoom Flagships & Dual Screen Multitasking',
    priceNote: 'Starting from ₹38,999 in Store',
    colors: [
      { name: 'Titanium Gray', hex: 0x64748b, tailwindBg: 'bg-[#64748b]' },
      { name: 'Phantom Black', hex: 0x0f172a, tailwindBg: 'bg-[#0f172a]' },
      { name: 'Amber Yellow', hex: 0xeab308, tailwindBg: 'bg-[#eab308]' },
      { name: 'Cobalt Violet', hex: 0x6366f1, tailwindBg: 'bg-[#6366f1]' },
    ],
    specs: [
      { label: 'Screen Panel', value: 'Dynamic AMOLED 2X 120Hz' },
      { label: 'Productivity', value: 'Embedded S-Pen Stylus' },
      { label: 'Processor', value: 'Snapdragon 8 Gen Flagship' },
      { label: 'Verification', value: '100% Tested Zero Burn-in' },
    ]
  },
  macbook: {
    name: 'Apple MacBook Pro & Air Silicon',
    tagline: 'M1 / M2 / M3 High Performance Laptops',
    priceNote: 'Starting from ₹49,999 in Store',
    colors: [
      { name: 'Space Black', hex: 0x1e242f, tailwindBg: 'bg-[#1e242f]' },
      { name: 'Silver Aluminum', hex: 0xcfd6df, tailwindBg: 'bg-[#cfd6df]' },
      { name: 'Starlight Gold', hex: 0xe6dfd5, tailwindBg: 'bg-[#e6dfd5]' },
    ],
    specs: [
      { label: 'Display', value: 'Liquid Retina XDR True Tone' },
      { label: 'Battery Life', value: '15-18 Hours Real World' },
      { label: 'Architecture', value: 'Apple Silicon Unified Memory' },
      { label: 'Condition', value: 'Dent-free, Cycle count < 80' },
    ]
  }
};

export const Showroom3DViewer: React.FC = () => {
  const [deviceType, setDeviceType] = useState<ShowroomDeviceType>('iphone');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const mountRef = useRef<HTMLDivElement>(null);
  const currentMaterialRef = useRef<THREE.MeshStandardMaterial | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 7);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    container.replaceChildren(renderer.domElement);

    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xf5d07a, 3.2);
    keyLight.position.set(4, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
    rimLight.position.set(-4, -2, -3);
    scene.add(rimLight);

    const topLight = new THREE.PointLight(0xd4af37, 2.0, 15);
    topLight.position.set(0, 4, 2);
    scene.add(topLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    const curConfig = DEVICE_CONFIGS[deviceType];
    const initialHex = curConfig.colors[selectedColorIdx]?.hex || 0xb5afa5;

    const mainMat = new THREE.MeshStandardMaterial({
      color: initialHex,
      metalness: 0.92,
      roughness: 0.22,
    });
    currentMaterialRef.current = mainMat;

    if (deviceType === 'iphone') {
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.0, 4.1, 0.2), mainMat);
      rootGroup.add(body);

      const edge = new THREE.Mesh(
        new THREE.BoxGeometry(2.06, 4.16, 0.18),
        new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.15 })
      );
      rootGroup.add(edge);

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(1.9, 3.96),
        new THREE.MeshStandardMaterial({
          color: 0x050811,
          emissive: 0x0c162c,
          emissiveIntensity: 0.5,
          roughness: 0.05,
          metalness: 0.7
        })
      );
      screen.position.z = 0.105;
      rootGroup.add(screen);

      const bump = new THREE.Mesh(
        new THREE.BoxGeometry(0.9, 0.9, 0.1),
        new THREE.MeshStandardMaterial({ color: initialHex, metalness: 0.9, roughness: 0.3 })
      );
      bump.position.set(-0.45, 1.45, -0.12);
      rootGroup.add(bump);

      for (let i = 0; i < 3; i++) {
        const lens = new THREE.Mesh(
          new THREE.CylinderGeometry(0.16, 0.16, 0.08, 32),
          new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.05, metalness: 0.95 })
        );
        lens.rotation.x = Math.PI / 2;
        const lx = i === 2 ? -0.6 : -0.3;
        const ly = i === 0 ? 1.65 : i === 1 ? 1.25 : 1.45;
        lens.position.set(lx, ly, -0.18);
        rootGroup.add(lens);
      }
    } else if (deviceType === 'samsung') {
      const body = new THREE.Mesh(new THREE.BoxGeometry(2.2, 4.4, 0.22), mainMat);
      rootGroup.add(body);

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(2.1, 4.25),
        new THREE.MeshStandardMaterial({
          color: 0x03050a,
          emissive: 0x121b30,
          emissiveIntensity: 0.55,
          roughness: 0.05,
          metalness: 0.8
        })
      );
      screen.position.z = 0.115;
      rootGroup.add(screen);

      for (let i = 0; i < 4; i++) {
        const lens = new THREE.Mesh(
          new THREE.CylinderGeometry(0.18, 0.18, 0.08, 32),
          new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.05, metalness: 0.95 })
        );
        lens.rotation.x = Math.PI / 2;
        lens.position.set(-0.65, 1.6 - i * 0.48, -0.14);
        rootGroup.add(lens);
      }
    } else {
      const base = new THREE.Mesh(new THREE.BoxGeometry(4.2, 0.14, 2.8), mainMat);
      rootGroup.add(base);

      const lidGroup = new THREE.Group();
      lidGroup.position.set(0, 0.07, -1.38);

      const lid = new THREE.Mesh(new THREE.BoxGeometry(4.2, 2.7, 0.1), mainMat);
      lid.position.set(0, 1.35, 0);
      lidGroup.add(lid);

      const screen = new THREE.Mesh(
        new THREE.PlaneGeometry(4.0, 2.5),
        new THREE.MeshStandardMaterial({
          color: 0x070b16,
          emissive: 0x12244a,
          emissiveIntensity: 0.6,
          roughness: 0.1,
          metalness: 0.7
        })
      );
      screen.position.set(0, 1.35, 0.055);
      lidGroup.add(screen);

      lidGroup.rotation.x = THREE.MathUtils.degToRad(-25);
      rootGroup.add(lidGroup);
    }

    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotY = 0.3;
    let rotX = 0.1;
    let autoRotate = true;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      autoRotate = false;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      prevMouseX = clientX;
      prevMouseY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - prevMouseX;
      const deltaY = clientY - prevMouseY;
      prevMouseX = clientX;
      prevMouseY = clientY;

      rotY += deltaX * 0.008;
      rotX += deltaY * 0.008;
      rotX = Math.max(-0.6, Math.min(0.6, rotX));
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (autoRotate) {
        rotY += 0.004;
      }
      rootGroup.rotation.y = rotY;
      rootGroup.rotation.x = rotX;
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, [deviceType]);

  useEffect(() => {
    if (currentMaterialRef.current) {
      const hex = DEVICE_CONFIGS[deviceType].colors[selectedColorIdx]?.hex;
      if (hex !== undefined) {
        currentMaterialRef.current.color.setHex(hex);
      }
    }
  }, [selectedColorIdx, deviceType]);

  const activeData = DEVICE_CONFIGS[deviceType];

  return (
    <section className="py-24 bg-gradient-to-b from-[#03050a] via-[#070b14] to-[#04060c] border-b border-white/[0.06] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-[#d4af37]/[0.06] rounded-full blur-[140px] pointer-events-none animate-pulse-glow" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-[#d4af37]/30 text-xs font-semibold text-[#e5c378] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span>Interactive 3D Showroom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-display tracking-tight text-balance">
            Inspect Flagship Hardware in Full 360°
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base text-balance">
            Rotate devices smoothly, switch metallic finishes, and examine certified build quality before visiting our counter at Narain Tiraha.
          </p>

          {/* Device Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-[#090e1a] border border-white/10 backdrop-blur-md shadow-xl">
            <button
              onClick={() => { setDeviceType('iphone'); setSelectedColorIdx(0); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                deviceType === 'iphone'
                  ? 'bg-[#d4af37] text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>iPhone Pro</span>
            </button>

            <button
              onClick={() => { setDeviceType('samsung'); setSelectedColorIdx(0); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                deviceType === 'samsung'
                  ? 'bg-[#d4af37] text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              <span>Samsung Ultra</span>
            </button>

            <button
              onClick={() => { setDeviceType('macbook'); setSelectedColorIdx(0); }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                deviceType === 'macbook'
                  ? 'bg-[#d4af37] text-slate-950 shadow-md font-bold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Laptop className="w-4 h-4" />
              <span>MacBook Pro</span>
            </button>
          </div>
        </div>

        {/* 3D Stage & Spec Details Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 3D Viewport Column (7 cols) */}
          <div className="lg:col-span-7 relative h-[440px] sm:h-[500px] rounded-3xl bg-gradient-to-b from-[#080d19] to-[#04060c] border border-white/10 overflow-hidden shadow-2xl flex flex-col justify-between p-4 sm:p-6 group">
            
            <div className="flex items-center justify-between z-10 pointer-events-none">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-black/50 border border-white/10 text-xs text-slate-300 backdrop-blur-md">
                <RotateCw className="w-3.5 h-3.5 text-[#e5c378] animate-spin" style={{ animationDuration: '6s' }} />
                <span>Drag to Rotate 360°</span>
              </div>

              <div className="px-3 py-1 rounded-lg bg-black/50 border border-[#d4af37]/30 text-xs font-semibold text-[#f3e5ab] backdrop-blur-md">
                {activeData.priceNote}
              </div>
            </div>

            <div 
              ref={mountRef} 
              className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
              title="Drag to rotate device in 3D"
            />

            <div className="relative z-10 flex items-center justify-between p-3 rounded-2xl bg-black/70 border border-white/10 backdrop-blur-md">
              <div className="text-xs text-slate-300 font-medium">
                Finish: <span className="text-white font-semibold">{activeData.colors[selectedColorIdx]?.name}</span>
              </div>

              <div className="flex items-center gap-2">
                {activeData.colors.map((c, i) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColorIdx(i)}
                    title={c.name}
                    className={`w-6 h-6 rounded-full border-2 transition-transform cursor-pointer ${c.tailwindBg} ${
                      selectedColorIdx === i ? 'border-[#d4af37] scale-110 shadow-md' : 'border-slate-600 hover:scale-105'
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Hardware Spec Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#e5c378] font-bold">
                Showroom Showcase
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white font-display mt-1">
                {activeData.name}
              </h3>
              <p className="text-sm text-slate-400 mt-1">
                {activeData.tagline}
              </p>
            </div>

            <div className="space-y-3">
              {activeData.specs.map((item) => (
                <div 
                  key={item.label}
                  className="flex items-center justify-between p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06]"
                >
                  <span className="text-xs font-medium text-slate-400">{item.label}</span>
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.02] border border-[#d4af37]/20 text-xs text-slate-300">
              <strong className="text-[#f3e5ab]">In-Store Testing Policy:</strong> Every smartphone and laptop is tested with you in hand before purchase. We verify battery health, camera focus, and IMEI registration together.
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/${SHOP_WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Ayush! I checked the 3D showcase for ${activeData.name} (${activeData.colors[selectedColorIdx]?.name}). What models do you have in stock at Narain Tiraha?`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-[#e5c378] via-[#d4af37] to-[#b88e28] text-slate-950 font-bold text-sm hover:brightness-110 transition-all text-center flex items-center justify-center gap-2 shadow-lg shadow-[#d4af37]/20 active:scale-[0.98]"
              >
                <MessageCircle className="w-4 h-4 text-slate-950" />
                <span>Discuss Stock on WhatsApp</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

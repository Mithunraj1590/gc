"use client";

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './ImpactWidget.module.css';

export default function ImpactWidget() {
    const containerRef = useRef<HTMLDivElement>(null);
    const bgRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        if (!containerRef.current || !bgRef.current || !canvasRef.current) return;

        const container = bgRef.current;
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let W = 0, H = 0;
        const DPR = Math.min(window.devicePixelRatio || 1, 2);
        let rafId: number;
        let time = 0;
        
        const spacing = 12;
        const dots: any[] = [];
        
        let mouse = { x: -9999, y: -9999, smoothedX: 0, smoothedY: 0 };
        let rot = { x: 0, y: 0, targetX: 0, targetY: 0 };
        
        let lastMouseTime = performance.now();
        let idleAnimIndex = 0; 
        let idleAnimTimer = 0;
        let autoEyeX = 0, autoEyeY = 0;
        
        // Cinematic Camera State (Disabled for centered normal view)
        let cameraS = 1.0; 
        let cameraTx = window.innerWidth / 2;
        let cameraTy = window.innerHeight / 2;
        
        let scrollFraction = 0; 
        let smoothedScroll = 0;
        let eyeTrackX = 0;
        let eyeTrackY = 0;

        function resize() {
            if (!containerRef.current) return;
            W = window.innerWidth;
            H = isExpanded ? window.innerHeight : containerRef.current.clientHeight;
            canvas.width = W * DPR; 
            canvas.height = H * DPR;
            canvas.style.width = W + 'px'; 
            canvas.style.height = H + 'px';
            ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
            initGrid();
        }

        function initGrid() {
            dots.length = 0;
            const cols = Math.ceil(W / spacing) + 1, rows = Math.ceil(H / spacing) + 1;
            
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    const x = i * spacing, y = j * spacing;
                    dots.push({
                        baseX: x, baseY: y, 
                        x: x, y: y,
                        vx: (Math.random() - 0.5) * 1.5, vy: (Math.random() - 0.5) * 1.5,
                        angleOffset: Math.random() * Math.PI * 2
                    });
                }
            }
        }

        function isInsideShape(shapeIndex: number, dx: number, dy: number, R: number, time: number) {
            const s = Math.round(shapeIndex);
            
            if (s === 6) R *= 1.5;
            if (s === 7) R *= 1.4;
            if (s === 8) R *= 1.5;
            if (s === 9) R *= 1.4;
            if (s === 10) R *= 1.1; 
            
            if (s === 0) {
                const dist = Math.hypot(dx, dy);
                if (dist > R) return false; 
                
                const eX = R * 0.35, eY = -R * 0.25, eOR = R * 0.22;
                const maxEyeMove = R * 0.15;
                let eOffsetX = eyeTrackX * maxEyeMove;
                let eOffsetY = eyeTrackY * maxEyeMove;
                
                if (idleAnimIndex === 3) { 
                    eOffsetX += autoEyeX * maxEyeMove * 2.0; 
                    eOffsetY += autoEyeY * maxEyeMove * 2.0; 
                }
                
                let eyeLOpen = idleAnimIndex !== 1;
                let eyeROpen = idleAnimIndex !== 2;
                if (idleAnimIndex === 6) eyeLOpen = eyeROpen = false;
                
                if (Math.hypot(dx + eX, dy - eY) < eOR) {
                    if (!eyeLOpen) return Math.abs(dy - eY) < R*0.03;
                    return Math.hypot(dx + eX - eOffsetX, dy - eY - eOffsetY) < R * 0.08;
                }
                if (Math.hypot(dx - eX, dy - eY) < eOR) {
                    if (!eyeROpen) return Math.abs(dy - eY) < R*0.03;
                    return Math.hypot(dx - eX - eOffsetX, dy - eY - eOffsetY) < R * 0.08;
                }
                
                // Default to a smiling face!
                if (idleAnimIndex === 0 || idleAnimIndex === 4 || scrollFraction > 0.05) {
                    if (dy > R * 0.2 && dist < R * 0.7 && dist > R * 0.5) return false;
                } else if (idleAnimIndex === 5) {
                    if (dy > R * 0.15 && dx > -R*0.5 && dx < R*0.5) {
                         if (dy > dx*0.5 + R*0.2 && dy > -dx*0.5 + R*0.2 && dist < R*0.7) return false;
                    }
                } else if (idleAnimIndex === 6) {
                    if (dy > R * 0.2 && dx > -R*0.4 && dx < R*0.4) {
                         if (dy < -Math.abs(dx)*0.5 + R*0.7 && dy > -Math.abs(dx)*0.5 + R*0.5) return false;
                    }
                }
                return true;
            }
            else if (s === 1) {
                if (dy > R*0.5 && dy < R*0.6) {
                    if (Math.sin(dx / R * 15 + time * 10) > 0.3) return true;
                }
                if (Math.hypot(dx + R*0.5, dy - R*0.35) < R*0.22) return true;
                if (Math.hypot(dx - R*0.5, dy - R*0.35) < R*0.22) return true;
                if (dy > 0 && dy <= R*0.35 && Math.abs(dx) < R*0.85) {
                    if (Math.hypot(dx + R*0.5, dy - R*0.35) < R*0.3) return false;
                    if (Math.hypot(dx - R*0.5, dy - R*0.35) < R*0.3) return false;
                    if (dx > R*0.75 && dy < R*0.1) return false;
                    if (dx < -R*0.75 && dy < R*0.1) return false;
                    return true;
                }
                if (dy > -R*0.45 && dy <= 0 && Math.abs(dx) < R*0.5) {
                    if (dx < -R*0.2 && dy < -dx - R*0.65) return false;
                    if (dx > R*0.2 && dy < dx - R*0.65) return false;
                    return true;
                }
                return false;
            }
            else if (s === 2) {
                if (dx > R*0.1 && dx < R*0.7 && dy > -R*0.8 && dy <= -R*0.3) {
                    if (dx > R*0.3 && dy > -R*0.55 && dy < -R*0.4) return false;
                    if (dx > R*0.45 && dy > -R*0.75 && dy < -R*0.65) return false;
                    return true;
                }
                if (dx > R*0.1 && dx < R*0.4 && dy > -R*0.3 && dy <= 0) return true;
                if (dx > -R*0.5 && dx <= R*0.2 && dy > -R*0.2 && dy < R*0.35) {
                    if (dx < -R*0.3 && dy < -R*0.05) return false;
                    return true;
                }
                if (dx > -R*0.9 && dx <= -R*0.5 && dy > 0 && dy < R*0.3) {
                    return dy > (-dx * 0.7 - R*0.4);
                }
                const leg1Ext = R*0.65 + Math.max(0, Math.sin(time * 12)) * R*0.15;
                const leg2Ext = R*0.65 + Math.max(0, Math.sin(time * 12 + Math.PI)) * R*0.15;
                
                if (dx > -R*0.3 && dx < -R*0.1 && dy >= R*0.35 && dy < leg1Ext) {
                    if (dy > R*0.65 && dx < -R*0.25) return false;
                    return true;
                }
                if (dx > R*0.0 && dx < R*0.2 && dy >= R*0.35 && dy < leg2Ext) {
                    if (dy > R*0.65 && dx < R*0.05) return false;
                    return true;
                }
                if (dx > R*0.2 && dx < R*0.45 && dy > -R*0.05 && dy < R*0.1) return true;
                
                if (dy > R*0.8 && dy < R*0.95) {
                    if (Math.abs(dy - (R*0.85 + Math.sin(dx / R * 5 + time * 5) * R * 0.04)) < R*0.03) return true;
                }
                const cactusPan = R*1.5 - ((time * 0.8) % 3.0) * R; 
                if (dx > cactusPan - R*0.1 && dx < cactusPan + R*0.2 && dy > R*0.4 && dy <= R*0.85) {
                    if (Math.abs(dx - cactusPan) < R*0.03) return true;
                    if (dx > cactusPan && dx < cactusPan + R*0.1 && dy > R*0.5 && dy < R*0.55) return true;
                    if (Math.abs(dx - (cactusPan + R*0.1)) < R*0.02 && dy > R*0.45 && dy < R*0.55) return true;
                }
                return false;
            }
            else if (s === 3) {
                if (Math.abs(dx) < R*0.03 && dy > -R*0.8 && dy < R*0.2) return true;
                if (dy > -R*0.7 && dy < R*0.1 && dx < -R*0.05) {
                    if (dx > -R*0.6 * ((dy - (-R*0.7))/(R*0.8))) return true;
                }
                if (dy > -R*0.7 && dy < R*0.1 && dx > R*0.05) {
                    if (dx < R*0.5 * ((dy - (-R*0.7))/(R*0.8))) return true;
                }
                if (dy > R*0.2 && dy < R*0.5) {
                    if (Math.abs(dx) < R*0.7 - ((dy - R*0.2) * 0.5)) return true;
                }
                if (dy > R*0.6 && dy < R*0.9) {
                    const w = Math.sin(dx / R * 12 - time * 2) * R * 0.05;
                    if (Math.abs(dy - R*0.7 - w) < R*0.03) return true;
                    if (Math.abs(dy - R*0.85 - w) < R*0.03) return true;
                }
                return false;
            }
            else if (s === 4) {
                if (Math.hypot(dx, dy + R*0.2) < R*0.5) return true;
                if (dy > R*0.25 && dy < R*0.4) {
                    if (Math.abs(dx) < (dy - R*0.2) * 0.7) return true;
                }
                if (dy >= R*0.4 && dy < R*0.95) {
                    const sway = Math.sin((dy - R*0.4)/R * 10 + time*1.5) * R * 0.15;
                    if (Math.abs(dx - sway) < R*0.02) return true;
                }
                const cloudSpeed1 = (time * 0.4) % 2.2 * R - R*1.1; 
                if (Math.hypot(dx - R*0.6, dy - cloudSpeed1) < R*0.15) return true;
                if (Math.hypot(dx - R*0.8, dy - cloudSpeed1 + R*0.05) < R*0.1) return true;
                
                const cloudSpeed2 = ((time * 0.3 + 1.0) % 2.2) * R - R*1.1;
                if (Math.hypot(dx + R*0.7, dy - cloudSpeed2) < R*0.12) return true;
                if (Math.hypot(dx + R*0.5, dy - cloudSpeed2 - R*0.05) < R*0.1) return true;
                return false;
            }
            else if (s === 5) {
                const bw = R * 0.35, bh = R * 0.9;
                if (Math.abs(dx) < bw && Math.abs(dy) <= bh * 0.5) {
                    if (Math.hypot(dx, dy + R*0.1) < R*0.15) return false;
                    return true; 
                }
                if (dy < -bh * 0.5 && Math.abs(dx) < bw) {
                    return dy > -bh * 0.5 - R * 0.5 && Math.abs(dx) < bw * ((dy - (-bh * 0.5 - R * 0.5)) / (R * 0.5));
                }
                if (dy > bh * 0.5 && Math.abs(dx) < bw * 0.8) {
                    const flameHeight = R * 0.3 + Math.abs(Math.sin(time * 3)) * R * 0.1;
                    return dy < bh * 0.5 + flameHeight && Math.abs(dx) < bw * 0.5 * (1.0 - (dy - bh * 0.5) / flameHeight);
                }
                if (dy > 0 && dy <= bh * 0.5 + R * 0.15) { 
                    if (Math.abs(dx) >= bw && Math.abs(dx) < bw + R * 0.45) {
                        return dy > (Math.abs(dx) - bw) * 1.5;
                    }
                }
                const stStar = (tOffset: number, speed: number) => ((time * speed + tOffset) % 2.0) * R - R;
                if (Math.abs(dx - R*0.6) < R*0.02 && dy > stStar(0, 2.5) && dy < stStar(0, 2.5) + R*0.4) return true;
                if (Math.abs(dx + R*0.7) < R*0.02 && dy > stStar(0.5, 3.0) && dy < stStar(0.5, 3.0) + R*0.3) return true;
                if (Math.abs(dx + R*0.4) < R*0.02 && dy > stStar(1.2, 1.8) && dy < stStar(1.2, 1.8) + R*0.5) return true;
                if (Math.abs(dx - R*0.8) < R*0.02 && dy > stStar(0.8, 2.2) && dy < stStar(0.8, 2.2) + R*0.2) return true;
                return false;
            }
            else if (s === 6) {
                if (dy < -R*0.1 && dy > -R*0.6) {
                    if (Math.hypot(dx, dy + R*0.1) < R*0.5) return true;
                }
                if (dy > -R*0.1 && dy <= 0) {
                    if (Math.abs(dx) < R*0.55 && Math.abs(Math.sin(dx/R * 20)) > 0.2) return true;
                }
                if (dy > 0 && dy < R*0.9) {
                    const wave1 = Math.sin(dy/R * 12 + time*2) * R*0.1;
                    const wave2 = Math.sin(dy/R * 10 - time*1.5) * R*0.15;
                    const wave3 = Math.sin(dy/R * 15 + time*2.5) * R*0.08;
                    
                    if (Math.abs(dx - (-R*0.2 + wave1)) < R*0.03) return true;
                    if (Math.abs(dx - (0 + wave2)) < R*0.04) return true;
                    if (Math.abs(dx - (R*0.2 + wave3)) < R*0.03) return true;
                }
                const bY1 = -(((time * 0.6) % 2.0) * R - R);
                const bR1 = R * 0.08 * (1.1 - (bY1 + R)/(R*2.0));
                if (Math.hypot(dx - R*0.65, dy - bY1) < bR1 && Math.hypot(dx - R*0.65, dy - bY1) > bR1*0.6) return true;
                
                const bY2 = -(((time * 0.8 + 1.0) % 2.0) * R - R);
                const bR2 = R * 0.06 * (1.1 - (bY2 + R)/(R*2.0));
                if (Math.hypot(dx + R*0.55, dy - bY2) < bR2 && Math.hypot(dx + R*0.55, dy - bY2) > bR2*0.6) return true;
                return false;
            }
            else if (s === 7) {
                const angle = Math.PI / 5;
                const rdx = dx * Math.cos(angle) - dy * Math.sin(angle);
                const rdy = dx * Math.sin(angle) + dy * Math.cos(angle);
                if (rdx > -R*0.4 && rdx < R*0.4 && Math.abs(rdy) < R*0.25) return true;

                if (dx > R*0.2 && dx < R*0.6 && dy < -R*0.1 && dy > -R*0.5) {
                    if (Math.hypot(dx - R*0.4, dy + R*0.3) < R*0.18) {
                        if (Math.hypot(dx - R*0.45, dy + R*0.35) < R*0.04) return false;
                        return true;
                    }
                }
                if (dx >= R*0.5 && dx < R*0.95 && Math.abs(dy - (-R*0.35)) < R*0.02) return true;

                const flapTime = time * 30;
                const flapScaleY = 0.5 + Math.abs(Math.sin(flapTime)) * 0.8;
                const flapBaseY = -R*0.1;
                
                if (dx < R*0.2 && dy < flapBaseY && dy > flapBaseY - R*0.7 * flapScaleY) {
                    const nY = (dy - flapBaseY) / flapScaleY; 
                    if (dx > nY * 0.9 && dx < nY * 0.2) {
                        return Math.abs(Math.sin(dx/R * 30)) > 0.1;
                    }
                }
                if (dx < -R*0.2 && dx > -R*0.8 && dy > R*0.1 && dy < R*0.7) {
                    if (dx > -dy - R*0.3 && dx < -dy * 0.6) return true;
                }
                return false;
            }
            else if (s === 8) {
                const wx = -R*0.35;
                if (Math.hypot(dx - wx, dy + R*0.35) < R*0.12) return true;
                if (dx > wx - R*0.1 && dx < wx + R*0.1 && dy > -R*0.23 && dy < 0) return true;
                if (dy >= 0 && dy < R*0.6) {
                    if (dx > wx - (dy * 0.8) && dx < wx + (dy * 0.5)) return true;
                }
                if (dx > wx && dx <= 0 && dy > -R*0.2 && dy <= 0) {
                    const armY = -R*0.2 + (dx - wx) * (R*0.1 / Math.abs(wx));
                    if (Math.abs(dy - armY) < R*0.05) return true;
                }

                const mx = R*0.35;
                if (Math.hypot(dx - mx, dy + R*0.4) < R*0.12) return true;
                if (dy > -R*0.5 && dy < -R*0.45 && Math.abs(dx - mx) < R*0.22) return true;
                if (dx > mx - R*0.12 && dx < mx + R*0.12 && dy > -R*0.28 && dy < R*0.1) return true;
                if (dy >= R*0.1 && dy < R*0.6) {
                    if (dx > mx - R*0.3 && dx < mx && Math.abs(dy - R*0.35) < R*0.2) {
                        if (Math.abs(dx - (mx - (dy - R*0.1)*0.7)) < R*0.06) return true;
                    }
                    if (dx >= mx && dx < mx + R*0.25) {
                        if (Math.abs(dx - (mx + (dy - R*0.1)*0.4)) < R*0.06) return true;
                    }
                }
                if (dx < mx && dx >= 0 && dy > -R*0.2 && dy < 0) {
                    const armY = -R*0.2 + (mx - dx) * (R*0.1 / mx);
                    if (Math.abs(dy - armY) < R*0.05) return true;
                }
                return false;
            }
            else if (s === 9) {
                if (Math.hypot(dx - R*0.1, dy + R*0.55) < R*0.1) return true;
                if (dy > -R*0.45 && dy < R*0.1) {
                    const tline = -R*0.1 + (dy + R*0.45)*0.2;
                    if (dx > tline - R*0.12 && dx < tline + R*0.12) return true;
                }
                if (dx < 0 && dy < -R*0.35 && dy > -R*0.8) {
                    if (Math.abs(dy - (dx*1.2 - R*0.35)) < R*0.05) return true; 
                }
                if (Math.hypot(dx + R*0.35, dy + R*0.8) < R*0.18) return true;

                if (dx > R*0.1 && dx < R*0.7 && dy > -R*0.4 && dy < 0) {
                    if (Math.abs(dy - (-R*0.4 + (dx - R*0.1)*0.6)) < R*0.05) return true;
                }

                if (dy >= R*0.1 && dy < R*0.6) {
                    if (dx > R*0.1 && dx < R*0.5 && dy < R*0.35) {
                        if (Math.abs(dy - (dx - R*0.1)*0.6 - R*0.1) < R*0.06) return true;
                    }
                    if (dx > R*0.4 && dx < R*0.6 && dy >= R*0.35 && dy < R*0.6) return true;
                    
                    if (dx > -R*0.5 && dx <= R*0.1) {
                        if (Math.abs(dy - (-dx*1.0 + R*0.1)) < R*0.06) return true;
                    }
                }
                return false;
            }
            else if (s === 10) {
                const th = R * 0.28; 
                const outR = R * 0.53; 
                const inR = outR - th; 
                const cxG = -R * 0.60; 
                const cxC = R * 0.35;
                
                let isG = false;
                if (Math.hypot(dx - cxG, dy) <= outR && Math.hypot(dx - cxG, dy) >= inR) {
                    isG = true;
                    if (dx > cxG + outR * 0.85) isG = false; 
                    if (dx > cxG + R*0.05 && dy > -R*0.15 && dy < R*0.02) isG = false; 
                }
                if (dx > cxG && dx <= cxG + outR * 0.85 && dy >= R*0.02 && dy <= R*0.02 + th * 0.9) isG = true;
                if (isG) return true;

                let isC = false;
                if (Math.hypot(dx - cxC, dy) <= outR && Math.hypot(dx - cxC, dy) >= inR) {
                    isC = true;
                    if (dx > cxC + outR * 0.85) isC = false;
                    if (dx > cxC + R*0.05 && Math.abs(dy) < R*0.22) isC = false;
                }
                if (isC) return true;

                const dotR = R * 0.16;
                const dotX = cxC + outR * 0.85 + dotR + R * 0.12; 
                const dotY = outR * 0.98 - dotR; 
                if (Math.hypot(dx - dotX, dy - dotY) <= dotR) return true;
                
                const tmX = dotX - R*0.08;
                const tmY = -outR * 0.85;
                const tS = R * 0.035; 
                const tH = R * 0.15; 
                
                if (dx > tmX && dx < tmX + R*0.18 && dy > tmY && dy < tmY + tS) return true; 
                if (Math.abs(dx - (tmX + R*0.09)) < tS/2 && dy > tmY && dy < tmY + tH) return true;
                
                const mX = tmX + R*0.22;
                const mW = R*0.18;
                if (dx > mX && dx < mX + tS && dy > tmY && dy < tmY + tH) return true; 
                if (dx > mX + mW - tS && dx < mX + mW && dy > tmY && dy < tmY + tH) return true; 
                if (dx >= mX && dx <= mX + mW && dy > tmY && dy < tmY + tH * 0.8) {
                    const vLineY = tmY + tH * 0.8 - Math.abs(dx - (mX + mW/2)) * 1.5;
                    if (Math.abs(dy - vLineY) < tS * 0.8) return true;
                }
                return false;
            }
            return false;
        }

        function draw() {
            ctx!.clearRect(0, 0, W, H);
            time += 0.015;
            const now = performance.now();
            let cx = W / 2, cy = H / 2;
            
            if (scrollFraction < 0.02) {
                if (now - lastMouseTime > 2500) {
                    if (now - idleAnimTimer > 1000 + Math.random()*2500) {
                        idleAnimTimer = now;
                        idleAnimIndex = Math.floor(Math.random() * 7);
                        autoEyeX = (Math.random()-0.5)*1.5;
                        autoEyeY = (Math.random()-0.5)*1.5;
                    }
                } else {
                    idleAnimIndex = 0; 
                }
            } else {
                idleAnimIndex = 0;
            }
            
            mouse.smoothedX += (mouse.x - mouse.smoothedX) * 0.15;
            mouse.smoothedY += (mouse.y - mouse.smoothedY) * 0.15;
            smoothedScroll += (scrollFraction - smoothedScroll) * 0.07;

            const maxShapes = 10;
            let rawShapeIndex = smoothedScroll * maxShapes;
            const baseShape = Math.floor(rawShapeIndex);
            let fraction = rawShapeIndex - baseShape;
            
            let steppedFraction = fraction * fraction * fraction * (fraction * (fraction * 6.0 - 15.0) + 10.0);
             steppedFraction = steppedFraction * steppedFraction * (3.0 - 2.0 * steppedFraction);
            
            const floatShapeIndex = Math.min(maxShapes, baseShape + steppedFraction);
            
            const scaleTransition = Math.min(1.0, floatShapeIndex);
            const tgtS = 1.0 - (scaleTransition * 0.3); 
            const tgtTx = W / 2;
            const tgtTy = H / 2;
            
            cameraS += (tgtS - cameraS) * 0.035;
            cameraTx += (tgtTx - cameraTx) * 0.035;
            cameraTy += (tgtTy - cameraTy) * 0.035;
            
            ctx!.save();
            ctx!.translate(W / 2, H / 2);
            ctx!.scale(cameraS, cameraS);
            ctx!.translate(-cameraTx, -cameraTy);
            const targetShape = Math.round(floatShapeIndex);
            
            const shapeDist = Math.abs(floatShapeIndex - targetShape); 
            const transitionScale = 1.0 - (shapeDist * 0.8); 
            const baseR = (Math.min(W, H) * 0.35) * Math.max(0.1, transitionScale);

            const twistDir = (Math.floor(floatShapeIndex) % 2 === 0) ? 1 : -1;
            const swirlStrength = Math.pow(shapeDist * 2.0, 2.0); 

            if (targetShape === 0) {
                const eDistX = (mouse.x - cx) / (W/2);
                const eDistY = (mouse.y - cy) / (H/2);
                eyeTrackX += (Math.max(-1, Math.min(1, eDistX)) - eyeTrackX) * 0.1;
                eyeTrackY += (Math.max(-1, Math.min(1, eDistY)) - eyeTrackY) * 0.1;
            }

            rot.targetX = scrollFraction < 0.02 ? 0 : (mouse.x - cx) / W * 0.4; 
            rot.targetY = scrollFraction < 0.02 ? 0 : (mouse.y - cy) / H * 0.4;
            rot.x += (rot.targetX - rot.x) * 0.05; 
            rot.y += (rot.targetY - rot.y) * 0.05;

            dots.forEach(d => {
                const rdx = d.baseX - cx;
                const rdy = d.baseY - cy;
                
                let isS = false;
                let tx = cx + rdx; 
                let ty = cy + rdy; 
                let ts = 0.6; 

                if (isInsideShape(targetShape, rdx, rdy, baseR, time)) {
                    isS = true; 
                    tx = cx + rdx * Math.cos(rot.x) - rdy * Math.sin(rot.y) * 0.4;
                    ty = cy + rdy * Math.cos(rot.y) + rdx * Math.sin(rot.x) * 0.4;
                    ts = Math.min(3.5, 2.5 * transitionScale); 
                }

                if (swirlStrength > 0.01) {
                    const distFromCenter = Math.hypot(tx - cx, ty - cy) / (W/2);
                    const twistAngle = twistDir * swirlStrength * Math.PI * 1.5 * (1.1 - distFromCenter);
                    
                    const rotatedTx = cx + (tx - cx)*Math.cos(twistAngle) - (ty - cy)*Math.sin(twistAngle);
                    const rotatedTy = cy + (tx - cx)*Math.sin(twistAngle) + (ty - cy)*Math.cos(twistAngle);
                    tx = rotatedTx;
                    ty = rotatedTy;
                }

                d.x += (tx - d.x) * (isS ? 0.3 : 0.05); 
                d.y += (ty - d.y) * (isS ? 0.3 : 0.05);
                
                const ar = ts + Math.sin(time*2 + d.angleOffset)*0.4;
                const distM = Math.hypot(mouse.x - d.x, mouse.y - d.y);
                
                if (!isS && distM < 45) {
                    d.x -= (mouse.x - d.x) / (distM||1) * ((45 - distM) / 45) * 2.5;
                    d.y -= (mouse.y - d.y) / (distM||1) * ((45 - distM) / 45) * 2.5;
                }
                
                const nx = (d.x - cx) / (W/2), ny = (d.y - cy) / (H/2), r2 = nx*nx + ny*ny;
                if (ar > 0.5) {
                    ctx!.beginPath(); 
                    ctx!.arc(cx + nx * W/2 * (1.0 + r2 * 0.05), cy + ny * H/2 * (1.0 + r2 * 0.05), ar, 0, Math.PI * 2); 
                    ctx!.fillStyle = `rgba(255,255,255,${isS ? 0.95 : 0.2})`; 
                    ctx!.fill();
                }
            });
            
            ctx!.restore(); 
            rafId = requestAnimationFrame(draw);
        }

        const handlePointer = (e: MouseEvent | TouchEvent) => {
            const rect = canvas.getBoundingClientRect();
            let clientX = 0;
            let clientY = 0;
            if ('touches' in e) {
                clientX = e.touches[0].clientX;
                clientY = e.touches[0].clientY;
            } else {
                clientX = (e as MouseEvent).clientX;
                clientY = (e as MouseEvent).clientY;
            }
            mouse.x = clientX - rect.left;
            mouse.y = clientY - rect.top;
            lastMouseTime = performance.now();
            idleAnimIndex = 0; 
        };

        let st: any = null;

        if (isExpanded) {
            gsap.registerPlugin(ScrollTrigger);
            st = ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top top",
                end: "bottom bottom",
                scrub: true,
                onUpdate: (self) => {
                    scrollFraction = self.progress;
                }
            });
        }

        window.addEventListener('mousemove', handlePointer);
        window.addEventListener('touchmove', handlePointer, { passive: true });
        window.addEventListener('resize', resize);
        
        resize(); 
        draw();

        return () => {
            cancelAnimationFrame(rafId);
            if (st) st.kill();
            window.removeEventListener('mousemove', handlePointer);
            window.removeEventListener('touchmove', handlePointer);
            window.removeEventListener('resize', resize);
        };
    }, [isExpanded]);

    return (
        <section className={isExpanded ? styles.containerExpanded : styles.containerCollapsed} ref={containerRef}>
            <div className={isExpanded ? styles.pinWrapperExpanded : styles.pinWrapperCollapsed}>
                <div id="impact-dots-bg" className={styles.impactDotsBg} ref={bgRef}>
                    <canvas 
                        ref={canvasRef} 
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'all', zIndex: 1 }} 
                    />
                </div>

                <div className={styles.tvOverlay}>
                    <div className={styles.tvVignette}></div>
                    <div className={styles.tvScanlines}></div>
                    <div className={styles.tvGrain}></div>
                    <div className={styles.tvRoll}></div>
                </div>

                {isExpanded ? (
                    <div className={styles.scrollIndicators} style={{ opacity: 1 }}>
                        SCROLL TO EVOLVE
                    </div>
                ) : (
                    <div className={styles.scrollIndicators}>
                        <button className={styles.expandButton} onClick={() => setIsExpanded(true)}>
                            Expand To Evolve
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

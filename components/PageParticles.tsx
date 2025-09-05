import React, { useRef, useEffect } from 'react';

const PageParticles: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const particleCount = 400; // Denser dust effect
        const colors = ['#a78bfa', '#818cf8', '#ffffff'];

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleResize = () => {
            if (canvas) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            }
        };
        window.addEventListener('resize', handleResize);

        class Particle {
            x: number;
            y: number;
            size: number;
            initialSize: number;
            speedX: number;
            speedY: number;
            color: string;
            life: number;
            maxLife: number;

            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = -Math.random() * 20;
                this.initialSize = Math.random() * 2 + 0.5; // Smaller, more dust-like particles
                this.size = this.initialSize;
                this.speedX = (Math.random() - 0.5) * 1.0; // Gentle horizontal drift
                this.speedY = Math.random() * 1.0 + 0.5; // Slower, more gentle fall
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.maxLife = Math.random() * 200 + 300; // Longer life to reach bottom
                this.life = this.maxLife;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 1;
                // Shrink particle as it ages/falls to create a dispersing effect
                this.size = Math.max(0, this.initialSize * (this.life / this.maxLife));
            }

            draw() {
                if (!ctx || this.size <= 0.1) return;
                ctx.save();
                ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
                ctx.fillStyle = this.color;
                ctx.shadowColor = this.color;
                ctx.shadowBlur = 10; // Stronger glow
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        const createParticles = () => {
            for (let i = 0; i < particleCount; i++) {
                setTimeout(() => {
                    if (canvasRef.current) { // Ensure component is still mounted
                        particles.push(new Particle());
                    }
                }, i * 5); // Stagger creation for a shower effect
            }
        };

        createParticles();

        const animate = () => {
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                     if (p.life > 0 && p.y < canvas.height + p.size && p.x > -p.size && p.x < canvas.width + p.size) {
                        p.update();
                        p.draw();
                    } else {
                        particles.splice(i, 1);
                    }
                }
            }

            if (particles.length > 0) {
                animationFrameId = requestAnimationFrame(animate);
            }
        };
        
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef} className="fixed top-0 left-0 h-full w-full pointer-events-none z-0" />;
};

export default PageParticles;
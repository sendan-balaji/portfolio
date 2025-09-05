
import React, { useRef, useEffect } from 'react';

interface ParticlesProps {
    isAnimating: boolean;
}

const Particles: React.FC<ParticlesProps> = ({ isAnimating }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const particleCount = 50;
        const colors = ['#a78bfa', '#818cf8', '#ffffff'];

        canvas.width = 80; // Corresponds to w-20
        canvas.height = window.innerHeight;

        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;
            life: number;
            maxLife: number;

            constructor(x: number, y: number) {
                this.x = x;
                this.y = y;
                this.size = Math.random() * 3 + 1;
                this.speedX = Math.random() * 4 - 1; // move mostly right
                this.speedY = Math.random() * 4 - 2;
                this.color = colors[Math.floor(Math.random() * colors.length)];
                this.maxLife = Math.random() * 60 + 40; // longer life
                this.life = this.maxLife;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.life -= 1;
            }

            draw() {
                if (!ctx) return;
                ctx.globalAlpha = Math.max(0, this.life / this.maxLife);
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            }
        }

        const createParticles = () => {
             if (particles.length === 0) {
                for (let i = 0; i < particleCount; i++) {
                    particles.push(new Particle(Math.random() * canvas.width, Math.random() * canvas.height));
                }
            }
        };

        if (isAnimating) {
            createParticles();
        }

        const animate = () => {
            if (ctx) {
               ctx.clearRect(0, 0, canvas.width, canvas.height);
                for (let i = particles.length - 1; i >= 0; i--) {
                    const p = particles[i];
                    if (p.life > 0) {
                        p.update();
                        p.draw();
                    } else {
                        particles.splice(i, 1);
                    }
                }
            }
            animationFrameId = requestAnimationFrame(animate);
        };
        
        animate();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [isAnimating]);

    return <canvas ref={canvasRef} className="absolute top-0 left-0 h-full w-full pointer-events-none z-10" />;
};

export default Particles;

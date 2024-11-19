import React, { useRef, useEffect, FC } from 'react';
import classes from "./MyConfettiAnimation.module.css";

type TConfettiShapes = 'square' | 'circle' | 'triangle' | 'spiral'

type TConfettiParticle = {
    x: number,
    y: number,
    size: number,
    color: string,
    xForceIntensity: number,
    yForceIntensity: number,
    rotation: number,
    rotationSpeed: number,
    shape: TConfettiShapes
};

type TMyConfettiAnimationProps = {
    startingPoint: { x: number; y: number },
    isStarted: boolean,
    stopAnimation: () => void,
    confettiCount?: number
};

const ConfettiCanvas: FC<TMyConfettiAnimationProps> = ({
    startingPoint,
    isStarted,
    stopAnimation,
    confettiCount = 20
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const animationFrameId = useRef<number | null>(null)

    useEffect(() => {
        if (!isStarted) return

        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        const confettiArray: TConfettiParticle[] = []

        canvas.width = window.innerWidth
        canvas.height = window.innerHeight

        // Initialize confetti particles
        const shapes: TConfettiParticle['shape'][] = ['square', 'circle', 'triangle', 'spiral']
        for (let i = 0; i < confettiCount; i++) {
            confettiArray.push({
                x: startingPoint.x,
                y: startingPoint.y,
                size: Math.random() * 10 + 10,
                color: `hsl(${Math.random() * 360}, 80%, 60%)`,
                xForceIntensity: 0.5 - Math.random(),
                yForceIntensity: -Math.random(),
                rotation: Math.random() * 360,
                rotationSpeed: Math.random() * 10 - 5,
                shape: shapes[Math.floor(Math.random() * shapes.length)],
            })
        }

        const drawShape = (particle: TConfettiParticle) => {
            switch (particle.shape) {
                case 'square':
                    ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size)
                    break
                case 'circle':
                    ctx.beginPath()
                    ctx.arc(0, 0, particle.size / 2, 0, Math.PI * 2)
                    ctx.fill()
                    break
                case 'triangle':
                    ctx.beginPath()
                    ctx.moveTo(0, -particle.size / 2)
                    ctx.lineTo(particle.size / 2, particle.size / 2)
                    ctx.lineTo(-particle.size / 2, particle.size / 2)
                    ctx.closePath()
                    ctx.fill()
                    break;
                case 'spiral':
                    ctx.beginPath();
                    for (let i = 0; i < particle.size * 4; i++) {
                        const angle = 0.1 * i
                        const x = (particle.size / 4) * angle * Math.cos(angle)
                        const y = (particle.size / 4) * angle * Math.sin(angle)
                        ctx.lineTo(x, y)
                    }
                    ctx.strokeStyle = particle.color
                    ctx.stroke()
                    break
                default:
                    break
            }
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height)

            const gravityForce = 0.01
            const horizontalGravityForce = 0.0005

            const yForceMultiplier = 10
            const xForceMultiplier = 10

            confettiArray.forEach((confetti, confettiId) => {
                ctx.save()

                ctx.translate(confetti.x + confetti.size / 2, confetti.y + confetti.size / 2)
                ctx.rotate((confetti.rotation * Math.PI) / 180)

                ctx.fillStyle = confetti.color
                ctx.strokeStyle = confetti.color
                drawShape(confetti)

                ctx.restore()

                // Update particle position and forces
                confetti.y += confetti.yForceIntensity * yForceMultiplier
                confetti.x += confetti.xForceIntensity * xForceMultiplier
                confetti.rotation += confetti.rotationSpeed

                // Apply gravity and friction
                confetti.yForceIntensity += gravityForce
                confetti.xForceIntensity > 0
                    ? (confetti.xForceIntensity -= horizontalGravityForce)
                    : (confetti.xForceIntensity += horizontalGravityForce)

                // Remove particles that are out of bounds
                if (confetti.x > canvas.width || confetti.y > canvas.height) {
                    confettiArray.splice(confettiId, 1)
                }

                // Stop animation if no confetti remains
                if (confettiArray.length === 0) {
                    stopAnimation()
                }
            });

            animationFrameId.current = requestAnimationFrame(draw)
        }

        draw()

        // stop animation and clear canvas on cleanup
        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current)
            }
        }
    }, [isStarted])

    return <canvas ref={canvasRef} className={classes["confetti-canvas"]}></canvas>
};

export default ConfettiCanvas

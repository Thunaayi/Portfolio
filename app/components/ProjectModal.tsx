"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
};

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const [mounted, setMounted] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    if (!mounted || !isOpen || !project) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md transition-opacity duration-300"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Modal Content */}
            <div
                ref={contentRef}
                className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-3xl border border-white/10 bg-gray-900/40 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-300 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                style={{
                    boxShadow: '0 0 0 1px rgba(255, 255, 255, 0.08), 0 20px 60px -10px rgba(0, 0, 0, 0.5)',
                    backgroundColor: 'var(--route-back-bg, rgba(15, 23, 42, 0.6))'
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors border border-white/10 text-white/70 hover:text-white"
                    aria-label="Close modal"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className="p-6 md:p-10 space-y-8">
                    {/* Header */}
                    <header className="space-y-4">
                        <h2 id="modal-title" className="text-3xl md:text-4xl font-bold tracking-tight text-white/95" style={{ fontFamily: 'var(--route-heading-font-family)' }}>
                            {project.title}
                        </h2>
                        <div className="flex flex-wrap gap-2 text-sm">
                            {project.tech.map((t) => (
                                <span key={t} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/80">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </header>

                    {/* Body */}
                    <div className="space-y-8 text-white/80 leading-relaxed text-base md:text-lg">
                        {project.details?.map((section, idx) => (
                            <section key={idx} className="space-y-3">
                                <h3 className="text-xl font-semibold text-white/90" style={{ fontFamily: 'var(--route-heading-font-family)' }}>
                                    {section.title}
                                </h3>
                                <ul className="space-y-2 list-none">
                                    {section.content.map((paragraph, pIdx) => (
                                        <li key={pIdx} className="text-white/70">
                                            {paragraph.startsWith('**') ? (
                                                <span dangerouslySetInnerHTML={{
                                                    __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                                                }} />
                                            ) : (
                                                paragraph
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        ))}

                        {!project.details && (
                            <div className="space-y-4">
                                <p className="text-white/70">{project.summary}</p>
                                <p className="text-white/70">{project.impact}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

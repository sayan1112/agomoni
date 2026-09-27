import React, { useState } from 'react';
import { X, Copy, Check, Linkedin, Instagram, ArrowRight } from 'lucide-react';

const DEVELOPER = {
  name: 'Sayan Dutta',
  photo: '/Dev image/sayan.jpg',
  role: 'Creator & Developer',
  linkedin: 'https://www.linkedin.com/in/sayan-dutta111',
  instagram: 'https://www.instagram.com/sayannn__111/',
};

export default function DevelopersModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop matching PlaylistsModal */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Centered Modal Container exactly like PlaylistsModal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 pointer-events-none">
        <div className="pointer-events-auto w-full max-w-lg flex flex-col rounded-3xl border border-white/15 bg-[#14151c]/92 backdrop-blur-2xl backdrop-saturate-150 shadow-[0_20px_60px_rgba(0,0,0,0.7)] animate-scale-in overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-5 pb-3 pt-5">
            <h2 className="font-tagline text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              About the Developer
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition hover:bg-white/15 hover:text-white active:scale-95 cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>

          {/* Subtitle / Description */}
          <p className="px-5 pt-2 text-[11px] text-white/45">
            Crafted with passion for Durga Pujo
          </p>

          {/* Profile Body */}
          <div className="flex flex-col items-center px-6 pt-5 pb-7 text-center">
            {/* Glowing Avatar */}
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-[#f1d449]/40 bg-white/10 shadow-[0_0_24px_rgba(241,212,73,0.25)]">
              <img
                src={DEVELOPER.photo}
                alt={DEVELOPER.name}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Name & Role */}
            <h3 className="mt-3.5 text-base sm:text-lg font-semibold text-white tracking-wide">
              {DEVELOPER.name}
            </h3>
            <p className="mt-0.5 text-xs font-medium text-[#f1d449]/90 tracking-wider uppercase font-tagline">
              {DEVELOPER.role}
            </p>

            {/* Social Buttons Styled in the same aesthetic as playlist buttons */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href={DEVELOPER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-medium text-white transition hover:scale-105 active:scale-95 shadow-sm"
              >
                <Linkedin size={14} className="text-[#0a66c2]" />
                <span>LinkedIn</span>
              </a>

              <a
                href={DEVELOPER.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 hover:bg-white/20 px-4 py-2 text-xs font-medium text-white transition hover:scale-105 active:scale-95 shadow-sm"
              >
                <Instagram size={14} className="text-[#e4405f]" />
                <span>Instagram</span>
              </a>
            </div>

            {/* Bottom Connect Action */}
            <div className="mt-6 w-full max-w-xs border-t border-white/10 pt-4 flex flex-col items-center">
              <a
                href={DEVELOPER.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/12 px-5 py-2 text-xs font-medium text-white/80 transition active:scale-95"
              >
                <span>Say Hi on LinkedIn</span>
                <ArrowRight size={13} className="text-[#f1d449]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

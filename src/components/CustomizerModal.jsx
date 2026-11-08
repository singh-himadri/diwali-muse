import React, { useState } from 'react';
import { X, Copy, Check, Share2, Sparkles, Heart } from 'lucide-react';
import { encodeWishToUrl } from '../data/defaultWish';

export default function CustomizerModal({ wish, onSave, onClose }) {
  const [formData, setFormData] = useState({ ...wish });
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(encodeWishToUrl(wish));

  const handleChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    setShareUrl(encodeWishToUrl(updated));
  };

  const handleReasonChange = (index, subField, value) => {
    const newReasons = [...formData.reasons];
    newReasons[index] = { ...newReasons[index], [subField]: value };
    const updated = { ...formData, reasons: newReasons };
    setFormData(updated);
    setShareUrl(encodeWishToUrl(updated));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppShare = () => {
    const text = encodeURIComponent(
      `Happy Diwali, ${formData.to}! ✨ I made a special festival gift just for you, touch to open: ${shareUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const handleApply = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl max-h-[92dvh] bg-[#120d0c] border border-amber-500/50 rounded-2xl sm:rounded-3xl p-4 sm:p-7 shadow-2xl overflow-y-auto text-amber-100 select-none">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 p-1.5 text-amber-400/70 hover:text-amber-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center mb-4 sm:mb-6 pr-6">
          <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs font-cinzel text-amber-400 font-bold tracking-widest uppercase">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Customize Her Diwali Gift</span>
            <Sparkles className="w-3 h-3 text-amber-400" />
          </div>
          <h2 className="text-xl sm:text-2xl font-decorative text-gold-gradient font-bold mt-1">
            Personalize Every Detail
          </h2>
          <p className="text-[10px] sm:text-xs text-amber-200/60 font-sans mt-0.5">
            Create a unique link to send directly to her on WhatsApp
          </p>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] sm:text-xs font-cinzel text-amber-300 mb-1">
                Her Name / Nickname (To)
              </label>
              <input
                type="text"
                value={formData.to}
                onChange={(e) => handleChange('to', e.target.value)}
                placeholder="e.g. Meri Jaan / Simran"
                className="w-full px-3 py-2 rounded-xl bg-stone-900/90 border border-amber-500/30 text-amber-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-[11px] sm:text-xs font-cinzel text-amber-300 mb-1">
                Your Name (From)
              </label>
              <input
                type="text"
                value={formData.from}
                onChange={(e) => handleChange('from', e.target.value)}
                placeholder="e.g. Himadri"
                className="w-full px-3 py-2 rounded-xl bg-stone-900/90 border border-amber-500/30 text-amber-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-cinzel text-amber-300 mb-1">
              Sky Lantern Wish (Written on rising lantern)
            </label>
            <input
              type="text"
              value={formData.lanternWish}
              onChange={(e) => handleChange('lanternWish', e.target.value)}
              placeholder="A heartfelt wish for the two of you"
              className="w-full px-3 py-2 rounded-xl bg-stone-900/90 border border-amber-500/30 text-amber-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-cinzel text-amber-300 mb-1">
              Love Letter Note
            </label>
            <textarea
              rows="4"
              value={formData.letter}
              onChange={(e) => handleChange('letter', e.target.value)}
              placeholder="Write your personal heartfelt message..."
              className="w-full px-3 py-2 rounded-xl bg-stone-900/90 border border-amber-500/30 text-amber-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400 leading-relaxed font-serif-festive"
            />
          </div>

          <div>
            <label className="block text-[11px] sm:text-xs font-cinzel text-amber-300 mb-1">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              value={formData.photoUrl || ''}
              onChange={(e) => handleChange('photoUrl', e.target.value)}
              placeholder="https://example.com/photo.jpg (leave blank for none)"
              className="w-full px-3 py-2 rounded-xl bg-stone-900/90 border border-amber-500/30 text-amber-100 text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* 5 Reasons Section */}
          <div className="pt-1">
            <label className="block text-[11px] sm:text-xs font-cinzel text-amber-300 font-bold mb-1.5">
              5 Reasons She Lights Up Your Life:
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
              {formData.reasons.map((r, idx) => (
                <div
                  key={idx}
                  className="p-2 rounded-xl bg-stone-900/70 border border-amber-500/20 text-xs"
                >
                  <div className="flex gap-1.5 mb-1">
                    <input
                      type="text"
                      value={r.icon}
                      onChange={(e) => handleReasonChange(idx, 'icon', e.target.value)}
                      className="w-9 px-1.5 py-1 rounded bg-stone-800 text-center text-xs border border-amber-500/30"
                    />
                    <input
                      type="text"
                      value={r.title}
                      onChange={(e) => handleReasonChange(idx, 'title', e.target.value)}
                      placeholder="Title"
                      className="flex-1 px-2 py-1 rounded bg-stone-800 text-amber-200 font-bold text-xs border border-amber-500/30"
                    />
                  </div>
                  <input
                    type="text"
                    value={r.detail}
                    onChange={(e) => handleReasonChange(idx, 'detail', e.target.value)}
                    placeholder="Why this lights up your life..."
                    className="w-full px-2 py-1 rounded bg-stone-800 text-amber-100/90 text-xs border border-amber-500/30"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Shareable Link Box */}
          <div className="mt-4 p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30">
            <span className="text-[10px] sm:text-[11px] font-cinzel font-bold text-amber-300 block mb-1">
              Your Personalized Shareable Link:
            </span>
            <div className="flex items-center gap-1.5">
              <input
                type="text"
                readOnly
                value={shareUrl}
                className="flex-1 px-2.5 py-1.5 rounded-lg bg-stone-900 text-amber-200/80 text-[11px] font-mono truncate border border-amber-500/20"
              />
              <button
                onClick={handleCopy}
                className="px-2.5 py-1.5 rounded-lg bg-amber-500 text-stone-950 font-bold text-xs flex items-center gap-1 hover:bg-amber-400 transition-colors shrink-0"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-amber-500/20">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-cinzel font-bold text-xs transition-colors shadow-md"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>WhatsApp Share</span>
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={onClose}
              className="px-3.5 py-2 rounded-xl border border-amber-500/40 text-amber-200 text-xs font-cinzel font-semibold hover:bg-amber-950/40 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-stone-950 font-cinzel font-bold text-xs hover:brightness-110 shadow-md transition-all"
            >
              Apply ✨
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

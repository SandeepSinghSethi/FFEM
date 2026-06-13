import { useState } from 'react'
import { generateAlert } from '../utils/riskEngine'
import { Send, Copy, Check, Smartphone, AlertTriangle } from 'lucide-react'

export default function AlertSimulator({ district }) {
  const [alert, setAlert] = useState(null)
  const [copied, setCopied] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setCopied(false)

    // Simulate network delay for realism
    setTimeout(() => {
      const result = generateAlert({
        location: `${district.name}, ${district.stateName}`,
        riskTier: district.tier,
        safeZoneName: 'Nearest Safe Zone',
        forecastWindowHours: district.forecastWindowHours,
      })
      setAlert(result)
      setIsGenerating(false)
    }, 600)
  }

  const handleCopy = async () => {
    if (alert) {
      await navigator.clipboard.writeText(alert.alertText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  return (
    <div className="glass-surface p-6 animate-fade-in-up animate-delay-400">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
          Alert Simulator
        </h3>
        <Smartphone className="w-4 h-4 text-white/20" />
      </div>

      <p className="text-xs text-white/40 mb-4">
        Generate SMS-formatted emergency alerts for dispatch to district officers and emergency services.
      </p>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#5ed29c] text-[#070b0a] font-bold text-sm uppercase tracking-wide hover:bg-[#4ecdc4] transition-all disabled:opacity-60 disabled:cursor-not-allowed glow-btn"
        id="generate-alert-btn"
      >
        {isGenerating ? (
          <>
            <div className="w-4 h-4 border-2 border-[#070b0a]/30 border-t-[#070b0a] rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Generate Alert
          </>
        )}
      </button>

      {/* Alert output */}
      {alert && (
        <div className="mt-4 space-y-3">
          {/* Phone frame mockup */}
          <div className="phone-frame mx-auto">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/[0.06]">
              <AlertTriangle className="w-4 h-4 text-[#ff4444]" />
              <span className="text-xs font-bold text-white/80 uppercase tracking-wider">
                Emergency SMS
              </span>
            </div>
            <pre className="text-xs text-white/80 font-mono whitespace-pre-wrap leading-relaxed">
              {alert.alertText}
            </pre>
            <div className="mt-3 pt-2 border-t border-white/[0.06]">
              <span className="text-[10px] text-white/30">
                {new Date().toLocaleTimeString()} · FlashFlood Matrix
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-white/[0.05] border border-white/[0.08] text-xs font-semibold text-white/70 hover:bg-white/[0.08] transition-all"
              id="copy-alert-btn"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#5ed29c]" />
                  <span className="text-[#5ed29c]">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  Copy Alert
                </>
              )}
            </button>
          </div>

          {/* SMS Summary */}
          <div className="p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[10px] text-white/30 uppercase tracking-wider block mb-1">
              SMS Summary (160 chars)
            </span>
            <p className="text-xs text-white/60 font-mono">{alert.smsSummary}</p>
          </div>
        </div>
      )}
    </div>
  )
}

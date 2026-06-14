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
    <div className="glass-surface p-5 sm:p-6 animate-fade-in-up animate-delay-400">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-[11px] font-bold text-white/40 uppercase tracking-[0.15em]">
          Alert Simulator
        </h3>
        <div className="w-7 h-7 rounded-lg bg-white/[0.03] flex items-center justify-center">
          <Smartphone className="w-3.5 h-3.5 text-white/20" />
        </div>
      </div>

      <p className="text-[12px] text-white/35 mb-4 leading-relaxed">
        Generate SMS-formatted emergency alerts for dispatch to district officers and emergency services.
      </p>

      {/* Generate button */}
      <button
        onClick={handleGenerate}
        disabled={isGenerating}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#5ed29c] text-[#070b0a] font-bold text-[13px] uppercase tracking-wide hover:bg-[#4ecdc4] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed glow-btn"
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
        <div className="mt-4 space-y-3 animate-fade-in-up">
          {/* Phone frame mockup */}
          <div className="phone-frame mx-auto">
            <div className="flex items-center gap-2 mb-3 pb-2.5 border-b border-white/[0.05]">
              <AlertTriangle className="w-3.5 h-3.5 text-[#ff4444]" />
              <span className="text-[10px] font-bold text-white/70 uppercase tracking-[0.15em]">
                Emergency SMS
              </span>
            </div>
            <pre className="text-[11px] text-white/75 font-mono whitespace-pre-wrap leading-relaxed">
              {alert.alertText}
            </pre>
            <div className="mt-3 pt-2.5 border-t border-white/[0.05]">
              <span className="text-[9px] text-white/25 font-mono">
                {new Date().toLocaleTimeString()} · FlashFlood Matrix
              </span>
            </div>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.06] text-[12px] font-semibold text-white/60 hover:bg-white/[0.06] hover:border-white/[0.1] transition-all duration-300"
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

          {/* SMS Summary */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
            <span className="text-[9px] text-white/25 uppercase tracking-[0.12em] font-bold block mb-1.5">
              SMS Summary (160 chars)
            </span>
            <p className="text-[11px] text-white/50 font-mono leading-relaxed">{alert.smsSummary}</p>
          </div>
        </div>
      )}
    </div>
  )
}

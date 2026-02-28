/* eslint-disable @typescript-eslint/no-unused-vars */
// src/hooks/usePDFExport.ts
// ═══════════════════════════════════════════════════════════════
//  BULLETPROOF PDF EXPORT — Blob URL + Hidden iframe method
//  WHY THIS WORKS:
//  1. No popup (window.open) — browser can't block it
//  2. No CDN required — works offline
//  3. LivePreview uses 100% inline styles → perfect clone
//  4. Blob URL bypasses CORS & CSP issues
//  5. Hidden iframe print = only resume prints, page hidden
// ═══════════════════════════════════════════════════════════════

import { useCallback } from 'react'
import toast from 'react-hot-toast'

export function usePDFExport() {

  const exportPDF = useCallback((resumeTitle: string) => {

    const previewEl = document.getElementById('resume-preview-content')
    if (!previewEl) {
      toast.error('Please switch to Preview tab first!')
      return
    }

    const tid = toast.loading('Preparing PDF…')

    try {
      // 1. Deep clone resume HTML — inline styles make it self-contained
      const cloned = previewEl.cloneNode(true) as HTMLElement
      cloned.style.cssText = 'width:210mm;min-height:297mm;background:white;margin:0;padding:0;-webkit-print-color-adjust:exact;print-color-adjust:exact;'

      // 2. Full HTML document — zero external dependencies
      const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<title>${(resumeTitle || 'Resume').replace(/[<>"&]/g, '')}</title>
<style>
*,*::before,*::after{
  box-sizing:border-box;
  margin:0;
  padding:0;
  -webkit-print-color-adjust:exact!important;
  print-color-adjust:exact!important;
  color-adjust:exact!important;
}
html,body{
  width:210mm;
  background:#fff;
  margin:0;padding:0;
}
svg{
  display:inline-block!important;
  visibility:visible!important;
  overflow:visible!important;
}
@page{size:A4 portrait;margin:0;}
@media print{
  html,body{width:210mm;height:297mm;overflow:hidden;}
}
</style>
</head>
<body>${cloned.outerHTML}</body>
</html>`

      // 3. Blob URL — no popup blocker, no CORS
      const blob    = new Blob([html], { type: 'text/html;charset=utf-8' })
      const blobUrl = URL.createObjectURL(blob)

      // 4. Remove old iframe
      document.getElementById('__resume_pdf_frame')?.remove()
      document.getElementById('__pdf_print_css')?.remove()

      // 5. Hidden iframe
      const iframe = document.createElement('iframe')
      iframe.id = '__resume_pdf_frame'
      iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:210mm;height:297mm;border:none;opacity:0;pointer-events:none;z-index:-9999;'
      iframe.src = blobUrl
      document.body.appendChild(iframe)

      // 6. CSS: hide everything EXCEPT iframe during print
      const printCss = document.createElement('style')
      printCss.id = '__pdf_print_css'
      printCss.textContent = `
        @media print {
          body > *:not(#__resume_pdf_frame) { display:none!important; visibility:hidden!important; }
          #__resume_pdf_frame {
            position:fixed!important; top:0!important; left:0!important;
            width:210mm!important; height:297mm!important;
            opacity:1!important; z-index:99999!important;
            display:block!important; visibility:visible!important;
          }
          @page { size:A4 portrait; margin:0; }
        }
      `
      document.head.appendChild(printCss)

      // 7. When iframe loads → print
      iframe.onload = () => {
        setTimeout(() => {
          try {
            const prevTitle = document.title
            document.title = resumeTitle || 'Resume'

            window.print()

            const cleanup = () => {
              document.title = prevTitle
              printCss.remove()
              iframe.remove()
              URL.revokeObjectURL(blobUrl)
            }

            window.addEventListener('afterprint', cleanup, { once: true })
            setTimeout(cleanup, 90000) // safety cleanup

            toast.dismiss(tid)
            toast.success('In print dialog → "Save as PDF" to download 📄', { duration: 6000 })
          } catch (e) {
            toast.dismiss(tid)
            toast.error('Use Ctrl+P to print manually')
            printCss.remove()
          }
        }, 600)
      }

      iframe.onerror = () => {
        toast.dismiss(tid)
        toast.error('PDF failed — try Ctrl+P as fallback')
        printCss.remove()
        URL.revokeObjectURL(blobUrl)
      }

    } catch (err) {
      toast.dismiss(tid)
      console.error('PDF error:', err)
      toast.error('PDF export error. Try Ctrl+P.')
    }
  }, [])

  return { exportPDF }
}
// src/hooks/usePDFExport.ts
// ✅ GUARANTEED PDF download — CSS @media print trick
// Works WITHOUT any CDN, popup, or external library
// How it works:
//   1. Clone resume DOM into a hidden #print-portal div
//   2. Add @media print CSS that hides EVERYTHING except #print-portal  
//   3. Call window.print() → browser shows Save as PDF dialog
//   4. After print, cleanup the portal

import { useCallback, useEffect } from 'react'
import toast from 'react-hot-toast'

export function usePDFExport() {

  // Inject print CSS once on mount
  useEffect(() => {
    const styleId = 'resumeai-print-style'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @media print {
        /* Hide EVERYTHING on the page */
        body > *:not(#print-portal) {
          display: none !important;
        }

        /* Show ONLY the portal */
        #print-portal {
          display: block !important;
          position: fixed !important;
          inset: 0 !important;
          z-index: 999999 !important;
          background: white !important;
        }

        /* A4 page setup */
        @page {
          size: A4 portrait;
          margin: 0;
        }

        html, body {
          width: 210mm !important;
          height: 297mm !important;
          margin: 0 !important;
          padding: 0 !important;
          overflow: hidden !important;
        }

        /* Ensure colors & gradients print correctly */
        * {
          -webkit-print-color-adjust: exact !important;
          print-color-adjust: exact !important;
          color-adjust: exact !important;
        }

        /* SVG icons must show */
        svg {
          display: inline-block !important;
          visibility: visible !important;
        }

        /* Remove shadows for cleaner PDF */
        #print-portal * {
          box-shadow: none !important;
        }
      }

      /* Hide portal during normal view */
      #print-portal {
        display: none;
        position: fixed;
        inset: 0;
        z-index: -1;
        pointer-events: none;
      }
    `
    document.head.appendChild(style)
    return () => style.remove()
  }, [])

  const exportPDF = useCallback((resumeTitle: string) => {
    const source = document.getElementById('resume-preview-content')
    if (!source) {
      toast.error('Resume preview not visible. Switch to Preview tab first!')
      return
    }

    const toastId = toast.loading('Preparing PDF… 📄')

    try {
      // Get or create portal
      let portal = document.getElementById('print-portal')
      if (!portal) {
        portal = document.createElement('div')
        portal.id = 'print-portal'
        document.body.appendChild(portal)
      }

      // Deep-clone the resume into portal
      portal.innerHTML = ''
      const clone = source.cloneNode(true) as HTMLElement
      clone.style.cssText = `
        width: 210mm;
        min-height: 297mm;
        background: white;
        margin: 0;
        padding: 0;
        font-family: system-ui, sans-serif;
        font-size: 9px;
        line-height: 1.5;
        color: #1e293b;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      `
      portal.appendChild(clone)

      // Small delay to ensure DOM is ready
      setTimeout(() => {
        toast.dismiss(toastId)

        // Set page title so PDF file gets the resume name
        const prevTitle = document.title
        document.title = resumeTitle || 'Resume'

        window.print()

        // Restore title and cleanup after dialog closes
        setTimeout(() => {
          document.title = prevTitle
          if (portal) portal.innerHTML = ''
        }, 1000)

        toast.success('Choose "Save as PDF" in the print dialog ✅', {
          duration: 5000,
          icon: '🖨️',
        })
      }, 200)

    } catch (err) {
      toast.dismiss(toastId)
      toast.error('PDF export failed. Please try again.')
      console.error('PDF export error:', err)
    }
  }, [])

  return { exportPDF }
}
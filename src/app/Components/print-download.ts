import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })   // ← THIS was missing, causing injection to fail
export class PrintDownloadService {

  // ── Build full HTML page from the resume element ─────────────────────────
  private buildPrintHtml(resumeEl: HTMLElement, extraCss = ''): string {
    const isModern   = resumeEl.classList.contains('modern');
    const isCreative = resumeEl.classList.contains('creative');
    const needsTable = isModern || isCreative;

    const inlineStyle = resumeEl.getAttribute('style') || '';
    const getVar = (name: string, fallback: string): string => {
      const match = inlineStyle.match(new RegExp(name + ':\\s*([^;]+)'));
      return match ? match[1].trim() : fallback;
    };

    const accent      = getVar('--accent',           '#4f46e5');
    const headingSize = getVar('--heading-size',      '28px');
    const secTitleSz  = getVar('--section-title-sz', '12px');
    const bodySize    = getVar('--body-size',         '13px');
    const headingWt   = getVar('--heading-weight',    '700');
    const secTitleWt  = getVar('--section-title-wt', '700');
    const fontFamily  = getVar('--font-family',       "'Georgia', serif");

    // Collect Angular global styles (ViewEncapsulation.None)
    let collectedStyles = '';
    document.querySelectorAll('style').forEach(s => {
      collectedStyles += s.innerHTML + '\n';
    });

    let bodyHtml = '';

    if (needsTable) {
      const sidebarEl = resumeEl.querySelector('.m-sidebar, .cr-left');
      const mainEl    = resumeEl.querySelector('.m-main, .cr-right');
      const headerEl  = resumeEl.querySelector('.cr-header');

      if (isModern) {
        bodyHtml = `
          <table class="resume-table" cellpadding="0" cellspacing="0">
            <tr>
              <td class="sidebar-cell modern-sidebar">${sidebarEl?.innerHTML || ''}</td>
              <td class="main-cell">${mainEl?.innerHTML || ''}</td>
            </tr>
          </table>`;
      } else if (isCreative) {
        bodyHtml = `
          <div class="resume-doc creative" style="max-width:210mm;">
            ${headerEl?.outerHTML || ''}
            <table class="resume-table" cellpadding="0" cellspacing="0">
              <tr>
                <td class="sidebar-cell creative-sidebar">${sidebarEl?.innerHTML || ''}</td>
                <td class="main-cell creative-main">${mainEl?.innerHTML || ''}</td>
              </tr>
            </table>
          </div>`;
      }
    } else {
      bodyHtml = resumeEl.outerHTML;
    }

    return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Resume</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    @page { margin: 0; size: A4 portrait; }
    *, *::before, *::after { box-sizing: border-box; }
    h1,h2,h3,h4,h5,h6,p { margin: 0; }
    html, body { margin: 0; padding: 0; background: white; font-family: ${fontFamily};
      -webkit-print-color-adjust: exact; print-color-adjust: exact; }

    :root {
      --accent: ${accent}; --heading-size: ${headingSize};
      --section-title-sz: ${secTitleSz}; --body-size: ${bodySize};
      --heading-weight: ${headingWt}; --section-title-wt: ${secTitleWt};
      --font-family: ${fontFamily};
    }

    /* TABLE layout for Modern & Creative */
    .resume-table { width: 210mm; min-height: 297mm; border-collapse: collapse; table-layout: fixed; }

    /* MODERN sidebar */
    .modern-sidebar {
      width: 230px; min-width: 230px; max-width: 230px;
      background: #1e1b4b !important; vertical-align: top; padding: 32px 18px;
      color: white; text-align: center;
      -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important;
    }
    .modern-sidebar .m-avatar-wrap { display: flex; justify-content: center; margin-bottom: 12px; }
    .modern-sidebar .m-photo { width: 90px; height: 90px; border-radius: 50%; object-fit: cover;
      border: 3px solid rgba(255,255,255,0.3); display: block; margin: 0 auto; }
    .modern-sidebar .m-avatar { width: 70px; height: 70px; border-radius: 50%;
      background: linear-gradient(135deg, ${accent}, #818cf8) !important;
      display: flex; align-items: center; justify-content: center;
      font-size: 28px; font-weight: 800; color: white; margin: 0 auto;
      -webkit-print-color-adjust: exact !important; }
    .modern-sidebar .m-name { font-size: 20px; font-weight: ${headingWt}; color: white; text-align: center; margin: 0 0 4px; word-break: break-word; }
    .modern-sidebar .m-title { font-size: 10px; color: #a5b4fc; margin: 0 0 18px; font-style: italic; text-align: center; }
    .modern-sidebar .m-block { margin-bottom: 14px; width: 100%; text-align: left; }
    .modern-sidebar .m-block-title { font-size: 9px; font-weight: 700; letter-spacing: 2px; color: #818cf8;
      margin-bottom: 6px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 3px; }
    .modern-sidebar .m-contact { font-size: 9.5px; color: #c7d2fe; margin-bottom: 4px; line-height: 1.4; word-break: break-all; }
    .modern-sidebar .m-skill-group { margin-bottom: 8px; }
    .modern-sidebar .m-skill-cat { font-size: 8.5px; font-weight: 700; color: #a5b4fc; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .modern-sidebar .m-skill-name { font-size: 10px; color: #e0e7ff; display: block; margin-bottom: 2px; }
    .modern-sidebar .m-skill-bar { height: 3px; background: rgba(255,255,255,0.15) !important; border-radius: 2px; overflow: hidden; -webkit-print-color-adjust: exact !important; }
    .modern-sidebar .m-skill-fill { height: 100%; background: linear-gradient(90deg, ${accent}, #818cf8) !important; border-radius: 2px; -webkit-print-color-adjust: exact !important; }
    .modern-sidebar .m-lang { display: flex; justify-content: space-between; margin-bottom: 4px; }
    .modern-sidebar .m-lang span { font-size: 10px; color: #c7d2fe; }
    .modern-sidebar .m-lang-level { font-size: 9px; color: #818cf8; }
    .modern-sidebar .m-soft-list { display: flex; flex-wrap: wrap; gap: 3px; }
    .modern-sidebar .m-soft-tag { font-size: 9px; color: #c7d2fe; padding: 2px 6px; border-radius: 100px;
      background: rgba(255,255,255,0.1) !important; -webkit-print-color-adjust: exact !important; }

    /* CREATIVE */
    .creative-sidebar { width: 220px; min-width: 220px; max-width: 220px;
      background: #f7f7fa !important; vertical-align: top; padding: 28px 20px;
      border-right: 1px solid #e8e8f0; -webkit-print-color-adjust: exact !important; }
    .creative-main { vertical-align: top; padding: 28px 28px; }
    .cr-entry { display: flex; gap: 0; margin-bottom: 16px; }
    .cr-entry-marker { display: flex; flex-direction: column; align-items: center; margin-right: 12px; flex-shrink: 0; }
    .cr-marker-dot { width: 10px; height: 10px; border-radius: 50%; background: ${accent} !important;
      flex-shrink: 0; margin-top: 4px; -webkit-print-color-adjust: exact !important; }
    .cr-marker-line { width: 2px; flex: 1; background: #e0e0e8; margin-top: 4px; min-height: 20px; }
    .cr-entry-body { flex: 1; }
    .cr-entry-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 5px; }
    .cr-entry-title { font-size: calc(${bodySize} + 1px); font-weight: 700; color: #0f0f1a; margin-bottom: 2px; }
    .cr-entry-org { font-size: ${bodySize}; color: ${accent}; font-style: italic; }
    .cr-entry-date { font-size: 10.5px; color: #999; white-space: nowrap; flex-shrink: 0; text-align: right; }
    .cr-section { margin-bottom: 22px; }
    .cr-section-title { font-size: ${secTitleSz}; font-weight: ${secTitleWt}; color: ${accent};
      letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px;
      padding-left: 10px; border-left: 3px solid ${accent}; -webkit-print-color-adjust: exact !important; }
    .cr-body-text { font-size: ${bodySize}; color: #444; line-height: 1.7; margin: 0; }
    .cr-skill-group { margin-bottom: 10px; }
    .cr-skill-cat { font-size: 10px; font-weight: 700; color: #333; margin-bottom: 5px; text-transform: uppercase; letter-spacing: 0.5px; }
    .cr-skill-pills { display: flex; flex-wrap: wrap; gap: 4px; }
    .cr-skill-pill { font-size: 10.5px; color: ${accent}; background: white; padding: 3px 9px;
      border-radius: 100px; border: 1px solid ${accent}; font-weight: 500; -webkit-print-color-adjust: exact !important; }
    .cr-lang-row { margin-bottom: 8px; }
    .cr-lang-name { font-size: 11.5px; font-weight: 600; color: #333; display: block; margin-bottom: 4px; }
    .cr-lang-bar { height: 4px; background: #e0e0e8; border-radius: 2px; overflow: hidden; -webkit-print-color-adjust: exact !important; }
    .cr-lang-fill { height: 100%; background: ${accent}; border-radius: 2px; -webkit-print-color-adjust: exact !important; }
    .cr-soft-tags { display: flex; flex-wrap: wrap; gap: 5px; }
    .cr-soft-tag { font-size: 10.5px; color: #555; background: white; padding: 3px 9px; border-radius: 6px; border: 1px solid #ddd; }
    .cr-desc { }
    .cr-bullet { font-size: ${bodySize}; color: #444; line-height: 1.65; padding-left: 14px; position: relative; margin-bottom: 2px; min-height: 4px; }
    .cr-bullet.has-bullet::before { content: '•'; position: absolute; left: 0; color: ${accent}; }
    .cr-project-card { background: #f7f7fa !important; border-radius: 8px; border-left: 3px solid ${accent} !important;
      padding: 10px 14px; margin-bottom: 10px; -webkit-print-color-adjust: exact !important; }
    .cr-proj-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 4px; }
    .cr-proj-link { font-size: 10.5px; color: ${accent}; word-break: break-all; }
    .cr-proj-tech { font-size: 11px; color: #888; font-style: italic; margin: 0 0 5px; }

    /* MAIN cell (modern) */
    .main-cell { vertical-align: top; padding: 32px 28px; background: white; color: #1a1a2e; }
    .m-entry { display: flex; gap: 9px; margin-bottom: 13px; }
    .m-entry-dot { width: 8px; height: 8px; border-radius: 50%; background: ${accent} !important;
      flex-shrink: 0; margin-top: 5px; -webkit-print-color-adjust: exact !important; }
    .m-entry-body { flex: 1; }
    .m-entry-top { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
    .m-entry-title { font-size: 13.5px; font-weight: 700; color: #0f0f1a; }
    .m-date { font-size: 10.5px; color: #9ca3af; white-space: nowrap; }
    .m-org { font-size: 11px; color: ${accent}; display: block; margin-top: 1px; font-style: italic; }
    .m-section { margin-bottom: 18px; }
    .m-section-title { font-size: ${secTitleSz}; font-weight: ${secTitleWt}; color: ${accent};
      letter-spacing: 2px; margin-bottom: 10px; border-bottom: 1px solid #ece8ff; padding-bottom: 4px; }
    .m-body { font-size: ${bodySize}; color: #4b5563; line-height: 1.7; }
    .m-desc { margin-top: 4px; }
    .m-bullet { font-size: ${bodySize}; color: #4b5563; line-height: 1.65; padding-left: 13px; position: relative; margin-bottom: 2px; }
    .m-bullet.has-bullet::before { content: '•'; position: absolute; left: 0; color: ${accent}; }
    .m-project { background: #f9f9ff !important; border-left: 3px solid ${accent} !important;
      padding: 9px 11px; border-radius: 0 7px 7px 0; margin-bottom: 10px; -webkit-print-color-adjust: exact !important; }
    .m-proj-header { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 3px; }
    .m-proj-link { font-size: 10px; color: ${accent}; }
    .m-tech { font-size: 10.5px; color: #9ca3af; font-style: italic; margin: 0 0 4px; }

    /* Collected Angular styles (classic, minimal, executive + all others) */
    ${collectedStyles}

    ${extraCss}
  </style>
</head>
<body>${bodyHtml}</body>
</html>`;
  }

  // ── PRINT ────────────────────────────────────────────────────────────────
  print(): void {
    const resumeEl = document.getElementById('resume-print');
    if (!resumeEl) { alert('Resume not found. Please fill in your details first.'); return; }

    const html = this.buildPrintHtml(resumeEl);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(html.replace('</body>', `
      <script>
        window.onload = function() { setTimeout(function() { window.print(); }, 600); };
      </script></body>`));
    printWindow.document.close();
  }

  // ── DOWNLOAD PDF ─────────────────────────────────────────────────────────
  downloadPdf(): void {
    const resumeEl = document.getElementById('resume-print');
    if (!resumeEl) return;

    const html = this.buildPrintHtml(resumeEl);
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(html.replace('</body>', `
      <script>
        window.onload = function() { setTimeout(function() { window.print(); }, 600); };
      </script></body>`));
    printWindow.document.close();
  }

  // ── DOWNLOAD HTML ────────────────────────────────────────────────────────
  downloadHtml(filename = 'resume'): void {
    const resumeEl = document.getElementById('resume-print');
    if (!resumeEl) return;

    const html = this.buildPrintHtml(resumeEl);
    this.triggerDownload(html, `${filename}.html`, 'text/html');
  }

  // ── DOWNLOAD DOC ─────────────────────────────────────────────────────────
  downloadDoc(filename = 'resume'): void {
    const resumeEl = document.getElementById('resume-print');
    if (!resumeEl) return;

    const inlineStyle = resumeEl.getAttribute('style') || '';
    const getVar = (name: string, fallback: string): string => {
      const match = inlineStyle.match(new RegExp(name + ':\\s*([^;]+)'));
      return match ? match[1].trim() : fallback;
    };
    const accent   = getVar('--accent', '#4f46e5');
    const bodySize = getVar('--body-size', '13px');
    const fontFam  = getVar('--font-family', 'Georgia, serif');

    let collectedStyles = '';
    document.querySelectorAll('style').forEach(s => { collectedStyles += s.innerHTML + '\n'; });

    const docHtml = `
<html xmlns:o="urn:schemas-microsoft-com:office:office"
      xmlns:w="urn:schemas-microsoft-com:office:word"
      xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <meta name="ProgId" content="Word.Document">
  <meta name="Generator" content="Microsoft Word 15">
  <title>Resume</title>
  <!--[if gte mso 9]>
  <xml><w:WordDocument><w:View>Print</w:View><w:Zoom>100</w:Zoom></w:WordDocument></xml>
  <![endif]-->
  <style>
    @page { margin: 20mm 18mm; size: A4; }
    body { font-family: ${fontFam}; font-size: ${bodySize}; color: #111; margin: 0; padding: 0; }
    ${collectedStyles}
  </style>
</head>
<body>${resumeEl.outerHTML}</body>
</html>`;

    const blob = new Blob(['\ufeff', docHtml], { type: 'application/msword' });
    this.triggerBlobDownload(blob, `${filename}.doc`);
  }

  // ── DOWNLOAD IMAGE ───────────────────────────────────────────────────────
  async downloadImage(filename = 'resume'): Promise<void> {
    const resumeEl = document.getElementById('resume-print');
    if (!resumeEl) return;

    const html = this.buildPrintHtml(resumeEl, 'body { margin: 0; padding: 20px; background: white; }');

    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'position:fixed;top:-9999px;left:-9999px;width:900px;height:1200px;border:none;';
    document.body.appendChild(iframe);

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) { document.body.removeChild(iframe); return; }

    iframeDoc.open();
    iframeDoc.write(html);
    iframeDoc.close();

    await new Promise(r => setTimeout(r, 1000));

    try {
      const script = iframeDoc.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
      iframeDoc.head.appendChild(script);

      await new Promise<void>((resolve, reject) => {
        script.onload  = () => resolve();
        script.onerror = () => reject();
      });

      await new Promise(r => setTimeout(r, 300));

      const win = iframe.contentWindow as any;
      const canvas = await win.html2canvas(iframeDoc.body, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: 900,
      });

      canvas.toBlob((blob: Blob | null) => {
        if (blob) this.triggerBlobDownload(blob, `${filename}.png`);
        document.body.removeChild(iframe);
      }, 'image/png');

    } catch {
      document.body.removeChild(iframe);
      // Fallback: open in new window with screenshot instructions
      const w = window.open('', '_blank', 'width=950,height=1200');
      if (!w) return;
      w.document.write(html.replace('</body>',
        `<div style="text-align:center;padding:20px;font-family:sans-serif;color:#666;font-size:13px;border-top:1px solid #eee;margin-top:20px;">
          📸 Press <strong>Ctrl+Shift+S</strong> (or use your browser's screenshot tool) to save as image.
        </div></body>`));
      w.document.close();
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  private triggerDownload(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    this.triggerBlobDownload(blob, filename);
  }

  private triggerBlobDownload(blob: Blob, filename: string): void {
    const url = URL.createObjectURL(blob);
    const a   = document.createElement('a');
    a.href     = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
}
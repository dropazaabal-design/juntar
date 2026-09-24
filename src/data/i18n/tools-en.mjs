/**
 * English flagship tools — six pages, not the full 37-page Portuguese
 * footprint. "merge pdf" alone gets 1.7-22M searches/month and iLovePDF
 * sits at Domain Rating 77 with 18M monthly visits; a brand-new domain
 * cannot out-rank that by writing more pages. These pages exist for a
 * different reason: they're the landing spot for English-speaking traffic
 * from Show HN, Product Hunt and AlternativeTo, and for the minority of
 * searches where "client-side, nothing uploaded" is what someone is
 * actually looking for.
 *
 * Same engines as the Portuguese tools (tool.js is already locale-agnostic
 * via i18n.js) — only the copy and the slugs are new.
 */

export const toolsEn = [
  {
    slug: '',
    engine: 'merge',
    icon: 'merge',
    name: 'Merge PDF',
    home: true,
    title: 'Merge PDF Files Online — Free, No Upload',
    description:
      'Combine PDF files in your browser. Nothing is uploaded — open DevTools and check. No sign-up, no watermark, no daily limit.',
    keywords: ['merge pdf', 'combine pdf', 'join pdf online', 'merge pdf free', 'merge pdf no upload'],
    h1: 'Merge PDF files online',
    eyebrow: 'Runs in your browser — nothing is uploaded',
    lede: 'Combine any number of PDFs into one document. The merge happens on your own device, so your files never touch a server.',
    ui: { accept: '.pdf,application/pdf', multiple: true, cta: 'Merge & download PDF', dropTitle: 'Drop your PDFs here', dropHint: 'or tap to choose files' },
    intro:
      '<p>Most free PDF sites work the same way: you upload your file, a server processes it, and you trust a privacy policy that says it gets deleted. This tool does the merge differently — entirely inside your browser tab, using the same open-source library (<a href="https://github.com/Hopding/pdf-lib" rel="nofollow">pdf-lib</a>) that professional PDF editors are built on.</p>',
    sections: [
      {
        h2: 'Why nothing is uploaded, and how to check',
        html: '<p>Open your browser’s developer tools (F12), go to the <strong>Network</strong> tab, and merge two PDFs. You’ll see the page and its scripts load once — and then nothing else. No request carries your file, because pdf-lib and pdf.js are self-hosted on this domain and do the work in memory, in the tab.</p><p>The practical effects: there’s no per-operation cost, so there’s no daily limit, no sign-up wall, and no watermark added to force an upgrade. The tool also keeps working offline after the first visit, since there’s no server round-trip to depend on.</p>',
      },
      {
        h2: 'What stays intact after merging',
        html: '<p>Pages are copied from the source files, not re-rendered, so the result keeps: selectable and searchable text, original image resolution, internal and external links, and each page’s original orientation. Nothing is converted to an image, so nothing loses quality.</p><p>The one thing that doesn’t survive a merge — in this tool or any other — is a digital signature with a certificate: any edit invalidates it, because the signature certifies that exact file. Merge first, sign last.</p>',
      },
    ],
    howto: {
      name: 'How to merge PDF files online',
      description: 'Combine several PDF files into one document using only your browser.',
      totalTime: 'PT1M',
      steps: [
        { name: 'Choose your files', text: 'Drag your PDFs onto the drop zone, or tap it to pick files from your device.' },
        { name: 'Set the order', text: 'Drag the items in the list until the sequence is right — this decides the final page order.' },
        { name: 'Merge and download', text: 'Click "Merge & download PDF". The combined file is generated instantly and the download starts.' },
      ],
    },
    faq: [
      { q: 'Is this really free?', a: 'Yes — no sign-up, no daily limit, no watermark on the output.' },
      { q: 'Are my files uploaded anywhere?', a: 'No. The merge runs entirely in your browser. You can verify this yourself in DevTools → Network: no request carries your file.' },
      { q: 'Is there a file size or page limit?', a: 'No fixed limit like upload-based tools have. The practical ceiling is your device’s memory, which is usually far more generous.' },
      { q: 'Does merging reduce quality?', a: 'No. Pages are copied as-is, without recompression. Text stays selectable and images keep their original resolution.' },
      { q: 'Does it work on mobile?', a: 'Yes, on both Android and iPhone, directly in the browser — no app install needed.' },
      { q: 'Is the source code available?', a: 'Yes, the project is open source. Check the link in the footer.' },
    ],
    related: ['compress-pdf', 'split-pdf', 'jpg-to-pdf', 'pdf-to-word'],
  },

  {
    slug: 'compress-pdf',
    engine: 'compress',
    icon: 'compress',
    name: 'Compress PDF',
    title: 'Compress PDF Online — Free, No Upload',
    description:
      'Shrink a PDF’s file size in your browser, with three compression levels. Nothing is uploaded to a server.',
    keywords: ['compress pdf', 'reduce pdf size', 'shrink pdf', 'compress pdf online free', 'compress pdf no upload'],
    h1: 'Compress PDF online',
    eyebrow: 'Three levels — preview the result before downloading',
    lede: 'Shrink scanned or image-heavy PDFs to a fraction of their size, without sending the file anywhere.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Compress PDF', dropTitle: 'Drop your PDF here', dropHint: 'or tap to choose a file' },
    intro:
      '<p>PDFs are almost always heavy for one reason: images. A scanned page captured at 300 DPI is, to a computer, a large photograph. This tool re-renders each page at a lower resolution and re-encodes it, which is where nearly all the size reduction comes from.</p>',
    sections: [
      {
        h2: 'Choosing a level',
        html: '<table><thead><tr><th>Level</th><th>Resolution</th><th>Good for</th></tr></thead><tbody><tr><td>Light</td><td>~150 DPI</td><td>Documents you’ll still print; smallest quality loss</td></tr><tr><td>Recommended</td><td>~110 DPI</td><td>Email attachments and most upload forms</td></tr><tr><td>Maximum</td><td>~72 DPI</td><td>A hard size limit and screen-only reading</td></tr></tbody></table><p>The tool shows the size before and after so you can compare before downloading. Since everything runs locally, trying another level costs seconds and no re-upload.</p>',
      },
      {
        h2: 'When compression won’t help much',
        html: '<p>A PDF that’s already just text — exported from Word, or generated by a system — has little to compress, because there are no heavy images to re-encode. If a text-only file is still too big, the fix is usually <a href="/en/split-pdf/">splitting it</a>, not compressing it.</p><p>One thing to know: compressing invalidates a digital signature with a certificate, since it produces a new file. Compress before signing, never after.</p>',
      },
    ],
    howto: {
      name: 'How to compress a PDF',
      description: 'Reduce a PDF’s file size directly in your browser.',
      steps: [
        { name: 'Choose your PDF', text: 'Drag the file onto the drop zone or tap it to select a file.' },
        { name: 'Pick a compression level', text: 'Choose light, recommended, or maximum depending on the size you need to hit.' },
        { name: 'Download the result', text: 'Check the before/after size shown on screen, then download the compressed file.' },
      ],
    },
    faq: [
      { q: 'How much can a PDF shrink?', a: 'Scanned documents often drop 70–90%. Text-only PDFs shrink very little, since there are no heavy images to optimise.' },
      { q: 'Does compressing remove selectable text?', a: 'Yes — pages are re-encoded as images, so text becomes unselectable and unsearchable. Keep the original if you need that.' },
      { q: 'Is my file uploaded?', a: 'No, the compression runs entirely in your browser.' },
      { q: 'Does it add a watermark?', a: 'No, the output is clean.' },
    ],
    related: ['', 'split-pdf', 'pdf-to-jpg', 'jpg-to-pdf'],
  },

  {
    slug: 'split-pdf',
    engine: 'split',
    icon: 'split',
    name: 'Split PDF',
    title: 'Split PDF Online — Free, No Upload',
    description:
      'Split a PDF by page range, into single pages, or every N pages — all in your browser, nothing uploaded.',
    keywords: ['split pdf', 'split pdf online', 'split pdf free', 'extract pages from pdf', 'split pdf no upload'],
    h1: 'Split PDF online',
    eyebrow: 'By range, by page, or every N pages',
    lede: 'Break a large PDF into smaller files, or pull out just the pages you need — processed on your own device.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Split & download', dropTitle: 'Drop the PDF you want to split', dropHint: 'or tap to choose a file' },
    intro:
      '<p>Scanned documents tend to come out as one enormous PDF. This tool splits it three ways: by an exact page range, into one file per page, or into fixed-size chunks — whichever matches what you actually need.</p>',
    sections: [
      {
        h2: 'Three ways to split',
        html: '<h3>By page range</h3><p>Type something like <code>1-5, 12, 20-30</code> and get a single PDF with just those pages, in that order.</p><h3>One file per page</h3><p>A 40-page PDF becomes 40 separate, numbered files — useful when each page is its own document.</p><h3>Every N pages</h3><p>Breaks the file into fixed-size blocks: every 10 pages, every 50, whatever you set. When the result is more than one file, everything is delivered in a single <strong>.zip</strong> built in your browser.</p>',
      },
      {
        h2: 'How to write page ranges',
        html: '<table><thead><tr><th>You type</th><th>You get</th></tr></thead><tbody><tr><td><code>3</code></td><td>Just page 3</td></tr><tr><td><code>1-10</code></td><td>Pages 1 through 10</td></tr><tr><td><code>1-3, 7, 15-20</code></td><td>Pages 1, 2, 3, 7, and 15 through 20, in that order</td></tr><tr><td><code>5-</code></td><td>Page 5 to the end of the document</td></tr></tbody></table>',
      },
    ],
    howto: {
      name: 'How to split a PDF file',
      description: 'Split a PDF into multiple files or extract specific pages, directly in your browser.',
      steps: [
        { name: 'Choose the PDF', text: 'Drag the file onto the drop zone or tap it to select one.' },
        { name: 'Pick a split mode', text: 'Choose between page range, one page per file, or blocks of N pages.' },
        { name: 'Download the result', text: 'Click split. Multiple files are delivered together in a .zip built in your browser.' },
      ],
    },
    faq: [
      { q: 'Can I extract just a few pages?', a: 'Yes, use the page range mode and type the numbers, e.g. 1-3, 8, 12-15.' },
      { q: 'Does splitting change the original file?', a: 'No, the original PDF stays untouched on your device — the tool only reads from it to build new files.' },
      { q: 'Is there a page count limit?', a: 'No fixed limit; documents with thousands of pages work fine, within your device’s memory.' },
      { q: 'Are my files uploaded?', a: 'No, splitting happens entirely in the browser.' },
    ],
    related: ['', 'compress-pdf', 'jpg-to-pdf', 'pdf-to-word'],
  },

  {
    slug: 'pdf-to-word',
    engine: 'pdf2docx',
    icon: 'word',
    name: 'PDF to Word',
    title: 'PDF to Word Online — Free, No Upload',
    description:
      'Convert a PDF’s text into an editable .docx file, entirely in your browser. Nothing is sent to a server.',
    keywords: ['pdf to word', 'convert pdf to word', 'pdf to docx', 'pdf to word free', 'pdf to word no upload'],
    h1: 'Convert PDF to Word',
    eyebrow: 'Generates a real .docx — opens in Word, Google Docs, LibreOffice',
    lede: 'Get a PDF’s text back into an editable document — without sending the file to a server most converters rely on.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Convert to Word', dropTitle: 'Drop the PDF here', dropHint: 'or tap to choose a file' },
    intro:
      '<p>A PDF doesn’t store paragraphs or tables the way Word does — it stores character positions on a page. Converting it back means reconstructing structure from that, which every converter does by inference, paid ones included. This tool prioritises what matters most in practice: correct text, in the right order, properly split into paragraphs and pages, editable in a real <code>.docx</code> file.</p>',
    sections: [
      {
        h2: 'What survives the conversion',
        html: '<p>Reliably preserved: the text itself, in reading order; paragraph breaks; page breaks. Rebuilt with some risk: multi-column layouts, bordered tables, and exact image placement — the same limitation every PDF-to-Word tool has, because the source format simply doesn’t encode those as structure.</p><p>If the PDF is a scanned document, there’s no text layer to convert — it’s an image. The tool will tell you that instead of returning an empty file.</p>',
      },
    ],
    howto: {
      name: 'How to convert PDF to Word',
      description: 'Turn a PDF’s text into an editable Word document, directly in your browser.',
      steps: [
        { name: 'Choose the PDF', text: 'Drag the file onto the drop zone or tap it to select one.' },
        { name: 'Convert', text: 'Click convert. The text is read and a .docx file is assembled in your browser.' },
        { name: 'Download and edit', text: 'Open the file in Word, Google Docs, or LibreOffice to edit it.' },
      ],
    },
    faq: [
      { q: 'Will the formatting be identical?', a: 'Text, order, and paragraph/page breaks are preserved. Multi-column layouts and bordered tables are not — that’s a limit of the PDF format itself, not this tool specifically.' },
      { q: 'Does it work on scanned PDFs?', a: 'No — scanned documents are images with no text layer to convert. The tool will tell you when it detects this instead of producing an empty file.' },
      { q: 'Is my document uploaded anywhere?', a: 'No, unlike most PDF-to-Word converters, the conversion happens entirely in your browser.' },
    ],
    related: ['', 'jpg-to-pdf', 'compress-pdf', 'split-pdf'],
  },

  {
    slug: 'jpg-to-pdf',
    engine: 'img2pdf',
    icon: 'image',
    name: 'JPG to PDF',
    title: 'JPG to PDF Online — Free, No Upload',
    description:
      'Turn JPG, PNG or WEBP images into a single PDF, in your browser. Nothing is uploaded.',
    keywords: ['jpg to pdf', 'image to pdf', 'convert jpg to pdf', 'jpg to pdf free', 'photo to pdf'],
    h1: 'Convert JPG to PDF',
    eyebrow: 'Several images → one PDF',
    lede: 'Combine photos of documents, receipts, or scanned pages into one organised PDF, straight from your phone.',
    ui: { accept: 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp', multiple: true, cta: 'Convert & download PDF', dropTitle: 'Drop your images here', dropHint: 'JPG, PNG or WEBP — multiple at once' },
    intro:
      '<p>Photographing a document with your phone is fast, but nobody wants ten loose JPGs in an email. Converting them into a single PDF fixes both sides: one attachment, in the right order, that looks like an actual document.</p>',
    sections: [
      {
        h2: 'Page options',
        html: '<ul><li><strong>Fit:</strong> the image can fill the page edge-to-edge, or sit centred on an A4/Letter page with margins.</li><li><strong>Page size:</strong> A4, Letter, or the image’s own dimensions.</li><li><strong>Orientation:</strong> automatic per image, or fixed for the whole document.</li></ul><p>Order follows the list, so arrange the items before converting. If the result is too heavy to send, run it through <a href="/en/compress-pdf/">Compress PDF</a> afterward.</p>',
      },
    ],
    howto: {
      name: 'How to convert JPG to PDF',
      description: 'Turn one or several JPG, PNG or WEBP images into a PDF file, directly in your browser.',
      steps: [
        { name: 'Select your images', text: 'Drag the photos onto the drop zone or tap it to choose them from your gallery.' },
        { name: 'Set order and layout', text: 'Drag items to set the sequence, and choose page size, margin, and orientation.' },
        { name: 'Download the PDF', text: 'Click convert and download the PDF with all your images.' },
      ],
    },
    faq: [
      { q: 'Can I combine several photos into one PDF?', a: 'Yes, select them all at once, drag to set the order, and convert — you get a single PDF.' },
      { q: 'Does it support PNG and WEBP?', a: 'Yes, alongside JPG, in the same conversion.' },
      { q: 'Do the images lose quality?', a: 'No, they’re inserted at their original resolution.' },
      { q: 'Are my photos uploaded?', a: 'No, the conversion happens entirely on your device.' },
    ],
    related: ['', 'pdf-to-jpg', 'compress-pdf', 'pdf-to-word'],
  },

  {
    slug: 'pdf-to-jpg',
    engine: 'pdf2img',
    icon: 'image',
    name: 'PDF to JPG',
    title: 'PDF to JPG Online — Free, No Upload',
    description:
      'Convert each page of a PDF into a JPG image, at the resolution you choose. Nothing is uploaded.',
    keywords: ['pdf to jpg', 'pdf to image', 'convert pdf to jpg', 'pdf to jpg free', 'pdf to jpg no upload'],
    h1: 'Convert PDF to JPG',
    eyebrow: 'One image per page — adjustable resolution',
    lede: 'Turn PDF pages into images for posting, presentations, or wherever only a picture is accepted.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Convert & download', dropTitle: 'Drop the PDF here', dropHint: 'or tap to choose a file' },
    intro:
      '<p>Not everywhere accepts a PDF. Forms that ask for a "photo of the document," social posts, slide decks, and some older systems only work with images. This converts each page into a JPG.</p>',
    sections: [
      {
        h2: 'Picking a resolution',
        html: '<table><thead><tr><th>Resolution</th><th>Use it for</th></tr></thead><tbody><tr><td>72 DPI</td><td>On-screen viewing, quick previews — smallest files</td></tr><tr><td>150 DPI</td><td>Good default: legible when zoomed, fine for home printing</td></tr><tr><td>300 DPI</td><td>Print-quality output and small text</td></tr></tbody></table><p>A multi-page PDF is delivered as a <strong>.zip</strong> built in your browser; a single page downloads directly as a JPG.</p>',
      },
    ],
    howto: {
      name: 'How to convert PDF to JPG',
      description: 'Turn each page of a PDF into a JPG image, directly in your browser.',
      steps: [
        { name: 'Choose the PDF', text: 'Drag the file onto the drop zone or tap it to select one.' },
        { name: 'Pick a resolution', text: 'Choose 72, 150, or 300 DPI depending on what the image is for.' },
        { name: 'Download the images', text: 'Click convert — multiple pages come as a .zip, a single page downloads directly.' },
      ],
    },
    faq: [
      { q: 'Can I convert just one page?', a: 'Extract the page first with Split PDF, then convert the result.' },
      { q: 'Do the images have a watermark?', a: 'No, the output is clean.' },
      { q: 'Which resolution should I print at?', a: 'Use 300 DPI for quality printing; 150 DPI is enough for on-screen reading.' },
    ],
    related: ['jpg-to-pdf', '', 'compress-pdf', 'pdf-to-word'],
  },
];

export const toolUrlEn = (slug) => (slug === '' ? '/en/' : `/en/${slug}/`);
export const homeToolEn = toolsEn.find((t) => t.home);
export const bySlugEn = new Map(toolsEn.map((t) => [t.slug, t]));

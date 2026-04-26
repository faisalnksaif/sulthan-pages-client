import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'
import '@fontsource/noto-sans-malayalam/400.css'

export type FamilyMember = {
  name?: string
  relation?: string
  age?: string | number
  blood?: string
  baiath?: boolean
  married?: boolean
  edu?: string
  job?: string
}

export type FormSubmissionDetails = {
  id?: string
  recordIdentifier?: string
  name?: string
  phone?: string
  baiathYear?: string
  age?: string | number
  bloodGroup?: string
  permanentAddress?: string
  currentAddress?: string
  education?: string
  job?: string
  hobbies?: string
  lit?: string
  sports?: string
  martial?: string
  cultural?: string
  politics?: string
  position?: string
  deviceIdentifier?: string
  createdAt?: string
  familyMembers?: FamilyMember[]
}

const toDisplayValue = (value: unknown) => {
  const normalized = String(value ?? '').trim()
  return normalized || 'N/A'
}

export const normalizeFamilyMembers = (members: unknown): FamilyMember[] => {
  if (!Array.isArray(members)) {
    return []
  }

  return members.map((member) => {
    const item = typeof member === 'object' && member !== null ? member as FamilyMember : {}
    return {
      name: item.name || '',
      relation: item.relation || '',
      age: item.age || '',
      blood: item.blood || '',
      baiath: Boolean(item.baiath),
      married: Boolean(item.married),
      edu: item.edu || '',
      job: item.job || '',
    }
  })
}

export const extractRecordPayload = (response: any): FormSubmissionDetails | null => {
  if (!response) return null
  if (Array.isArray(response)) return (response[0] || null) as FormSubmissionDetails
  if (response.data) {
    if (Array.isArray(response.data)) return (response.data[0] || null) as FormSubmissionDetails
    return response.data as FormSubmissionDetails
  }
  return response as FormSubmissionDetails
}

const createLabelValueLine = (label: string, value: unknown) => {
  const line = document.createElement('div')
  line.style.fontSize = '12px'
  line.style.lineHeight = '1.5'

  const strong = document.createElement('strong')
  strong.textContent = `${label}: `
  line.appendChild(strong)

  const text = document.createElement('span')
  text.textContent = toDisplayValue(value)
  line.appendChild(text)

  return line
}

const buildPdfContainer = (entry: FormSubmissionDetails) => {
  const container = document.createElement('div')
  container.style.position = 'fixed'
  container.style.left = '-10000px'
  container.style.top = '0'
  container.style.width = '794px'
  container.style.boxSizing = 'border-box'
  container.style.background = '#ffffff'
  container.style.color = '#111827'
  container.style.padding = '50px'
  container.style.fontFamily = '"Noto Sans Malayalam", sans-serif'

  const mainHeader = document.createElement('h1')
  mainHeader.textContent = 'Quthubuzzaman Center'
  mainHeader.style.textAlign = 'center'
  mainHeader.style.fontSize = '24px'
  mainHeader.style.borderBottom = '2px solid #000'
  mainHeader.style.paddingBottom = '10px'
  mainHeader.style.margin = '0'
  container.appendChild(mainHeader)

  const createdMeta = document.createElement('div')
  createdMeta.textContent = `Created Date: ${new Date().toLocaleString()}`
  createdMeta.style.fontSize = '11px'
  createdMeta.style.color = '#6b7280'
  createdMeta.style.marginTop = '8px'
  createdMeta.style.textAlign = 'right'
  container.appendChild(createdMeta)

  const sectionTitle = document.createElement('h2')
  sectionTitle.textContent = 'വ്യക്തിവിവരങ്ങൾ'
  sectionTitle.style.fontSize = '18px'
  sectionTitle.style.marginTop = '20px'
  sectionTitle.style.marginBottom = '8px'
  container.appendChild(sectionTitle)

  const infoGrid = document.createElement('div')
  infoGrid.style.display = 'grid'
  infoGrid.style.gridTemplateColumns = '1fr 1fr'
  infoGrid.style.columnGap = '14px'
  infoGrid.style.rowGap = '8px'
  infoGrid.appendChild(createLabelValueLine('പേര്', entry.name))
  infoGrid.appendChild(createLabelValueLine('ഫോൺ നമ്പർ', entry.phone))
  infoGrid.appendChild(createLabelValueLine('ബൈഅത്ത് ചെയ്ത വർഷം', entry.baiathYear))
  infoGrid.appendChild(createLabelValueLine('വയസ്സ്', entry.age))
  infoGrid.appendChild(createLabelValueLine('രക്തഗ്രൂപ്പ്', entry.bloodGroup))
  infoGrid.appendChild(createLabelValueLine('വിദ്യാഭ്യാസം', entry.education))
  container.appendChild(infoGrid)

  const fullWidthSection = document.createElement('div')
  fullWidthSection.style.marginTop = '15px'
  fullWidthSection.style.display = 'grid'
  fullWidthSection.style.rowGap = '4px'
  fullWidthSection.appendChild(createLabelValueLine('സ്ഥിരമായ വിലാസം', entry.permanentAddress))
  fullWidthSection.appendChild(createLabelValueLine('നിലവിലെ വിലാസം', entry.currentAddress))
  fullWidthSection.appendChild(createLabelValueLine('വിനോദങ്ങൾ (Hobbies)', entry.hobbies))
  fullWidthSection.appendChild(createLabelValueLine('ജോലി', entry.job))
  container.appendChild(fullWidthSection)

  const activityHeader = document.createElement('h3')
  activityHeader.textContent = 'മറ്റു പ്രവർത്തനങ്ങൾ'
  activityHeader.style.fontSize = '16px'
  activityHeader.style.marginTop = '16px'
  activityHeader.style.marginBottom = '8px'
  container.appendChild(activityHeader)

  const activities = document.createElement('div')
  activities.style.fontSize = '12px'
  activities.style.lineHeight = '1.6'
  activities.style.whiteSpace = 'normal'
  activities.textContent = [
    `സാഹിത്യം: ${toDisplayValue(entry.lit)}`,
    `കായികം: ${toDisplayValue(entry.sports)}`,
    `ആയോധനം: ${toDisplayValue(entry.martial)}`,
    `സാംസ്‌കാരികം: ${toDisplayValue(entry.cultural)}`,
    `രാഷ്ട്രീയം: ${toDisplayValue(entry.politics)}`,
  ].join(' | ')
  container.appendChild(activities)

  const systemHeader = document.createElement('h3')
  systemHeader.textContent = 'സിസ്റ്റം വിവരങ്ങൾ'
  systemHeader.style.fontSize = '16px'
  systemHeader.style.marginTop = '16px'
  systemHeader.style.marginBottom = '8px'
  container.appendChild(systemHeader)

  const systemSection = document.createElement('div')
  systemSection.style.display = 'grid'
  systemSection.style.rowGap = '4px'
  // systemSection.appendChild(createLabelValueLine('രേഖ ഐഡി', entry.recordIdentifier || entry.id))
  // systemSection.appendChild(createLabelValueLine('ഡിവൈസ് ഐഡന്റിഫയർ', entry.deviceIdentifier))
  systemSection.appendChild(createLabelValueLine('Created Date', entry.createdAt))
  container.appendChild(systemSection)

  const familyHeader = document.createElement('h3')
  familyHeader.textContent = 'കുടുംബാംഗങ്ങൾ'
  familyHeader.style.marginTop = '20px'
  familyHeader.style.marginBottom = '8px'
  container.appendChild(familyHeader)

  const table = document.createElement('table')
  table.style.width = '100%'
  table.style.borderCollapse = 'collapse'
  table.style.marginTop = '8px'
  table.style.fontSize = '10px'

  const headerRow = document.createElement('tr')
  const headers = ['പേര്', 'ബന്ധം', 'വയസ്സ്', 'രക്തഗ്രൂപ്പ്', 'വിദ്യാഭ്യാസം', 'ബൈഅത്ത്', 'വിവാഹം', 'ജോലി']
  headers.forEach((headerText) => {
    const th = document.createElement('th')
    th.textContent = headerText
    th.style.border = '1px solid #000'
    th.style.padding = '5px'
    th.style.backgroundColor = '#f3f4f6'
    headerRow.appendChild(th)
  })
  table.appendChild(headerRow)

  const familyMembers = entry.familyMembers || []
  if (familyMembers.length === 0) {
    const emptyRow = document.createElement('tr')
    const emptyCell = document.createElement('td')
    emptyCell.colSpan = headers.length
    emptyCell.textContent = 'അംഗങ്ങൾ ചേർത്തിട്ടില്ല'
    emptyCell.style.border = '1px solid #000'
    emptyCell.style.padding = '6px'
    emptyCell.style.textAlign = 'center'
    emptyRow.appendChild(emptyCell)
    table.appendChild(emptyRow)
  } else {
    familyMembers.forEach((member) => {
      const tr = document.createElement('tr')
      const rowData = [
        member.name,
        member.relation,
        member.age,
        member.blood,
        member.edu,
        member.baiath ? 'ഉണ്ട്' : 'ഇല്ല',
        member.married ? 'ഉണ്ട്' : 'ഇല്ല',
        member.job,
      ]

      rowData.forEach((text) => {
        const td = document.createElement('td')
        td.textContent = toDisplayValue(text)
        td.style.border = '1px solid #000'
        td.style.padding = '5px'
        tr.appendChild(td)
      })

      table.appendChild(tr)
    })
  }

  container.appendChild(table)
  return container
}

export const createSubmissionPdf = async (entry: FormSubmissionDetails): Promise<Blob> => {
  if (typeof window === 'undefined') {
    throw new Error('PDF generation is only available in browser')
  }

  const container = buildPdfContainer(entry)
  document.body.appendChild(container)

  try {
    if (document.fonts?.ready) {
      await document.fonts.ready
    }

    const fullCanvas = await html2canvas(container, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#ffffff',
      logging: false,
      windowWidth: container.scrollWidth,
    })

    const doc = new jsPDF({ unit: 'pt', format: 'a4' })
    const pageWidth = doc.internal.pageSize.getWidth()
    const pageHeight = doc.internal.pageSize.getHeight()
    const margin = 24
    const contentWidth = pageWidth - margin * 2
    const contentHeight = pageHeight - margin * 2
    const ratio = contentWidth / fullCanvas.width
    const pageSliceHeightPx = Math.floor(contentHeight / ratio)

    let yOffsetPx = 0
    let pageIndex = 0

    while (yOffsetPx < fullCanvas.height) {
      if (pageIndex > 0) {
        doc.addPage()
      }

      const sliceHeightPx = Math.min(pageSliceHeightPx, fullCanvas.height - yOffsetPx)
      const pageCanvas = document.createElement('canvas')
      pageCanvas.width = fullCanvas.width
      pageCanvas.height = sliceHeightPx

      const context = pageCanvas.getContext('2d')
      if (!context) {
        throw new Error('Failed to create canvas context for PDF page')
      }

      context.drawImage(
        fullCanvas,
        0,
        yOffsetPx,
        fullCanvas.width,
        sliceHeightPx,
        0,
        0,
        fullCanvas.width,
        sliceHeightPx,
      )

      const pageHeightPt = sliceHeightPx * ratio
      doc.addImage(pageCanvas.toDataURL('image/png'), 'PNG', margin, margin, contentWidth, pageHeightPt)

      yOffsetPx += sliceHeightPx
      pageIndex += 1
    }

    return doc.output('blob')
  } finally {
    container.remove()
  }
}

export const buildSubmissionPdfFileName = (entry: FormSubmissionDetails, fallbackId: string) => {
  const safeName = (entry.name || 'submission').replace(/[^a-zA-Z0-9_-]+/g, '-')
  return `${safeName || 'submission'}-${fallbackId}.pdf`
}

const downloadBlob = (blob: Blob, fileName: string) => {
  if (typeof window === 'undefined') {
    return
  }

  const blobUrl = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = blobUrl
  anchor.download = fileName
  document.body.appendChild(anchor)
  anchor.click()
  document.body.removeChild(anchor)
  URL.revokeObjectURL(blobUrl)
}

export const shareOrDownloadPdf = async (
  blob: Blob,
  fileName: string,
  options: {
    shareTitle: string
    shareText: string
  },
): Promise<'shared' | 'downloaded'> => {
  if (typeof window === 'undefined') {
    return 'downloaded'
  }

  const pdfFile = new File([blob], fileName, { type: 'application/pdf' })
  if (navigator.share) {
    try {
      const canShareWithFiles = typeof navigator.canShare === 'function'
        ? navigator.canShare({ files: [pdfFile] })
        : false

      if (canShareWithFiles) {
        await navigator.share({
          title: options.shareTitle,
          text: options.shareText,
          files: [pdfFile],
        })
        return 'shared'
      }
    } catch (error: any) {
      if (error?.name !== 'AbortError') {
        console.error('PDF share failed:', error)
      }
    }
  }

  downloadBlob(blob, fileName)
  return 'downloaded'
}
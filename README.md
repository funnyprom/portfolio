# MAIN-WEB — โปรไฟล์สมัครงาน (Portfolio)

เว็บไซต์โปรไฟล์ส่วนตัวแบบ static สำหรับนำเสนอประสบการณ์ ทักษะ การศึกษา โปรเจกต์ และช่องทางติดต่อ เน้นโทนสมัครงานด้าน **System Administrator / IT Support** และโครงสร้างพื้นฐานไอที

**Repository:** [github.com/funnyprom/MAIN-WEB](https://github.com/funnyprom/MAIN-WEB)

## คุณสมบัติ

- **หลายภาษา (ไทย / อังกฤษ)** — สลับภาษาได้จากแถบด้านบน จดจำการเลือกใน `localStorage`
- **เลย์เอาต์เดียวหน้า (single page)** — เมนูไปยังส่วนต่าง ๆ: เกี่ยวกับฉัน, ทักษะ, ประสบการณ์, การศึกษา, โปรเจกต์, ติดต่อ
- **รองรับการเข้าถึง** — ลิงก์ข้ามไปยังเนื้อหา, `aria-label` ที่อัปเดตตามภาษา, ลด motion ตาม `prefers-reduced-motion`
- **ธีมมืด** — สีและฟอนต์กำหนดใน `styles.css` (IBM Plex Sans Thai + JetBrains Mono จาก Google Fonts)

## เทคโนโลยี

| ส่วน | รายละเอียด |
|------|------------|
| มาร์กอัป | HTML5 |
| สไตล์ | CSS3 (ตัวแปรใน `:root`, responsive, navigation มือถือ) |
| สคริปต์ | JavaScript แบบ IIFE ไม่มี build step |

## โครงสร้างโปรเจกต์

```
├── index.html          # โครงหน้าและเนื้อหาหลัก
├── styles.css          # ธีมและเลย์เอาต์
├── script.js           # เมนูมือถือ + สลับภาษา + meta/title
├── translations.js     # ข้อความไทย/อังกฤษ (window.PORTFOLIO_I18N)
├── images/             # รูปประกอบ (เช่น รูปโปรไฟล์ใน hero)
├── .nojekyll           # ใช้กับ GitHub Pages (ไม่ให้ Jekyll ประมวลผล)
└── .gitignore
```

## วิธีรันในเครื่อง

ไม่ต้องติดตั้ง dependency

1. เปิดไฟล์ `index.html` ในเบราว์เซอร์โดยตรง  
   หรือ  
2. ใช้เซิร์ฟเวอร์ static ท้องถิ่น (แนะนำถ้าต้องการพฤติกรรมใกล้ production) เช่น `npx serve .` แล้วเปิด URL ที่แสดงในเทอร์มินัล

## การปรับแต่ง

- **ข้อความและคำแปล:** แก้ใน `translations.js` (คีย์ `data-i18n` ใน `index.html` ต้องตรงกับ object ในภาษานั้น)
- **โครงสร้างหน้า:** แก้ `index.html`
- **สี ฟอนต์ ระยะห่าง:** แก้ตัวแปรใน `:root` ที่ `styles.css`
- **รูปโปรไฟล์:** วางไฟล์ให้ตรงกับ `src` ของแท็ก `<img>` ใน hero (ปัจจุบันอ้างอิง `images/profile.png`)

## เผยแพร่ (GitHub Pages)

โปรเจกต์มีไฟล์ `.nojekyll` อยู่แล้ว เหมาะสำหรับโฮสต์เป็น static site จากสาขา `main` หรือโฟลเดอร์ root ตามที่ตั้งค่าใน GitHub repository settings


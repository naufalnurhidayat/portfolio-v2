# Portfolio - Naufal Nur Hidayat

A modern, full-stack personal portfolio built with Node.js, Express, and vanilla HTML/CSS/JS. It features a responsive layout, multi-language support (English & Indonesian), dark mode, and a fully functional contact form utilizing Nodemailer.

---

## 🇮🇩 Panduan Bahasa Indonesia

### Fitur Utama
*   **Mode Gelap & Bahasa Ganda:** Menyimpan preferensi pengunjung secara otomatis di dalam browser (`localStorage`).
*   **Kirim Pesan (Email):** Formulir kontak yang langsung mengirim pesan pengunjung ke email pibadi tanpa API eksternal pihak ketiga (memakai backend khusus Node.js).
*   **Desain Modern:** Menggunakan animasi gulir (scroll), Flexbox, Grid, dan ikon dinamis dari Devicon.

### Prasyarat
Sebelum menjalankan proyek ini, pastikan komputer Anda telah terinstal perangkat lunak [Node.js](https://nodejs.org/).

### Cara Menjalankan
1.  **Instalasi Dependensi**
    Buka terminal dan jalankan perintah:
    ```bash
    npm install
    ```
2.  **Konfigurasi Email (`.env`)**
    Buat file bernama `.env` di folder utama aplikasi ini dan tambahkan kredensial email Anda seperti berikut:
    ```env
    EMAIL_USER=bisnis.opal1673@gmail.com
    EMAIL_PASS=sandi_aplikasi_google_anda
    ```
    *Catatan: Pastikan Anda menggunakan "Sandi Aplikasi" (App Password) dari Google, bukan password akun standar Anda.*

3.  **Jalankan Server**
    Jalankan perintah ini di terminal:
    ```bash
    node server.js
    ```
4.  Buka browser dan ketik alamat **`http://localhost:3000`**.

---

## 🇬🇧 English Guide

### Key Features
*   **Dark Mode & Bilingual:** Features English and Indonesian language toggles and dark mode, both persistently saved using `localStorage`.
*   **Contact Form Email Delivery:** A built-in Node.js backend route seamlessly handles contact requests entirely natively using Nodemailer.
*   **Modern Design:** Fluid layout powered by responsive Grid and Flexbox, enhanced with scroll animations and Devicon stacks.

### Prerequisites
Before running this project, ensure you have [Node.js](https://nodejs.org/) installed on your local machine.

### How to Run
1.  **Install Dependencies**
    Open your terminal and run the following command:
    ```bash
    npm install
    ```
2.  **Email Configuration (`.env`)**
    Create a `.env` file in the root directory and add your application routing credentials:
    ```env
    EMAIL_USER=bisnis.opal1673@gmail.com
    EMAIL_PASS=your_google_app_password
    ```
    *Note: Remember to use a generated Google App Password, not your standard Gmail account password.*

3.  **Start the Server**
    Start the application backend node via:
    ```bash
    node server.js
    ```
4.  Open your browser and navigate to **`http://localhost:3000`**.

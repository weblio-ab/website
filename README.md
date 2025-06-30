# Weblio - Webbyrå Hemsida

En modern, professionell hemsida för webbyrån Weblio, byggd med Vue.js 3, Pinia, Bootstrap 5 och Vue i18n för flerspråkighet.

## 🚀 Deployment Status

| Environment | Status |
|-------------|--------|
| **Production** | [![Deploy Application](https://github.com/WebbEnkelt/website/actions/workflows/deploy.yml/badge.svg?branch=master)](https://github.com/WebbEnkelt/website/actions/workflows/deploy.yml) |
| **Staging** | [![Deploy Application](https://github.com/WebbEnkelt/website/actions/workflows/deploy.yml/badge.svg?branch=development)](https://github.com/WebbEnkelt/website/actions/workflows/deploy.yml) |

## 🛠️ Installation

1. **Installera dependencies**
   ```bash
   pnpm install
   ```

2. **Starta utvecklingsserver**
   ```bash
   pnpm dev
   ```

3. **Öppna i webbläsare**
   Gå till `http://localhost:5173`

## 📦 Byggning

För att bygga för produktion:
```bash
pnpm build
```

## 🌐 Flerspråkighet

Webbplatsen stödjer svenska och engelska. Språkfiler finns i:
- `src/locales/sv.json` - Svenska texter
- `src/locales/en.json` - Engelska texter

## 🔐 Environment Secrets

Följande environment secrets måste konfigureras i GitHub Actions/Secrets

| Secret Name | Beskrivning | Exempel | Obligatorisk |
|-------------|-------------|---------|--------------|
| `CONTACT_EMAIL` | E-postadress som tar emot kontaktmeddelanden | `info@weblio.se` | ❌ |
| `BUSINESS_NAME` | Företagsnamn som visas i e-postämnesraden | `Weblio` | ✅ |
| `SMTP_HOST` | SMTP server för e-postutskick | `mailcluster.loopia.se` | ❌ |
| `SMTP_PORT` | SMTP port | `587` | ❌ |
| `SMTP_USERNAME` | SMTP användarnamn | `info@weblio.se` | ✅ |
| `SMTP_PASSWORD` | SMTP lösenord | `your-smtp-password` | ✅ |
| `SMTP_ENCRYPTION` | SMTP kryptering (`tls` eller `ssl`) | `tls` | ❌ |
| `SMTP_FROM_EMAIL` | Avsändarens e-postadress | `info@weblio.se` | ❌ |
| `RECAPTCHA_SECRET_KEY` | Google reCAPTCHA v3 secret key | `6Lc...` | ✅ |
| `RECAPTCHA_MIN_SCORE` | Minimum score för reCAPTCHA validering (0.0-1.0) | `0.5` | ❌ |
| `ALLOWED_ORIGINS` | Tillåtna CORS origins (kommaseparerade) | `https://weblio.se,https://www.weblio.se` | ❌ |
| `FTP_SERVER` | FTP server för deployment | `ftp.loopia.se` | ❌ |
| `FTP_USERNAME` | FTP användarnamn | `your-ftp-user` | ✅ |
| `FTP_PASSWORD` | FTP lösenord | `your-ftp-password` | ✅ |
| `DEPLOY_PATH` | Sökväg på servern för deployment | `/public_html/` | ✅ |

### Sätta upp secrets:
1. Gå till ditt GitHub repository
2. Klicka på **Settings** → **Environments**
3. Skapa eller välj miljö
4. Lägg till varje secret från tabellen ovan

### Noteringar:
- `SMTP_FROM_EMAIL` är valfri och använder `SMTP_USERNAME` om inte angiven
- `CONTACT_EMAIL` är valfri och använder `SMTP_USERNAME` om inte angiven
- reCAPTCHA keys kan erhållas från [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

---

Byggd med ❤️ av Weblio teamet

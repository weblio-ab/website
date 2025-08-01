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
| `FTP_SERVER` | FTP server för deployment | `ftp.weblio.se` | ✅ |
| `FTP_USERNAME` | FTP användarnamn | `your-ftp-user` | ✅ |
| `FTP_PASSWORD` | FTP lösenord | `your-ftp-password` | ✅ |
| `DEPLOY_PATH` | Sökväg på servern för deployment | `/public_html/` | ✅ |
| `FORM_SERVICE_CUSTOMER_ID` | Kund Id hos form service | 1 | ✅ |
| `FORM_SERVICE_FORM_IDENTIFIER` | Identifierare för formuläret hos form service | contact-form | ✅ |

### Sätta upp secrets:
1. Gå till ditt GitHub repository
2. Klicka på **Settings** → **Environments**
3. Skapa eller välj miljö
4. Lägg till varje secret från tabellen ovan

---

Byggd med ❤️ av Weblio teamet

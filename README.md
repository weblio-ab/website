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

## 🔐 GitHub Actions-konfiguration

Följande värden används av GitHub Actions-workflowet. Lägg secrets och variables i den GitHub Environment som används av deploymenten (`staging` eller `production`), om de inte ska gälla för hela repot.

### Secrets

| Secret Name | Beskrivning | Obligatorisk |
|-------------|-------------|--------------|
| `VITE_RECAPTCHA_SITE_KEY` | Publik site key för Google reCAPTCHA | ✅ |
| `FTP_USERNAME` | FTP-användare | ✅ |
| `FTP_PASSWORD` | FTP-lösenord | ✅ |

### Variables

| Variable Name | Beskrivning | Obligatorisk |
|---------------|-------------|--------------|
| `FTP_SERVER` | FTP-server för deployment | ✅ |
| `DEPLOY_PATH` | Sökväg på servern för deployment | ✅ |
| `VITE_FORM_PROXY_URL` | URL till form-proxytjänsten | ✅ |
| `VITE_FORM_PROXY_ID` | Formulärets ID hos proxytjänsten | ✅ |
| `VITE_FORM_PROXY_RECAPTCHA_REQUIRED` | Om reCAPTCHA ska krävas (`true` eller `false`) | ✅ |
| `PNPM_VERSION` | pnpm-version, standard är `10` | ❌ |
| `NODE_VERSION` | Node.js-version, standard är `latest` | ❌ |
| `INSTALL_COMMAND` | Kommando för installation, standard är `pnpm install` | ❌ |
| `BUILD_COMMAND` | Kommando för build, standard är `pnpm run build` | ❌ |
| `BUILD_DIR` | Build-katalog, standard är `./dist/` | ❌ |

`GITHUB_TOKEN` används automatiskt av GitHub för autentisering mot GitHub Packages och behöver inte läggas till manuellt.

`VITE_ENVIRONMENT` sätts automatiskt av workflowet utifrån branch eller manuellt vald environment.

### Sätta upp secrets och variables:
1. Gå till ditt GitHub repository
2. Klicka på **Settings** → **Environments**
3. Skapa eller välj `staging` eller `production`
4. Lägg till secrets under **Environment secrets**
5. Lägg till variables under **Environment variables**

---

Byggd med ❤️ av Weblio teamet

# Weblio - Webbyrå Hemsida

En modern, professionell hemsida för webbyrån Weblio, byggd med Vue.js 3, Pinia, Bootstrap 5 och Vue i18n för flerspråkighet.

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

Följande environment secrets måste konfigureras i GitHub Actions/Secrets för att kontaktformuläret ska fungera:

| Secret Name | Beskrivning | Exempel | Obligatorisk |
|-------------|-------------|---------|--------------|
| `CONTACT_EMAIL` | E-postadress som tar emot kontaktmeddelanden | `info@weblio.se` | ✅ |
| `BUSINESS_NAME` | Företagsnamn som visas i e-postämnesraden | `Weblio` | ✅ |
| `RECAPTCHA_SECRET` | Google reCAPTCHA v3 secret key | `6Lc...` | ✅ |
| `RECAPTCHA_MIN_SCORE` | Minimum score för reCAPTCHA validering (0.0-1.0) | `0.5` | ❌ |
| `SMTP_HOST` | SMTP server för e-postutskick | `mailcluster.loopia.se` | ❌ |
| `SMTP_PORT` | SMTP port | `587` | ❌ |
| `SMTP_USERNAME` | SMTP användarnamn | `your-email@gmail.com` | ❌ |
| `SMTP_PASSWORD` | SMTP lösenord | `your-app-password` | ✅ |
| `SMTP_SECURE` | SMTP kryptering (`tls` eller `ssl`) | `tls` | ✅ |

### Sätta upp secrets:
1. Gå till ditt GitHub repository
2. Klicka på **Settings** → **Environments**
3. Skapa eller välj miljö
4. Lägg till varje secret från tabellen ovan

### Noteringar:
- `SMTP_USERNAME` är valfri och använder `CONTACT_EMAIL` om inte angiven
- reCAPTCHA keys kan erhållas från [Google reCAPTCHA Admin Console](https://www.google.com/recaptcha/admin)

---

Byggd med ❤️ av Weblio teamet

name: 🎯 Pitch - Företag
description: Spåra företag som vi ska pitcha vår tjänst till
title: 'Pitch: [FÖRETAGSNAMN]'
labels: ['pitch', 'lead']
body:
  - type: markdown
    attributes:
      value: |
        ## 📋 Företagsinformation
        Fyll i grundläggande information om företaget vi ska pitcha till.

  - type: input
    id: company-name
    attributes:
      label: Företagsnamn
      description: Ange företagets namn
      placeholder: ex. IKEA Sverige AB
    validations:
      required: true

  - type: input
    id: industry
    attributes:
      label: Bransch/Sektor
      description: Vilken bransch verkar företaget inom?
      placeholder: ex. Restaurang, E-handel, Salong
    validations:
      required: true

  - type: input
    id: website
    attributes:
      label: Webbadress
      description: Företagets webbplats
      placeholder: https://exempel.se
    validations:
      required: false

  - type: markdown
    attributes:
      value: |
        ## 🎯 Pitch Information

  - type: input
    id: contact-person
    attributes:
      label: Kontaktperson
      description: Namn och titel på kontaktperson
      placeholder: ex. Anna Andersson, Chef
    validations:
      required: false

  - type: textarea
    id: contact-info
    attributes:
      label: Kontaktuppgifter
      description: E-post, telefon, etc.
      placeholder: |
        E-post: anna@exempel.se
        Telefon: 08-123 456 78
    validations:
      required: false

  - type: checkboxes
    id: contact-method
    attributes:
      label: Bästa kontaktmetod
      description: Hur ska vi försöka kontakta dem?
      options:
        - label: E-post
        - label: Telefon
        - label: Personligt möte

  - type: checkboxes
    id: proposed-solution
    attributes:
      label: Föreslagen lösning
      description: Vilka av våra tjänster passar bäst för detta företag?
      options:
        - label: Webbdesign/utveckling
        - label: E-handel
        - label: SEO/Digital marknadsföring
        - label: Systemintegration
        - label: Underhåll/support
        - label: Mobilappar
        - label: Databas/Backend-system

  - type: markdown
    attributes:
      value: |
        ## 📝 Övrig information

  - type: textarea
    id: special-requirements
    attributes:
      label: Särskilda krav/önskemål
      description: Finns det något specifikt de har nämnt?
      placeholder: ex. Måste vara GDPR-kompatibelt, behöver integration med SAP
    validations:
      required: false

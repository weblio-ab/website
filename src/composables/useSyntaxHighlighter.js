import { ref, computed } from 'vue'

export function useSyntaxHighlighter(language) {
  const currentLanguage = ref(language)

  // Utility functions
  const escapeHtml = (text) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  const createStringPlaceholder = (match, placeholders, prefix = 'STRING') => {
    const index = Object.keys(placeholders).length
    const placeholder = `__${prefix}_${index}__`
    placeholders[placeholder] = match
    return placeholder
  }

  const restorePlaceholders = (text, placeholders) => {
    Object.entries(placeholders).forEach(([placeholder, replacement]) => {
      text = text.replace(placeholder, replacement)
    })
    return text
  }

  // Language-specific highlighters
  const highlighters = {
    javascript: (line) => {
      let highlighted = line
      const stringPlaceholders = {}
      
      // Handle comments first
      highlighted = highlighted.replace(
        /(\/\/.*$)/g,
        '<span class="comment">$1</span>'
      )
      
      highlighted = highlighted.replace(
        /(\/\*.*?\*\/)/g,
        '<span class="comment">$1</span>'
      )
      
      // Process non-comment parts
      const parts = highlighted.split(/(<span class="comment">.*?<\/span>)/g)
      highlighted = parts.map(part => {
        if (part.includes('class="comment"')) return part
        
        let processed = part
        
        // Template literals
        processed = processed.replace(/`([^`\\]|\\.)*`/g, (match) => {
          const placeholder = createStringPlaceholder(
            `<span class="template-string">${match}</span>`, 
            stringPlaceholders, 
            'TEMPLATE'
          )
          return placeholder
        })
        
        // String literals
        processed = processed.replace(/'([^'\\]|\\.)*'/g, (match) => {
          const placeholder = createStringPlaceholder(
            `<span class="string">${match}</span>`, 
            stringPlaceholders
          )
          return placeholder
        })
        
        processed = processed.replace(/"([^"\\]|\\.)*"/g, (match) => {
          const placeholder = createStringPlaceholder(
            `<span class="string">${match}</span>`, 
            stringPlaceholders
          )
          return placeholder
        })
        
        // Numbers
        processed = processed.replace(
          /\b(\d+\.?\d*|\.\d+)\b/g,
          '<span class="number">$1</span>'
        )
        
        // Keywords
        processed = processed.replace(
          /\b(import|export|from|const|let|var|function|class|extends|return|if|else|for|while|do|switch|case|default|break|continue|try|catch|finally|throw|new|async|await|yield|delete|typeof|instanceof|in|of|this|super|static|get|set|true|false|null|undefined)\b/g,
          '<span class="keyword">$1</span>'
        )
        
        // Function calls
        processed = processed.replace(
          /\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?=\()/g,
          '<span class="function">$1</span>'
        )
        
        // Object properties
        processed = processed.replace(
          /\.([a-zA-Z_$][a-zA-Z0-9_$]*)\b/g,
          '.<span class="property">$1</span>'
        )
        
        // Constants
        processed = processed.replace(
          /\b([A-Z][A-Z0-9_]*)\b/g,
          '<span class="constant">$1</span>'
        )
        
        return restorePlaceholders(processed, stringPlaceholders)
      }).join('')
      
      return highlighted
    },

    css: (line) => {
      let highlighted = line
      
      // Comments
      highlighted = highlighted.replace(
        /(\/\*.*?\*\/)/g,
        '<span class="comment">$1</span>'
      )
      
      // CSS selectors
      highlighted = highlighted.replace(
        /^(\s*)([.#:a-zA-Z0-9_-]+(?:\s*[,>+~]\s*[.#:a-zA-Z0-9_-]+)*)\s*(\{)/,
        '$1<span class="selector">$2</span> $3'
      )
      
      // CSS properties
      highlighted = highlighted.replace(
        /(\s*)([a-zA-Z-]+)(\s*:)/g,
        '$1<span class="property">$2</span>$3'
      )
      
      // CSS values
      highlighted = highlighted.replace(
        /(:\s*)([^;{}]+)(;?)/g,
        '$1<span class="value">$2</span>$3'
      )
      
      // Units and colors
      highlighted = highlighted.replace(
        /\b(\d+(?:\.\d+)?)(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|lh)\b/g,
        '<span class="number">$1</span><span class="unit">$2</span>'
      )
      
      highlighted = highlighted.replace(
        /#([0-9a-fA-F]{3,6})\b/g,
        '<span class="color">#$1</span>'
      )
      
      return highlighted
    },

    html: (line) => {
      let highlighted = line
      
      // HTML comments
      highlighted = highlighted.replace(
        /(&lt;!--.*?--&gt;)/g,
        '<span class="comment">$1</span>'
      )
      
      // HTML tags
      highlighted = highlighted.replace(
        /(&lt;\/?)([a-zA-Z0-9-]+)(.*?)(&gt;)/g,
        '$1<span class="tag">$2</span>$3$4'
      )
      
      // HTML attributes
      highlighted = highlighted.replace(
        /\s([a-zA-Z-]+)(=)/g,
        ' <span class="attribute">$1</span>$2'
      )
      
      // HTML attribute values
      highlighted = highlighted.replace(
        /(=")([^"]*?)"/g,
        '=$1<span class="string">$2</span>"'
      )
      
      highlighted = highlighted.replace(
        /(=')([^']*?)'/g,
        "=$1<span class=\"string\">$2</span>'"
      )
      
      return highlighted
    },

    json: (line) => {
      let highlighted = line
      
      // JSON strings
      highlighted = highlighted.replace(
        /"([^"\\]|\\.)*"/g,
        '<span class="string">$&</span>'
      )
      
      // JSON numbers
      highlighted = highlighted.replace(
        /\b(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)\b/g,
        '<span class="number">$1</span>'
      )
      
      // JSON booleans and null
      highlighted = highlighted.replace(
        /\b(true|false|null)\b/g,
        '<span class="keyword">$1</span>'
      )
      
      return highlighted
    }
  }

  // Main highlight function
  const highlightCode = (line) => {
    if (!line.trim()) return '&nbsp;'
    
    const escaped = escapeHtml(line)
    const lang = currentLanguage.value
    
    // Handle Vue files as JavaScript
    const effectiveLanguage = lang === 'vue' ? 'javascript' : lang
    const highlighter = highlighters[effectiveLanguage]
    
    return highlighter ? highlighter(escaped) : escaped
  }

  // Computed property for supported languages
  const supportedLanguages = computed(() => Object.keys(highlighters))

  // Method to update language
  const setLanguage = (newLanguage) => {
    currentLanguage.value = newLanguage
  }

  return {
    highlightCode,
    supportedLanguages,
    setLanguage,
    currentLanguage: computed(() => currentLanguage.value)
  }
}
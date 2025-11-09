// Markdown 編輯器元件

class MarkdownEditor {
    constructor(textareaId, previewId) {
        this.textarea = document.getElementById(textareaId);
        this.preview = document.getElementById(previewId);
        
        if (!this.textarea || !this.preview) {
            console.error('找不到編輯器元素');
            return;
        }
        
        this.initToolbar();
        this.attachEvents();
        this.updatePreview(); // 初始化預覽
    }
    
    initToolbar() {
        const toolbar = document.createElement('div');
        toolbar.className = 'editor-toolbar';
        toolbar.innerHTML = `
            <button type="button" data-action="bold" title="粗體"><i class="fas fa-bold"></i></button>
            <button type="button" data-action="italic" title="斜體"><i class="fas fa-italic"></i></button>
            <button type="button" data-action="heading" title="標題"><i class="fas fa-heading"></i></button>
            <button type="button" data-action="code" title="程式碼"><i class="fas fa-code"></i></button>
            <button type="button" data-action="code-block" title="程式碼區塊"><i class="fas fa-file-code"></i></button>
            <button type="button" data-action="link" title="連結"><i class="fas fa-link"></i></button>
            <button type="button" data-action="image" title="圖片"><i class="fas fa-image"></i></button>
            <button type="button" data-action="list" title="列表"><i class="fas fa-list-ul"></i></button>
            <button type="button" data-action="quote" title="引用"><i class="fas fa-quote-right"></i></button>
        `;
        
        // 插入工具列到 textarea 之前
        this.textarea.parentNode.insertBefore(toolbar, this.textarea);
        
        // 綁定工具列按鈕事件
        toolbar.querySelectorAll('button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const action = btn.dataset.action;
                this.handleToolbarAction(action);
            });
        });
    }
    
    attachEvents() {
        // 監聽輸入事件，更新預覽
        this.textarea.addEventListener('input', debounce(() => {
            this.updatePreview();
        }, 300));
        
        // 支援 Tab 鍵縮排
        this.textarea.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                this.insertText('    ');
            }
        });
    }
    
    updatePreview() {
        const markdown = this.textarea.value;
        
        if (typeof marked === 'undefined') {
            this.preview.innerHTML = '<p class="error-message">marked.js 未載入</p>';
            return;
        }
        
        try {
            const html = marked.parse(markdown);
            this.preview.innerHTML = html;
            
            // 套用語法高亮
            if (typeof hljs !== 'undefined') {
                this.preview.querySelectorAll('pre code').forEach((block) => {
                    hljs.highlightElement(block);
                });
            }
        } catch (error) {
            console.error('Markdown 解析錯誤:', error);
            this.preview.innerHTML = '<p class="error-message">Markdown 解析錯誤</p>';
        }
    }
    
    handleToolbarAction(action) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const selectedText = this.textarea.value.substring(start, end);
        
        let replacement = '';
        let cursorOffset = 0;
        
        switch (action) {
            case 'bold':
                replacement = `**${selectedText || '粗體文字'}**`;
                cursorOffset = selectedText ? 0 : -2;
                break;
                
            case 'italic':
                replacement = `*${selectedText || '斜體文字'}*`;
                cursorOffset = selectedText ? 0 : -1;
                break;
                
            case 'heading':
                replacement = `## ${selectedText || '標題'}`;
                cursorOffset = selectedText ? 0 : -2;
                break;
                
            case 'code':
                replacement = `\`${selectedText || '程式碼'}\``;
                cursorOffset = selectedText ? 0 : -1;
                break;
                
            case 'code-block':
                replacement = `\`\`\`javascript\n${selectedText || '// 程式碼'}\n\`\`\``;
                cursorOffset = selectedText ? 0 : -4;
                break;
                
            case 'link':
                replacement = `[${selectedText || '連結文字'}](url)`;
                cursorOffset = -1;
                break;
                
            case 'image':
                replacement = `![${selectedText || '圖片描述'}](image-url)`;
                cursorOffset = -1;
                break;
                
            case 'list':
                replacement = `- ${selectedText || '列表項目'}`;
                cursorOffset = selectedText ? 0 : -4;
                break;
                
            case 'quote':
                replacement = `> ${selectedText || '引用文字'}`;
                cursorOffset = selectedText ? 0 : -4;
                break;
        }
        
        this.replaceSelection(replacement, cursorOffset);
    }
    
    replaceSelection(text, cursorOffset = 0) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const before = this.textarea.value.substring(0, start);
        const after = this.textarea.value.substring(end);
        
        this.textarea.value = before + text + after;
        
        // 設定游標位置
        const newCursorPos = start + text.length + cursorOffset;
        this.textarea.setSelectionRange(newCursorPos, newCursorPos);
        this.textarea.focus();
        
        // 更新預覽
        this.updatePreview();
    }
    
    insertText(text) {
        const start = this.textarea.selectionStart;
        const end = this.textarea.selectionEnd;
        const before = this.textarea.value.substring(0, start);
        const after = this.textarea.value.substring(end);
        
        this.textarea.value = before + text + after;
        
        const newCursorPos = start + text.length;
        this.textarea.setSelectionRange(newCursorPos, newCursorPos);
        this.textarea.focus();
    }
    
    getValue() {
        return this.textarea.value;
    }
    
    setValue(value) {
        this.textarea.value = value;
        this.updatePreview();
    }
    
    clear() {
        this.textarea.value = '';
        this.updatePreview();
    }
}

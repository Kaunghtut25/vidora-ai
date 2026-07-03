/**
 * Arena AI — Agent Mod Voice Generator
 * Generates voiceovers using Arena AI's text chat agent mode
 */
const puppeteer = require('puppeteer-core');
const fs = require('fs');
const path = require('path');
const https = require('https');

const OUTPUT_DIR = path.join(require('os').homedir(), 'Vidora_Output', 'arena_voice');
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

async function downloadFile(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        https.get(res.headers.location, (r2) => {
          const file = fs.createWriteStream(filepath);
          r2.pipe(file);
          file.on('finish', () => { file.close(); resolve(filepath); });
        });
        return;
      }
      const file = fs.createWriteStream(filepath);
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(filepath); });
    }).on('error', reject);
  });
}

async function main(text, voiceStyle = 'agent') {
  console.log(`\n🎤 Arena AI Agent Mod — Voice Generator`);
  console.log(`📝 Text: "${text.substring(0, 80)}..."`);
  console.log(`🎵 Style: ${voiceStyle}\n`);

  const browser = await puppeteer.connect({
    browserURL: 'http://127.0.0.1:9222',
    defaultViewport: { width: 1440, height: 900 }
  });

  const pages = await browser.pages();
  const page = pages[0] || await browser.newPage();

  // Step 1: Go to Arena AI
  console.log('🌐 Opening Arena AI...');
  await page.goto('https://arena.ai', { waitUntil: 'domcontentloaded', timeout: 30000 });
  await new Promise(r => setTimeout(r, 3000));

  // Step 2: Check if logged in — look for chat input
  const isLoggedIn = await page.evaluate(() => {
    return !!document.querySelector('textarea, [contenteditable="true"], input[type="text"]');
  });

  if (!isLoggedIn) {
    console.log('⚠️  Not logged in — need to login first');
    console.log('   Please login at https://arena.ai in your Chrome window');
    console.log('   Then type "ready" here...');
    // Wait for login
    await new Promise(r => setTimeout(r, 15000));
  }

  // Step 3: Try to access the Agent/chat mode
  console.log('💬 Finding chat input...');

  // Look for textarea or input
  const inputFound = await page.evaluate(() => {
    const selects = [
      'textarea',
      '[contenteditable="true"]',
      'input[type="text"]',
      '[role="textbox"]',
      '.chat-input',
      '#message-input'
    ];
    for (const sel of selects) {
      const el = document.querySelector(sel);
      if (el) return sel;
    }
    return null;
  });

  console.log(`   Input found: ${inputFound || 'NONE'}`);

  if (!inputFound) {
    // Take screenshot to debug
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'arena_debug.png') });
    console.log('📸 Screenshot saved. Check arena_debug.png');
    
    // Try clicking around to find chat
    console.log('🔍 Looking for chat buttons...');
    const buttons = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button, a, [role="button"]'))
        .slice(0, 20)
        .map(b => ({
          text: b.textContent?.trim().substring(0, 50),
          aria: b.getAttribute('aria-label'),
          class: b.className?.substring(0, 50)
        }));
    });
    console.log('   Buttons:', JSON.stringify(buttons.filter(b => b.text), null, 2));
  }

  // Step 4: Type the prompt
  if (inputFound) {
    console.log('⌨️  Typing prompt...');
    
    // First, ensure we have a fresh chat — look for "New chat" or similar
    const newChatBtns = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('button, a'))
        .filter(b => {
          const t = b.textContent?.toLowerCase() || '';
          return t.includes('new chat') || t.includes('new') || t.includes('create');
        })
        .map(b => b.textContent?.trim());
    });
    console.log('   New chat options:', newChatBtns);

    // Click new chat if available
    if (newChatBtns.length > 0) {
      await page.evaluate(() => {
        const btn = Array.from(document.querySelectorAll('button'))
          .find(b => b.textContent?.toLowerCase().includes('new'));
        if (btn) btn.click();
      });
      await new Promise(r => setTimeout(r, 2000));
    }

    // Type the message using React-compatible method
    const prompt = `Act as a ${voiceStyle} voice narrator. Read this text naturally and expressively:\n\n"${text}"`;
    
    await page.evaluate((msg) => {
      const el = document.querySelector('textarea') || 
                 document.querySelector('[contenteditable="true"]') ||
                 document.querySelector('input[type="text"]') ||
                 document.querySelector('[role="textbox"]');
      if (!el) return;
      
      if (el.tagName === 'TEXTAREA' || el.tagName === 'INPUT') {
        const ns = Object.getOwnPropertyDescriptor(
          window.HTMLTextAreaElement.prototype || window.HTMLInputElement.prototype, 'value'
        ).set;
        ns.call(el, msg);
        el.dispatchEvent(new Event('input', { bubbles: true }));
      } else if (el.getAttribute('contenteditable') === 'true') {
        el.textContent = msg;
        el.dispatchEvent(new Event('input', { bubbles: true }));
      }
    }, prompt);

    await new Promise(r => setTimeout(r, 1000));

    // Click send
    console.log('📤 Sending...');
    const sent = await page.evaluate(() => {
      const btn = Array.from(document.querySelectorAll('button'))
        .find(b => {
          const aria = b.getAttribute('aria-label') || '';
          const text = b.textContent?.toLowerCase() || '';
          return aria.includes('Send') || text.includes('send') || 
                 b.querySelector('svg') && (aria.includes('send') || text === '');
        });
      if (btn) {
        btn.click();
        return true;
      }
      // Try pressing Enter
      const el = document.querySelector('textarea');
      if (el) {
        el.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', keyCode: 13, bubbles: true }));
        return true;
      }
      return false;
    });

    console.log(`   Sent: ${sent}`);

    // Step 5: Wait for voice generation
    console.log('⏳ Waiting for voice generation (30-90s)...');
    
    // Wait and look for audio elements
    let audioUrl = null;
    for (let i = 0; i < 30; i++) {
      await new Promise(r => setTimeout(r, 3000));
      
      audioUrl = await page.evaluate(() => {
        // Look for audio elements
        const audio = document.querySelector('audio');
        if (audio && audio.src) return audio.src;
        
        // Look for download buttons or audio links
        const links = Array.from(document.querySelectorAll('a[href*="mp3"], a[href*="audio"], a[href*="wav"], a[download]'));
        if (links.length > 0) return links[0].href;
        
        // Look for any mp3 in the page
        const sources = Array.from(document.querySelectorAll('source[type*="audio"]'));
        if (sources.length > 0) return sources[0].src;
        
        return null;
      });
      
      if (audioUrl) {
        console.log(`✅ Audio found at attempt ${i + 1}!`);
        break;
      }
      
      // Check if response is complete (no loading indicator)
      const stillLoading = await page.evaluate(() => {
        return !!document.querySelector('[class*="loading"], [class*="spinner"], [class*="generating"], [class*="thinking"]');
      });
      
      if (i % 4 === 0) console.log(`   ...${(i+1)*3}s ${stillLoading ? '(still generating)' : '(waiting for audio)'}`);
    }

    // Step 6: Download audio
    if (audioUrl) {
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-').substring(0, 19);
      const filename = `arena_voice_${voiceStyle}_${timestamp}.mp3`;
      const filepath = path.join(OUTPUT_DIR, filename);
      
      console.log(`⬇️  Downloading: ${audioUrl.substring(0, 80)}...`);
      await downloadFile(audioUrl, filepath);
      
      const size = fs.statSync(filepath).size;
      console.log(`✅ Saved: ${filepath} (${(size/1024).toFixed(1)} KB)`);
      return filepath;
    } else {
      console.log('❌ No audio found');
      await page.screenshot({ path: path.join(OUTPUT_DIR, 'arena_voice_debug.png') });
      console.log('📸 Debug screenshot saved');
    }
  }

  await browser.disconnect();
  return null;
}

// Run
const text = process.argv[2] || "Welcome to Vidora AI. Create stunning videos with the power of artificial intelligence.";
const style = process.argv[3] || 'professional';

main(text, style).then(result => {
  if (result) {
    console.log(`\n🎉 DONE! ${result}`);
    console.log(`💰 Cost: Free (Arena AI)`);
  } else {
    console.log('\n❌ Failed to generate voice');
  }
  process.exit(result ? 0 : 1);
}).catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});

const puppeteer = require('puppeteer');
const { generateText, checkAndGenerate } = require('./util');

test('should output name and age', () => {
    const text = generateText('Max', 29);
    expect(text).toBe('Max (29 years old)');
    const text2 = generateText('Ada', 28);
    expect(text2).toBe('Ada (28 years old)');
});

test('should output data-less text', () => {
    const text = generateText('', null);
    expect(text).toBe(' (null years old)');
});

test('should output data-less text', () => {
    const text = generateText();
    expect(text).toBe('undefined (undefined years old)');
});

test('should generate a valid text output', () => {
    const text = checkAndGenerate('Steve', 29);
    expect(text).toBe('Steve (29 years old)');
});

// launch Puppeteer Chrome for automated e2e testing
test('should click around', async () => {
    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 80,
        args: ['--window-size=1920,1080']
    });
    const page = await browser.newPage();
    await page.goto(
        'http://127.0.0.1:5501/index.html'
    );

    // Browser launched - Execute steps:
    await page.click('input#name');
    await page.type('input#name', 'Ada');

    await page.click('input#age');
    await page.type('input#age', '28');
    
});
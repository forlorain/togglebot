import puppeteer from 'puppeteer';

export async function updateInstagramBio(bioContent: string) {
  const browser = await puppeteer.launch({
    headless: false  // Pour voir ce qui se passe
  });

  try {
    const page = await browser.newPage();
    
    // Aller sur Instagram
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForTimeout(2000);

    // Login
    await page.type('input[name="username"]', process.env.INSTAGRAM_USERNAME || '');
    await page.type('input[name="password"]', process.env.INSTAGRAM_PASSWORD || '');
    await page.click('button[type="submit"]');
    
    // Attendre que la connexion soit établie
    await page.waitForTimeout(4000);

    // Aller sur la page d'édition du profil
    await page.goto('https://www.instagram.com/accounts/edit/');
    await page.waitForTimeout(3000);

    // Modifier la bio
    await page.evaluate((newBio) => {
      const bioElement = document.querySelector('textarea[id="pepBio"]');
      if (bioElement) {
        (bioElement as HTMLTextAreaElement).value = newBio;
      }
    }, bioContent);

    // Sauvegarder
    await page.click('button[type="submit"]');
    await page.waitForTimeout(2000);

    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la bio:', error);
    throw error;
  } finally {
    await browser.close();
  }
}
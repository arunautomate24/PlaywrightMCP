import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePages';

export class InventoryPage extends BasePage {
  readonly productsHeader: Locator;
  readonly sortDropdown: Locator;
  readonly cartButton: Locator;
  readonly addToCartButtons: Locator;

  constructor(page: Page) {
    super(page);
    // "Products" is a static, non-semantic text node on the page
    this.productsHeader = page.getByText('Products', { exact: true });
    this.sortDropdown = page.getByRole('combobox', { name: 'Sort products' });
    this.cartButton = page.getByRole('button', { name: /^Cart/ });
    this.addToCartButtons = page.getByRole('button', { name: 'Add to cart' });
  }

  async goto(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/inventory.html');
  }
}

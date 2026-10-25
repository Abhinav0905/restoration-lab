import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test('blocks an action that would energize the fault', async ({page}) => {
  await page.getByTestId('switch-breaker-a').click();

  await expect(page.getByTestId('receipt')).toContainText('Fault would be energized');
  await expect(page.getByTestId('blocked-count')).toHaveText('1');
  await expect(page.getByTestId('switch-breaker-a')).toHaveAttribute('data-state', 'open');
});

test('restores all customers with the safe four-action sequence', async ({page}) => {
  await page.getByTestId('switch-iso-west').click();
  await page.getByTestId('switch-iso-east').click();
  await page.getByTestId('switch-breaker-a').click();
  await page.getByTestId('switch-tie-b').click();

  await expect(page.getByTestId('customer-total')).toContainText('700');
  await expect(page.getByTestId('hospital-status')).toHaveText('RESTORED');
  await expect(page.getByTestId('accepted-count')).toHaveText('4');
  await expect(page.getByTestId('completion-panel')).toBeVisible();
});

test('built-in demo includes one blocked lesson before completing', async ({page}) => {
  test.setTimeout(20_000);
  await page.getByTestId('watch-demo').click();

  await expect(page.getByTestId('completion-panel')).toBeVisible({timeout: 12_000});
  await expect(page.getByTestId('blocked-count')).toHaveText('1');
  await expect(page.getByTestId('accepted-count')).toHaveText('4');
});

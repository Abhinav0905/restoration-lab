import {expect, test} from '@playwright/test';

test.beforeEach(async ({page}) => {
  await page.goto('/');
});

test('explains the problem and solution before the drill', async ({page}) => {
  await expect(page.getByRole('heading', {name: 'The problem'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'Why it matters'})).toBeVisible();
  await expect(page.getByRole('heading', {name: 'How Restoration Lab solves it'})).toBeVisible();
  await expect(page.getByText(/Every proposed action is checked against four deterministic safety rules/)).toBeVisible();
  await expect(page.getByText(/press Watch demo to see one dangerous close rejected/)).toBeVisible();
  await expect(page.getByText(/For junior distribution engineers and engineering students/)).toBeVisible();
  await expect(page.getByText('4 browser journeys')).toBeVisible();

  const diagramBox = await page.locator('.diagram-panel').boundingBox();
  const statusBox = await page.locator('.status-rail').boundingBox();
  const problemTypeSize = await page.getByRole('heading', {name: 'The problem'}).evaluate((element) => (
    Number.parseFloat(getComputedStyle(element).fontSize)
  ));

  expect(diagramBox?.width).toBeGreaterThan(1000);
  expect(diagramBox?.y).toBeLessThan(statusBox?.y ?? 0);
  expect(problemTypeSize).toBeGreaterThanOrEqual(16);
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

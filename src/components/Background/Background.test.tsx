import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Background } from './Background';

test('Background component', async () => {
  render(
    <Background title="Testing">
      <div>Test</div>
    </Background>
  );
  const gridItemText = screen.getByTestId('title').innerHTML;
  expect(gridItemText).toBe('Testing');
  expect(screen.getByText('Test')).toBeInTheDocument();
});

import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { WidgetCard } from './WidgetCard'

describe('WidgetCard', () => {
  it('should render the title and children without emojis', () => {
    render(
      <WidgetCard title="Test Title">
        <div data-testid="child">Child Content</div>
      </WidgetCard>
    )

    // Ensure title is rendered
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    
    // Ensure children are rendered
    expect(screen.getByTestId('child')).toBeInTheDocument()
    expect(screen.getByText('Child Content')).toBeInTheDocument()
    
    // Ensure no emojis are in the text
    const textContent = screen.getByText('Test Title').textContent || ''
    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/u;
    expect(emojiRegex.test(textContent)).toBe(false)
  })
})
